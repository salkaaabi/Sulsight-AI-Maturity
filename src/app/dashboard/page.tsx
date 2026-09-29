"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Lightbulb,
  Lock,
  MapPin,
  Medal,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
} from "lucide-react";
import Icon from "@/components/Icon";
import { ScoreTrend } from "@/components/charts";
import { Delta, DemoNote, EmptyState, Frac, Num, Pct, Progress, Ring, Tag } from "@/components/ui";
import { BADGES, badgeById } from "@/data/badges";
import { PATH_TONES, pathById } from "@/data/paths";
import { programById } from "@/data/training";
import { nextRewardFor } from "@/data/rewards";
import { schoolById } from "@/data/schools";
import { checkEligibility } from "@/lib/eligibility";
import { arDate, daysUntil } from "@/lib/text";
import { useSession } from "@/lib/session";

export default function DashboardPage() {
  const { persona, ready } = useSession();

  if (!ready) {
    return (
      <div className="shell py-24">
        <div className="card h-64 animate-pulse bg-sand-50" />
      </div>
    );
  }

  if (!persona) {
    return (
      <div className="shell py-24">
        <EmptyState
          title="لم يتم اختيار شخصية تجريبية بعد"
          description="منصة المستفيد شخصية بالكامل. اختر إحدى الشخصيات التجريبية الثماني للدخول مباشرة ورؤية بيانات مختلفة لكل شخصية."
          action={
            <Link href="/demo" className="btn-primary">
              استعرض التجربة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />
      </div>
    );
  }

  const path = pathById(persona.pathId);
  const tone = path ? PATH_TONES[path.tone] : PATH_TONES.navy;
  const school = persona.schoolId ? schoolById(persona.schoolId) : undefined;
  const program = programById(persona.nextProgramId);
  const eligibility = program ? checkEligibility(persona, program) : null;
  const nextReward = nextRewardFor(persona.points);
  const improvement = persona.score - persona.baselineScore;

  return (
    <>
      {/* ترويسة شخصية */}
      <section className="border-b border-line bg-white">
        <div className="shell py-10 sm:py-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${tone.soft} text-[20px] font-extrabold ${tone.text}`}>
                {persona.initials}
              </div>
              <div>
                <div className="text-[13px] font-bold text-ink-faint">أهلاً بعودتك</div>
                <h1 className="text-[27px] font-extrabold leading-tight text-navy-900 sm:text-[32px]">
                  {persona.name}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Tag tone={`${tone.soft} ${tone.text}`}>
                    <UserRound className="h-3.5 w-3.5" />
                    {persona.roleLabel}
                  </Tag>
                  {school && <Tag tone="bg-sand-100 text-ink-soft">{school.name}</Tag>}
                  <Tag tone="bg-sand-100 text-ink-soft">
                    <MapPin className="h-3.5 w-3.5" />
                    {persona.city}
                  </Tag>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "التقييم المالي", value: <Num value={persona.score} />, sub: "من 100" },
                { label: "النقاط", value: <Num value={persona.points} />, sub: "نقطة" },
                { label: "الشارات", value: <Num value={persona.badges.length} />, sub: `من ${BADGES.length}` },
                { label: "التحسّن", value: <span className="text-emerald-700"><Delta value={improvement} /></span>, sub: "نقطة منذ البداية" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-sand-50 px-4 py-3.5 text-center">
                  <div className="text-[22px] font-extrabold leading-none text-navy-900">{s.value}</div>
                  <div className="mt-1.5 text-[11.5px] font-bold text-ink-faint">{s.label}</div>
                  <div className="text-[10.5px] font-semibold text-ink-faint">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* العمود الرئيسي */}
          <div className="grid content-start gap-6">
            {/* المستوى والتقدم */}
            <div className="card grid gap-7 p-7 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="mx-auto sm:mx-0">
                <Ring value={persona.score} size={150} stroke={12} sublabel="التقييم المالي" />
              </div>
              <div>
                <div className="eyebrow mb-2">المستوى الحالي</div>
                <div className="text-[23px] font-extrabold text-navy-900">مسار {persona.pathName}</div>
                <p className="body mt-2">{path?.tagline}</p>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-[13px] font-bold">
                    <span className="text-ink-soft">تقدّم المسار</span>
                    <span className="text-navy-900">
                      <Num value={persona.completedModules} /> من <Num value={persona.totalModules} /> وحدات ·{" "}
                      <Pct value={persona.progress} />
                    </span>
                  </div>
                  <Progress value={persona.progress} tone={tone.bar} height="h-2.5" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link href={`/path/${persona.pathId}`} className="btn-primary !py-2.5 text-[13.5px]">
                    متابعة التعلّم
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <Link href="/assessment" className="btn-secondary !py-2.5 text-[13.5px]">
                    إعادة التقييم
                  </Link>
                </div>
              </div>
            </div>

            {/* التحدي الحالي */}
            <div className="card overflow-hidden p-0">
              <div className="flex items-center gap-2.5 border-b border-line bg-gold-50/70 px-6 py-4">
                <Target className="h-4.5 w-4.5 text-gold-600" strokeWidth={2} />
                <span className="text-[14px] font-extrabold text-gold-800">التحدي الحالي</span>
                <span className="mr-auto text-[12.5px] font-bold text-gold-700">
                  متبقٍ <Num value={persona.currentChallenge.daysLeft} /> أيام
                </span>
              </div>
              <div className="p-6">
                <div className="text-[19px] font-extrabold text-navy-900">{persona.currentChallenge.title}</div>
                <p className="body mt-2">{persona.currentChallenge.detail}</p>
                <div className="mt-5">
                  <Progress value={persona.currentChallenge.progress} tone="bg-gold-400" height="h-2" showLabel />
                </div>
              </div>
            </div>

            {/* تطور النتيجة */}
            <div className="card p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[16px] font-extrabold text-navy-900">تطوّر النتيجة بمرور الوقت</div>
                  <p className="mt-1 text-[12.5px] font-semibold text-ink-faint">
                    من <Num value={persona.baselineScore} /> عند التسجيل إلى <Num value={persona.score} /> اليوم
                  </p>
                </div>
                <span className="chip bg-emerald-50 text-emerald-700">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <Delta value={improvement} /> نقطة
                </span>
              </div>
              <ScoreTrend data={persona.scoreHistory} />
            </div>

            {/* توصيات شخصية */}
            <div className="card p-7">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4.5 w-4.5 text-gold-500" strokeWidth={2} />
                <div className="text-[16px] font-extrabold text-navy-900">توصيات شخصية</div>
              </div>
              <p className="mt-1.5 text-[12.5px] font-semibold text-ink-faint">
                مبنية على نتيجتك الحالية ونقاط القوة والفجوات المرصودة.
              </p>
              <ol className="mt-5 grid gap-3">
                {persona.recommendations.map((r, i) => (
                  <li key={r} className="flex items-start gap-3.5 rounded-xl border border-line p-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-700 text-[12.5px] font-extrabold text-white">
                      <Num value={i + 1} />
                    </span>
                    <span className="text-[14.5px] font-semibold leading-relaxed text-ink-soft">{r}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* نقاط القوة والفجوات */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card p-6">
                <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" strokeWidth={2} />
                  نقاط القوة
                </div>
                <ul className="mt-4 grid gap-2">
                  {persona.strengths.map((s) => (
                    <li key={s} className="rounded-lg bg-emerald-50/60 px-3.5 py-2.5 text-[13.5px] font-semibold text-emerald-800">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
                  <Target className="h-4.5 w-4.5 text-amber-600" strokeWidth={2} />
                  فرص التحسين
                </div>
                <ul className="mt-4 grid gap-2">
                  {persona.gaps.map((s) => (
                    <li key={s} className="rounded-lg bg-amber-50/70 px-3.5 py-2.5 text-[13.5px] font-semibold text-amber-800">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* العمود الجانبي */}
          <aside className="grid content-start gap-6">
            {/* الشارات */}
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
                  <Medal className="h-4.5 w-4.5 text-gold-500" strokeWidth={2} />
                  الشارات
                </div>
                <span className="text-[12.5px] font-bold text-ink-faint">
                  <Frac a={persona.badges.length} b={BADGES.length} />
                </span>
              </div>

              <div className="mt-4 text-[12px] font-extrabold text-ink-faint">مكتسبة</div>
              <div className="mt-2.5 grid gap-2">
                {persona.badges.length === 0 && (
                  <div className="rounded-lg bg-sand-50 px-3.5 py-3 text-[13px] font-semibold text-ink-faint">
                    لم تُكتسب شارات بعد — ابدأ بأول تحدٍّ في مسارك.
                  </div>
                )}
                {persona.badges.map((id) => {
                  const b = badgeById(id);
                  if (!b) return null;
                  return (
                    <div key={id} className="flex items-start gap-3 rounded-xl border border-gold-100 bg-gold-50/50 p-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-gold-600">
                        <Icon name={b.icon} className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-navy-900">{b.name}</div>
                        <div className="text-[11.5px] font-semibold leading-snug text-ink-faint">{b.criterion}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 text-[12px] font-extrabold text-ink-faint">القادمة</div>
              <div className="mt-2.5 grid gap-2">
                {persona.nextBadges.map((id) => {
                  const b = badgeById(id);
                  if (!b) return null;
                  return (
                    <div key={id} className="flex items-start gap-3 rounded-xl border border-dashed border-line p-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sand-100 text-ink-faint">
                        <Lock className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-ink-soft">{b.name}</div>
                        <div className="text-[11.5px] font-semibold leading-snug text-ink-faint">{b.criterion}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* البرنامج التدريبي القادم */}
            {program && eligibility && (
              <div className="card overflow-hidden p-0">
                <div className="border-b border-line px-6 py-4">
                  <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
                    <CalendarDays className="h-4.5 w-4.5 text-navy-600" strokeWidth={2} />
                    البرنامج التدريبي القادم
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[16.5px] font-extrabold leading-snug text-navy-900">{program.name}</div>
                  <div className="mt-2.5 grid gap-1.5 text-[12.5px] font-bold text-ink-faint">
                    <span>
                      <MapPin className="ml-1 inline h-3.5 w-3.5" />
                      {program.city} — {program.venue}
                    </span>
                    <span>
                      <CalendarDays className="ml-1 inline h-3.5 w-3.5" />
                      {arDate(program.date)} · بعد <Num value={daysUntil(program.date)} /> يوماً
                    </span>
                  </div>

                  {eligibility.eligible ? (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5">
                      <div className="flex items-center gap-2 text-[13px] font-extrabold text-emerald-800">
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                        مؤهل للالتحاق
                      </div>
                      <p className="mt-1 text-[12px] font-semibold text-emerald-700">
                        استوفيت شروط النقاط والشارات المطلوبة.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                      <div className="flex items-center gap-2 text-[13px] font-extrabold text-amber-800">
                        <Lock className="h-4 w-4" strokeWidth={2.2} />
                        غير مؤهل حالياً
                      </div>
                      <ul className="mt-1.5 grid gap-1 text-[12px] font-semibold text-amber-800">
                        {eligibility.missingPoints > 0 && (
                          <li>
                            • تحتاج <Num value={eligibility.missingPoints} /> نقطة إضافية
                          </li>
                        )}
                        {eligibility.missingBadges.map((b) => (
                          <li key={b}>• تحتاج شارة {b}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link href="/training" className="btn-secondary mt-4 w-full !py-2.5 text-[13.5px]">
                    جميع البرامج
                  </Link>
                </div>
              </div>
            )}

            {/* المكافأة القادمة */}
            {nextReward && (
              <div className="card p-6">
                <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
                  <Trophy className="h-4.5 w-4.5 text-gold-500" strokeWidth={2} />
                  المكافأة القادمة
                </div>
                <div className="mt-4 text-[16px] font-extrabold text-navy-900">{nextReward.name}</div>
                <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-ink-faint">
                  {nextReward.description}
                </p>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-[12.5px] font-bold">
                    <span className="text-ink-soft">
                      <Frac a={persona.points} b={nextReward.points} spaced /> نقطة
                    </span>
                    <span className="text-gold-700">
                      تبقّى <Num value={nextReward.points - persona.points} />
                    </span>
                  </div>
                  <Progress value={(persona.points / nextReward.points) * 100} tone="bg-gold-400" height="h-2" />
                </div>
                <Link href="/rewards" className="btn-secondary mt-4 w-full !py-2.5 text-[13.5px]">
                  صفحة المكافآت
                </Link>
              </div>
            )}

            {/* تغير السلوك */}
            <div className="card p-6">
              <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
                <Sparkles className="h-4.5 w-4.5 text-emerald-600" strokeWidth={2} />
                سلوك تغيّر فعلياً
              </div>
              <ul className="mt-4 grid gap-2.5">
                {persona.behaviourChange.map((b) => (
                  <li key={b} className="rounded-xl bg-emerald-50/60 px-4 py-3 text-[13.5px] font-semibold leading-relaxed text-emerald-800">
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/impact" className="btn-secondary mt-4 w-full !py-2.5 text-[13.5px]">
                تفاصيل قياس الأثر
              </Link>
            </div>

            <DemoNote />
          </aside>
        </div>
      </section>
    </>
  );
}
