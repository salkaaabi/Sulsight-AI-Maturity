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
  /** نسبة العرض إلى الارتفاع المطلوبة للصورة المصدر */
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
 * لا تُشارَك صورة واحدة بين موضعين مختلفَي النسبة.
 */
export const sourcesFor = (slot: ImageSlot): string[] => [
  ...EXT.map((e) => `${slot.dir}/${slot.base}.${e}`),
  slot.placeholder,
];

export const IMAGE_SLOTS = {
  /* ── واجهة الصفحة الرئيسية ──────────────────────────────────
     الصندوق المقاس: 1166×643 (AR ≈ 1.81). الصورة الرسمية الحالية
     بانورامية 1916×821 (21:9)، فيبقى قص أفقي للمشهد فقط بلا أشخاص. */
  heroMain: {
    key: "heroMain",
    label: "واجهة الصفحة الرئيسية (Hero)",
    dir: "/assets/images/fujairah",
    base: "hero-main",
    placeholder: "/assets/images/fujairah/hero-main.svg",
    alt: "ساحل إمارة الفجيرة وجبال الحجر",
    ratio: "21:9",
    slotBox: "1166×643",
    slotRatio: 1.813,
    objectPosition: "46% 50%",
    composition:
      "الثلث الأيمن هادئ بصرياً (سماء وبحر مفتوح) لأن العنوان والأزرار فوقه. الحصن والجبال في اليسار والوسط. بلا أشخاص في المقدمة.",
    recommended: "2560×1440 (16:9) لإلغاء القص — أو 21:9 بقص أفقي للمشهد",
  },

  /* ── بطاقة المرحلة الأولى ───────────────────────────────────
     الصندوق 16:9 ليطابق الصور الفوتوغرافية الحالية تماماً. */
  stageSchool: {
    key: "stageSchool",
    label: "بطاقة المرحلة الأولى — طلبة المدارس",
    dir: "/assets/images/students",
    base: "students-school",
    placeholder: "/assets/images/students/students-school.svg",
    alt: "طلبة وطالبات من مدارس الفجيرة في نشاط تعلّم مالي",
    ratio: "16:9",
    slotBox: "520×293",
    slotRatio: 1.778,
    objectPosition: "50% 42%",
    composition:
      "المجموعة في الشريط الأوسط أفقياً (20%–80%) والوجوه في النصف العلوي من الإطار.",
    recommended: "1920×1080 — بلا قص",
  },

  /* ── بطاقة المرحلة الثانية ─────────────────────────────────── */
  stageAdult: {
    key: "stageAdult",
    label: "بطاقة المرحلة الثانية — الجامعة وما بعدها",
    dir: "/assets/images/beneficiaries",
    base: "adults-city",
    placeholder: "/assets/images/beneficiaries/adults-city.svg",
    alt: "مستفيدون بالغون من فئات المرحلة الثانية في بيئة إماراتية معاصرة",
    ratio: "16:9",
    slotBox: "520×293",
    slotRatio: 1.778,
    objectPosition: "50% 40%",
    composition:
      "مجموعة صغيرة في الوسط أفقياً، الوجوه في النصف العلوي، خلفية عمرانية هادئة على الأطراف.",
    recommended: "1920×1080 — بلا قص",
  },

  /* ── صفحات المسارات المدرسية ──────────────────────────────── */
  classroom: {
    key: "classroom",
    label: "صفحات المسارات المدرسية",
    dir: "/assets/images/students",
    base: "classroom",
    placeholder: "/assets/images/students/classroom.svg",
    alt: "بيئة تعلّم مدرسية حديثة",
    ratio: "16:9",
    slotBox: "440×248",
    slotRatio: 1.778,
    objectPosition: "50% 42%",
    composition: "الوجوه في النصف العلوي من الإطار، الطاولة في الثلث السفلي.",
    recommended: "1920×1080 — بلا قص",
  },

  /* ── صفحات مسارات المرحلة الثانية ─────────────────────────── */
  workshop: {
    key: "workshop",
    label: "صفحات مسارات المرحلة الثانية",
    dir: "/assets/images/beneficiaries",
    base: "training-workshop",
    placeholder: "/assets/images/beneficiaries/training-workshop.svg",
    alt: "ورشة تدريب مالية حضورية",
    ratio: "16:9",
    slotBox: "440×248",
    slotRatio: 1.778,
    objectPosition: "50% 45%",
    composition:
      "مدرّب بجانب شاشة ومجموعة صغيرة حول طاولة. الوجوه في النصف العلوي.",
    recommended: "1920×1080 — بلا قص (الصورة الرسمية لم تُرفع بعد)",
  },

  /* ── الاستشارة المالية: الرئيسية و/advisor بنفس النسبة ───────
     الموضعان 16:9 معاً، فاستخدام الصورة نفسها لا يسبب أي اختلاف قص. */
  advisor: {
    key: "advisor",
    label: "الاستشارة المالية (الرئيسية وصفحة /advisor)",
    dir: "/assets/images/beneficiaries",
    base: "advisor-session",
    placeholder: "/assets/images/beneficiaries/advisor-session.svg",
    alt: "جلسة استشارة مع مستشار مالي",
    ratio: "16:9",
    slotBox: "541×304 · 499×281",
    slotRatio: 1.778,
    objectPosition: "50% 45%",
    composition:
      "مستشار ومستفيد على طرفَي طاولة، الوجوه على محور الثلثين، الطاولة في الثلث السفلي.",
    recommended: "1920×1080 — بلا قص",
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
