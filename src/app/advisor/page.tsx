"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, MapPin, ShieldCheck, Video } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import SmartImage from "@/components/SmartImage";
import Icon from "@/components/Icon";
import { DemoNote, Num, Tag } from "@/components/ui";
import { ADVISORS, ADVISOR_CITIES, CONSULTATION_TYPES } from "@/data/advisor";

export default function AdvisorPage() {
  return (
    <>
      <PageHeader
        eyebrow="استشارة فردية"
        title="احجز موعداً مع مستشار مالي"
        description="جلسة فردية مع مستشار معتمد لترجمة نتيجة تقييمك إلى خطة عملية. متاحة حضورياً في الفجيرة ودبي وأبوظبي، أو عن بُعد عبر المنصة."
        breadcrumbs={[{ href: "/advisor", label: "استشارة مالية" }]}
        action={
          <div className="rounded-xl border border-line bg-sand-50 px-5 py-3.5 text-right">
            <div className="text-[11.5px] font-bold text-ink-faint">الخدمة</div>
            <div className="text-[15px] font-bold text-navy-900">مجانية لمستفيدي المنظومة</div>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Clock className="h-4.5 w-4.5" />, label: "مدة الجلسة", value: "من 30 إلى 60 دقيقة" },
            { icon: <MapPin className="h-4.5 w-4.5" />, label: "المدن", value: "الفجيرة، دبي، أبوظبي" },
            { icon: <Video className="h-4.5 w-4.5" />, label: "عن بُعد", value: "جلسة مرئية عبر المنصة" },
            { icon: <ShieldCheck className="h-4.5 w-4.5" />, label: "الخصوصية", value: "بياناتك لا تُشارك مع أي جهة" },
          ].map((s) => (
            <div key={s.label} className="flex items-start gap-3 rounded-xl border border-line bg-sand-50 px-4 py-3.5">
              <span className="mt-0.5 text-navy-600">{s.icon}</span>
              <span>
                <span className="block text-[11.5px] font-bold text-ink-faint">{s.label}</span>
                <span className="block text-[14px] font-bold text-navy-900">{s.value}</span>
              </span>
            </div>
          ))}
        </div>
      </PageHeader>

      {/* أنواع الاستشارة */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="eyebrow mb-3">ماذا تقدّم الجلسة؟</div>
              <h2 className="h2">من نتيجة التقييم إلى خطة مكتوبة</h2>
              <p className="lede mt-5">
                يراجع المستشار نتيجتك ونقاط القوة والفجوات، ثم تخرج من الجلسة بخطة مالية
                مكتوبة وثلاث خطوات تنفيذية بتواريخ واضحة.
              </p>
              <ul className="mt-7 grid gap-3">
                {[
                  "مراجعة الدخل والالتزامات والفائض الشهري",
                  "خطة مكتوبة بأرقام وتواريخ لا بنصائح عامة",
                  "ربط الخطة بمسارك التعليمي وبرنامج تدريبي مناسب",
                  "جلسة متابعة بعد 90 يوماً لقياس الالتزام",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.9} />
                    <span className="text-[15px] font-semibold text-ink-soft">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <SmartImage slot="advisor" className="aspect-[4/3] rounded-2xl border border-line" />
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CONSULTATION_TYPES.map((c) => (
              <div key={c.id} className="card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={c.icon} className="h-5 w-5" />
                </div>
                <div className="mt-4 text-[15.5px] font-bold leading-snug text-navy-900">{c.name}</div>
                <p className="mt-2 text-[12.5px] font-semibold leading-relaxed text-ink-faint">{c.summary}</p>
                <div className="mt-4 border-t border-line pt-3.5 text-[12px] font-bold text-gold-600">
                  <Num value={c.minutes} /> دقيقة · {c.audience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* نموذج الحجز */}
      <section id="booking" className="section bg-white">
        <div className="shell">
          <div className="mb-8">
            <div className="eyebrow mb-3">الحجز</div>
            <h2 className="h2">اختر نوع الاستشارة والمدينة والموعد</h2>
          </div>
          <div className="card overflow-hidden p-0">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* المستشارون */}
      <section className="section">
        <div className="shell">
          <div className="mb-8">
            <div className="eyebrow mb-3">فريق الاستشارة</div>
            <h2 className="h2">مستشارون معتمدون</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORS.map((a) => (
              <div key={a.id} className="card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-50 text-[15px] font-bold text-navy-700">
                  {a.initials}
                </div>
                <div className="mt-4 text-[16px] font-bold text-navy-900">{a.name}</div>
                <div className="mt-1 text-[12.5px] font-semibold text-ink-faint">{a.title}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.cities.map((cid) => {
                    const c = ADVISOR_CITIES.find((x) => x.id === cid);
                    return (
                      <Tag key={cid} tone="bg-sand-100 text-ink-soft">
                        {c?.name}
                      </Tag>
                    );
                  })}
                </div>
                <div className="mt-4 border-t border-line pt-3.5 text-[12px] font-bold text-gold-600">
                  <Num value={a.sessions} /> جلسة · {a.languages}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/assessment" className="btn-secondary">
              قيّم مستواك قبل الجلسة
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/training" className="btn-secondary">
              البرامج التدريبية الحضورية
            </Link>
          </div>
          <DemoNote className="mt-8" />
        </div>
      </section>
    </>
  );
}
