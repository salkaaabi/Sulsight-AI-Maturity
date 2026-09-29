import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  ClipboardCheck,
  Gauge,
  MapPin,
  Medal,
  School,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { DualTrend } from "@/components/charts";
import { BarList, Delta, DemoNote, Num, Pct, Progress, Tag } from "@/components/ui";
import {
  AWARENESS_TREND,
  BEHAVIOUR_GAPS,
  BEHAVIOUR_IMPROVEMENT,
  EXEC_KPIS,
  EXEC_LIVE_TRAINING,
  STAGE_DISTRIBUTION,
} from "@/data/executive";
import { SCHOOLS } from "@/data/schools";
import { TRAINING_PROGRAMS } from "@/data/training";
import { arDate } from "@/lib/text";

export const metadata = { title: "لوحة المؤشرات التنفيذية — منظومة الفجيرة للوعي والتمكين المالي" };

const KPI_ICON: Record<string, typeof Users> = {
  Users,
  School,
  ClipboardCheck,
  Gauge,
  TrendingUp,
  BookOpenCheck,
  Medal,
};

export default function ExecutivePage() {
  const topKpis = EXEC_KPIS.slice(0, 6);
  const schoolCompare = [...SCHOOLS]
    .sort((a, b) => b.awareness - a.awareness)
    .map((s) => ({ label: s.name.replace("مدرسة ", ""), value: s.awareness }));
  const upcoming = [...TRAINING_PROGRAMS].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="عرض قيادي"
        title="لوحة المؤشرات التنفيذية"
        description="صورة واحدة عن حالة المنظومة: الانتشار، مستوى الوعي، معدل التحسّن، والسلوكيات التي تحتاج تدخلاً."
        breadcrumbs={[{ href: "/executive", label: "لوحة المؤشرات التنفيذية" }]}
        action={
          <div className="rounded-xl border border-line bg-sand-50 px-5 py-3.5 text-right">
            <div className="text-[11.5px] font-bold text-ink-faint">فترة التقرير</div>
            <div className="text-[14.5px] font-extrabold text-navy-900">مارس — سبتمبر 2026</div>
          </div>
        }
      />

      <section className="section">
        <div className="shell">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {topKpis.map((k) => {
              const IconCmp = KPI_ICON[k.icon] ?? Users;
              return (
                <div key={k.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div className="text-[12.5px] font-bold leading-snug text-ink-faint">{k.label}</div>
                    <IconCmp className="h-5 w-5 shrink-0 text-navy-600" strokeWidth={1.9} />
                  </div>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-[28px] font-extrabold leading-none text-navy-900">
                      <Num value={k.value} />
                    </span>
                    <span className="text-[12px] font-bold text-ink-faint">{k.unit}</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[11.5px] font-bold text-emerald-700">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <Delta value={k.delta} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* الاتجاه العام + التدريب المباشر */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="card p-7">
              <div className="mb-5">
                <div className="text-[16px] font-extrabold text-navy-900">اتجاه الوعي المالي</div>
                <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                  متوسط النتيجة من <Num value={100} /> لطلبة المدارس مقابل المرحلة الثانية.
                </p>
              </div>
              <DualTrend
                data={AWARENESS_TREND}
                keys={["الطلبة", "البالغون"]}
                colors={["#1F4E81", "#C9952A"]}
                height={280}
              />
            </div>

            <div className="card p-7">
              <div className="text-[16px] font-extrabold text-navy-900">التدريب المباشر</div>
              <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                البرامج الحضورية في الفجيرة ودبي وأبوظبي.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: "المشاركون", value: EXEC_LIVE_TRAINING.participants },
                  { label: "الجلسات", value: EXEC_LIVE_TRAINING.sessions },
                  { label: "المدن", value: EXEC_LIVE_TRAINING.cities },
                  { label: "الرضا %", value: EXEC_LIVE_TRAINING.satisfaction },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-sand-50 p-4 text-center">
                    <div className="text-[24px] font-extrabold leading-none text-navy-900">
                      <Num value={s.value} />
                    </div>
                    <div className="mt-1.5 text-[11.5px] font-bold text-ink-faint">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/training" className="btn-secondary mt-6 w-full !py-2.5 text-[13.5px]">
                البرامج التدريبية
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* التوزيع + مقارنة المدارس */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="card p-7">
              <div className="mb-5">
                <div className="text-[16px] font-extrabold text-navy-900">توزيع النتائج حسب المرحلة</div>
                <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                  متوسط الوعي المالي لكل مسار في المنظومة.
                </p>
              </div>
              <ul className="grid gap-3">
                {STAGE_DISTRIBUTION.map((s) => (
                  <li key={s.stage}>
                    <div className="mb-1.5 flex items-center justify-between text-[13px] font-bold">
                      <span className="text-ink-soft">{s.stage}</span>
                      <span className="text-navy-900">
                        <Pct value={s.value} />
                        <span className="mr-2 text-[11.5px] font-semibold text-ink-faint">
                          (<Num value={s.learners} /> مستفيد)
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={s.value}
                      tone={s.value >= 75 ? "bg-emerald-500" : s.value >= 65 ? "bg-navy-600" : "bg-amber-500"}
                      height="h-1.5"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[16px] font-extrabold text-navy-900">مقارنة المدارس</div>
                  <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                    متوسط الوعي المالي — <Num value={SCHOOLS.length} /> مدارس مشاركة.
                  </p>
                </div>
                <Link href="/schools" className="btn-ghost !px-2.5 !py-1.5 text-[12.5px]">
                  التفاصيل
                </Link>
              </div>
              <BarList items={schoolCompare} highlightFirst />
            </div>
          </div>

          {/* السلوكيات */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="card p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-[16px] font-extrabold text-navy-900">أكثر السلوكيات تحسّناً</div>
                <Tag tone="bg-emerald-50 text-emerald-700">نقاط التحسّن</Tag>
              </div>
              <BarList
                items={BEHAVIOUR_IMPROVEMENT.map((b) => ({ label: b.behaviour, value: b.change }))}
                max={30}
                format="delta"
                tone="bg-emerald-500"
              />
            </div>

            <div className="card p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-[16px] font-extrabold text-navy-900">سلوكيات تحتاج تدخلاً</div>
                <Tag tone="bg-amber-50 text-amber-700">أولوية</Tag>
              </div>
              <ul className="grid gap-3">
                {BEHAVIOUR_GAPS.map((g) => (
                  <li key={g.behaviour} className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[14.5px] font-extrabold text-navy-900">{g.behaviour}</span>
                      <span className="text-[14px] font-extrabold text-amber-700">
                        <Delta value={g.change} />
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-ink-soft">{g.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* البرامج القادمة */}
          <div className="card mt-6 overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line px-7 py-5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4.5 w-4.5 text-navy-600" strokeWidth={2} />
                <span className="text-[16px] font-extrabold text-navy-900">البرامج التدريبية القادمة</span>
              </div>
              <Link href="/training" className="btn-ghost !px-2.5 !py-1.5 text-[12.5px]">
                عرض الكل
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-right">
                <thead>
                  <tr className="border-b border-line bg-sand-50 text-[12.5px] font-extrabold text-ink-faint">
                    <th className="px-7 py-3.5">البرنامج</th>
                    <th className="px-4 py-3.5">المدينة</th>
                    <th className="px-4 py-3.5">التاريخ</th>
                    <th className="px-4 py-3.5">الفئة</th>
                    <th className="px-7 py-3.5">المقاعد</th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((p) => (
                    <tr key={p.id} className="border-b border-line last:border-0">
                      <td className="px-7 py-4 text-[14px] font-extrabold text-navy-900">{p.name}</td>
                      <td className="px-4 py-4">
                        <span className="chip bg-navy-50 text-navy-700">
                          <MapPin className="h-3.5 w-3.5" />
                          {p.city}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[13.5px] font-bold text-ink-soft">{arDate(p.date)}</td>
                      <td className="px-4 py-4 text-[13.5px] font-semibold text-ink-soft">{p.audience}</td>
                      <td className="px-7 py-4 text-[13.5px] font-bold text-gold-700">
                        <Num value={p.seatsLeft} /> من <Num value={p.seatsTotal} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-white px-6 py-5">
            <DemoNote />
          </div>
        </div>
      </section>
    </>
  );
}
