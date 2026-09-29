import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { href: string; label: string }[];
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white">
      <div className="shell py-12 sm:py-16">
        {breadcrumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[12.5px] font-bold text-ink-faint">
            <Link href="/" className="transition-colors hover:text-navy-800">
              الرئيسية
            </Link>
            {breadcrumbs.map((b) => (
              <span key={b.href} className="flex items-center gap-1.5">
                <ChevronLeft className="h-3.5 w-3.5" />
                <Link href={b.href} className="transition-colors hover:text-navy-800">
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
            <h1 className="text-[32px] font-extrabold leading-[1.22] text-navy-900 sm:text-[42px]">{title}</h1>
            {description && <p className="lede mt-5">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
