"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Brain, HeartHandshake, Repeat, Sparkles, Wrench } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { DimensionRadar, ScoreTrend } from "@/components/charts";
import { BarList, Delta, DemoNote, Num, Pct, Progress, Tag } from "@/components/ui";
import { BEHAVIOUR_GAPS, BEHAVIOUR_IMPROVEMENT, PROGRAM_IMPACT_SUMMARY } from "@/data/executive";
import { useSession } from "@/lib/session";
import { PERSONAS } from "@/data/users";

const FRAMEWORK = [
  { key: "المعرفة", icon: Brain, note: "هل يفهم المفاهيم المالية الأساسية ويطبّقها في سؤال واقعي؟" },
  { key: "السلوك", icon: Repeat, note: "هل تغيّر ما يفعله فعلاً: التسجيل، المقارنة، الادخار؟" },
  { key: "الثقة", icon: HeartHandshake, note: "هل يشعر بقدرته على إدارة مبلغ أكبر واتخاذ قرار مالي؟" },
  { key: "العادات", icon: Sparkles, note: "هل أصبح السلوك متكرراً دون تذكير خارجي؟" },
  { key: "التطبيق", icon: Wrench, note: "هل أنتج مخرجاً حقيقياً: ميزانية، هدف ادخار، خطة راتب؟" },
];

