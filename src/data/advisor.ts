export type ConsultationType = {
  id: string;
  name: string;
  minutes: number;
  summary: string;
  icon: string;
  audience: string;
};

export type AdvisorCity = {
  id: string;
  name: string;
  venue: string;
  note: string;
};

export type Advisor = {
  id: string;
  name: string;
  title: string;
  initials: string;
  cities: string[];
  specialties: string[];
  languages: string;
  sessions: number;
};

export const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: "budget",
    name: "الميزانية والادخار",
    minutes: 45,
    summary: "مراجعة الدخل والمصروف وبناء ميزانية شهرية واقعية مع نسبة ادخار ثابتة.",
    icon: "Target",
    audience: "الموظفون والأسر",
  },
  {
    id: "debt",
    name: "إدارة الديون",
    minutes: 45,
    summary: "ترتيب الالتزامات حسب الكلفة ووضع جدول سداد قابل للتنفيذ.",
    icon: "ShieldCheck",
    audience: "الموظفون والمقبلون على الزواج",
  },
  {
    id: "invest",
    name: "الادخار والاستثمار",
    minutes: 60,
    summary: "تحديد الأهداف والأفق الزمني ومستوى المخاطرة قبل أي قرار استثماري.",
    icon: "TrendingUp",
    audience: "من لديهم فائض ادخاري",
  },
  {
    id: "home-retirement",
    name: "بيت العمر والتقاعد",
    minutes: 60,
    summary: "تقييم القدرة المالية لقرار السكن، وبناء خطة دخل لما بعد الوظيفة.",
    icon: "Home",
    audience: "المقبلون على البناء والتقاعد",
  },
  {
    id: "student",
    name: "إرشاد مالي للطلبة وأولياء الأمور",
    minutes: 30,
    summary: "جلسة مشتركة لبناء عادة ادخار لدى الطالب ومتابعتها أسرياً.",
    icon: "GraduationCap",
    audience: "طلبة المدارس وأولياء الأمور",
  },
];

export const ADVISOR_CITIES: AdvisorCity[] = [
  { id: "fujairah", name: "الفجيرة", venue: "مركز التمكين المالي — مدينة الفجيرة", note: "حضورياً" },
  { id: "dubai", name: "دبي", venue: "منصة الابتكار المالي — دبي", note: "حضورياً" },
  { id: "abudhabi", name: "أبوظبي", venue: "أكاديمية التمكين المالي — أبوظبي", note: "حضورياً" },
  { id: "online", name: "عن بُعد", venue: "جلسة مرئية عبر المنصة", note: "مرئي" },
];

export const ADVISORS: Advisor[] = [
  {
    id: "adv-1",
    name: "سعيد محمد الحمودي",
    title: "مستشار تخطيط مالي معتمد",
    initials: "سح",
    cities: ["fujairah", "online"],
    specialties: ["budget", "debt", "student"],
    languages: "العربية والإنجليزية",
    sessions: 412,
  },
  {
    id: "adv-2",
    name: "لطيفة عبدالله المرزوقي",
    title: "مستشارة ادخار واستثمار",
    initials: "لم",
    cities: ["dubai", "abudhabi", "online"],
    specialties: ["invest", "budget"],
    languages: "العربية والإنجليزية",
    sessions: 356,
  },
  {
    id: "adv-3",
    name: "عبدالرحمن سالم الكندي",
    title: "مستشار تمويل عقاري وتقاعد",
    initials: "عك",
    cities: ["fujairah", "abudhabi", "online"],
    specialties: ["home-retirement", "debt"],
    languages: "العربية",
    sessions: 289,
  },
  {
    id: "adv-4",
    name: "شيخة راشد البلوشي",
    title: "مرشدة مالية أسرية",
    initials: "شب",
    cities: ["fujairah", "dubai", "online"],
    specialties: ["student", "budget", "debt"],
    languages: "العربية والإنجليزية",
    sessions: 198,
  },
];

export const TIME_SLOTS = [
  { id: "t1", label: "09:00 ص", available: true },
  { id: "t2", label: "10:30 ص", available: true },
  { id: "t3", label: "12:00 م", available: false },
  { id: "t4", label: "01:30 م", available: true },
  { id: "t5", label: "03:00 م", available: true },
  { id: "t6", label: "04:30 م", available: false },
  { id: "t7", label: "06:00 م", available: true },
];

/** أيام العرض التجريبي — مشتقة من تاريخ ثابت لضمان تطابق العرض على الخادم والمتصفح */
const DEMO_TODAY = "2026-09-29";
const DAY_NAMES = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export type BookingDay = {
  iso: string;
  dayName: string;
  dayNum: number;
  monthName: string;
  available: boolean;
};

const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

export const BOOKING_DAYS: BookingDay[] = Array.from({ length: 12 }).map((_, i) => {
  const d = new Date(`${DEMO_TODAY}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + i + 1);
  const dow = d.getUTCDay();
  return {
    iso: d.toISOString().slice(0, 10),
    dayName: DAY_NAMES[dow],
    dayNum: d.getUTCDate(),
    monthName: MONTHS_AR[d.getUTCMonth()],
    available: dow !== 5 && dow !== 6,
  };
});

export const consultationById = (id: string) => CONSULTATION_TYPES.find((c) => c.id === id);
export const cityById = (id: string) => ADVISOR_CITIES.find((c) => c.id === id);
