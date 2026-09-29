export type SchoolClassRow = {
  grade: string;
  students: number;
  awareness: number;
  progress: number;
  status: "متقدم" | "مستقر" | "يحتاج دعماً";
};

export type School = {
  id: string;
  name: string;
  principal: string;
  area: string;
  type: "حلقة أولى" | "حلقة ثانية" | "ثانوية" | "تعليم أساسي";
  students: number;
  awareness: number;
  enrollment: number;
  assessmentCompletion: number;
  avgProgress: number;
  avgLevel: string;
  badgesEarned: number;
  rank: number;
  trend: number;
  classes: SchoolClassRow[];
  levelMix: { level: string; value: number }[];
  upcomingPrograms: string[];
  monthly: { label: string; value: number }[];
};

const months = ["مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر"];

const series = (start: number, step: number[]): { label: string; value: number }[] =>
  months.map((label, i) => ({ label, value: start + step.slice(0, i).reduce((a, b) => a + b, 0) }));

export const SCHOOLS: School[] = [
  {
    id: "fujairah-model",
    name: "مدرسة الفجيرة النموذجية",
    principal: "أحمد سالم اليماحي",
    area: "الفجيرة",
    type: "تعليم أساسي",
    students: 642,
    awareness: 74,
    enrollment: 91,
    assessmentCompletion: 83,
    avgProgress: 66,
    avgLevel: "أخطط",
    badgesEarned: 2184,
    rank: 3,
    trend: 8,
    classes: [
      { grade: "الصف 1–3", students: 168, awareness: 71, progress: 74, status: "مستقر" },
      { grade: "الصف 4–6", students: 175, awareness: 79, progress: 71, status: "متقدم" },
      { grade: "الصف 7–9", students: 164, awareness: 76, progress: 63, status: "مستقر" },
      { grade: "الصف 10–12", students: 135, awareness: 68, progress: 55, status: "يحتاج دعماً" },
    ],
    levelMix: [
      { level: "أكتشف", value: 168 },
      { level: "أتعلم", value: 175 },
      { level: "أخطط", value: 164 },
      { level: "أستعد", value: 135 },
    ],
    upcomingPrograms: ["smart-money-lab", "family-saving"],
    monthly: series(58, [3, 2, 4, 2, 3, 2]),
  },
  {
    id: "dibba-education",
    name: "مدرسة دبا الفجيرة للتعليم الأساسي",
    principal: "مريم حسن النقبي",
    area: "دبا الفجيرة",
    type: "تعليم أساسي",
    students: 518,
    awareness: 68,
    enrollment: 84,
    assessmentCompletion: 76,
    avgProgress: 58,
    avgLevel: "أتعلم",
    badgesEarned: 1512,
    rank: 6,
    trend: 5,
    classes: [
      { grade: "الصف 1–3", students: 142, awareness: 70, progress: 68, status: "مستقر" },
      { grade: "الصف 4–6", students: 148, awareness: 73, progress: 64, status: "متقدم" },
      { grade: "الصف 7–9", students: 126, awareness: 66, progress: 54, status: "مستقر" },
      { grade: "الصف 10–12", students: 102, awareness: 61, progress: 46, status: "يحتاج دعماً" },
    ],
    levelMix: [
      { level: "أكتشف", value: 142 },
      { level: "أتعلم", value: 148 },
      { level: "أخطط", value: 126 },
      { level: "أستعد", value: 102 },
    ],
    upcomingPrograms: ["family-saving"],
    monthly: series(55, [2, 3, 2, 2, 2, 2]),
  },
  {
    id: "masafi",
    name: "مدرسة مسافي للتعليم الأساسي والثانوي",
    principal: "خالد راشد الظنحاني",
    area: "مسافي",
    type: "تعليم أساسي",
    students: 391,
    awareness: 81,
    enrollment: 95,
    assessmentCompletion: 90,
    avgProgress: 73,
    avgLevel: "أخطط",
    badgesEarned: 1706,
    rank: 2,
    trend: 11,
    classes: [
      { grade: "الصف 1–3", students: 96, awareness: 78, progress: 81, status: "متقدم" },
      { grade: "الصف 4–6", students: 104, awareness: 85, progress: 78, status: "متقدم" },
      { grade: "الصف 7–9", students: 101, awareness: 83, progress: 72, status: "متقدم" },
      { grade: "الصف 10–12", students: 90, awareness: 76, progress: 62, status: "مستقر" },
    ],
    levelMix: [
      { level: "أكتشف", value: 96 },
      { level: "أتعلم", value: 104 },
      { level: "أخطط", value: 101 },
      { level: "أستعد", value: 90 },
    ],
    upcomingPrograms: ["smart-money-lab", "young-investor"],
    monthly: series(64, [3, 3, 3, 2, 3, 3]),
  },
  {
    id: "qidfa-secondary",
    name: "مدرسة قدفع للتعليم الثانوي",
    principal: "سالم عبيد الكعبي",
    area: "قدفع",
    type: "ثانوية",
    students: 466,
    awareness: 71,
    enrollment: 88,
    assessmentCompletion: 79,
    avgProgress: 61,
    avgLevel: "أستعد",
    badgesEarned: 1398,
    rank: 5,
    trend: 6,
    classes: [
      { grade: "الصف 7–9", students: 214, awareness: 73, progress: 66, status: "مستقر" },
      { grade: "الصف 10–12", students: 252, awareness: 69, progress: 57, status: "يحتاج دعماً" },
    ],
    levelMix: [
      { level: "أخطط", value: 214 },
      { level: "أستعد", value: 252 },
    ],
    upcomingPrograms: ["young-investor"],
    monthly: series(59, [2, 2, 3, 2, 2, 1]),
  },
  {
    id: "al-hail",
    name: "مدرسة الحيل المتقدمة",
    principal: "عائشة سعيد الشحي",
    area: "الحيل",
    type: "تعليم أساسي",
    students: 584,
    awareness: 77,
    enrollment: 93,
    assessmentCompletion: 86,
    avgProgress: 70,
    avgLevel: "أخطط",
    badgesEarned: 2042,
    rank: 4,
    trend: 9,
    classes: [
      { grade: "الصف 1–3", students: 151, awareness: 75, progress: 77, status: "مستقر" },
      { grade: "الصف 4–6", students: 162, awareness: 82, progress: 75, status: "متقدم" },
      { grade: "الصف 7–9", students: 148, awareness: 78, progress: 68, status: "متقدم" },
      { grade: "الصف 10–12", students: 123, awareness: 71, progress: 59, status: "مستقر" },
    ],
    levelMix: [
      { level: "أكتشف", value: 151 },
      { level: "أتعلم", value: 162 },
      { level: "أخطط", value: 148 },
      { level: "أستعد", value: 123 },
    ],
    upcomingPrograms: ["smart-money-lab"],
    monthly: series(61, [3, 2, 3, 3, 2, 3]),
  },
  {
    id: "al-aqah",
    name: "مدرسة العقة للتعليم الأساسي",
    principal: "ماجد علي الطنيجي",
    area: "العقة",
    type: "تعليم أساسي",
    students: 312,
    awareness: 63,
    enrollment: 78,
    assessmentCompletion: 69,
    avgProgress: 49,
    avgLevel: "أتعلم",
    badgesEarned: 806,
    rank: 8,
    trend: 3,
    classes: [
      { grade: "الصف 1–3", students: 88, awareness: 66, progress: 58, status: "مستقر" },
      { grade: "الصف 4–6", students: 92, awareness: 68, progress: 54, status: "مستقر" },
      { grade: "الصف 7–9", students: 76, awareness: 61, progress: 44, status: "يحتاج دعماً" },
      { grade: "الصف 10–12", students: 56, awareness: 55, progress: 38, status: "يحتاج دعماً" },
    ],
    levelMix: [
      { level: "أكتشف", value: 88 },
      { level: "أتعلم", value: 92 },
      { level: "أخطط", value: 76 },
      { level: "أستعد", value: 56 },
    ],
    upcomingPrograms: ["family-saving"],
    monthly: series(52, [1, 2, 2, 1, 3, 2]),
  },
  {
    id: "al-badiyah",
    name: "مدرسة البدية النموذجية",
    principal: "هند راشد الزيودي",
    area: "البدية",
    type: "تعليم أساسي",
    students: 275,
    awareness: 86,
    enrollment: 97,
    assessmentCompletion: 94,
    avgProgress: 81,
    avgLevel: "أستعد",
    badgesEarned: 1490,
    rank: 1,
    trend: 13,
    classes: [
      { grade: "الصف 1–3", students: 64, awareness: 84, progress: 88, status: "متقدم" },
      { grade: "الصف 4–6", students: 72, awareness: 89, progress: 85, status: "متقدم" },
      { grade: "الصف 7–9", students: 71, awareness: 88, progress: 80, status: "متقدم" },
      { grade: "الصف 10–12", students: 68, awareness: 82, progress: 71, status: "متقدم" },
    ],
    levelMix: [
      { level: "أكتشف", value: 64 },
      { level: "أتعلم", value: 72 },
      { level: "أخطط", value: 71 },
      { level: "أستعد", value: 68 },
    ],
    upcomingPrograms: ["smart-money-lab", "young-investor", "family-saving"],
    monthly: series(68, [3, 3, 4, 2, 3, 3]),
  },
  {
    id: "al-tawyeen",
    name: "مدرسة الطويين للتعليم الأساسي",
    principal: "يوسف أحمد اليماحي",
    area: "الطويين",
    type: "تعليم أساسي",
    students: 348,
    awareness: 66,
    enrollment: 81,
    assessmentCompletion: 72,
    avgProgress: 53,
    avgLevel: "أتعلم",
    badgesEarned: 964,
    rank: 7,
    trend: 4,
    classes: [
      { grade: "الصف 1–3", students: 97, awareness: 69, progress: 62, status: "مستقر" },
      { grade: "الصف 4–6", students: 101, awareness: 71, progress: 58, status: "مستقر" },
      { grade: "الصف 7–9", students: 84, awareness: 63, progress: 47, status: "يحتاج دعماً" },
      { grade: "الصف 10–12", students: 66, awareness: 58, progress: 41, status: "يحتاج دعماً" },
    ],
    levelMix: [
      { level: "أكتشف", value: 97 },
      { level: "أتعلم", value: 101 },
      { level: "أخطط", value: 84 },
      { level: "أستعد", value: 66 },
    ],
    upcomingPrograms: ["family-saving"],
    monthly: series(54, [2, 1, 3, 2, 2, 2]),
  },
];

export const schoolById = (id: string): School | undefined =>
  SCHOOLS.find((s) => s.id === id);

export const TOTAL_STUDENTS = SCHOOLS.reduce((a, s) => a + s.students, 0);
