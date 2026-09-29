export type AssessmentAudience = "student" | "adult";

export type AssessmentOption = { label: string; value: number };

export type AssessmentQuestion = {
  id: string;
  topic: string;
  dimension: "المعرفة" | "السلوك" | "الثقة" | "العادات" | "التطبيق";
  text: string;
  options: AssessmentOption[];
};

export const AUDIENCE_META: Record<AssessmentAudience, { title: string; note: string; icon: string }> = {
  student: {
    title: "طالب مدرسة",
    note: "الصف 1 حتى الصف 12",
    icon: "Backpack",
  },
  adult: {
    title: "الجامعة وما بعدها",
    note: "الجامعة، الموظفون، الأسرة، التقاعد",
    icon: "Briefcase",
  },
};

export const STUDENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "s1",
    topic: "الحاجة والرغبة",
    dimension: "المعرفة",
    text: "معك مبلغ محدود، وأمامك دفتر مدرسي تحتاجه ولعبة ترغب بها. ماذا تفعل؟",
    options: [
      { label: "أشتري اللعبة أولاً لأنها أمتع", value: 0 },
      { label: "أشتري اللعبة وأطلب الدفتر من أهلي", value: 1 },
      { label: "أشتري الدفتر وأؤجل اللعبة", value: 3 },
      { label: "أشتري الدفتر وأبدأ ادخار جزء لشراء اللعبة لاحقاً", value: 4 },
    ],
  },
  {
    id: "s2",
    topic: "الادخار",
    dimension: "العادات",
    text: "كيف تتعامل مع مصروفك الأسبوعي؟",
    options: [
      { label: "أصرفه بالكامل غالباً", value: 0 },
      { label: "أوفّر ما يتبقى منه أحياناً", value: 2 },
      { label: "أخصص مبلغاً ثابتاً للادخار قبل الإنفاق", value: 4 },
      { label: "أدّخر عندما يكون لدي هدف محدد فقط", value: 3 },
    ],
  },
  {
    id: "s3",
    topic: "المصروف",
    dimension: "السلوك",
    text: "هل تعرف كم أنفقت خلال الأسبوع الماضي؟",
    options: [
      { label: "لا أعرف ولا أتابع", value: 0 },
      { label: "أعرف تقريباً دون تسجيل", value: 2 },
      { label: "أسجّل معظم مصروفي", value: 3 },
      { label: "أسجّل كل مصروفي وأراجعه أسبوعياً", value: 4 },
    ],
  },
  {
    id: "s4",
    topic: "التخطيط",
    dimension: "التطبيق",
    text: "لديك هدف شراء شيء ثمنه أكبر من مصروفك الشهري. كيف تتصرف؟",
    options: [
      { label: "أنتظر مناسبة ليشتريه لي أحد", value: 0 },
      { label: "أوفّر متى ما تيسّر دون خطة", value: 2 },
      { label: "أحسب المبلغ وأقسّمه على أسابيع محددة", value: 4 },
      { label: "أطلب المبلغ سلفاً وأسدده لاحقاً", value: 1 },
    ],
  },
  {
    id: "s5",
    topic: "الشراء الذكي",
    dimension: "السلوك",
    text: "قبل شراء شيء من متجر إلكتروني، ماذا تفعل عادة؟",
    options: [
      { label: "أشتري مباشرة إذا أعجبني", value: 0 },
      { label: "أسأل صديقاً عن رأيه", value: 2 },
      { label: "أقارن السعر في متجرين على الأقل", value: 3 },
      { label: "أقارن السعر والتقييمات وتكلفة الشحن معاً", value: 4 },
    ],
  },
  {
    id: "s6",
    topic: "الاحتيال",
    dimension: "المعرفة",
    text: "وصلتك رسالة تقول إنك ربحت جائزة وتطلب رقم بطاقة ولي أمرك. ماذا تفعل؟",
    options: [
      { label: "أرسل البيانات لأحصل على الجائزة", value: 0 },
      { label: "أسأل الرسالة عن تفاصيل أكثر", value: 1 },
      { label: "أتجاهل الرسالة", value: 3 },
      { label: "أتجاهلها وأبلّغ ولي أمري والمدرسة", value: 4 },
    ],
  },
  {
    id: "s7",
    topic: "الاستخدام المسؤول للمال",
    dimension: "الثقة",
    text: "إذا نفد مصروفك قبل نهاية الأسبوع، فما تفسيرك الأقرب؟",
    options: [
      { label: "المصروف قليل دائماً", value: 0 },
      { label: "صرفت على أشياء لم أكن أحتاجها", value: 3 },
      { label: "لا أعرف السبب", value: 1 },
      { label: "لم أخطط للمصروف من البداية، وسأخطط المرة القادمة", value: 4 },
    ],
  },
  {
    id: "s8",
    topic: "الادخار",
    dimension: "الثقة",
    text: "ما مدى ثقتك في قدرتك على إدارة مبلغ أكبر مما تتعامل معه اليوم؟",
    options: [
      { label: "غير واثق إطلاقاً", value: 0 },
      { label: "واثق قليلاً", value: 2 },
      { label: "واثق إلى حد جيد", value: 3 },
      { label: "واثق تماماً ولدي طريقة واضحة", value: 4 },
    ],
  },
];

