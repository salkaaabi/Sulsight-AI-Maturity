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
  /** نسبة العرض إلى الارتفاع الموصى بها عند رفع الصورة الرسمية */
  recommended: string;
};

const EXT = ["jpg", "png", "webp"] as const;

/** ترتيب المصادر: الصور الرسمية أولاً ثم الصورة المؤقتة */
export const sourcesFor = (slot: ImageSlot): string[] => [
  ...EXT.map((e) => `${slot.dir}/${slot.base}.${e}`),
  slot.placeholder,
];

export const IMAGE_SLOTS = {
  heroMain: {
    key: "heroMain",
    label: "صورة الواجهة الرئيسية",
    dir: "/assets/images/fujairah",
    base: "hero-main",
    placeholder: "/assets/images/fujairah/hero-main.svg",
    alt: "ساحل إمارة الفجيرة وجبال الحجر",
    recommended: "2400×1350 بكسل — أفقية عريضة",
  },
  stageSchool: {
    key: "stageSchool",
    label: "صورة طلبة المدارس",
    dir: "/assets/images/students",
    base: "students-school",
    placeholder: "/assets/images/students/students-school.svg",
    alt: "طلبة من مدارس الفجيرة",
    recommended: "1600×700 بكسل — أفقية",
  },
  stageAdult: {
    key: "stageAdult",
    label: "صورة المستفيدين من الفئات المختلفة",
    dir: "/assets/images/beneficiaries",
    base: "adults-city",
    placeholder: "/assets/images/beneficiaries/adults-city.svg",
    alt: "مستفيدون من فئات المرحلة الثانية في الفجيرة",
    recommended: "1600×700 بكسل — أفقية",
  },
  classroom: {
    key: "classroom",
    label: "صورة بيئة التعلّم المدرسية",
    dir: "/assets/images/students",
    base: "classroom",
    placeholder: "/assets/images/students/students-school.svg",
    alt: "بيئة تعلّم مدرسية",
    recommended: "1200×900 بكسل",
  },
  workshop: {
    key: "workshop",
    label: "صورة ورشة تدريب حضورية",
    dir: "/assets/images/beneficiaries",
    base: "training-workshop",
    placeholder: "/assets/images/beneficiaries/training-workshop.svg",
    alt: "ورشة تدريب مالية حضورية",
    recommended: "1200×900 بكسل",
  },
  advisor: {
    key: "advisor",
    label: "صورة جلسة استشارة مالية",
    dir: "/assets/images/beneficiaries",
    base: "advisor-session",
    placeholder: "/assets/images/beneficiaries/training-workshop.svg",
    alt: "جلسة استشارة مع مستشار مالي",
    recommended: "1200×900 بكسل",
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
