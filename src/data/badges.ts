export type Badge = {
  id: string;
  name: string;
  criterion: string;
  tone: BadgeTone;
  icon: string;
  points: number;
};

export type BadgeTone = "emerald" | "navy" | "gold" | "rose" | "violet" | "teal" | "amber" | "sky";

export const BADGES: Badge[] = [
  {
    id: "financial-knowledge",
    name: "المعرفة المالية",
    criterion: "اجتَز اختبار المفاهيم المالية بنتيجة 80% فأعلى",
    tone: "gold",
    icon: "BookOpen",
    points: 300,
  },
  {
    id: "saving",
    name: "الادخار",
    criterion: "حقّق هدف ادخار متواصل لمدة 4 أسابيع دون انقطاع",
    tone: "emerald",
    icon: "PiggyBank",
    points: 400,
  },
  {
    id: "responsibility",
    name: "المسؤولية",
    criterion: "التزم بسجل المصروف اليومي لمدة 21 يوماً",
    tone: "teal",
    icon: "ShieldCheck",
    points: 350,
  },
  {
    id: "planning",
    name: "التخطيط",
    criterion: "أكمل تحدي الميزانية الشهرية بنجاح وأغلقه بفائض",
    tone: "navy",
    icon: "Target",
    points: 450,
  },
  {
    id: "smart-shopper",
    name: "المتسوّق الذكي",
    criterion: "قارن بين 5 بدائل شرائية ووثّق قرار الشراء وسببه",
    tone: "amber",
    icon: "ShoppingBag",
    points: 300,
  },
  {
    id: "financial-safety",
    name: "الأمان المالي",
    criterion: "اكتشف 6 من 6 محاولات احتيال في سيناريو المحاكاة",
    tone: "rose",
    icon: "Lock",
    points: 400,
  },
  {
    id: "aware-investor",
    name: "المستثمر الواعي",
    criterion: "أنشئ محفظة تجريبية متنوعة وحافظ عليها 8 أسابيع",
    tone: "violet",
    icon: "TrendingUp",
    points: 600,
  },
  {
    id: "future-planner",
    name: "المخطّط للمستقبل",
    criterion: "ضع خطة مالية لثلاث سنوات وراجعها بعد 3 أشهر",
    tone: "sky",
    icon: "Compass",
    points: 700,
  },
];

export const badgeById = (id: string): Badge | undefined =>
  BADGES.find((b) => b.id === id);

export const BADGE_TONES: Record<BadgeTone, { bg: string; fg: string; ring: string }> = {
  emerald: { bg: "bg-emerald-50", fg: "text-emerald-700", ring: "ring-emerald-100" },
  navy: { bg: "bg-navy-50", fg: "text-navy-700", ring: "ring-navy-100" },
  gold: { bg: "bg-gold-50", fg: "text-gold-600", ring: "ring-gold-100" },
  rose: { bg: "bg-rose-50", fg: "text-rose-700", ring: "ring-rose-100" },
  violet: { bg: "bg-violet-50", fg: "text-violet-700", ring: "ring-violet-100" },
  teal: { bg: "bg-teal-50", fg: "text-teal-700", ring: "ring-teal-100" },
  amber: { bg: "bg-amber-50", fg: "text-amber-700", ring: "ring-amber-100" },
  sky: { bg: "bg-sky-50", fg: "text-sky-700", ring: "ring-sky-100" },
};