export const ADULT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "a1",
    topic: "إدارة الراتب",
    dimension: "السلوك",
    text: "في اليوم الأول لاستلام الدخل، ما أول إجراء تقوم به؟",
    options: [
      { label: "أصرف حسب الحاجة دون ترتيب", value: 0 },
      { label: "أسدد الالتزامات ثم أصرف الباقي", value: 2 },
      { label: "أسدد الالتزامات وأحوّل مبلغ الادخار فوراً", value: 4 },
      { label: "أنتظر نهاية الشهر لأرى ما تبقّى", value: 1 },
    ],
  },
  {
    id: "a2",
    topic: "الميزانية",
    dimension: "التطبيق",
    text: "هل لديك ميزانية شهرية مكتوبة؟",
    options: [
      { label: "لا توجد ميزانية", value: 0 },
      { label: "ميزانية ذهنية غير مكتوبة", value: 2 },
      { label: "ميزانية مكتوبة أراجعها أحياناً", value: 3 },
      { label: "ميزانية مكتوبة أراجعها شهرياً وأعدّلها", value: 4 },
    ],
  },
  {
    id: "a3",
    topic: "الديون",
    dimension: "المعرفة",
    text: "ما نسبة أقساط الديون من دخلك الشهري؟",
    options: [
      { label: "لا أعرف النسبة", value: 0 },
      { label: "أكثر من 50%", value: 1 },
      { label: "بين 30% و50%", value: 2 },
      { label: "أقل من 30% أو لا توجد ديون", value: 4 },
    ],
  },
  {
    id: "a4",
    topic: "الادخار",
    dimension: "العادات",
    text: "كم شهراً من مصروفك يغطيه احتياطك النقدي الحالي؟",
    options: [
      { label: "لا يوجد احتياط", value: 0 },
      { label: "أقل من شهر", value: 1 },
      { label: "من شهر إلى ثلاثة أشهر", value: 3 },
      { label: "ثلاثة أشهر فأكثر", value: 4 },
    ],
  },
  {
    id: "a5",
    topic: "الاستثمار",
    dimension: "المعرفة",
    text: "كيف تصف علاقتك بالاستثمار؟",
    options: [
      { label: "لم أبدأ ولا أعرف من أين أبدأ", value: 0 },
      { label: "أقرأ عنه دون خطوة عملية", value: 1 },
      { label: "بدأت بمبلغ صغير في أداة واحدة", value: 3 },
      { label: "لدي محفظة متنوعة أراجعها دورياً", value: 4 },
    ],
  },
  {
    id: "a6",
    topic: "التأمين",
    dimension: "التطبيق",
    text: "ما مدى تغطيتك التأمينية الحالية (صحية أو على الحياة أو على الممتلكات)؟",
    options: [
      { label: "لا توجد تغطية", value: 0 },
      { label: "التغطية الإلزامية فقط", value: 2 },
      { label: "تغطية أساسية راجعتها مرة واحدة", value: 3 },
      { label: "تغطية مدروسة أراجعها سنوياً", value: 4 },
    ],
  },
  {
    id: "a7",
    topic: "التخطيط طويل المدى",
    dimension: "الثقة",
    text: "هل لديك هدف مالي محدد لخمس سنوات قادمة؟",
    options: [
      { label: "لا يوجد هدف واضح", value: 0 },
      { label: "فكرة عامة بلا أرقام", value: 1 },
      { label: "هدف بمبلغ ومدة", value: 3 },
      { label: "هدف بمبلغ ومدة وخطة شهرية للوصول إليه", value: 4 },
    ],
  },
  {
    id: "a8",
    topic: "الأمان المالي",
    dimension: "الثقة",
    text: "عرض استثماري يَعِد بعائد شهري ثابت مرتفع دون مخاطر. رد فعلك؟",
    options: [
      { label: "أدخل بمبلغ صغير للتجربة", value: 0 },
      { label: "أستشير صديقاً دخل فيه من قبل", value: 1 },
      { label: "أرفضه لأن العائد المرتفع بلا مخاطرة غير واقعي", value: 3 },
      { label: "أرفضه وأتحقق من ترخيص الجهة وأبلّغ عنها", value: 4 },
    ],
  },
];

