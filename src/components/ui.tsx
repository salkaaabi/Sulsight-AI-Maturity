import Link from "next/link";
import type { ReactNode } from "react";

/* ── أرقام بترتيب صحيح داخل نص عربي ───────────────────────────── */
export function Num({ value }: { value: string | number }) {
  const text = typeof value === "number" ? value.toLocaleString("en-US") : value;
  return (
    <span dir="ltr" className="ltr-num">
      {text}
    </span>
  );
}

export function Delta({ value, suffix }: { value: number; suffix?: string }) {
  const sign = value >= 0 ? "+" : "−";
  return (
    <span dir="ltr" className="ltr-num">
      {sign}
      {Math.abs(value).toLocaleString("en-US")}
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
}

export function Frac({ a, b, spaced = false }: { a: number; b: number; spaced?: boolean }) {
  const sep = spaced ? " / " : "/";
  return (
    <span dir="ltr" className="ltr-num">
      {a.toLocaleString("en-US")}
      {sep}
      {b.toLocaleString("en-US")}
    </span>
  );
}

export function Pct({ value }: { value: number }) {
  return (
    <span dir="ltr" className="ltr-num">
      {value}%
    </span>
  );
}

/* ── شعار بديل (Placeholder) — لا يُحاكي شعاراً رسمياً ────────── */
export function Crest({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-navy-100 bg-gradient-to-b from-navy-50 to-white"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6 text-navy-700" fill="none">
          <path d="M16 3.5 27 9.5v13L16 28.5 5 22.5v-13L16 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M16 10.5 21 13.5v5L16 21.5 11 18.5v-5L16 10.5Z" fill="currentColor" opacity=".85" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="text-[13px] font-extrabold text-navy-900">حكومة الفجيرة</div>
          <div className="text-[11px] font-semibold text-ink-faint">شعار توضيحي — Placeholder</div>
        </div>
      )}
    </div>
  );
}