export default function ImpactPage() {
  const { persona } = useSession();
  const subject = persona ?? PERSONAS[0];
  const improvement = subject.score - subject.baselineScore;
  const programDelta = PROGRAM_IMPACT_SUMMARY.current - PROGRAM_IMPACT_SUMMARY.baseline;

  return (
    <>
      <PageHeader
        eyebrow="قياس الأثر"
        title="الأثر يُقاس بالسلوك لا بعدد الدروس"
        description="نقيس خمسة محاور لكل مستفيد: المعرفة، السلوك، الثقة، العادات، والتطبيق — ونقارن بين التقييم الأولي والتقييم الحالي."
        breadcrumbs={[{ href: "/impact", label: "الأثر" }]}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "التقييم الأولي على مستوى البرنامج", value: <Num value={PROGRAM_IMPACT_SUMMARY.baseline} /> },
            { label: "التقييم الحالي", value: <Num value={PROGRAM_IMPACT_SUMMARY.current} /> },
            {
              label: "التحسّن",
              value: (
                <span className="text-emerald-700">
                  <Delta value={programDelta} />
                </span>
              ),
            },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-sand-50 px-5 py-4">
              <div className="text-[11.5px] font-bold text-ink-faint">{s.label}</div>
              <div className="mt-1 text-[28px] font-extrabold leading-none text-navy-900">{s.value}</div>
            </div>
          ))}
        </div>
      </PageHeader>

      {/* إطار القياس */}
      <section className="section">
        <div className="shell">
          <div className="mb-8">
            <div className="eyebrow mb-2">إطار القياس</div>
            <h2 className="h2">خمسة محاور بدل رقم واحد</h2>
            <p className="lede mt-4 max-w-2xl">
              الاكتفاء بعدد الدروس المكتملة يعطي صورة مضللة. الإطار التالي يفصل بين ما يعرفه المستفيد
              وما يفعله فعلاً.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FRAMEWORK.map((f) => (
              <div key={f.key} className="card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <f.icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div className="mt-4 text-[16px] font-extrabold text-navy-900">{f.key}</div>
                <p className="mt-2 text-[12.5px] font-semibold leading-relaxed text-ink-faint">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قبل وبعد لمستفيد */}
      <section className="section bg-white">
        <div className="shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">قبل وبعد</div>
              <h2 className="h2">أثر المنظومة على مستفيد واحد</h2>
              <p className="body mt-3">
                {persona ? "الشخصية النشطة حالياً" : "مثال تجريبي — اختر شخصية لعرض بياناتها"}:{" "}
                <span className="font-extrabold text-navy-900">{subject.name}</span> — {subject.roleLabel}
              </p>
            </div>
            {!persona && (
              <Link href="/demo" className="btn-secondary">
                استعرض التجربة
                <ArrowLeft className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="card p-7">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-sand-50 p-4">
                  <div className="text-[11.5px] font-bold text-ink-faint">التقييم الأولي</div>
                  <div className="mt-1 text-[30px] font-extrabold leading-none text-ink-faint">
                    <Num value={subject.baselineScore} />
                  </div>
                </div>
                <div className="rounded-xl bg-navy-50 p-4">
                  <div className="text-[11.5px] font-bold text-navy-700">التقييم الحالي</div>
                  <div className="mt-1 text-[30px] font-extrabold leading-none text-navy-900">
                    <Num value={subject.score} />
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4">
                  <div className="text-[11.5px] font-bold text-emerald-700">التحسّن</div>
                  <div className="mt-1 text-[30px] font-extrabold leading-none text-emerald-700">
                    <Delta value={improvement} />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-4 text-[14px] font-extrabold text-navy-900">تطور النتيجة</div>
                <ScoreTrend data={subject.scoreHistory} height={200} />
              </div>

              <div className="mt-7 border-t border-line pt-6">
                <div className="text-[14px] font-extrabold text-navy-900">سلوك تغيّر فعلياً</div>
                <ul className="mt-3.5 grid gap-2.5">
                  {subject.behaviourChange.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 rounded-xl bg-emerald-50/60 px-4 py-3 text-[13.5px] font-semibold leading-relaxed text-emerald-800"
                    >
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card p-7">
              <div className="mb-2 text-[16px] font-extrabold text-navy-900">المحاور الخمسة — قبل وبعد</div>
              <p className="mb-4 text-[12.5px] font-semibold text-ink-faint">
                مقارنة بين التقييم الأولي عند التسجيل والتقييم الحالي.
              </p>
              <DimensionRadar data={subject.dimensions} height={310} />
              <ul className="mt-6 grid gap-3">
                {subject.dimensions.map((d) => (
                  <li key={d.key}>
                    <div className="mb-1.5 flex items-center justify-between text-[13px] font-bold">
                      <span className="text-ink-soft">{d.key}</span>
                      <span className="text-navy-900">
                        <span dir="ltr" className="ltr-num">
                          {d.before} → {d.after}
                        </span>
                        <span className="mr-2 text-emerald-700">
                          <Delta value={d.after - d.before} />
                        </span>
                      </span>
                    </div>
                    <Progress value={d.after} tone="bg-navy-600" height="h-1.5" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* على مستوى البرنامج */}
      <section className="section">
        <div className="shell">
          <div className="mb-8">
            <div className="eyebrow mb-2">على مستوى المنظومة</div>
            <h2 className="h2">أي السلوكيات تحسّنت، وأيها يحتاج تدخلاً؟</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
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
                <Tag tone="bg-amber-50 text-amber-700">أولوية التصميم القادم</Tag>
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

          <div className="card mt-6 grid gap-6 p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="text-[16px] font-extrabold text-navy-900">المسافة المتبقية للهدف</div>
              <p className="mt-1.5 text-[13px] font-semibold text-ink-faint">
                الهدف المعتمد للبرنامج هو <Num value={PROGRAM_IMPACT_SUMMARY.target} /> نقطة كمتوسط وعي مالي.
              </p>
              <div className="mt-4">
                <Progress
                  value={(PROGRAM_IMPACT_SUMMARY.current / PROGRAM_IMPACT_SUMMARY.target) * 100}
                  tone="bg-navy-600"
                  height="h-2.5"
                />
                <div className="mt-2 flex justify-between text-[12px] font-bold text-ink-faint">
                  <span>
                    الحالي <Num value={PROGRAM_IMPACT_SUMMARY.current} />
                  </span>
                  <span>
                    الهدف <Num value={PROGRAM_IMPACT_SUMMARY.target} />
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[40px] font-extrabold leading-none text-navy-900">
                <Pct value={Math.round((PROGRAM_IMPACT_SUMMARY.current / PROGRAM_IMPACT_SUMMARY.target) * 100)} />
              </div>
              <div className="mt-1 text-[12px] font-bold text-ink-faint">من الهدف</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/executive" className="btn-primary">
              لوحة المؤشرات التنفيذية
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/schools" className="btn-secondary">
              أداء المدارس
            </Link>
          </div>

          <DemoNote className="mt-8" />
        </div>
      </section>
    </>
  );
}
