"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, Medal, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { Delta, DemoNote, Num, Progress, Tag } from "@/components/ui";
import { REWARDS, nextRewardFor } from "@/data/rewards";
import { BADGES } from "@/data/badges";
import { useSession } from "@/lib/session";

const TONE: Record<string, { soft: string; text: string; bar: string }> = {
  sky: { soft: "bg-sky-50", text: "text-sky-700", bar: "bg-sky-500" },
  emerald: { soft: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-500" },
  gold: { soft: "bg-gold-50", text: "text-gold-600", bar: "bg-gold-400" },
  violet: { soft: "bg-violet-50", text: "text-violet-700", bar: "bg-violet-500" },
  rose: { soft: "bg-rose-50", text: "text-rose-700", bar: "bg-rose-500" },
};

export default function RewardsPage() {
  const { persona } = useSession();
  const points = persona?.points ?? 0;
  const next = nextRewardFor(points);

  return (
    <>
      <PageHeader
        eyebrow="التحفيز"
        title="المكافآت والنقاط"
        description="النقاط تُكتسب بإنجاز التحديات والوحدات، والشارات تُمنح عند تغيّر سلوك محدد. المكافآت خمسة مستويات تتدرج من الشهادة الرقمية إلى تجربة معرفية خاصة."
        breadcrumbs={[{ href: "/rewards", label: "المكافآت" }]}
        action={
          persona ? undefined : (
            <Link href="/demo" className="btn-secondary">
              اختر شخصية لعرض رصيدك
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )
        }
      >
        {persona && (
          <div className="grid gap-6 rounded-2xl border border-line bg-sand-50 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="text-center sm:text-right">
              <div className="text-[12px] font-bold text-ink-faint">رصيد {persona.name}</div>
              <div className="mt-1 text-[38px] font-extrabold leading-none text-navy-900">
                <Num value={points} />
              </div>
              <div className="text-[12px] font-bold text-ink-faint">نقطة</div>
            </div>
            {next ? (
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[13px] font-bold">
                  <span className="text-ink-soft">
                    المكافأة القادمة: <span className="text-navy-900">{next.name}</span>
                  </span>
                  <span className="text-gold-700">
                    تبقّى <Num value={next.points - points} /> نقطة
                  </span>
                </div>
                <Progress value={(points / next.points) * 100} tone="bg-gold-400" height="h-2.5" />
                <div className="mt-2 flex justify-between text-[11.5px] font-bold text-ink-faint">
                  <span>
                    <Num value={points} />
                  </span>
                  <span>
                    <Num value={next.points} />
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-emerald-50 px-5 py-4 text-[14px] font-bold text-emerald-800">
                تم بلوغ أعلى مستوى من المكافآت المتاحة في النموذج.
              </div>
            )}
          </div>
        )}
      </PageHeader>

      <section className="section">
        <div className="shell">
          <div className="mb-8">
            <h2 className="h3">مستويات المكافآت</h2>
            <p className="body mt-2">كل مستوى يفتح عند بلوغ عدد محدد من النقاط.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5 sm:grid-cols-2">
            {REWARDS.map((r) => {
              const t = TONE[r.tone] ?? TONE.sky;
              const unlocked = points >= r.points;
              return (
                <div
                  key={r.id}
                  className={`card flex flex-col p-6 ${unlocked ? "!border-emerald-200" : ""}`}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl ${t.soft} ${t.text}`}>
                    <Icon name={r.icon} className="h-5.5 w-5.5" />
                  </div>
                  <div className="mt-4 text-[22px] font-extrabold leading-none text-navy-900">
                    <Num value={r.points} />
                  </div>
                  <div className="text-[11.5px] font-bold text-ink-faint">نقطة</div>
                  <div className="mt-3 text-[15.5px] font-extrabold leading-snug text-navy-900">{r.name}</div>
                  <p className="mt-2 flex-1 text-[12.5px] font-semibold leading-relaxed text-ink-faint">
                    {r.description}
                  </p>
                  <div className="mt-4 border-t border-line pt-4">
                    {persona ? (
                      unlocked ? (
                        <span className="chip bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          متاحة الآن
                        </span>
                      ) : (
                        <span className="chip bg-sand-100 text-ink-faint">
                          <Lock className="h-3.5 w-3.5" />
                          تبقّى <Num value={r.points - points} />
                        </span>
                      )
                    ) : (
                      <span className="chip bg-sand-100 text-ink-faint">
                        <Num value={r.claimedBy} /> مستفيد حصل عليها
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* الشارات */}
          <div className="mt-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="h3">الشارات الثماني</h2>
                <p className="body mt-2">
                  لا تُمنح الشارة عند مشاهدة المحتوى، بل عند إنجاز واضح وقابل للتحقق.
                </p>
              </div>
              <Link href="/paths" className="btn-secondary">
                المسارات التي تمنح الشارات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BADGES.map((b) => {
                const earned = persona?.badges.includes(b.id);
                const upcoming = persona?.nextBadges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`card p-6 ${earned ? "!border-gold-200 bg-gold-50/30" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-2xl ${
                          earned ? "bg-gold-100 text-gold-700" : "bg-sand-100 text-ink-faint"
                        }`}
                      >
                        <Icon name={b.icon} className="h-5.5 w-5.5" />
                      </div>
                      {earned && (
                        <Tag tone="bg-gold-100 text-gold-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          مكتسبة
                        </Tag>
                      )}
                      {!earned && upcoming && <Tag tone="bg-navy-50 text-navy-700">قادمة</Tag>}
                    </div>
                    <div className="mt-4 text-[16px] font-extrabold text-navy-900">{b.name}</div>
                    <p className="mt-2 text-[12.5px] font-semibold leading-relaxed text-ink-faint">{b.criterion}</p>
                    <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3.5 text-[12.5px] font-bold text-gold-700">
                      <Medal className="h-3.5 w-3.5" />
                      <Delta value={b.points} /> نقطة عند الحصول عليها
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 rounded-2xl border border-navy-100 bg-navy-50/60 p-7">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" strokeWidth={2} />
              <div>
                <div className="text-[15px] font-extrabold text-navy-900">كيف تُحتسب النقاط؟</div>
                <ul className="mt-3 grid gap-2 text-[13.5px] font-semibold text-ink-soft sm:grid-cols-2">
                  <li>• إكمال وحدة تعليمية قصيرة: من <Num value={40} /> إلى <Num value={90} /> نقطة</li>
                  <li>• اجتياز اختبار قصير: <Num value={120} /> نقطة</li>
                  <li>• إنهاء تحدٍّ تطبيقي: من <Num value={200} /> إلى <Num value={350} /> نقطة</li>
                  <li>• الحصول على شارة: من <Num value={300} /> إلى <Num value={700} /> نقطة</li>
                  <li>• حضور برنامج تدريبي مباشر: <Num value={500} /> نقطة</li>
                  <li>• الاستمرارية <Num value={4} /> أسابيع متصلة: <Num value={150} /> نقطة</li>
                </ul>
              </div>
            </div>
          </div>

          <DemoNote className="mt-10" />
        </div>
      </section>
    </>
  );
}
