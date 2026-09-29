import Link from "next/link";
import { ArrowLeft, MapPin, Trophy, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { BarList, DemoNote, Num, Pct, Progress, Tag } from "@/components/ui";
import { SCHOOLS, TOTAL_STUDENTS } from "@/data/schools";

export const metadata = { title: "المدارس المشاركة — منظومة الفجيرة للوعي والتمكين المالي" };

export default function SchoolsPage() {
  const ranked = [...SCHOOLS].sort((a, b) => a.rank - b.rank);
  const chartData = ranked.map((s) => ({
    label: s.name.replace("مدرسة ", ""),
    value: s.awareness,
    note: `${s.students.toLocaleString("en-US")} طالباً`,
  }));
  const avgAwareness = Math.round(SCHOOLS.reduce((a, s) => a + s.awareness, 0) / SCHOOLS.length);
  const avgEnrollment = Math.round(SCHOOLS.reduce((a, s) => a + s.enrollment, 0) / SCHOOLS.length);

  return (
    <>
      <PageHeader
        eyebrow="المدارس"
        title="المدارس المشاركة في المنظومة"
        description="ثماني مدارس في إمارة الفجيرة، لكل منها لوحة أداء مستقلة تُظهر التسجيل والتقييم والتقدم وترتيب المدرسة."
        breadcrumbs={[{ href: "/schools", label: "المدارس" }]}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "عدد المدارس", value: <Num value={SCHOOLS.length} /> },
            { label: "إجمالي الطلبة", value: <Num value={TOTAL_STUDENTS} /> },
            { label: "متوسط الوعي المالي", value: <Pct value={avgAwareness} /> },
            { label: "متوسط نسبة التسجيل", value: <Pct value={avgEnrollment} /> },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-sand-50 px-4 py-3.5">
              <div className="text-[11.5px] font-bold text-ink-faint">{s.label}</div>
              <div className="mt-1 text-[22px] font-extrabold text-navy-900">{s.value}</div>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="shell">
          <div className="card mb-10 p-7">
            <div className="mb-5">
              <div className="text-[16px] font-extrabold text-navy-900">مقارنة متوسط الوعي المالي بين المدارس</div>
              <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                النسبة من <Num value={100} /> — بيانات تجريبية للعرض.
              </p>
            </div>
            <BarList items={chartData} highlightFirst />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {ranked.map((s) => (
              <Link
                key={s.id}
                href={`/school/${s.id}`}
                className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag tone={s.rank <= 3 ? "bg-gold-50 text-gold-700" : "bg-sand-100 text-ink-soft"}>
                        <Trophy className="h-3.5 w-3.5" />
                        الترتيب <Num value={s.rank} />
                      </Tag>
                      <Tag tone="bg-sand-100 text-ink-soft">
                        <MapPin className="h-3.5 w-3.5" />
                        {s.area}
                      </Tag>
                    </div>
                    <div className="mt-3 text-[18px] font-extrabold leading-snug text-navy-900">{s.name}</div>
                    <div className="mt-1 text-[12.5px] font-bold text-ink-faint">المدير: {s.principal}</div>
                  </div>
                  <div className="shrink-0 text-center">
                    <div className="text-[28px] font-extrabold leading-none text-navy-900">
                      <Num value={s.awareness} />
                      <span className="text-[16px]">%</span>
                    </div>
                    <div className="mt-1 text-[11px] font-bold text-ink-faint">متوسط الوعي</div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
                  {[
                    { label: "الطلبة", value: <Num value={s.students} />, icon: <Users className="h-3.5 w-3.5" /> },
                    { label: "التسجيل", value: <Pct value={s.enrollment} /> },
                    { label: "إكمال التقييم", value: <Pct value={s.assessmentCompletion} /> },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-[15px] font-extrabold text-navy-900">{m.value}</div>
                      <div className="text-[11px] font-bold text-ink-faint">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-[12px] font-bold text-ink-faint">
                    <span>متوسط التقدم</span>
                    <span className="text-navy-800">
                      <Pct value={s.avgProgress} />
                    </span>
                  </div>
                  <Progress value={s.avgProgress} tone="bg-navy-600" height="h-1.5" />
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-[13.5px] font-extrabold text-navy-700 transition-transform group-hover:-translate-x-1">
                  لوحة المدرسة
                  <ArrowLeft className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <DemoNote className="mt-10" />
        </div>
      </section>
    </>
  );
}
