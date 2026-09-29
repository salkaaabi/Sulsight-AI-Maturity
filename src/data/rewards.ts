export type Reward = {
  id: string;
  points: number;
  name: string;
  description: string;
  icon: string;
  tone: string;
  claimedBy: number;
};

export const REWARDS: Reward[] = [
  {
    id: "certificate",
    points: 500,
    name: "شهادة رقمية معتمدة",
    description: "شهادة إلكترونية موثّقة باسم المستفيد تُضاف إلى ملفه الرقمي وتصلح للإرفاق بالسيرة الذاتية.",
    icon: "Award",
    tone: "sky",
    claimedBy: 3842,
  },
  {
    id: "learning-gift",
    points: 1000,
    name: "هدية تعليمية",
    description: "حقيبة أدوات مالية تعليمية تشمل دفتر التخطيط المالي وأدوات متابعة الادخار الأسري.",
    icon: "Gift",
    tone: "emerald",
    claimedBy: 1976,
  },
  {
    id: "event-invite",
    points: 2500,
    name: "دعوة لفعالية مالية",
    description: "دعوة لحضور إحدى الفعاليات المالية التي ينظمها البرنامج في الفجيرة أو خارجها.",
    icon: "Ticket",
    tone: "gold",
    claimedBy: 742,
  },
  {
    id: "advanced-program",
    points: 5000,
    name: "برنامج تدريبي متقدم",
    description: "مقعد في برنامج تدريبي متخصص بالكامل على نفقة البرنامج مع مرافقة إرشادية لثلاثة أشهر.",
    icon: "GraduationCap",
    tone: "violet",
    claimedBy: 218,
  },
  {
    id: "signature-experience",
    points: 8000,
    name: "تجربة معرفية خاصة",
    description: "تجربة ميدانية مع مؤسسات مالية ومصرفية، تشمل جلسات مع خبراء وزيارة بيئة عمل حقيقية.",
    icon: "Sparkles",
    tone: "rose",
    claimedBy: 54,
  },
];

export const nextRewardFor = (points: number): Reward | undefined =>
  REWARDS.find((r) => r.points > points);

export const unlockedRewards = (points: number): Reward[] =>
  REWARDS.filter((r) => r.points <= points);
