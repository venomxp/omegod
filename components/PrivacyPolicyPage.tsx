import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Server, 
  Cpu, 
  Globe2, 
  FileCheck, 
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lastUpdated = isAr ? 'مارس 2026' : 'March 2026';

  const highlights = [
    {
      icon: <EyeOff className="w-6 h-6 text-pink-500" />,
      title: isAr ? 'بدون تسجيل أو بيانات شخصية' : 'Zero Account Registration',
      desc: isAr 
        ? 'لا نطلب أبداً اسمك أو بريدك الإلكتروني أو رقم هاتفك. أنت تستخدم المنصة بحرية تامة دون إنشاء أي حساب.'
        : 'We never ask for your name, email, or phone number. You connect freely without creating any profile or account.',
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      title: isAr ? 'مكالمات مشفرة P2P' : 'Encrypted P2P Video Calls',
      desc: isAr
        ? 'يتم بث الفيديو والصوت مباشرة بين الأجهزة بتقنية WebRTC المشفرة. لا نسجل مكالماتك إطلاقاً ولا نحتفظ بها.'
        : 'All video and audio streams flow directly peer-to-peer via WebRTC encryption. We never record or store your live conversations.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-sky-500" />,
      title: isAr ? 'حماية آلية ذكية للمنصة' : 'Automated Safety Guard',
      desc: isAr
        ? 'نظام فحص ذكي في الذاكرة لمنع المحتوى غير اللائق وضمان بيئة آمنة للجميع دون تخزين أي تسجيلات دائمة.'
        : 'In-memory real-time moderation prevents inappropriate content and ensures safety without saving private video archives.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: isAr ? 'حظر المعتدين ومكافحة الإساءة' : 'Strict Abuse Prevention',
      desc: isAr
        ? 'يتم استخدام عنوان IP فقط لمنع الحسابات المسيئة وفرض عقوبات الحظر ومنح تجربة نقية لكل المستخدمين.'
        : 'IP addresses are processed strictly to enforce bans on abusers, match approximate regions, and preserve community safety.',
    },
  ];

  const sections = [
    {
      number: '01',
      icon: <Globe2 className="w-5 h-5 text-pink-500" />,
      title: isAr ? 'مقدمة ونطاق سياسة الخصوصية' : 'Introduction & Scope',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            مرحباً بك في منصة <strong>OmeGod</strong>. نحن نؤمن بأن المحادثات العفوية يجب أن تكون خاصة، آمنة، ومحمية. توضح هذه السياسة بشفافية مطلقة كيفية تعاملنا مع البيانات عند استخدامك لخدماتنا عبر الويب.
          </p>
          <p>
            باستخدامك لمنصة OmeGod، فإنك تقر وتوافق على الممارسات الموضحة في هذه الوثيقة. إذا كنت لا توافق على أي بند، يرجى التوقف عن استخدام المنصة فوراً.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            Welcome to <strong>OmeGod</strong>. We believe that spontaneous human connection should be private, secure, and respectful. This Privacy Policy outlines with complete transparency how data is handled when you access our web application.
          </p>
          <p>
            By accessing or using OmeGod, you acknowledge and agree to the practices described herein. If you disagree with any part of this policy, please discontinue use of the service immediately.
          </p>
        </div>
      ),
    },
    {
      number: '02',
      icon: <EyeOff className="w-5 h-5 text-pink-500" />,
      title: isAr ? 'عدم جمع البيانات الشخصية المباشرة' : 'No Direct Personal Data Collection',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            نحن نعتمد مبدأ <em>الحد الأدنى من البيانات (Data Minimization)</em>:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>لا حسابات:</strong> لا توجد استمارات تسجيل، ولا نطلب أسماء أو كلمات سر أو صور ملف شخصي.</li>
            <li><strong>لا بريد أو هواتف:</strong> لا نقوم بجمع أو طلب بريدك الإلكتروني أو حسابات التواصل الخاصة بك.</li>
            <li><strong>لا تعقب شخصي:</strong> لا نبيع أو نؤجر أي بيانات للمعلنين أو لأطراف خارجية لأغراض تسويقية.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            We strictly enforce a policy of <em>Data Minimization by Design</em>:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>No Accounts:</strong> There is no registration form, user profile, or credential database.</li>
            <li><strong>No Contact Info:</strong> We never request or store your email address, phone number, or social profiles.</li>
            <li><strong>No Data Brokering:</strong> We never sell, rent, or trade your usage information to third-party advertisers.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '03',
      icon: <Lock className="w-5 h-5 text-emerald-500" />,
      title: isAr ? 'الكاميرا والميكروفون وتقنية WebRTC المشفرة' : 'Camera, Audio & WebRTC Peer-to-Peer Streaming',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            لكي تعمل خدمة الفيديو المباشر، يطلب المتصفح إذن الوصول إلى الكاميرا والميكروفون بجهازك:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>اتصال مباشر مشفر (P2P):</strong> يتم تشفير وبث الصوت والصورة مباشرة بينك وبين الطرف الآخر عبر بروتوكولات WebRTC (DTLS/SRTP) الآمنة.</li>
            <li><strong>عدم التسجيل:</strong> لا يقوم سيرفر OmeGod بتسجيل أو حفظ أو أرشفة أي محادثة فيديو أو صوت على الإطلاق.</li>
            <li><strong>التحكم في الأذونات:</strong> يتم تفعيل الكاميرا فقط داخل صفحة المحادثة، ويمكنك كتم الميكروفون أو تبديل الكاميرا أو إنهاء الاتصال في أي لحظة.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            To deliver live video and audio interaction, your browser requests permission to access your device&apos;s camera and microphone:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>Direct P2P Encryption:</strong> Media streams travel directly between you and your chat partner utilizing industry-standard WebRTC (DTLS/SRTP) security.</li>
            <li><strong>Zero Video Storage:</strong> OmeGod servers do not record, tap, monitor, or archive your live video or audio conversations.</li>
            <li><strong>User Control:</strong> Camera access only runs during an active session and stops the second you exit or close the tab.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '04',
      icon: <Cpu className="w-5 h-5 text-sky-500" />,
      title: isAr ? 'نظام الفحص الذكي ومكافحة السلوكيات المحظورة' : 'Automated Safety & Violation Moderation',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            لحماية جميع المستخدمين والامتثال للقوانين الدولية الصارمة ضد المحتوى الإباحي والتحرش:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li>يحتوي النظام على فحص دوري آلي ذكي في الذاكرة (In-Memory Processing) لرصد المخالفات الجسيمة مثل التعري أو السلوك غير اللائق.</li>
            <li>اللقطات تفحص في أجزاء من الثانية وتُحذف فوراً من الذاكرة المؤقتة، ولا يتم حفظ أي صور إلا في حال ارتكاب مخالفة صريحة توجب الحظر الفوري وسجل الإشراف الإداري.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            To protect participants and comply with global child protection and anti-harassment regulations:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li>Our automated safety engine inspects ephemeral frames in memory to identify non-consensual nudity, explicit acts, or severe violations.</li>
            <li>Frames are discarded immediately from volatile memory after processing and are never retained unless a confirmed violation triggers an automatic disciplinary ban record.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '05',
      icon: <Server className="w-5 h-5 text-amber-500" />,
      title: isAr ? 'عناوين IP وسجلات الأمان' : 'IP Addresses & Ban Enforcement',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            عند اتصالك بالخادم، يتلقى النظام عنوان بروتوكول الإنترنت (IP Address) لأغراض فنية وأمنية مشروعة حصراً:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>تنسيق الاتصال وإشارات WebRTC:</strong> للتوجيه التقني ومطابقة المستخدمين حسب الدولة.</li>
            <li><strong>تطبيق الحظر والعقوبات:</strong> لمنع المستخدمين المسيئين أو المتحرشين من معاودة الدخول وإلحاق الضرر بالآخرين.</li>
            <li><strong>إحصائيات الاتصال:</strong> عرض عداد المستخدمين المتصلين في الوقت الفعلي بصورة مجمعة وغير شخصية.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            When connecting to our matchmaking servers, your Internet Protocol (IP) address is temporarily processed for legitimate operational and security needs:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>Signaling & Region Matching:</strong> Delivering WebRTC session descriptions and resolving approximate country flags.</li>
            <li><strong>Ban Enforcement:</strong> Blocking reported or banned individuals from returning to harass community members.</li>
            <li><strong>Aggregate Telemetry:</strong> Maintaining aggregate online counter metrics without linking to user identities.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '06',
      icon: <FileCheck className="w-5 h-5 text-indigo-500" />,
      title: isAr ? 'التخزين المحلي على جهازك (Local Storage)' : 'Local Storage & Browser Preferences',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            لا نستخدم ملفات تتبع إعلانية من جهات خارجية (Third-party tracking cookies). نستخدم فقط التخزين المحلي لمتصفحك (localStorage) لحفظ إعداداتك الشخصية:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li>الوضع المظلم أو الفاتح (Dark / Light Theme).</li>
            <li>اللغة المختارة (العربية، الإنجليزية، الفرنسية، إلخ).</li>
            <li>الاهتمامات والوسوم المفضلة (Interests).</li>
            <li>إقرار الموافقة على شروط السن (+18).</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            We do not use invasive third-party ad tracking cookies. We utilize standard client-side browser localStorage solely to persist your local UI preferences:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li>Dark Mode / Light Mode theme preference.</li>
            <li>Selected interface language.</li>
            <li>Saved interest tags and notification sound toggle.</li>
            <li>Acknowledgement of the 18+ age requirement.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '07',
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      title: isAr ? 'حماية القاصرين (ممنوع تحت سن 18 عاماً)' : 'Child Safety & Strict 18+ Age Restriction',
      content: isAr ? (
        <div className="space-y-3">
          <p className="font-semibold text-rose-600 dark:text-rose-400">
            منصة OmeGod مخصصة حصراً للبالغين بعمر 18 سنة فما فوق.
          </p>
          <p>
            يُحظر تماماً على أي شخص قاصر استخدام المنصة. في حال تم الإبلاغ عن أو رصد أي قاصر، يتم إنهاء الجلسة فوراً وحظر المعرف نهائياً، كما نتعاون تعاوناً تاماً مع الجهات الرسمية ومنظمات حماية الأطفال في حالات الاستغلال أو التعدي.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-semibold text-rose-600 dark:text-rose-400">
            OmeGod is strictly designed and restricted for adults aged 18 and older.
          </p>
          <p>
            Minors are strictly prohibited from using the platform. Any detected or reported minor will have their access terminated immediately with a permanent hardware/IP ban, and severe violations are reported to competent international child protection authorities.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative isolate min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fafafa] dark:bg-[#0c0d12] transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Tabs Pill */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-sm text-xs sm:text-sm font-semibold">
            <Link 
              to="/privacy" 
              className="px-4 py-2 rounded-xl bg-pink-500 text-white shadow-md shadow-pink-500/30 transition-all font-bold"
            >
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link 
              to="/terms" 
              className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {isAr ? 'شروط الاستخدام' : 'Terms of Service'}
            </Link>
            <Link 
              to="/rules" 
              className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {isAr ? 'قواعد المجتمع' : 'Community Rules'}
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-xs sm:text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'حماية بياناتك وحريتك أولويتنا' : 'Your Privacy & Safety Come First'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-outfit tracking-tight">
            {isAr ? 'سياسة الخصوصية والأمان' : 'Privacy Policy'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'صممت OmeGod لتمنحك تواصلاً إنسانياً حقيقياً بدون تعقب، بدون تسجيل، وبدون تخزين لمحادثات الفيديو.'
              : 'OmeGod is architected for spontaneous human encounters without tracking, without profiles, and without recording.'}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
            {isAr ? 'آخر تحديث:' : 'Last updated:'} {lastUpdated}
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <div 
              key={i} 
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 flex items-start gap-4 transition-all hover:border-pink-500/40"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex-shrink-0">
                {h.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-outfit">
                  {h.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Sections Container */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/40 space-y-8 divide-y divide-slate-100 dark:divide-white/10">
          {sections.map((sec, idx) => (
            <div key={idx} className={`${idx !== 0 ? 'pt-8' : ''} space-y-3`}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                  {sec.number}
                </span>
                <div className="flex items-center gap-2">
                  {sec.icon}
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-outfit">
                    {sec.title}
                  </h2>
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed ps-0 sm:ps-8">
                {sec.content}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-pink-500/10 via-orange-500/10 to-transparent border border-pink-500/20">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg font-outfit">
              {isAr ? 'جاهز لبدء محادثة آمنة؟' : 'Ready to start chatting safely?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isAr ? 'تواصل فوراً مع آلاف الأشخاص حول العالم بنقرة واحدة.' : 'Connect instantly with thousands of online users in real time.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {isAr ? 'الصفحة الرئيسية' : 'Home'}
            </Link>
            <Link
              to="/chat?start=true"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-md shadow-pink-500/25 hover:opacity-95 transition-all text-xs sm:text-sm flex items-center gap-1.5"
            >
              <span>{isAr ? 'ابدأ الدردشة' : 'Start Chat'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
