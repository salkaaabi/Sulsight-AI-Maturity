/**
 * سجل الأصول البصرية (Assets Registry)
 * ─────────────────────────────────────────────────────────────
 * كل موضع صورة في المنصة معرّف هنا بمجلد واسم ملف ثابت.
 *
 * لاستبدال أي صورة مؤقتة بصورة رسمية:
 *   ضع الملف في المجلد المذكور بنفس الاسم الأساسي وبأي امتداد
 *   من: .jpg أو .png أو .webp
 *   مثال: public/assets/images/fujairah/hero-main.jpg
 *
 * لا حاجة لتعديل أي كود — يبحث النظام عن الامتدادات بالترتيب
 * ثم يعود إلى الصورة المؤقتة (.svg) إن لم يجد شيئاً.
 */

export type ImageSlot = {
  key: string;
  label: string;
  dir: string;
  base: string;
  /** الصورة المؤقتة المرفقة مع المشروع */
  placeholder: string;
  alt: string;
  /** نسبة العرض إلى الارتفاع المطلوبة للصورة المصدر (كما يجب أن تُولَّد) */
  ratio: string;
  /** أبعاد الموضع الفعلية في الصفحة على شاشة العرض (1920/1440) */
  slotBox: string;
  /** نسبة الموضع الفعلية = عرض ÷ ارتفاع الصندوق */
  slotRatio: number;
  /** object-position المضبوط لهذا الموضع تحديداً */
  objectPosition: string;
  /** قاعدة التكوين: أين يجب أن يقع العنصر البشري داخل الصورة */
  composition: string;
  /** نسبة القص المتوقعة بعد ضبط النسبة */
  recommended: string;
};

const EXT = ["jpg", "png", "webp"] as const;

/**
 * ترتيب المصادر: الصورة الرسمية بامتداداتها، ثم الصورة المؤقتة.
 * لا تُشارَك صورة واحدة بين موضعين مختلفَي النسبة — لكل موضع ملفه.
 */
export const sourcesFor = (slot: ImageSlot): string[] => [
  ...EXT.map((e) => `${slot.dir}/${slot.base}.${e}`),
  slot.placeholder,
];

