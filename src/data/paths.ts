export type ModuleType = "video" | "scenario" | "quiz" | "challenge" | "workshop";

export type LearningModule = {
  id: string;
  title: string;
  type: ModuleType;
  minutes: number;
  summary: string;
};

export type PathTone = "emerald" | "sky" | "amber" | "rose" | "navy" | "violet" | "teal" | "gold";

export type LearningPath = {
  id: string;
  kind: "school" | "adult";
  level?: number;
  name: string;
  gradeRange?: string;
  audience: string;
  tagline: string;
  description: string;
  tone: PathTone;
  icon: string;
  behaviours: string[];
  modules: LearningModule[];
  badges: string[];
  stats: { learners: number; hours: number; completion: number };
};

export const MODULE_TYPE_LABEL: Record<ModuleType, string> = {
  video: "وحدة مرئية",
  scenario: "سيناريو تفاعلي",
  quiz: "اختبار قصير",
  challenge: "تحدٍّ تطبيقي",
  workshop: "تطبيق عملي",
};

export const PATH_TONES: Record<PathTone, { soft: string; text: string; solid: string; border: string; bar: string }> = {
  emerald: { soft: "bg-emerald-50", text: "text-emerald-700", solid: "bg-emerald-600", border: "border-emerald-100", bar: "bg-emerald-500" },
  sky: { soft: "bg-sky-50", text: "text-sky-700", solid: "bg-sky-600", border: "border-sky-100", bar: "bg-sky-500" },
  amber: { soft: "bg-amber-50", text: "text-amber-700", solid: "bg-amber-600", border: "border-amber-100", bar: "bg-amber-500" },
  rose: { soft: "bg-rose-50", text: "text-rose-700", solid: "bg-rose-600", border: "border-rose-100", bar: "bg-rose-500" },
  navy: { soft: "bg-navy-50", text: "text-navy-700", solid: "bg-navy-700", border: "border-navy-100", bar: "bg-navy-600" },
  violet: { soft: "bg-violet-50", text: "text-violet-700", solid: "bg-violet-600", border: "border-violet-100", bar: "bg-violet-500" },
  teal: { soft: "bg-teal-50", text: "text-teal-700", solid: "bg-teal-600", border: "border-teal-100", bar: "bg-teal-500" },
  gold: { soft: "bg-gold-50", text: "text-gold-600", solid: "bg-gold-500", border: "border-gold-100", bar: "bg-gold-400" },
};

