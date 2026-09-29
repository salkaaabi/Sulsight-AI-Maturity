import {
  Award,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  Briefcase,
  ClipboardCheck,
  Compass,
  Gauge,
  Gift,
  GraduationCap,
  HeartHandshake,
  Home,
  Lock,
  Medal,
  PiggyBank,
  Rocket,
  School,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Sunset,
  Target,
  Ticket,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Award,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  Briefcase,
  ClipboardCheck,
  Compass,
  Gauge,
  Gift,
  GraduationCap,
  HeartHandshake,
  Home,
  Lock,
  Medal,
  PiggyBank,
  Rocket,
  School,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Sunset,
  Target,
  Ticket,
  TrendingUp,
  Users,
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.9} />;
}
