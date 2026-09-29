export const EXEC_KPIS = [
  { id: "beneficiaries", label: "إجمالي المستفيدين", value: 18642, unit: "مستفيد", delta: 12.4, icon: "Users" },
  { id: "schools", label: "المدارس المشاركة", value: 8, unit: "مدرسة", delta: 2, icon: "School" },
  { id: "assessment", label: "نسبة إكمال التقييم", value: 81, unit: "%", delta: 9.2, icon: "ClipboardCheck" },
  { id: "awareness", label: "متوسط الوعي المالي", value: 73, unit: "من 100", delta: 6.8, icon: "Gauge" },
  { id: "improvement", label: "معدل التحسّن", value: 16, unit: "نقطة", delta: 3.1, icon: "TrendingUp" },
  { id: "modules", label: "الوحدات المكتملة", value: 94318, unit: "وحدة", delta: 21.5, icon: "BookOpenCheck" },
  { id: "badges", label: "الشارات المكتسبة", value: 12102, unit: "شارة", delta: 18.7, icon: "Medal" },
];

export const EXEC_LIVE_TRAINING = {
  participants: 2464,
  sessions: 38,
  cities: 3,
  satisfaction: 92,
};

export const STAGE_DISTRIBUTION = [
  { stage: "الصف 1–3", value: 71, learners: 1840 },
  { stage: "الصف 4–6", value: 76, learners: 2130 },
  { stage: "الصف 7–9", value: 74, learners: 1975 },
  { stage: "الصف 10–12", value: 69, learners: 1608 },
  { stage: "الجامعة", value: 78, learners: 1240 },
  { stage: "الموظفون", value: 66, learners: 2860 },
  { stage: "الادخار والاستثمار", value: 72, learners: 1655 },
  { stage: "المقبلون على الزواج", value: 75, learners: 980 },
  { stage: "بيت العمر", value: 58, learners: 720 },
  { stage: "التقاعد", value: 70, learners: 640 },
];

export const BEHAVIOUR_IMPROVEMENT = [
  { behaviour: "الادخار المنتظم", change: 23 },
  { behaviour: "تسجيل المصروف", change: 21 },
  { behaviour: "التمييز بين الحاجة والرغبة", change: 19 },
  { behaviour: "المقارنة قبل الشراء", change: 17 },
  { behaviour: "كشف الاحتيال المالي", change: 14 },
];

export const BEHAVIOUR_GAPS = [
  { behaviour: "بناء صندوق الطوارئ", change: 4, note: "أقل من نصف المستفيدين لديهم احتياط يغطي شهراً واحداً" },
  { behaviour: "فهم تكلفة الاقتراض", change: 5, note: "فجوة واضحة لدى الفئة 10–12 والموظفين الجدد" },
  { behaviour: "التخطيط المالي طويل المدى", change: 6, note: "الأضعف في مسار بيت العمر" },
  { behaviour: "التنويع الاستثماري", change: 7, note: "يحتاج محتوى تطبيقياً لا نظرياً" },
];

export const AWARENESS_TREND = [
  { label: "مارس", الطلبة: 58, البالغون: 54 },
  { label: "أبريل", الطلبة: 61, البالغون: 56 },
  { label: "مايو", الطلبة: 64, البالغون: 59 },
  { label: "يونيو", الطلبة: 67, البالغون: 62 },
  { label: "يوليو", الطلبة: 70, البالغون: 65 },
  { label: "أغسطس", الطلبة: 73, البالغون: 68 },
  { label: "سبتمبر", الطلبة: 76, البالغون: 70 },
];

export const PROGRAM_IMPACT_SUMMARY = {
  baseline: 57,
  current: 73,
  target: 80,
};