export const SCHOOL_PATHS: LearningPath[] = [
  {
    id: "discover",
    kind: "school",
    level: 1,
    name: "أكتشف",
    gradeRange: "1–3",
    audience: "الحلقة الأولى",
    tagline: "أول لقاء واعٍ مع المال",
    description:
      "يبدأ الطالب في هذا المستوى بتكوين علاقة سليمة مع المال: من أين يأتي، وكيف نميّز بين ما نحتاجه وما نرغب فيه، وكيف نبدأ عادة الادخار بأبسط صورها.",
    tone: "emerald",
    icon: "Sprout",
    behaviours: [
      "التمييز بين الحاجة والرغبة",
      "فهم معنى المال ومن أين يأتي",
      "بدء عادة الادخار",
      "اتخاذ اختيار بسيط بين بديلين",
    ],
    modules: [
      { id: "d1", title: "من أين يأتي المال؟", type: "video", minutes: 5, summary: "قصة قصيرة تشرح العمل والدخل بلغة يفهمها طالب الحلقة الأولى." },
      { id: "d2", title: "أحتاج أم أرغب؟", type: "scenario", minutes: 8, summary: "بطاقات تفاعلية يصنّف فيها الطالب عشرة أشياء بين حاجة ورغبة." },
      { id: "d3", title: "حصّالتي الأولى", type: "challenge", minutes: 12, summary: "تحدٍّ منزلي: ادّخر مبلغاً صغيراً كل يوم لمدة أسبوعين وسجّله." },
      { id: "d4", title: "اختيار واحد فقط", type: "scenario", minutes: 5, summary: "محاكاة بسيطة: أمامك خياران ومبلغ واحد، فماذا تختار ولماذا؟" },
      { id: "d5", title: "ماذا تعلّمت عن المال؟", type: "quiz", minutes: 5, summary: "اختبار مصوّر من ثماني نقاط لقياس الفهم الأساسي." },
    ],
    badges: ["saving", "responsibility"],
    stats: { learners: 1840, hours: 9, completion: 82 },
  },
  {
    id: "learn",
    kind: "school",
    level: 2,
    name: "أتعلم",
    gradeRange: "4–6",
    audience: "الحلقة الثانية",
    tagline: "من العادة إلى القرار",
    description:
      "ينتقل الطالب من العادة البسيطة إلى إدارة مصروفه الشخصي، ووضع هدف ادخار واضح، ومقارنة الأسعار قبل الشراء، وحماية بياناته المالية الأساسية.",
    tone: "sky",
    icon: "BookOpen",
    behaviours: [
      "إدارة المصروف الأسبوعي",
      "تحديد هدف ادخار والالتزام به",
      "المقارنة بين الأسعار",
      "التخطيط لمشتريات بسيطة",
      "حماية البيانات المالية الأساسية",
    ],
    modules: [
      { id: "l1", title: "مصروفي الأسبوعي", type: "video", minutes: 8, summary: "كيف يقسّم الطالب مصروفه بين الإنفاق والادخار والمشاركة." },
      { id: "l2", title: "هدفي الأول للادخار", type: "workshop", minutes: 12, summary: "ورقة عمل رقمية لتحديد هدف ادخار بمبلغ ومدة واضحة." },
      { id: "l3", title: "أي العرضين أفضل؟", type: "scenario", minutes: 8, summary: "مقارنة بين عروض شراء مختلفة لاكتشاف السعر الحقيقي." },
      { id: "l4", title: "خطة مصروف 7 أيام", type: "challenge", minutes: 12, summary: "تحدٍّ أسبوعي لتخطيط المصروف مسبقاً ومتابعة الالتزام به." },
      { id: "l5", title: "لا تشارك رقمك السري", type: "video", minutes: 5, summary: "قواعد أساسية لحماية البيانات المالية في العالم الرقمي." },
      { id: "l6", title: "اختبار إدارة المصروف", type: "quiz", minutes: 8, summary: "اختبار قصير يقيس قدرة الطالب على اتخاذ قرار إنفاق سليم." },
    ],
    badges: ["saving", "smart-shopper", "planning"],
    stats: { learners: 2130, hours: 12, completion: 76 },
  },
  {
    id: "plan",
    kind: "school",
    level: 3,
    name: "أخطط",
    gradeRange: "7–9",
    audience: "الحلقة الثالثة",
    tagline: "الميزانية أداة لا قيداً",
    description:
      "يتعلم الطالب بناء ميزانية بسيطة، والتخطيط لهدف مالي، واتخاذ قرار شراء مدروس، وفهم مخاطر الاحتيال وأساسيات الادخار والاستثمار.",
    tone: "amber",
    icon: "BarChart3",
    behaviours: [
      "إعداد ميزانية بسيطة",
      "التخطيط لهدف مالي محدد",
      "اتخاذ قرار شراء مدروس",
      "فهم مخاطر الاحتيال",
      "فهم أساسيات الادخار والاستثمار",
    ],
    modules: [
      { id: "p1", title: "ميزانيتي في صفحة واحدة", type: "workshop", minutes: 12, summary: "بناء ميزانية شهرية مبسطة: دخل، التزامات، ادخار، مرونة." },
      { id: "p2", title: "هدف مالي بمعايير واضحة", type: "video", minutes: 8, summary: "كيف نحوّل الرغبة إلى هدف مالي قابل للقياس والتحقق." },
      { id: "p3", title: "قبل أن تضغط «شراء»", type: "scenario", minutes: 8, summary: "سيناريو شراء إلكتروني يكشف التكاليف الخفية والعروض المضللة." },
      { id: "p4", title: "محاكاة الاحتيال المالي", type: "scenario", minutes: 12, summary: "ست رسائل احتيالية، هل تستطيع كشفها جميعاً؟" },
      { id: "p5", title: "الفرق بين الادخار والاستثمار", type: "video", minutes: 8, summary: "مقدمة مبسطة للعائد والمخاطرة وعامل الوقت." },
      { id: "p6", title: "تحدي الميزانية الشهرية", type: "challenge", minutes: 12, summary: "أدر ميزانية افتراضية لشهر كامل وأغلقه بفائض." },
    ],
    badges: ["planning", "financial-safety", "financial-knowledge"],
    stats: { learners: 1975, hours: 15, completion: 71 },
  },
  {
    id: "prepare",
    kind: "school",
    level: 4,
    name: "أستعد",
    gradeRange: "10–12",
    audience: "المرحلة الثانوية",
    tagline: "جاهز لأول راتب",
    description:
      "يستعد الطالب لمرحلة الاستقلال المالي: إدارة ميزانية شخصية، وفهم الحسابات والبطاقات البنكية وتكلفة الاقتراض، وبناء صندوق طوارئ، والاستعداد لأول راتب.",
    tone: "rose",
    icon: "Rocket",
    behaviours: [
      "إدارة ميزانية شخصية",
      "فهم الحسابات والبطاقات البنكية",
      "فهم تكلفة الاقتراض",
      "بناء صندوق طوارئ",
      "فهم أساسيات الاستثمار والمخاطر",
      "الاستعداد لأول راتب",
    ],
    modules: [
      { id: "r1", title: "حسابك البنكي الأول", type: "video", minutes: 8, summary: "أنواع الحسابات والرسوم والخدمات التي يحتاجها الشاب فعلاً." },
      { id: "r2", title: "البطاقة تسهّل ولا تزيد الدخل", type: "scenario", minutes: 12, summary: "الفرق بين بطاقة الخصم والائتمان وأثر الحد الأدنى للسداد." },
      { id: "r3", title: "كم يكلّفك القرض حقاً؟", type: "workshop", minutes: 12, summary: "حاسبة تفاعلية تُظهر التكلفة الإجمالية للاقتراض عبر الزمن." },
      { id: "r4", title: "صندوق الطوارئ في 6 خطوات", type: "video", minutes: 8, summary: "لماذا نحتاج ثلاثة أشهر من المصروف، وكيف نبنيها تدريجياً." },
      { id: "r5", title: "أول راتب: خطة اليوم الأول", type: "challenge", minutes: 12, summary: "وزّع راتباً افتراضياً وفق قاعدة واضحة وبرّر كل بند." },
      { id: "r6", title: "الاستثمار والمخاطرة", type: "quiz", minutes: 8, summary: "اختبار يقيس فهم العلاقة بين العائد والمخاطرة والتنويع." },
    ],
    badges: ["planning", "aware-investor", "future-planner"],
    stats: { learners: 1608, hours: 18, completion: 64 },
  },
];

