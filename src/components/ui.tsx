import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
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

/* ── قفل الهوية: الشعار الرسمي إن وُجد، وإلا إطار بديل نظيف ──── */
export function Crest({ compact = false, size = 44 }: { compact?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <BrandLogo slot="government" size={size} />
      {!compact && (
        <div className="leading-tight">
          <div className="text-[13.5px] font-bold text-navy-900">حكومة الفجيرة</div>
          <div className="text-[11px] font-semibold text-ink-faint">Government of Fujairah</div>
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
