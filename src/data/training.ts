export type TrainingProgram = {
  id: string;
  name: string;
  city: "الفجيرة" | "دبي" | "أبوظبي";
  venue: string;
  host: string;
  format: "حضوري" | "حضوري ومباشر";
  date: string;
  duration: string;
  audience: string;
  pathIds: string[];
  seatsTotal: number;
  seatsLeft: number;
  requiredPoints: number;
  requiredBadges: string[];
  conditions: string[];
  summary: string;
  outcomes: string[];
};

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "smart-money-lab",
    name: "مختبر المال الذكي للطلبة",
    city: "الفجيرة",
    venue: "مركز الفجيرة للفنون — القاعة التدريبية",
    host: "دائرة التعليم — حكومة الفجيرة",
    format: "حضوري",
    date: "2026-10-14",
    duration: "نصف يوم",
    audience: "الصف 7–9",
    pathIds: ["plan"],
    seatsTotal: 60,
    seatsLeft: 14,
    requiredPoints: 1500,
    requiredBadges: ["saving", "planning"],
    conditions: [
      "إكمال تقييم المستوى المالي",
      "إنجاز 60% من مسار «أخطط»",
      "موافقة المدرسة على المشاركة",
    ],
    summary:
      "مختبر تطبيقي يحاكي قرارات الإنفاق والادخار عبر محطات عملية، ينتقل فيه الطالب من المعرفة إلى السلوك خلال جلسة واحدة.",
    outcomes: [
      "بناء ميزانية شخصية أولى",
      "اتخاذ قرار شراء مدروس أمام بدائل حقيقية",
      "التعرف على ثلاث حيل تسويقية شائعة",
    ],
  },
  {
    id: "young-investor",
    name: "المستثمر الصغير",
    city: "أبوظبي",
    venue: "أكاديمية التمكين المالي — أبوظبي",
    host: "أكاديمية التمكين المالي",
    format: "حضوري",
    date: "2026-11-05",
    duration: "يوم واحد",
    audience: "الصف 10–12",
    pathIds: ["prepare"],
    seatsTotal: 45,
    seatsLeft: 9,
    requiredPoints: 3000,
    requiredBadges: ["planning", "financial-knowledge"],
    conditions: [
      "إكمال مسار «أستعد» بنسبة 70% فأعلى",
      "الحصول على شارة التخطيط وشارة المعرفة المالية",
      "حضور جلسة تمهيدية عن بُعد",
    ],
    summary:
      "برنامج يوم كامل يحاكي أسواق الاستثمار عبر محفظة تجريبية، ويُنهي اليوم بعرض كل مشارك لقراره الاستثماري ومبرراته.",
    outcomes: [
      "فهم العلاقة بين العائد والمخاطرة",
      "بناء محفظة تجريبية متنوعة",
      "كشف ثلاثة أنماط للاحتيال الاستثماري",
    ],
  },
  {
    id: "youth-decisions",
    name: "مختبر القرارات المالية للشباب",
    city: "دبي",
    venue: "منصة الابتكار المالي — دبي",
    host: "مركز الابتكار المالي",
    format: "حضوري ومباشر",
    date: "2026-10-28",
    duration: "يوم واحد",
    audience: "طلبة الجامعات وحديثو التخرج",
    pathIds: ["university"],
    seatsTotal: 70,
    seatsLeft: 23,
    requiredPoints: 2500,
    requiredBadges: ["financial-knowledge"],
    conditions: [
      "إكمال تقييم المستوى المالي",
      "إنجاز 50% من مسار «الجامعة وبداية الحياة»",
    ],
    summary:
      "ورشة مكثفة حول القرارات المالية الأولى: العرض الوظيفي، الحساب البنكي، البطاقة الائتمانية، وخطة أول راتب.",
    outcomes: [
      "قراءة عرض وظيفي وحساب صافي الدخل",
      "بناء خطة لأول راتب",
      "تقييم عرض تمويل شخصي",
    ],
  },
  {
    id: "family-planning",
    name: "التخطيط المالي للأسرة",
    city: "الفجيرة",
    venue: "قاعة المجتمع — مدينة الفجيرة",
    host: "دائرة التنمية الاجتماعية — الفجيرة",
    format: "حضوري",
    date: "2026-11-19",
    duration: "يومان",
    audience: "المقبلون على الزواج",
    pathIds: ["marriage"],
    seatsTotal: 40,
    seatsLeft: 6,
    requiredPoints: 2000,
    requiredBadges: ["planning"],
    conditions: [
      "إكمال وحدة «عشرة أسئلة مالية قبل الزواج»",
      "الحصول على شارة التخطيط",
      "حضور الطرفين معاً حيثما أمكن",
    ],
    summary:
      "برنامج على مدى يومين يبني أساس الحوار المالي بين الزوجين، وينتهي بخطة ميزانية مشتركة لأول سنة.",
    outcomes: [
      "اتفاق مكتوب على نموذج إدارة المال المشترك",
      "ميزانية أول اثني عشر شهراً",
      "خطة لصندوق طوارئ أسري",
    ],
  },
  {
    id: "lifetime-home",
    name: "بيت العمر بقرار مالي واعٍ",
    city: "أبوظبي",
    venue: "مركز التخطيط المالي — أبوظبي",
    host: "مركز التخطيط المالي",
    format: "حضوري",
    date: "2026-12-03",
    duration: "يوم واحد",
    audience: "المقبلون على البناء أو التملك",
    pathIds: ["home"],
    seatsTotal: 35,
    seatsLeft: 11,
    requiredPoints: 3500,
    requiredBadges: ["planning", "future-planner"],
    conditions: [
      "إكمال وحدة «هل أنا مستعد مالياً؟»",
      "الحصول على شارة التخطيط وشارة المخطّط للمستقبل",
      "إحضار تقدير مبدئي للتكلفة",
    ],
    summary:
      "ورشة تحليل قرار البناء أو التملك: القدرة المالية، شروط التمويل، جدول الدفعات، والاحتياط المالي للتجاوزات.",
    outcomes: [
      "تقدير القدرة المالية الفعلية",
      "قراءة عرض تمويل عقاري ومقارنته",
      "بناء جدول دفعات مرتبط بالإنجاز",
    ],
  },
  {
    id: "retirement-ready",
    name: "الاستعداد المالي للتقاعد",
    city: "دبي",
    venue: "مركز التدريب المؤسسي — دبي",
    host: "مركز التدريب المؤسسي",
    format: "حضوري ومباشر",
    date: "2026-12-16",
    duration: "يوم واحد",
    audience: "الفئة العمرية 50 سنة فأعلى",
    pathIds: ["retirement"],
    seatsTotal: 50,
    seatsLeft: 27,
    requiredPoints: 3000,
    requiredBadges: ["future-planner"],
    conditions: [
      "إكمال وحدة «كم سيكون دخلك؟»",
      "الحصول على شارة المخطّط للمستقبل",
    ],
    summary:
      "برنامج يحوّل التقاعد من حدث مفاجئ إلى خطة مكتوبة: الدخل المتوقع، الالتزامات، المحفظة، ونمط الحياة.",
    outcomes: [
      "خطة دخل ومصروف لما بعد التقاعد",
      "جدول زمني لإغلاق الالتزامات",
      "إعادة توزيع المحفظة نحو الحفاظ على رأس المال",
    ],
  },
  {
    id: "first-salary",
    name: "راتبي الأول: من الاستلام إلى التخطيط",
    city: "الفجيرة",
    venue: "مبنى التدريب الحكومي — الفجيرة",
    host: "معهد التدريب الحكومي — الفجيرة",
    format: "حضوري",
    date: "2026-10-21",
    duration: "نصف يوم",
    audience: "الموظفون الجدد",
    pathIds: ["employees", "university"],
    seatsTotal: 55,
    seatsLeft: 18,
    requiredPoints: 1200,
    requiredBadges: [],
    conditions: ["إكمال تقييم المستوى المالي فقط"],
    summary:
      "جلسة عملية مختصرة تُنهيها بميزانية شهرية مكتوبة وأمر استقطاع تلقائي للادخار.",
    outcomes: [
      "ميزانية شهرية واقعية",
      "تحديد نسبة ادخار ثابتة",
      "خطة لتكوين صندوق طوارئ",
    ],
  },
  {
    id: "family-saving",
    name: "ورشة الادخار الأسري",
    city: "الفجيرة",
    venue: "مكتبة الفجيرة العامة",
    host: "مكتبة الفجيرة العامة",
    format: "حضوري",
    date: "2026-11-11",
    duration: "نصف يوم",
    audience: "الصف 4–6 وأولياء الأمور",
    pathIds: ["learn"],
    seatsTotal: 80,
    seatsLeft: 31,
    requiredPoints: 800,
    requiredBadges: ["saving"],
    conditions: [
      "الحصول على شارة الادخار",
      "حضور الطالب برفقة ولي الأمر",
    ],
    summary:
      "ورشة مشتركة بين الطالب وولي الأمر لبناء هدف ادخار عائلي ومتابعته لمدة ثمانية أسابيع.",
    outcomes: [
      "هدف ادخار عائلي مكتوب",
      "أداة متابعة أسبوعية",
      "اتفاق على مكافأة عند تحقيق الهدف",
    ],
  },
];

export const programById = (id: string): TrainingProgram | undefined =>
  TRAINING_PROGRAMS.find((p) => p.id === id);
