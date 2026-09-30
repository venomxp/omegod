import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Ban, 
  UserX, 
  VideoOff, 
  HeartHandshake, 
  Radio, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const RulesPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const goldenRules = [
    {
      badge: 'Rule 01',
      title: isAr ? 'ممنوع التعري أو المحتوى الإباحي قطعياً' : 'Zero Tolerance for Nudity or Sexual Acts',
      severity: isAr ? 'حظر دائم وفوري' : 'Instant Permanent Ban',
      severityColor: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
      icon: <Ban className="w-6 h-6 text-red-500" />,
      desc: isAr
        ? 'يُحظر تماماً كشف أي جزء حساس، أو الظهور بالملابس الداخلية، أو القيام بأي إيحاءات أو حركات جنسية. النظام الآلي والإشراف يحظر أي مخالف فوراً دون تراجع.'
        : 'Any form of partial or full nudity, displaying underwear, or performing sexually explicit or suggestive gestures is strictly prohibited and results in immediate banishment.',
      allowed: isAr ? 'الملابس العادية اللائقة التي ترتديها في الأماكن العامة.' : 'Ordinary decent clothing you would wear in public venues.',
      forbidden: isAr ? 'التعري، الملابس الداخلية، الإيحاءات الجنسية، الأفعال الفاضحة.' : 'Full/partial nudity, underwear, suggestive poses, explicit behavior.',
    },
    {
      badge: 'Rule 02',
      title: isAr ? 'السن القانوني (+18 عاماً فقط)' : 'Strictly 18+ Adults Only',
      severity: isAr ? 'حظر دائم للقاصرين' : 'Immediate Minor Removal',
      severityColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      icon: <UserX className="w-6 h-6 text-rose-500" />,
      desc: isAr
        ? 'OmeGod مخصصة حصراً للبالغين بعمر 18 سنة فما فوق. يُمنع القاصرون منعاً باتاً من استخدام الموقع لحمايتهم ولحماية المجتمع.'
        : 'OmeGod is strictly an adult community for individuals 18 years or older. Minors are strictly forbidden to safeguard youth and community compliance.',
      allowed: isAr ? 'البالغون القانونيون فوق 18 عاماً.' : 'Legal adults aged 18 and older.',
      forbidden: isAr ? 'الأطفال، المراهقون، أو تواجد القاصرين في إطار الكاميرا.' : 'Children, teenagers, or any minor presence in camera frame.',
    },
    {
      badge: 'Rule 03',
      title: isAr ? 'الاحترام المتبادل ومنع التحرش والكراهية' : 'Civility, Respect & No Harassment',
      severity: isAr ? 'حظر فوري' : 'Strict Ban',
      severityColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: <HeartHandshake className="w-6 h-6 text-amber-500" />,
      desc: isAr
        ? 'عامل الآخرين بلطف وتقدير كما تحب أن تُعامل. يُحظر التحرش، الشتم، التهديد، العنصرية، أو السخرية من أي شخص بسبب دينه أو أصله أو شكله.'
        : 'Treat fellow strangers with empathy and dignity. Bullying, racial slurs, misogyny, hate speech, threats, and harassment are strictly prohibited.',
      allowed: isAr ? 'الحوارات اللطيفة، تبادل الثقافات، الابتسامة والصداقة.' : 'Friendly conversations, cultural exchanges, mutual smiles.',
      forbidden: isAr ? 'السب، الشتم، العنصرية، التهديد، التنمر، المضايقة.' : 'Insults, slurs, threats, bullying, hate speech, stalking.',
    },
    {
      badge: 'Rule 04',
      title: isAr ? 'ممنوع تصوير أو تسجيل الشاشة دون إذن' : 'No Non-Consensual Recording or Streaming',
      severity: isAr ? 'حظر وملاحقة قانونية' : 'Ban & Legal Action',
      severityColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      icon: <VideoOff className="w-6 h-6 text-purple-500" />,
      desc: isAr
        ? 'احترم خصوصية الغرباء. يُمنع منعاً باتاً تسجيل مكالمات الآخرين أو أخذ لقطات شاشة (Screenshots) أو إعادة نشرها على تيك توك، يوتيوب، أو أي منصة.'
        : 'Respect stranger privacy. Never screen record, take screenshots, or broadcast live chat encounters on TikTok, YouTube, Twitch, or elsewhere without written consent.',
      allowed: isAr ? 'الاستمتاع بالمحادثة الحية في وقتها الحقيقي فقط.' : 'Enjoying real-time interactions in the present moment.',
      forbidden: isAr ? 'برامج تسجيل الشاشة، تصوير الهاتف بكاميرا أخرى، نشر الوجوه.' : 'Screen recorders, capturing with another phone, unauthorized reposts.',
    },
    {
      badge: 'Rule 05',
      title: isAr ? 'ممنوع السبام، الإعلانات، أو البوتات' : 'No Commercial Spam, Bots, or Promotion',
      severity: isAr ? 'حظر فوري' : 'Automated Ban',
      severityColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
      icon: <Radio className="w-6 h-6 text-sky-500" />,
      desc: isAr
        ? 'OmeGod مكان للتواصل الإنساني الحقيقي. يُمنع إرسال روابط إعلانية، ترويج حسابات إنستغرام أو أونلي فانز، أو استخدام فيديوهات مسجلة وبوتات وهمية.'
        : 'OmeGod is designed for authentic human connection. Shilling social handles, advertising OnlyFans, commercial links, crypto spam, or looping fake videos is prohibited.',
      allowed: isAr ? 'التواصل الإنساني الحي والصادق.' : 'Authentic, live, organic human conversations.',
      forbidden: isAr ? 'الإعلانات التجارية، روابط السبام، الفيديوهات الوهمية المكررة.' : 'Commercial solicitations, spam links, automated scripts, loop videos.',
    },
  ];

  const penalties = [
    {
      step: '1',
      title: isAr ? 'تنبيه نظام فوري' : 'Automated Warning',
      desc: isAr ? 'عند ارتكاب سلوك غير لائق خفيف أو توجيه الكاميرا لمكان غير مريح، يظهر تنبيه مباشر على الشاشة.' : 'Subtle violations or poor camera framing trigger an on-screen guidance prompt.',
    },
    {
      step: '2',
      title: isAr ? 'تعليق مؤقت للجلسة' : 'Temporary Suspension',
      desc: isAr ? 'في حال تكرار التخطي السريع أو الإبلاغات المتتالية، يتم إيقاف الحساب لمدة من 15 دقيقة إلى 24 ساعة.' : 'Repeated rapid skips or multiple user reports induce a timed timeout from 15 mins to 24 hrs.',
    },
    {
      step: '3',
      title: isAr ? 'حظر دائم لعنوان IP' : 'Permanent IP Ban',
      desc: isAr ? 'في مخالفات التعري، التحرش، أو وجود قاصرين، يتم حظر الجهاز وعنوان IP نهائياً بدون أي استئناف.' : 'Nudity, sexual misconduct, or child endangerment causes immediate irreversible hardware/IP ban.',
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
              className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
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
              className="px-4 py-2 rounded-xl bg-pink-500 text-white shadow-md shadow-pink-500/30 transition-all font-bold"
            >
              {isAr ? 'قواعد المجتمع' : 'Community Rules'}
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'معايير مجتمع OmeGod الآمن' : 'OmeGod Safe Community Guidelines'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-outfit tracking-tight">
            {isAr ? 'قواعد وتعليمات المجتمع' : 'Community Rules & Guidelines'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'اتبع هذه القواعد البسيطة لضمان تجربة ممتعة، راقية، وآمنة لك وللجميع. خرق هذه القواعد يؤدي للحظر الفوري.'
              : 'Follow these straightforward rules to maintain a safe, respectful, and entertaining atmosphere for everyone.'}
          </p>
        </div>

        {/* Warning Callout Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 backdrop-blur-xl flex items-start gap-3.5 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 dark:text-white font-outfit">
              {isAr ? 'نظام إشراف آلي ومراقبة مستمرة' : 'Automated Moderation & Active Monitoring'}
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'يستخدم الموقع خوارزميات ذكية لرصد المخالفات فور حدوثها. إذا واجهت أي مستخدم يسيء التصرف، اضغط زر الإبلاغ (Report) فوراً وسيتم التعامل معه تلقائياً.'
                : 'Our platform deploys intelligent automated systems to detect policy breaches in real time. If a stranger acts inappropriately, tap Report immediately to trigger administrative action.'}
            </p>
          </div>
        </div>

        {/* Rules Cards Stack */}
        <div className="space-y-4">
          {goldenRules.map((rule, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30 space-y-4 transition-all hover:border-pink-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    {rule.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pink-500">
                      {rule.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-outfit">
                      {rule.title}
                    </h3>
                  </div>
                </div>

                <span className={`inline-flex self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold border ${rule.severityColor}`}>
                  {rule.severity}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {rule.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 space-y-0.5">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block">
                    ✅ {isAr ? 'المسموح به:' : 'Allowed:'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {rule.allowed}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 space-y-0.5">
                  <span className="font-bold text-rose-700 dark:text-rose-400 block">
                    ❌ {isAr ? 'الممنوع تماماً:' : 'Strictly Prohibited:'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {rule.forbidden}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Penalties Ladder */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30 space-y-6">
          <div className="text-center sm:text-start space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-outfit">
              {isAr ? 'نظام العقوبات وتدرج الحظر' : 'Enforcement & Penalty Ladder'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isAr ? 'كيف يتم التعامل مع الحسابات المخالفة لقواعد المجتمع' : 'How violations are handled by our moderation enforcement'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {penalties.map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-500 font-black text-xs flex items-center justify-center">
                  {p.step}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm font-outfit">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-pink-500/10 via-orange-500/10 to-transparent border border-pink-500/20">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg font-outfit">
              {isAr ? 'مستعد للبدء مع احترام القواعد؟' : 'Ready to chat with respect?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isAr ? 'ابدأ محادثات حية وممتعة وتعرف على أصدقاء جدد من مختلف الثقافات.' : 'Engage in lively, enjoyable video encounters and discover diverse cultures.'}
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

export default RulesPage;
