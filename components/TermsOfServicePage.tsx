import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  UserCheck, 
  Ban, 
  Scale, 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lastUpdated = isAr ? 'مارس 2026' : 'March 2026';

  const keyPoints = [
    {
      icon: <UserCheck className="w-6 h-6 text-pink-500" />,
      title: isAr ? 'السن القانوني 18+ فقط' : 'Strictly 18+ Adults Only',
      desc: isAr
        ? 'الخدمة مخصصة فقط لمن أتموا 18 عاماً. يُحظر دخول القاصرين تماماً ويتم حظر أي مخالف فوراً.'
        : 'The service is strictly for users aged 18 and older. Minors are strictly prohibited from entering.',
    },
    {
      icon: <Ban className="w-6 h-6 text-red-500" />,
      title: isAr ? 'حظر التعري والتحرش فورياً' : 'Zero-Tolerance for Nudity & Abuse',
      desc: isAr
        ? 'أي ظهور بالملابس الداخلية أو تعري أو سلوك غير لائق يؤدي إلى الحظر الدائم لعنوان IP بدون سابق إنذار.'
        : 'Any nudity, underwear exposure, sexual conduct, or harassment triggers an instant permanent ban.',
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-amber-500" />,
      title: isAr ? 'ممنوع التسجيل أو التصوير' : 'No Recording or Screencaps',
      desc: isAr
        ? 'يُمنع منعاً باتاً تصوير أو تسجيل الآخرين دون موافقتهم الصريحة أو نشر المحادثات على مواقع التواصل.'
        : 'Recording or broadcasting other users without their express consent is strictly prohibited.',
    },
    {
      icon: <Scale className="w-6 h-6 text-sky-500" />,
      title: isAr ? 'اتفاقية ملزمة قانونياً' : 'Legally Binding Agreement',
      desc: isAr
        ? 'استمرارك في تصفح واستخدام OmeGod يعني موافقتك الصريحة والكاملة على جميع هذه الشروط والأحكام.'
        : 'Accessing or using OmeGod constitutes your unconditional agreement to comply with these terms.',
    },
  ];

  const sections = [
    {
      number: '01',
      icon: <Scale className="w-5 h-5 text-pink-500" />,
      title: isAr ? 'قبول الشروط والاتفاقية' : 'Acceptance of Terms',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            تحدد هذه الشروط والأحكام القواعد الملزمة لاستخدامك لموقع وخدمات <strong>OmeGod</strong>. بدخولك أو استخدامك للموقع، فإنك توافق على الالتزام بها والامتثال لجميع القوانين واللوائح المعمول بها.
          </p>
          <p>
            إذا كنت لا توافق على أي شرط من هذه الشروط، فلا يحق لك الوصول إلى الخدمة أو استخدامها ويجب عليك مغادرة الموقع فوراً.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and <strong>OmeGod</strong>. By accessing or using any feature of our website or services, you confirm that you have read, understood, and agreed to be bound by these Terms.
          </p>
          <p>
            If you do not agree to any portion of these Terms, you are not authorized to use the service and must exit immediately.
          </p>
        </div>
      ),
    },
    {
      number: '02',
      icon: <UserCheck className="w-5 h-5 text-emerald-500" />,
      title: isAr ? 'الأهلية والسن القانوني (+18)' : 'Eligibility & Minimum Age (18+)',
      content: isAr ? (
        <div className="space-y-3">
          <p className="font-semibold text-rose-600 dark:text-rose-400">
            يجب أن يكون عمرك 18 عاماً على الأقل لاستخدام OmeGod.
          </p>
          <p>
            بالنقر على بدء المحادثة، فإنك تقر وتضمن قانونياً أنك بلغت سن الرشد القانوني (18 عاماً أو أكثر). يمنع منعاً باتاً استخدام المنصة من قبل الأطفال أو القاصرين تحت أي ظرف. أي انتهاك لهذا الشرط يؤدي للحظر الفوري وفسخ الاتفاقية.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-semibold text-rose-600 dark:text-rose-400">
            You must be at least 18 years of age to access or use OmeGod.
          </p>
          <p>
            By initiating a session, you represent and warrant that you are an adult of legal majority (18+). The use of this service by minors is strictly forbidden. Any account or device identified as being operated by a minor will be banned immediately and permanently.
          </p>
        </div>
      ),
    },
    {
      number: '03',
      icon: <Ban className="w-5 h-5 text-red-500" />,
      title: isAr ? 'السلوكيات والأنشطة المحظورة قطعياً' : 'Strictly Prohibited Conduct',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            تطبق OmeGod سياسة عدم التسامح المطلق (Zero Tolerance) مع المخالفات التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>التعري والمحتوى الجنسي:</strong> إظهار أي أعضاء خاصة، الملابس الداخلية، أو القيام بحركات إيحائية أو جنسية.</li>
            <li><strong>التحرش والتنمر:</strong> التهديد، الإساءة اللفظية، السخرية، أو مضايقة أي مستخدم.</li>
            <li><strong>خطاب الكراهية والعنصرية:</strong> أي تمييز قائم على العرق، الجنسية، الدين، الجنس، أو الإعاقة.</li>
            <li><strong>تسجيل الشاشة دون إذن:</strong> التقاط صور أو مقاطع فيديو للمستخدمين الآخرين دون موافقة كتابية صريحة.</li>
            <li><strong>الترويج والإعلانات والسبام:</strong> ترويج حسابات مواقع التواصل، بيع المنتجات، أو إرسال روابط مشبوهة.</li>
            <li><strong>انتحال الشخصية أو برامج البوت:</strong> استخدام كاميرات افتراضية أو فيديوهات مسجلة مسبقاً لخداع المستخدمين.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            We enforce a strict Zero-Tolerance policy against the following violations:
          </p>
          <ul className="list-disc list-inside space-y-2 ms-2 text-slate-700 dark:text-slate-300">
            <li><strong>Nudity & Sexual Conduct:</strong> Exposing private parts, wearing underwear, or engaging in sexually suggestive actions.</li>
            <li><strong>Harassment & Bullying:</strong> Threatening, abusive, defamatory, or stalking behavior toward any participant.</li>
            <li><strong>Hate Speech & Bigotry:</strong> Discriminatory remarks based on race, ethnicity, nationality, religion, gender, or disability.</li>
            <li><strong>Unauthorized Recording:</strong> Screen capturing, recording, or publishing interactions with other users without consent.</li>
            <li><strong>Spam & Solicitation:</strong> Commercial advertising, shilling social media handles, or sending malicious URLs.</li>
            <li><strong>Bots & Virtual Emulation:</strong> Using fake looping videos, automated scripts, or virtual webcams to deceive strangers.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '04',
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      title: isAr ? 'طبيعة الاتصال المباشر وإخلاء المسؤولية عن أفعال الغرباء' : 'Peer-to-Peer Interaction & Disclaimer of User Conduct',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            تقوم منصة OmeGod بتوفير بنية تحتية لربط المستخدمين عشوائياً وبشكل مباشر. أنت تدرك وتوافق على أنك تتفاعل مع غرباء مستقلين في الوقت الفعلي.
          </p>
          <p>
            على الرغم من استخدامنا لأحدث تقنيات الإشراف والحظر، إلا أن OmeGod لا تتحمل أي مسؤولية قانونية عن التصرفات الفردية أو الأقوال التي تصدر عن مستخدمين آخرين. نوصي بشدة بعدم مشاركة معلوماتك الشخصية أو موقعك أو بياناتك الحساسة مع أي شخص غريب، واستخدام زر التخطي (Skip) أو الإبلاغ (Report) فور مواجهة أي سلوك غير مريح.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            OmeGod provides automated matchmaking infrastructure facilitating real-time direct connections between peers. You acknowledge that you are interacting with independent strangers in live video sessions.
          </p>
          <p>
            While we implement advanced automated screening and responsive reporting mechanisms, OmeGod does not control and cannot be held liable for the verbal utterances, physical actions, or conduct of individual users. We strongly advise against sharing personal addresses, banking details, or real identities with strangers. Use the Skip or Report buttons immediately if any interaction makes you uncomfortable.
          </p>
        </div>
      ),
    },
    {
      number: '05',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      title: isAr ? 'إنهاء الخدمة، الحظر، والتعاون مع السلطات' : 'Enforcement, IP Bans & Legal Compliance',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            تحتفظ إدارة OmeGod بالحق الكامل في:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li>حظر أي مستخدم مؤقتاً أو نهائياً فوراً وبدون إشعار مسبق عند ارتكاب أي مخالفة.</li>
            <li>رفض طلبات رفع الحظر في الحالات الجسيمة (مثل التعري أو التحرش أو القاصرين).</li>
            <li>التعاون الكامل مع الأجهزة الأمنية والقضائية وتقديم الأدلة الفنية في حالات الجرائم الإلكترونية والابتزاز وحماية الأطفال.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            OmeGod administration reserves the unconditional right to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ms-2 text-slate-700 dark:text-slate-300">
            <li>Suspend, block, or permanently ban any user&apos;s IP or hardware identifier immediately upon violation.</li>
            <li>Dismiss appeals for serious misconduct including sexual exposure, harassment, or minor endangerment.</li>
            <li>Cooperate fully with domestic and international law enforcement agencies by preserving and submitting forensic records when required by valid legal subpoenas.</li>
          </ul>
        </div>
      ),
    },
    {
      number: '06',
      icon: <Scale className="w-5 h-5 text-indigo-500" />,
      title: isAr ? 'إخلاء المسؤولية وحدود التعويض' : 'Warranty Disclaimer & Limitation of Liability',
      content: isAr ? (
        <div className="space-y-3">
          <p>
            يتم تقديم الخدمة &quot;كما هي&quot; (AS IS) و&quot;بحسب توافرها&quot; (AS AVAILABLE)، دون أي ضمانات صريحة أو ضمنية من أي نوع بشأن استمرارية الخدمة، خلوها من الأخطاء، أو ملائمتها لغرض معين.
          </p>
          <p>
            إلى أقصى حد يسمح به القانون، لا تتحمل OmeGod أو مسؤولوها أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو تبعية ناتجة عن استخدام الخدمة أو سلوك أي طرف ثالث على المنصة.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p>
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR UNINTERRUPTED AVAILABILITY.
          </p>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, OMEGOD AND ITS DIRECTORS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE OR CONDUCT OF ANY THIRD PARTY.
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
              className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link 
              to="/terms" 
              className="px-4 py-2 rounded-xl bg-pink-500 text-white shadow-md shadow-pink-500/30 transition-all font-bold"
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
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'اتفاقية الاستخدام الرسمية والملزمة' : 'Official Agreement of Use'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-outfit tracking-tight">
            {isAr ? 'شروط وأحكام الخدمة' : 'Terms of Service'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'يرجى قراءة هذه الشروط بعناية قبل استخدام OmeGod. تضمن هذه القواعد بيئة محترمة وآمنة للجميع.'
              : 'Please read these terms carefully before using OmeGod. These regulations ensure a respectful and safe environment for all.'}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
            {isAr ? 'آخر تحديث:' : 'Last updated:'} {lastUpdated}
          </p>
        </div>

        {/* Key Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keyPoints.map((k, i) => (
            <div 
              key={i} 
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 flex items-start gap-4 transition-all hover:border-pink-500/40"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex-shrink-0">
                {k.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-outfit">
                  {k.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {k.desc}
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
              {isAr ? 'مستعد لبدء محادثتك الآن؟' : 'Ready to begin your session?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isAr ? 'التزم بالقواعد واستمتع بلقاء أشخاص رائعين من جميع أنحاء العالم.' : 'Abide by our community guidelines and enjoy meeting wonderful people worldwide.'}
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

export default TermsOfServicePage;
