"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Lock,
  MapPin,
  Medal,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { DemoNote, Num, Progress, Tag } from "@/components/ui";
import { TRAINING_PROGRAMS } from "@/data/training";
import { badgeById } from "@/data/badges";
import { checkEligibility } from "@/lib/eligibility";
import { arDate, daysUntil } from "@/lib/text";
import { useSession } from "@/lib/session";

const CITIES = ["الكل", "الفجيرة", "دبي", "أبوظبي"] as const;

export default function TrainingPage() {
  const [city, setCity] = useState<(typeof CITIES)[number]>("الكل");
  const { persona } = useSession();

  const programs = TRAINING_PROGRAMS.filter((p) => city === "الكل" || p.city === city).sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  return (
    <>
      <PageHeader
        eyebrow="التدريب المباشر"
        title="تعلّم مباشر وورش حضورية"
        description="التعلم الرقمي يبني الأساس، والبرامج الحضورية تحوّله إلى تطبيق. لكل برنامج شروط التحاق مرتبطة بالنقاط والشارات، فلا يُمنح المقعد بالتسجيل وحده."
        breadcrumbs={[{ href: "/training", label: "البرامج التدريبية" }]}
        action={
          persona ? (
            <div className="rounded-xl border border-line bg-sand-50 px-4 py-3 text-right">
              <div className="text-[11.5px] font-bold text-ink-faint">الشخصية النشطة</div>
              <div className="text-[14.5px] font-extrabold text-navy-900">{persona.name}</div>
              <div className="text-[12px] font-bold text-gold-600">
                <Num value={persona.points} /> نقطة · <Num value={persona.badges.length} /> شارات
              </div>
            </div>
          ) : (
            <Link href="/demo" className="btn-secondary">
              اختر شخصية لمعرفة أهليتك
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-bold text-ink-faint">المدينة:</span>
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={`rounded-lg px-4 py-2 text-[13.5px] font-bold transition-colors ${
                city === c ? "bg-navy-700 text-white" : "border border-line bg-white text-ink-soft hover:bg-sand-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-2">
            {programs.map((p) => {
              const e = checkEligibility(persona, p);
              const fill = Math.round(((p.seatsTotal - p.seatsLeft) / p.seatsTotal) * 100);
              return (
                <article key={p.id} className="card flex flex-col p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag tone="bg-navy-50 text-navy-700">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.city}
                    </Tag>
                    <Tag tone="bg-emerald-50 text-emerald-700">{p.format}</Tag>
                    <Tag tone="bg-sand-100 text-ink-soft">
                      <Clock className="h-3.5 w-3.5" />
                      {p.duration}
                    </Tag>
                    <Tag tone="bg-sand-100 text-ink-soft">
                      <Users className="h-3.5 w-3.5" />
                      {p.audience}
                    </Tag>
                  </div>

                  <h2 className="mt-4 text-[20px] font-extrabold leading-snug text-navy-900">{p.name}</h2>
                  <p className="body mt-2.5">{p.summary}</p>

                  <div className="mt-5 grid gap-2 rounded-xl bg-sand-50 p-4 text-[13px] font-bold text-ink-soft">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-navy-600" />
                      {arDate(p.date)} · بعد <Num value={daysUntil(p.date)} /> يوماً
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" />
                      <span>{p.venue}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" />
                      <span>الجهة المستضيفة: {p.host}</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-[12.5px] font-bold">
                      <span className="text-ink-soft">المقاعد</span>
                      <span className="text-gold-700">
                        <Num value={p.seatsLeft} /> متبقٍّ من <Num value={p.seatsTotal} />
                      </span>
                    </div>
                    <Progress value={fill} tone="bg-navy-600" height="h-1.5" />
                  </div>

                  <div className="mt-5 border-t border-line pt-5">
                    <div className="text-[12.5px] font-extrabold text-navy-900">شروط الالتحاق</div>
                    <ul className="mt-2.5 grid gap-1.5">
                      {p.conditions.map((c) => (
                        <li key={c} className="text-[13px] font-semibold text-ink-soft">
                          • {c}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="chip bg-gold-50 text-gold-700">
                        <Medal className="h-3.5 w-3.5" />
                        <Num value={p.requiredPoints} /> نقطة مطلوبة
                      </span>
                      {p.requiredBadges.length === 0 ? (
                        <span className="chip bg-sand-100 text-ink-soft">دون شارات مطلوبة</span>
                      ) : (
                        p.requiredBadges.map((b) => (
                          <span key={b} className="chip bg-navy-50 text-navy-700">
                            شارة {badgeById(b)?.name}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-line pt-5">
                    <div className="text-[12.5px] font-extrabold text-navy-900">مخرجات البرنامج</div>
                    <ul className="mt-2.5 grid gap-1.5">
                      {p.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2 text-[13px] font-semibold text-ink-soft">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    {!persona ? (
                      <Link href="/demo" className="btn-secondary w-full !py-3 text-[14px]">
                        اختر شخصية لعرض الأهلية
                      </Link>
                    ) : e.eligible ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                        <div className="flex items-center gap-2 text-[13.5px] font-extrabold text-emerald-800">
                          <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={2.2} />
                          {persona.name.split(" ")[0]} مؤهل للالتحاق بهذا البرنامج
                        </div>
                        <button type="button" className="btn-primary mt-3 w-full !py-2.5 text-[13.5px]">
                          تأكيد الحجز
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                        <div className="flex items-center gap-2 text-[13.5px] font-extrabold text-amber-800">
                          <Lock className="h-4.5 w-4.5" strokeWidth={2.2} />
                          غير مؤهل حالياً — ما ينقص {persona.name.split(" ")[0]}
                        </div>
                        <ul className="mt-2 grid gap-1 text-[12.5px] font-semibold text-amber-800">
                          {e.missingPoints > 0 && (
                            <li>
                              • <Num value={e.missingPoints} /> نقطة إضافية
                            </li>
                          )}
                          {e.missingBadges.map((b) => (
                            <li key={b}>• شارة {b}</li>
                          ))}
                        </ul>
                        <Link href={`/path/${persona.pathId}`} className="btn-secondary mt-3 w-full !py-2.5 text-[13.5px]">
                          أكمل مسارك للتأهل
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <DemoNote className="mt-10" />
        </div>
      </section>
    </>
  );
}
