"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  LayoutDashboard,
  LogIn,
  Menu,
  PlayCircle,
  X,
} from "lucide-react";
import { Crest } from "@/components/ui";
import { useSession } from "@/lib/session";

const PRIMARY = [
  { href: "/", label: "الرئيسية" },
  { href: "/#about", label: "عن البرنامج" },
  { href: "/paths", label: "المسارات" },
  { href: "/impact", label: "الأثر" },
];

const RESOURCES = [
  { href: "/training", label: "البرامج التدريبية المباشرة", note: "الفجيرة، دبي، أبوظبي" },
  { href: "/advisor", label: "استشارة مع مستشار مالي", note: "حضورياً أو عن بُعد" },
  { href: "/assessment", label: "قياس المستوى المالي", note: "تقييم تفاعلي من 100" },
  { href: "/schools", label: "المدارس المشاركة", note: "لوحات أداء المدارس" },
  { href: "/rewards", label: "المكافآت والنقاط", note: "خمسة مستويات للمكافآت" },
  { href: "/executive", label: "لوحة المؤشرات التنفيذية", note: "عرض قيادي" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { persona } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setResOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setResOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href !== "/#about";

  return (
    <div className="sticky top-0 z-50 pt-3 sm:pt-4">
      <div className="shell">
        <header
          ref={wrapRef}
          className={`rounded-2xl border border-line bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? "shadow-lift" : "shadow-card"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <Link href="/" className="flex items-center gap-4">
              <Crest compact />
              <span className="hidden h-9 w-px bg-line sm:block" />
              <span className="hidden leading-tight sm:block">
                <span className="block text-[14.5px] font-extrabold text-navy-900">
                  منظومة الفجيرة للوعي والتمكين المالي
                </span>
                <span className="block text-[10.5px] font-bold uppercase tracking-[.12em] text-gold-600">
                  Fujairah Financial Literacy &amp; Empowerment
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {PRIMARY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-[14px] font-bold transition-colors ${
                    isActive(item.href)
                      ? "bg-navy-50 text-navy-800"
                      : "text-ink-soft hover:bg-sand-100 hover:text-navy-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setResOpen((v) => !v)}
                  aria-expanded={resOpen}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-bold transition-colors ${
                    resOpen ? "bg-navy-50 text-navy-800" : "text-ink-soft hover:bg-sand-100 hover:text-navy-800"
                  }`}
                >
                  الموارد
                  <ChevronDown className={`h-4 w-4 transition-transform ${resOpen ? "rotate-180" : ""}`} />
                </button>
                {resOpen && (
                  <div className="absolute left-0 top-[calc(100%+10px)] w-[320px] overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                    {RESOURCES.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-sand-100"
                      >
                        <div className="text-[14px] font-bold text-navy-900">{r.label}</div>
                        <div className="text-[12px] font-semibold text-ink-faint">{r.note}</div>
                      </Link>
                    ))}
                    <div className="my-1 h-px bg-line" />
                    <a
                      href="https://fujairah-programme.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-sand-100"
                    >
                      <span className="text-[14px] font-bold text-navy-900">موقع البرنامج</span>
                      <ExternalLink className="h-4 w-4 text-ink-faint" />
                    </a>
                  </div>
                )}
              </div>

              <Link
                href="/#contact"
                className="rounded-lg px-3 py-2 text-[14px] font-bold text-ink-soft transition-colors hover:bg-sand-100 hover:text-navy-800"
              >
                تواصل معنا
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/demo" className="btn-gold hidden !px-4 !py-2.5 text-[13.5px] sm:inline-flex">
                <PlayCircle className="h-4 w-4" />
                استعرض التجربة
              </Link>
              {persona ? (
                <Link href="/dashboard" className="btn-primary !px-4 !py-2.5 text-[13.5px]">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">{persona.name.split(" ")[0]}</span>
                  <span className="sm:hidden">المنصة</span>
                </Link>
              ) : (
                <Link href="/demo" className="btn-primary !px-4 !py-2.5 text-[13.5px]">
                  <LogIn className="h-4 w-4" />
                  تسجيل الدخول
                </Link>
              )}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-navy-800 lg:hidden"
                aria-label="القائمة"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="border-t border-line p-3 lg:hidden">
              <div className="grid gap-1">
                {[...PRIMARY, { href: "/#contact", label: "تواصل معنا" }].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2.5 text-[15px] font-bold text-navy-900 hover:bg-sand-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-line" />
                {RESOURCES.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="rounded-xl px-3 py-2.5 text-[14px] font-bold text-ink-soft hover:bg-sand-100"
                  >
                    {r.label}
                  </Link>
                ))}
                <a
                  href="https://fujairah-programme.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[14px] font-bold text-ink-soft hover:bg-sand-100"
                >
                  موقع البرنامج
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </header>
      </div>
    </div>
  );
}
