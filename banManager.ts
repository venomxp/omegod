import fs from 'fs';
import path from 'path';

export interface BannedRecord {
  ip: string;
  reason: string;
  bannedAt: number;
  expiresAt: number;
  durationMinutes: number;
  strikes: number;
}

const BAN_FILE_PATH = path.resolve(process.cwd(), 'data', 'banned_ips.json');

// In-memory cache of banned IPs
const bannedIPs = new Map<string, BannedRecord>();

// Ensure directory exists and load persistent bans
function initBanStore() {
  try {
    const dir = path.dirname(BAN_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(BAN_FILE_PATH)) {
      const data = fs.readFileSync(BAN_FILE_PATH, 'utf-8');
      const list: BannedRecord[] = JSON.parse(data);
      const now = Date.now();
      for (const rec of list) {
        if (rec.expiresAt > now) {
          bannedIPs.set(rec.ip, rec);
        }
      }
    }
  } catch (err) {
    console.error('[BanManager] Error loading ban file:', err);
  }
}

initBanStore();

function persistBans() {
  try {
    const dir = path.dirname(BAN_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = Array.from(bannedIPs.values());
    fs.writeFileSync(BAN_FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('[BanManager] Error saving ban file:', err);
  }
}

/**
 * Clean IP string (strip IPv6 prefix if present)
 */
export function normalizeIP(rawIp: string | undefined): string {
  if (!rawIp) return 'unknown';
  let ip = rawIp.trim();
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }
  if (ip === '::1') {
    ip = '127.0.0.1';
  }
  return ip;
}

/**
 * Checks if an IP is actively banned
 */
export function isIPBanned(rawIp: string): { banned: boolean; record?: BannedRecord } {
  const ip = normalizeIP(rawIp);
  if (!ip || ip === 'unknown') return { banned: false };

  const record = bannedIPs.get(ip);
  if (!record) return { banned: false };

  if (Date.now() > record.expiresAt) {
    bannedIPs.delete(ip);
    persistBans();
    return { banned: false };
  }

  return { banned: true, record };
}

/**
 * Ban an IP address for a specific duration in minutes (default: 24h = 1440m)
 */
export function banIP(rawIp: string, reason: string, durationMinutes = 1440): BannedRecord {
  const ip = normalizeIP(rawIp);
  const now = Date.now();
  const existing = bannedIPs.get(ip);
  const strikes = (existing?.strikes || 0) + 1;

  // Multiply duration if repeat offender
  const finalMinutes = durationMinutes * Math.min(strikes, 5);
  const expiresAt = now + finalMinutes * 60 * 1000;

  const record: BannedRecord = {
    ip,
    reason,
    bannedAt: now,
    expiresAt,
    durationMinutes: finalMinutes,
    strikes,
  };

  bannedIPs.set(ip, record);
  persistBans();
  console.log(`[BanManager] 🚫 IP BANNED: ${ip} for ${finalMinutes} min. Reason: ${reason}`);
  return record;
}

export interface ReportEvent {
  reporterIp: string;
  reportedIp: string;
  reason: string;
  timestamp: number;
}

const reportsByTargetIP = new Map<string, ReportEvent[]>();

// Maximum independent reports required before a penalty is applied
const REQUIRED_REPORT_COUNT = 3;
const REPORT_EXPIRY_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours

/**
 * Record a user report with anti-false-accusation protection.
 * A single manual report NEVER triggers an immediate ban to prevent griefing/false reports!
 * Only multiple independent reports from 3 distinct IP addresses within 2 hours trigger action.
 */
export function recordUserReport(
  reporterIp: string,
  targetIp: string,
  reason: string
): { actionTaken: boolean; strikeCount: number; record?: BannedRecord } {
  const normReporter = normalizeIP(reporterIp);
  const normTarget = normalizeIP(targetIp);

  if (!normTarget || normTarget === 'unknown' || normReporter === normTarget) {
    return { actionTaken: false, strikeCount: 0 };
  }

  const now = Date.now();
  let reports = reportsByTargetIP.get(normTarget) || [];

  // Filter out reports older than 2 hours
  reports = reports.filter((r) => now - r.timestamp < REPORT_EXPIRY_WINDOW_MS);

  // Prevent spam: only 1 report per distinct reporter IP
  const alreadyReported = reports.some((r) => r.reporterIp === normReporter);
  if (!alreadyReported) {
    reports.push({
      reporterIp: normReporter,
      reportedIp: normTarget,
      reason,
      timestamp: now,
    });
    reportsByTargetIP.set(normTarget, reports);
  }

  const uniqueReporters = new Set(reports.map((r) => r.reporterIp)).size;
  console.log(
    `[ReportManager] User ${normTarget} has ${uniqueReporters}/${REQUIRED_REPORT_COUNT} independent reports.`
  );

  // Only ban if 3 different people reported them
  if (uniqueReporters >= REQUIRED_REPORT_COUNT) {
    const banRecord = banIP(
      normTarget,
      `Community consensus: Reported by ${uniqueReporters} separate users for ${reason}`,
      360 // 6 hours
    );
    reportsByTargetIP.delete(normTarget);
    return { actionTaken: true, strikeCount: uniqueReporters, record: banRecord };
  }

  return { actionTaken: false, strikeCount: uniqueReporters };
}

/**
 * Unban an IP address
 */
export function unbanIP(rawIp: string): boolean {
  const ip = normalizeIP(rawIp);
  const removed = bannedIPs.delete(ip);
  if (removed) persistBans();
  return removed;
}

/**
 * Get all active banned records
 */
export function getAllBans(): BannedRecord[] {
  const now = Date.now();
  return Array.from(bannedIPs.values()).filter((b) => b.expiresAt > now);
}