/* ── عنوان قسم ────────────────────────────────────────────────── */
export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 className="h2">{title}</h2>
        {description && <p className="lede mt-4">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ── شريط تقدم ────────────────────────────────────────────────── */
export function Progress({
  value,
  tone = "bg-navy-600",
  height = "h-2",
  showLabel = false,
}: {
  value: number;
  tone?: string;
  height?: string;
  showLabel?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative w-full overflow-hidden rounded-full bg-sand-200 ${height}`}>
        <div
          className={`absolute inset-y-0 right-0 rounded-full ${tone} transition-[width] duration-700`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-12 shrink-0 text-left text-[13px] font-bold text-ink-soft">
          <Pct value={value} />
        </span>
      )}
    </div>
  );
}

/* ── حلقة تقدم ────────────────────────────────────────────────── */
export function Ring({
  value,
  size = 128,
  stroke = 10,
  label,
  sublabel,
  color = "#1F4E81",
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EBE7DE" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.22,.61,.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <div className="text-[26px] font-extrabold leading-none text-navy-900">{label ?? <Num value={value} />}</div>
        {sublabel && <div className="mt-1 text-[11.5px] font-semibold text-ink-faint">{sublabel}</div>}
      </div>
    </div>
  );
}

/* ── بطاقة مؤشر ───────────────────────────────────────────────── */
export function Stat({
  label,
  value,
  unit,
  delta,
  icon,
  tone = "text-navy-700",
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  delta?: number;
  icon?: ReactNode;
  tone?: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[13px] font-bold text-ink-faint">{label}</div>
        {icon && <div className={`shrink-0 ${tone}`}>{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className="text-[30px] font-extrabold leading-none text-navy-900">{value}</div>
        {unit && <div className="text-[13px] font-bold text-ink-faint">{unit}</div>}
      </div>
      {typeof delta === "number" && (
        <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-700">
          <span dir="ltr" className="ltr-num">
            +{delta}
          </span>
          <span>مقارنة بالفترة السابقة</span>
        </div>
      )}
    </div>
  );
}

/* ── وسم ──────────────────────────────────────────────────────── */
export function Tag({
  children,
  tone = "bg-sand-100 text-ink-soft",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`chip ${tone}`}>{children}</span>;
}

/* ── قائمة أعمدة أفقية بترتيب عربي سليم ───────────────────────── */
export function BarList({
  items,
  max = 100,
  format = "pct",
  tone = "bg-navy-600",
  highlightTone = "bg-gold-500",
  highlightFirst = false,
}: {
  items: { label: string; value: number; note?: string }[];
  max?: number;
  format?: "pct" | "delta" | "num";
  tone?: string;
  highlightTone?: string;
  highlightFirst?: boolean;
}) {
  return (
    <ul className="grid gap-3.5">
      {items.map((it, i) => (
        <li key={it.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="truncate text-[13px] font-bold text-ink-soft">{it.label}</span>
              {it.note && <span className="shrink-0 text-[11.5px] font-semibold text-ink-faint">{it.note}</span>}
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-sand-200">
              <div
                className={`absolute inset-y-0 right-0 rounded-full ${
                  highlightFirst && i === 0 ? highlightTone : tone
                }`}
                style={{ width: `${Math.min(100, (it.value / max) * 100)}%` }}
              />
            </div>
          </div>
          <span className="w-12 shrink-0 text-left text-[13.5px] font-extrabold text-navy-900">
            {format === "pct" ? <Pct value={it.value} /> : format === "delta" ? <Delta value={it.value} /> : <Num value={it.value} />}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── إطار صورة بديل، نظيف ومنظم ───────────────────────────────── */
const FRAME_ACCENT: Record<string, { from: string; to: string; mark: string }> = {
  landscape: { from: "#E4EDF5", to: "#F4EFE3", mark: "#9FB4C6" },
  people: { from: "#EDF1F6", to: "#F6F2E9", mark: "#AFBECE" },
  city: { from: "#E9EFF5", to: "#F2F4F7", mark: "#A6B7C8" },
  neutral: { from: "#F1EEE7", to: "#F8F6F1", mark: "#CFC7B6" },
};

export function ImageFrame({
  label,
  caption,
  className = "",
  ratio = "aspect-[16/10]",
  variant = "landscape",
}: {
  label: string;
  caption?: string;
  className?: string;
  ratio?: string;
  variant?: "landscape" | "people" | "city" | "neutral";
}) {
  const a = FRAME_ACCENT[variant] ?? FRAME_ACCENT.neutral;
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line ${ratio} ${className}`}
      style={{ background: `linear-gradient(140deg, ${a.from}, ${a.to})` }}
    >
      <svg viewBox="0 0 640 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <g stroke={a.mark} strokeOpacity=".22" strokeWidth="1">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={-120 + i * 60} y1="400" x2={120 + i * 60} y2="0" />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/70 bg-white/70 backdrop-blur-sm"
          style={{ color: a.mark }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="9" cy="10" r="1.8" fill="currentColor" />
            <path d="M4.5 17.5 9 13l3.5 3 3-2.5 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-[13px] font-extrabold text-navy-900/80">{label}</div>
        {caption && <div className="text-[11.5px] font-semibold text-navy-900/45">{caption}</div>}
      </div>

      <div className="absolute bottom-3 left-3 rounded-md bg-white/75 px-2 py-1 text-[10.5px] font-bold text-navy-800/80 backdrop-blur-sm">
        موضع صورة
      </div>
    </div>
  );
}

/* ── تنويه النموذج التجريبي ───────────────────────────────────── */
export function DemoNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12px] font-semibold leading-relaxed text-ink-faint ${className}`}>
      نموذج تجريبي لأغراض العرض — البيانات المعروضة غير حقيقية.
    </p>
  );
}

/* ── رابط بطاقة ───────────────────────────────────────────────── */
export function CardLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`card group block p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {children}
    </Link>
  );
}

/* ── حالة فارغة ───────────────────────────────────────────────── */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="card grid place-items-center gap-4 px-8 py-16 text-center">
      <div className="h3">{title}</div>
      <p className="body max-w-md">{description}</p>
      {action}
    </div>
  );
}
