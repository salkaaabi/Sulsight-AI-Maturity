/**
 * أدوات معالجة النص العربي واتجاه الأرقام.
 * نستخدم محارف العزل (LRI/PDI) لضمان عدم انقلاب ترتيب الأرقام
 * والنطاقات مثل «1–3» أو «2,450» داخل فقرة عربية RTL.
 */
export const LRI = "⁦";
export const PDI = "⁩";

/** يعزل مقطعاً لاتينياً/رقمياً داخل نص عربي */
export const iso = (value: string | number): string => `${LRI}${value}${PDI}`;

/** «الصف 1–3» بترتيب صحيح */
export const gradeLabel = (range: string): string => `الصف ${iso(range)}`;

/** تنسيق رقم بفواصل الآلاف مع العزل */
export const num = (value: number): string =>
  iso(value.toLocaleString("en-US"));

/** نسبة مئوية معزولة */
export const pct = (value: number): string => iso(`${value}%`);

/** «12 دقيقة» / «5 دقائق» بصيغة عربية سليمة */
export const minutes = (value: number): string => {
  if (value === 1) return "دقيقة واحدة";
  if (value === 2) return "دقيقتان";
  if (value <= 10) return `${iso(value)} دقائق`;
  return `${iso(value)} دقيقة`;
};

const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

/** تاريخ ISO إلى «14 أكتوبر 2026» */
export const arDate = (isoDate: string): string => {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${iso(d)} ${MONTHS_AR[m - 1]} ${iso(y)}`;
};

/** فرق الأيام بين اليوم والتاريخ (داخل النموذج التجريبي) */
export const daysUntil = (isoDate: string, from = "2026-09-29"): number => {
  const a = new Date(from).getTime();
  const b = new Date(isoDate).getTime();
  return Math.round((b - a) / 86400000);
};