export const IMAGE_SLOTS = {
  /* ── الواجهة الرئيسية ────────────────────────────────────────
     الصندوق المقاس: 1166×643 على 1920 و1440 (AR ≈ 1.81)
     النص والأزرار في الثلث الأيمن، لذا يُركَّز المشهد يساراً. */
  heroMain: {
    key: "heroMain",
    label: "واجهة الصفحة الرئيسية (Hero)",
    dir: "/assets/images/fujairah",
    base: "hero-main",
    placeholder: "/assets/images/fujairah/hero-main.svg",
    alt: "ساحل إمارة الفجيرة وجبال الحجر",
    ratio: "16:9",
    slotBox: "1166×643",
    slotRatio: 1.813,
    objectPosition: "32% 62%",
    composition:
      "الثلث الأيمن هادئ بصرياً (سماء وبحر مفتوح) لأن العنوان والأزرار فوقه. الجبال والحصن والنخيل في اليسار والوسط. بلا أشخاص في المقدمة.",
    recommended: "2400×1350 — قص رأسي 2% فقط",
  },

  /* ── بطاقة المرحلة الأولى: شريط أفقي طويل ────────────────────
     الصندوق المقاس: 520×226 (AR = 2.30 ≈ 16:7) */
  stageSchool: {
    key: "stageSchool",
    label: "بطاقة المرحلة الأولى — طلبة المدارس",
    dir: "/assets/images/students",
    base: "students-school",
    placeholder: "/assets/images/students/students-school.svg",
    alt: "طلبة وطالبات من مدارس الفجيرة في نشاط تعلّم مالي",
    ratio: "21:9",
    slotBox: "520×226",
    slotRatio: 2.297,
    objectPosition: "50% 42%",
    composition:
      "شريط أفقي طويل جداً. الطلبة في الشريط الأوسط أفقياً (بين 20% و80%) ورؤوسهم في الثلث العلوي من الإطار حتى لا تُقص. لا توزيع على كامل العرض.",
    recommended: "2100×900 — قص أفقي 2%",
  },

  /* ── بطاقة المرحلة الثانية: نفس الشريط ─────────────────────── */
  stageAdult: {
    key: "stageAdult",
    label: "بطاقة المرحلة الثانية — الجامعة وما بعدها",
    dir: "/assets/images/beneficiaries",
    base: "adults-city",
    placeholder: "/assets/images/beneficiaries/adults-city.svg",
    alt: "مستفيدون بالغون من فئات المرحلة الثانية في بيئة إماراتية معاصرة",
    ratio: "21:9",
    slotBox: "520×226",
    slotRatio: 2.297,
    objectPosition: "50% 42%",
    composition:
      "شريط أفقي طويل جداً. مجموعة صغيرة (شخصان إلى ثلاثة) في الوسط أفقياً، الرؤوس في الثلث العلوي. خلفية عمرانية إماراتية هادئة على الأطراف.",
    recommended: "2100×900 — قص أفقي 2%",
  },

  /* ── صفحات المسارات المدرسية ─────────────────────────────────
     الصندوق المقاس: 440×330 (AR = 1.335 = 4:3) */
  classroom: {
    key: "classroom",
    label: "صفحات المسارات المدرسية",
    dir: "/assets/images/students",
    base: "classroom",
    placeholder: "/assets/images/students/classroom.svg",
    alt: "بيئة تعلّم مدرسية حديثة",
    ratio: "4:3",
    slotBox: "440×330",
    slotRatio: 1.335,
    objectPosition: "50% 45%",
    composition:
      "إطار 4:3 بلا قص تقريباً. معلّمة وطالبان حول طاولة، الوجوه في النصف العلوي من الإطار.",
    recommended: "1600×1200 — بلا قص",
  },

  /* ── صفحات مسارات المرحلة الثانية ───────────────────────────
     الصندوق المقاس: 440×330 (AR = 1.335 = 4:3) */
  workshop: {
    key: "workshop",
    label: "صفحات مسارات المرحلة الثانية",
    dir: "/assets/images/beneficiaries",
    base: "training-workshop",
    placeholder: "/assets/images/beneficiaries/training-workshop.svg",
    alt: "ورشة تدريب مالية حضورية",
    ratio: "4:3",
    slotBox: "440×330",
    slotRatio: 1.335,
    objectPosition: "50% 45%",
    composition:
      "ورشة تفاعلية: مدرّب واقف بجانب شاشة ومجموعة صغيرة حول طاولة. الرؤوس في النصف العلوي.",
    recommended: "1600×1200 — بلا قص",
  },

  /* ── صفحة الاستشارة /advisor ─────────────────────────────────
     الصندوق المقاس: 499×374 (AR = 1.335 = 4:3) */
  advisorPage: {
    key: "advisorPage",
    label: "صفحة الاستشارة المالية",
    dir: "/assets/images/beneficiaries",
    base: "advisor-session",
    placeholder: "/assets/images/beneficiaries/advisor-session.svg",
    alt: "جلسة استشارة مع مستشار مالي",
    ratio: "4:3",
    slotBox: "499×374",
    slotRatio: 1.335,
    objectPosition: "50% 48%",
    composition:
      "جلسة هادئة: مستشار ومستفيد على طرفَي طاولة، الوجهان على محور الثلثين، الطاولة في الثلث السفلي.",
    recommended: "1600×1200 — بلا قص",
  },

  /* ── قسم الاستشارة في الصفحة الرئيسية ────────────────────────
     الصندوق يمتد مع ارتفاع عمود النص: 541×493 (AR = 1.10)
     وعلى التابلت يصبح شريطاً أفقياً 16:10. لذا الصورة مربعة
     والأشخاص في وسطها حتى ينجوا من القصّين معاً. */
  advisorHome: {
    key: "advisorHome",
    label: "قسم الاستشارة في الصفحة الرئيسية",
    dir: "/assets/images/beneficiaries",
    base: "advisor-home",
    placeholder: "/assets/images/beneficiaries/advisor-home.svg",
    alt: "جلسة استشارة مالية فردية",
    ratio: "1:1",
    slotBox: "541×493",
    slotRatio: 1.098,
    objectPosition: "50% 45%",
    composition:
      "إطار مربع. الشخصان داخل النصف الأوسط أفقياً (بين 22% و78%) بهوامش متساوية، لأن الموضع يُقص رأسياً 9% على الشاشة الكبيرة وأفقياً 37% على التابلت.",
    recommended: "1600×1600 — قص 9% رأسياً على الشاشة الكبيرة",
  },
} satisfies Record<string, ImageSlot>;

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;

/* ── الشعارات ─────────────────────────────────────────────── */

export type LogoSlot = {
  key: string;
  label: string;
  dir: string;
  base: string;
  alt: string;
  note: string;
};

const LOGO_EXT = ["svg", "png", "webp", "jpg"] as const;

export const logoSourcesFor = (slot: LogoSlot): string[] =>
  LOGO_EXT.map((e) => `${slot.dir}/${slot.base}.${e}`);

export const LOGO_SLOTS = {
  government: {
    key: "government",
    label: "شعار حكومة الفجيرة",
    dir: "/assets/logos",
    base: "fujairah-government-logo",
    alt: "شعار حكومة الفجيرة",
    note: "ضع الملف الرسمي هنا باسم fujairah-government-logo.svg (أو .png بخلفية شفافة).",
  },
  programme: {
    key: "programme",
    label: "شعار المنظومة",
    dir: "/assets/logos",
    base: "programme-logo",
    alt: "شعار منظومة الفجيرة للوعي والتمكين المالي",
    note: "ضع شعار البرنامج هنا باسم programme-logo.svg (أو .png بخلفية شفافة).",
  },
} satisfies Record<string, LogoSlot>;

export type LogoSlotKey = keyof typeof LOGO_SLOTS;
