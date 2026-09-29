import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardCheck,
  Gauge,
  MapPin,
  Medal,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { ScoreTrend, VerticalBars } from "@/components/charts";
import { Delta, DemoNote, Num, Pct, Progress, Stat, Tag } from "@/components/ui";
import { SCHOOLS, schoolById } from "@/data/schools";
import { programById } from "@/data/training";
import { arDate } from "@/lib/text";

export function generateStaticParams() {
  return SCHOOLS.map((s) => ({ id: s.id }));
}

const STATUS_TONE: Record<string, string> = {
  "متقدم": "bg-emerald-50 text-emerald-700",
  "مستقر": "bg-sky-50 text-sky-700",
  "يحتاج دعماً": "bg-amber-50 text-amber-700",
};

export default async function SchoolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const school = schoolById(id);
  if (!school) notFound();

  const topClasses = [...school.classes].sort((a, b) => b.awareness - a.awareness).slice(0, 2);
  const needSupport = school.classes.filter((c) => c.status === "يحتاج دعماً");
  const programs = school.upcomingPrograms.map(programById).filter(Boolean);
  const levelData = school.levelMix.map((l) => ({ label: l.level, الطلبة: l.value }));
  const classData = school.classes.map((c) => ({ label: c.grade, "متوسط الوعي": c.awareness, "متوسط التقدم": c.progress }));

  return (
    <>
      <PageHeader
        eyebrow={`لوحة المدرسة · ${school.area}`}
        title={school.name}
        description={`المدير: ${school.principal} — لوحة أداء تُظهر مشاركة الطلبة ومستوى الوعي المالي وتقدّم كل صف.`}
        breadcrumbs={[
          { href: "/schools", label: "المدارس" },
          { href: `/school/${school.id}`, label: school.name },
        ]}
        action={
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <Tag tone={school.rank <= 3 ? "bg-gold-50 text-gold-700" : "bg-sand-100 text-ink-soft"}>
              <Trophy className="h-3.5 w-3.5" />
              الترتيب <Num value={school.rank} /> من <Num value={SCHOOLS.length} />
            </Tag>
            <Tag tone="bg-emerald-50 text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              <Delta value={school.trend} /> نقطة هذا الفصل
            </Tag>
          </div>
        }
      />

      <section className="section">
        <div className="shell">
          {/* المؤشرات */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Stat label="عدد الطلبة" value={<Num value={school.students} />} icon={<Users className="h-5 w-5" />} />
            <Stat label="نسبة التسجيل" value={<Pct value={school.enrollment} />} icon={<UserCheck className="h-5 w-5" />} />
            <Stat
              label="إكمال التقييم"
              value={<Pct value={school.assessmentCompletion} />}
              icon={<ClipboardCheck className="h-5 w-5" />}
            />
            <Stat label="متوسط الوعي" value={<Num value={school.awareness} />} unit="من 100" icon={<Gauge className="h-5 w-5" />} />
            <Stat label="متوسط التقدم" value={<Pct value={school.avgProgress} />} icon={<TrendingUp className="h-5 w-5" />} />
            <Stat label="الشارات المكتسبة" value={<Num value={school.badgesEarned} />} icon={<Medal className="h-5 w-5" />} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* مقارنة الصفوف */}
            <div className="card p-7">
              <div className="mb-5">
                <div className="text-[16px] font-extrabold text-navy-900">مقارنة داخلية بين الصفوف</div>
                <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                  متوسط الوعي المالي مقابل متوسط التقدم في المسار.
                </p>
              </div>
              <VerticalBars
                data={classData}
                keys={["متوسط الوعي", "متوسط التقدم"]}
                colors={["#1F4E81", "#C9952A"]}
                height={300}
              />
            </div>

            {/* توزيع المستويات */}
            <div className="card p-7">
              <div className="mb-5">
                <div className="text-[16px] font-extrabold text-navy-900">توزيع الطلبة على المستويات</div>
                <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                  عدد الطلبة في كل مستوى من مستويات المرحلة المدرسية.
                </p>
              </div>
              <VerticalBars data={levelData} keys={["الطلبة"]} colors={["#36659C"]} height={300} />
            </div>
          </div>

          {/* جدول الصفوف */}
          <div className="card mt-6 overflow-hidden p-0">
            <div className="border-b border-line px-7 py-5">
              <div className="text-[16px] font-extrabold text-navy-900">أداء الصفوف بالتفصيل</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-right">
                <thead>
                  <tr className="border-b border-line bg-sand-50 text-[12.5px] font-extrabold text-ink-faint">
                    <th className="px-7 py-3.5">المرحلة</th>
                    <th className="px-4 py-3.5">عدد الطلبة</th>
                    <th className="px-4 py-3.5">متوسط الوعي</th>
                    <th className="px-4 py-3.5">متوسط التقدم</th>
                    <th className="px-7 py-3.5">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {school.classes.map((c) => (
                    <tr key={c.grade} className="border-b border-line last:border-0">
                      <td className="px-7 py-4 text-[14px] font-extrabold text-navy-900">{c.grade}</td>
                      <td className="px-4 py-4 text-[14px] font-bold text-ink-soft">
                        <Num value={c.students} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 text-[14px] font-extrabold text-navy-900">
                            <Pct value={c.awareness} />
                          </span>
                          <div className="w-28">
                            <Progress value={c.awareness} tone="bg-navy-600" height="h-1.5" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 text-[14px] font-extrabold text-navy-900">
                            <Pct value={c.progress} />
                          </span>
                          <div className="w-28">
                            <Progress value={c.progress} tone="bg-gold-400" height="h-1.5" />
                          </div>
                        </div>
                      </td>
                      <td className="px-7 py-4">
                        <span className={`chip ${STATUS_TONE[c.status]}`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* الصفوف الأعلى أداءً */}
            <div className="card p-6">
              <div className="text-[15px] font-extrabold text-navy-900">الصفوف الأعلى أداءً</div>
              <ul className="mt-4 grid gap-3">
                {topClasses.map((c) => (
                  <li key={c.grade} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-extrabold text-navy-900">{c.grade}</span>
                      <span className="text-[15px] font-extrabold text-emerald-700">
                        <Pct value={c.awareness} />
                      </span>
                    </div>
                    <div className="mt-1 text-[12px] font-semibold text-ink-faint">
                      <Num value={c.students} /> طالباً · تقدّم <Pct value={c.progress} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* الصفوف التي تحتاج دعماً */}
            <div className="card p-6">
              <div className="text-[15px] font-extrabold text-navy-900">الصفوف التي تحتاج دعماً</div>
              {needSupport.length === 0 ? (
                <p className="mt-4 rounded-xl bg-emerald-50/60 px-4 py-3 text-[13.5px] font-semibold text-emerald-800">
                  لا توجد صفوف بحاجة إلى تدخل حالياً.
                </p>
              ) : (
                <ul className="mt-4 grid gap-3">
                  {needSupport.map((c) => (
                    <li key={c.grade} className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-extrabold text-navy-900">{c.grade}</span>
                        <span className="text-[15px] font-extrabold text-amber-700">
                          <Pct value={c.awareness} />
                        </span>
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-ink-faint">
                        تقدّم <Pct value={c.progress} /> — يُقترح جلسة دعم وتفعيل تحدي الميزانية.
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* البرامج القادمة */}
            <div className="card p-6">
              <div className="flex items-center gap-2 text-[15px] font-extrabold text-navy-900">
                <CalendarDays className="h-4.5 w-4.5 text-navy-600" strokeWidth={2} />
                البرامج القادمة
              </div>
              <ul className="mt-4 grid gap-3">
                {programs.map((p) =>
                  p ? (
                    <li key={p.id} className="rounded-xl border border-line p-4">
                      <div className="text-[14px] font-extrabold leading-snug text-navy-900">{p.name}</div>
                      <div className="mt-1.5 text-[12px] font-bold text-ink-faint">
                        <MapPin className="ml-1 inline h-3.5 w-3.5" />
                        {p.city} · {arDate(p.date)}
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-ink-faint">
                        الفئة: {p.audience} — <Num value={p.seatsLeft} /> مقعد متبقٍّ
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
              <Link href="/training" className="btn-secondary mt-4 w-full !py-2.5 text-[13.5px]">
                جميع البرامج
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* تطور المدرسة */}
          <div className="card mt-6 p-7">
            <div className="mb-5">
              <div className="text-[16px] font-extrabold text-navy-900">تطور متوسط الوعي المالي في المدرسة</div>
              <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                سبعة أشهر من القياس المتصل — بيانات تجريبية.
              </p>
            </div>
            <ScoreTrend data={school.monthly} color="#0F7B5A" height={240} />
          </div>

          <DemoNote className="mt-8" />
        </div>
      </section>
    </>
  );
}