export const ADULT_PATHS: LearningPath[] = [
  {
    id: "university",
    kind: "adult",
    name: "الجامعة وبداية الحياة",
    audience: "طلبة الجامعات وحديثو التخرج",
    tagline: "قرارات صغيرة تصنع عشر سنوات",
    description:
      "مسار يرافق الشاب من مقعد الجامعة إلى أول وظيفة: إدارة المصروف، وفتح أول حساب بنكي، والتعامل الواعي مع البطاقات، وحماية النفس من الاحتيال، والاستعداد لأول راتب.",
    tone: "navy",
    icon: "GraduationCap",
    behaviours: [
      "إدارة المصروف الجامعي",
      "أول حساب بنكي",
      "الاستخدام الواعي للبطاقات",
      "كشف الاحتيال المالي",
      "الاستعداد لأول وظيفة",
      "التخطيط لأول راتب",
    ],
    modules: [
      { id: "u1", title: "ميزانية الطالب الجامعي", type: "workshop", minutes: 12, summary: "نموذج ميزانية يراعي السكن والمواصلات والمصروف الشخصي." },
      { id: "u2", title: "اختيار الحساب البنكي المناسب", type: "video", minutes: 8, summary: "مقارنة عملية بين الحسابات والرسوم والمزايا." },
      { id: "u3", title: "البطاقة الائتمانية: متى تفيد ومتى تؤذي", type: "scenario", minutes: 12, summary: "سيناريو يحاكي ثلاثة أشهر من الاستخدام والسداد." },
      { id: "u4", title: "احتيال الوظائف والعروض الوهمية", type: "scenario", minutes: 8, summary: "علامات الإنذار في عروض العمل والاستثمار السريع." },
      { id: "u5", title: "من العرض الوظيفي إلى صافي الراتب", type: "video", minutes: 8, summary: "كيف تقرأ العرض الوظيفي وتحسب دخلك الفعلي." },
      { id: "u6", title: "خطة أول راتب", type: "challenge", minutes: 12, summary: "تحدٍّ تطبيقي لتوزيع أول راتب بين الالتزام والادخار والاستثمار." },
    ],
    badges: ["financial-knowledge", "financial-safety", "planning"],
    stats: { learners: 1240, hours: 16, completion: 69 },
  },
  {
    id: "employees",
    kind: "adult",
    name: "الموظفون",
    audience: "الموظفون في القطاعين الحكومي والخاص",
    tagline: "من راتب يُستهلك إلى راتب يُدار",
    description:
      "مسار عملي لإدارة الراتب الشهري: بناء ميزانية واقعية، والتعامل مع الديون، وتكوين صندوق طوارئ، والانتقال من الادخار إلى الاستثمار المنظم.",
    tone: "sky",
    icon: "Briefcase",
    behaviours: [
      "إدارة الراتب الشهري",
      "بناء ميزانية واقعية",
      "معالجة الديون وترتيب أولوياتها",
      "تكوين صندوق طوارئ",
      "الادخار المنتظم",
      "بدء الاستثمار",
    ],
    modules: [
      { id: "e1", title: "أين يذهب راتبك؟", type: "workshop", minutes: 12, summary: "تحليل الإنفاق الفعلي لثلاثة أشهر واكتشاف التسريبات." },
      { id: "e2", title: "ميزانية تعمل فعلاً", type: "video", minutes: 8, summary: "قواعد توزيع الراتب وكيفية تكييفها مع الدخل المتغير." },
      { id: "e3", title: "ترتيب الديون: الأعلى كلفة أولاً", type: "scenario", minutes: 12, summary: "مقارنة بين أسلوبي كرة الثلج والانهيار في سداد الديون." },
      { id: "e4", title: "صندوق الطوارئ خلال سنة", type: "challenge", minutes: 12, summary: "خطة شهرية لبناء ثلاثة أشهر من المصروف الاحتياطي." },
      { id: "e5", title: "الاستقطاع التلقائي للادخار", type: "video", minutes: 5, summary: "لماذا ينجح الادخار الآلي حيث تفشل النوايا." },
      { id: "e6", title: "أول محفظة استثمارية", type: "workshop", minutes: 12, summary: "بناء محفظة تجريبية متنوعة وفق أفق زمني ومستوى مخاطرة." },
    ],
    badges: ["planning", "saving", "aware-investor"],
    stats: { learners: 2860, hours: 17, completion: 58 },
  },
  {
    id: "invest",
    kind: "adult",
    name: "الادخار والاستثمار",
    audience: "الراغبون في تنمية مدخراتهم",
    tagline: "الوقت أهم من المبلغ",
    description:
      "مسار متخصص ينتقل بالمستفيد من الادخار العشوائي إلى استثمار منظم: تحديد الأهداف، وفهم المخاطر، والتنويع، وكشف الاحتيال الاستثماري.",
    tone: "emerald",
    icon: "TrendingUp",
    behaviours: [
      "تحديد أهداف مالية بأفق زمني",
      "الادخار المنتظم قبل الاستثمار",
      "فهم المخاطر وتحمّلها",
      "التنويع بين الأصول",
      "مبادئ الاستثمار طويل المدى",
      "كشف الاحتيال الاستثماري",
    ],
    modules: [
      { id: "i1", title: "هدف، مبلغ، مدة", type: "workshop", minutes: 8, summary: "تحويل الأهداف العامة إلى أرقام وجداول زمنية." },
      { id: "i2", title: "العائد والمخاطرة", type: "video", minutes: 8, summary: "لماذا لا يوجد عائد مرتفع بلا مخاطرة مقابلة." },
      { id: "i3", title: "قوة التراكم عبر الزمن", type: "scenario", minutes: 12, summary: "محاكاة تُظهر أثر البدء المبكر على النتيجة النهائية." },
      { id: "i4", title: "التنويع في الممارسة", type: "workshop", minutes: 12, summary: "توزيع محفظة افتراضية على فئات أصول مختلفة." },
      { id: "i5", title: "علامات الاحتيال الاستثماري", type: "scenario", minutes: 8, summary: "ستة وعود تكشف المخطط الاحتيالي قبل خسارة المال." },
      { id: "i6", title: "مراجعة المحفظة كل ربع", type: "challenge", minutes: 12, summary: "تحدٍّ فصلي لمراجعة الأداء وإعادة التوازن." },
    ],
    badges: ["aware-investor", "financial-safety", "future-planner"],
    stats: { learners: 1655, hours: 15, completion: 62 },
  },
  {
    id: "marriage",
    kind: "adult",
    name: "المقبلون على الزواج",
    audience: "المقبلون على الزواج والأسر الجديدة",
    tagline: "الحوار المالي قبل العقد",
    description:
      "مسار يهيّئ الزوجين لبناء أساس مالي مشترك: الحوار المالي الصريح، وتقدير تكلفة الزواج، وبناء ميزانية مشتركة، وقرارات السكن والديون والتخطيط الأسري.",
    tone: "rose",
    icon: "HeartHandshake",
    behaviours: [
      "الحوار المالي بين الزوجين",
      "تقدير تكلفة الزواج بواقعية",
      "بناء ميزانية مشتركة",
      "إدارة الديون قبل الزواج وبعده",
      "قرار السكن الأول",
      "التخطيط المالي الأسري",
    ],
    modules: [
      { id: "m1", title: "عشرة أسئلة مالية قبل الزواج", type: "workshop", minutes: 12, summary: "دليل حوار منظم يغطي الدخل والالتزامات والتوقعات." },
      { id: "m2", title: "تكلفة الزواج الحقيقية", type: "workshop", minutes: 12, summary: "حاسبة بنود تُظهر التكلفة الكاملة قبل الالتزام." },
      { id: "m3", title: "حساب مشترك أم حسابان؟", type: "scenario", minutes: 8, summary: "ثلاثة نماذج لإدارة المال المشترك ومزايا كل نموذج." },
      { id: "m4", title: "الدين الذي يرافقك", type: "video", minutes: 8, summary: "أثر القرض الشخصي على السنوات الخمس الأولى من الزواج." },
      { id: "m5", title: "الإيجار أم التملك؟", type: "scenario", minutes: 12, summary: "مقارنة مالية بين خياري السكن في مرحلة البداية." },
      { id: "m6", title: "ميزانية أول سنة", type: "challenge", minutes: 12, summary: "تحدٍّ لبناء ميزانية اثني عشر شهراً مع صندوق طوارئ." },
    ],
    badges: ["planning", "saving", "future-planner"],
    stats: { learners: 980, hours: 14, completion: 66 },
  },
  {
    id: "home",
    kind: "adult",
    name: "بيت العمر",
    audience: "المقبلون على بناء أو تملّك المسكن",
    tagline: "قرار واحد يمتد عشرين عاماً",
    description:
      "مسار يعالج أكبر قرار مالي في حياة الأسرة: تقييم القدرة المالية، وفهم التمويل، وتقدير تكلفة البناء، والتعاقد مع المقاول، وإدارة الاحتياط المالي وأثر المنزل على التدفق النقدي.",
    tone: "amber",
    icon: "Home",
    behaviours: [
      "تقييم القدرة المالية الفعلية",
      "فهم شروط التمويل العقاري",
      "تقدير تكلفة البناء بواقعية",
      "التعاقد مع المقاول وإدارة الدفعات",
      "بناء احتياط مالي للتجاوزات",
      "قياس أثر المنزل على التدفق النقدي طويل المدى",
    ],
    modules: [
      { id: "h1", title: "هل أنا مستعد مالياً؟", type: "workshop", minutes: 12, summary: "مؤشرات الجاهزية: نسبة الالتزام، الاحتياط، استقرار الدخل." },
      { id: "h2", title: "قراءة عرض التمويل", type: "video", minutes: 12, summary: "الهامش، المدة، الرسوم، والسداد المبكر — ماذا تعني فعلاً." },
      { id: "h3", title: "تكلفة البناء بند بند", type: "workshop", minutes: 12, summary: "جدول تقديري يكشف البنود التي تُنسى عادة." },
      { id: "h4", title: "اختيار المقاول وجدول الدفعات", type: "scenario", minutes: 12, summary: "ربط الدفعات بالإنجاز وحماية النفس من التعثر." },
      { id: "h5", title: "احتياط 15% ليس رفاهية", type: "video", minutes: 8, summary: "لماذا تتجاوز مشاريع البناء ميزانيتها، وكيف نستعد لذلك." },
      { id: "h6", title: "تدفقك النقدي بعد التملك", type: "challenge", minutes: 12, summary: "محاكاة عشر سنوات لأثر القسط على ميزانية الأسرة." },
    ],
    badges: ["planning", "future-planner", "financial-knowledge"],
    stats: { learners: 720, hours: 16, completion: 54 },
  },
  {
    id: "retirement",
    kind: "adult",
    name: "التقاعد",
    audience: "الفئة العمرية 45 سنة فأعلى",
    tagline: "دخل مستقر بعد الوظيفة",
    description:
      "مسار يعدّ المستفيد لمرحلة ما بعد الوظيفة: تقدير الدخل المتوقع، وتصفية الالتزامات، وتعزيز الادخار والاستثمار، ومواءمة نمط الحياة مع الدخل الجديد.",
    tone: "violet",
    icon: "Sunset",
    behaviours: [
      "تقدير الدخل التقاعدي المتوقع",
      "تصفية الالتزامات قبل التقاعد",
      "تعزيز الادخار في السنوات الأخيرة",
      "استثمار منخفض المخاطر",
      "مواءمة نمط الحياة مع الدخل",
      "التخطيط المالي لما بعد التقاعد",
    ],
    modules: [
      { id: "t1", title: "كم سيكون دخلك؟", type: "workshop", minutes: 12, summary: "حساب تقديري للمعاش والدخل الإضافي المتوقع." },
      { id: "t2", title: "إغلاق الالتزامات قبل الموعد", type: "video", minutes: 8, summary: "ترتيب الديون لتنتهي قبل تاريخ التقاعد." },
      { id: "t3", title: "السنوات الخمس الحاسمة", type: "scenario", minutes: 12, summary: "أثر رفع نسبة الادخار في آخر خمس سنوات عمل." },
      { id: "t4", title: "محفظة ما بعد التقاعد", type: "workshop", minutes: 12, summary: "الانتقال من النمو إلى الحفاظ على رأس المال والدخل." },
      { id: "t5", title: "نمط حياة يتناسب مع الدخل", type: "video", minutes: 8, summary: "إعادة تصميم المصروف الشهري بعد انتهاء الراتب." },
      { id: "t6", title: "خطة العشرين سنة القادمة", type: "challenge", minutes: 12, summary: "بناء خطة دخل ومصروف طويلة المدى ومراجعتها سنوياً." },
    ],
    badges: ["future-planner", "aware-investor", "saving"],
    stats: { learners: 640, hours: 15, completion: 61 },
  },
];

export const ALL_PATHS: LearningPath[] = [...SCHOOL_PATHS, ...ADULT_PATHS];

export const pathById = (id: string): LearningPath | undefined =>
  ALL_PATHS.find((p) => p.id === id);
