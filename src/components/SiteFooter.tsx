import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Crest } from "@/components/ui";

const COLUMNS = [
  {
    title: "المنظومة",
    links: [
      { href: "/paths", label: "المسارات التعليمية" },
      { href: "/assessment", label: "قياس المستوى المالي" },
      { href: "/training", label: "البرامج التدريبية المباشرة" },
      { href: "/advisor", label: "استشارة مع مستشار مالي" },
      { href: "/rewards", label: "المكافآت والنقاط" },
    ],
  },
  {
    title: "اللوحات",
    links: [
      { href: "/dashboard", label: "منصة المستفيد" },
      { href: "/schools", label: "لوحات المدارس" },
      { href: "/executive", label: "لوحة المؤشرات التنفيذية" },
      { href: "/impact", label: "قياس الأثر" },
    ],
  },
  {
    title: "الوصول السريع",
    links: [
      { href: "/demo", label: "استعرض التجربة" },
      { href: "/#about", label: "عن البرنامج" },
      { href: "/#journey", label: "رحلة المستفيد" },
      { href: "/#contact", label: "تواصل معنا" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="mt-20 border-t border-line bg-white">
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Crest />
            <p className="body mt-5 max-w-sm">
              منظومة رقمية وتدريبية تبني سلوكاً مالياً واعياً لدى أبناء الفجيرة، من المدرسة إلى مختلف
              مراحل الحياة.
            </p>
            <div className="mt-6 grid gap-2.5 text-[13.5px] font-semibold text-ink-soft">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-500" />
                إمارة الفجيرة — دولة الإمارات العربية المتحدة
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-500" />
                <span dir="ltr" className="ltr-num">
                  info@fujairah-financial.ae
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-500" />
                <span dir="ltr" className="ltr-num">
                  +971 9 000 0000
                </span>
              </div>
            </div>
            <a
              href="https://fujairah-programme.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-6 !py-2.5 text-[13.5px]"
            >
              موقع البرنامج
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-4 text-[13px] font-extrabold uppercase tracking-[.14em] text-navy-900">
                {col.title}
              </div>
              <ul className="grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] font-semibold text-ink-soft transition-colors hover:text-navy-800"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-gold-100 bg-gold-50/60 px-5 py-4">
          <p className="text-[13px] font-bold leading-relaxed text-gold-700">
            جميع الأسماء والبيانات المعروضة في هذا النموذج تجريبية وغير حقيقية. نموذج تجريبي لأغراض
            العرض فقط، ولا يمثل بيانات حكومية رسمية. الشعار المستخدم عنصر توضيحي بديل.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[13px] font-semibold text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 منظومة الفجيرة للوعي والتمكين المالي — نموذج عرض تفاعلي</div>
          <div className="flex items-center gap-4">
            <span>سياسة الخصوصية</span>
            <span className="h-3 w-px bg-line" />
            <span>شروط الاستخدام</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