export const QUESTIONS: Record<AssessmentAudience, AssessmentQuestion[]> = {
  student: STUDENT_QUESTIONS,
  adult: ADULT_QUESTIONS,
};

export type AssessmentLevel = {
  key: string;
  name: string;
  range: string;
  summary: string;
  tone: string;
};

export const LEVELS: AssessmentLevel[] = [
  {
    key: "foundational",
    name: "مستوى تأسيسي",
    range: "0–44",
    summary: "الأساسيات لم تكتمل بعد. الأولوية لبناء عادة التسجيل والادخار قبل أي محتوى متقدم.",
    tone: "rose",
  },
  {
    key: "growing",
    name: "مستوى نامٍ",
    range: "45–64",
    summary: "المعرفة موجودة والسلوك غير منتظم. الأولوية لتحويل المعرفة إلى عادة أسبوعية ثابتة.",
    tone: "amber",
  },
  {
    key: "aware",
    name: "مستوى واعٍ",
    range: "65–79",
    summary: "سلوك مالي جيد ومنتظم. الأولوية للتخطيط بعيد المدى وبناء الاحتياط المالي.",
    tone: "sky",
  },
  {
    key: "advanced",
    name: "مستوى متقدم",
    range: "80–100",
    summary: "إدارة مالية ناضجة. الأولوية للاستثمار المنظم والتخطيط للمراحل القادمة.",
    tone: "emerald",
  },
];

export const levelForScore = (score: number): AssessmentLevel => {
  if (score < 45) return LEVELS[0];
  if (score < 65) return LEVELS[1];
  if (score < 80) return LEVELS[2];
  return LEVELS[3];
};

export const suggestedPath = (
  audience: AssessmentAudience,
  score: number
): { pathId: string; reason: string } => {
  if (audience === "student") {
    if (score < 45) return { pathId: "discover", reason: "نبدأ من الأساس: معنى المال، والحاجة والرغبة، وأول عادة ادخار." };
    if (score < 65) return { pathId: "learn", reason: "الأساس موجود، والخطوة التالية هي إدارة المصروف وتحديد هدف ادخار واضح." };
    if (score < 80) return { pathId: "plan", reason: "جاهز لبناء ميزانية بسيطة واتخاذ قرارات شراء مدروسة." };
    return { pathId: "prepare", reason: "المستوى متقدم، والانتقال الطبيعي هو الاستعداد للاستقلال المالي وأول راتب." };
  }
  if (score < 45) return { pathId: "employees", reason: "الأولوية لضبط الراتب والميزانية قبل أي قرار مالي كبير." };
  if (score < 65) return { pathId: "employees", reason: "الأساس يحتاج تثبيتاً: ترتيب الديون وبناء صندوق الطوارئ." };
  if (score < 80) return { pathId: "invest", reason: "الوضع مستقر، والخطوة التالية هي تحويل الادخار إلى استثمار منظم." };
  return { pathId: "retirement", reason: "المستوى متقدم، والقيمة الأكبر في التخطيط بعيد المدى وحماية رأس المال." };
};

export const FIRST_STEPS: Record<string, string[]> = {
  foundational: [
    "سجّل كل مصروف لمدة 14 يوماً دون تغيير سلوكك",
    "حدد مبلغ ادخار ثابتاً مهما كان صغيراً وحوّله فور استلام الدخل",
    "أكمل أول وحدتين في المسار المقترح خلال أسبوع",
  ],
  growing: [
    "اكتب ميزانية شهرية واحدة وراجعها بعد 30 يوماً",
    "فعّل استقطاعاً تلقائياً للادخار بنسبة 10% على الأقل",
    "أنهِ تحدي الميزانية للحصول على شارة التخطيط",
  ],
  aware: [
    "ابنِ احتياطاً نقدياً يغطي ثلاثة أشهر من المصروف",
    "حدد هدفاً مالياً لخمس سنوات بمبلغ ومدة واضحين",
    "أكمل وحدة المخاطر والتنويع قبل أي قرار استثماري",
  ],
  advanced: [
    "راجع توزيع محفظتك وأعد التوازن كل ربع سنة",
    "ضع خطة مكتوبة للمرحلة القادمة (سكن، أسرة، أو تقاعد)",
    "شارك في برنامج تدريبي مباشر لتحويل الخطة إلى تنفيذ",
  ],
};
