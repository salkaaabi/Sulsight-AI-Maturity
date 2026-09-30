"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  UserRound,
  Video,
} from "lucide-react";
import Icon from "@/components/Icon";
import { Num } from "@/components/ui";
import {
  ADVISORS,
  ADVISOR_CITIES,
  BOOKING_DAYS,
  CONSULTATION_TYPES,
  TIME_SLOTS,
  cityById,
  consultationById,
} from "@/data/advisor";
import { useSession } from "@/lib/session";

export default function BookingForm({
  compact = false,
  onDone,
}: {
  compact?: boolean;
  onDone?: () => void;
}) {
  const { persona } = useSession();
  const [type, setType] = useState(CONSULTATION_TYPES[0].id);
  const [city, setCity] = useState(ADVISOR_CITIES[0].id);
  const [day, setDay] = useState(BOOKING_DAYS.find((d) => d.available)!.iso);
  const [slot, setSlot] = useState(TIME_SLOTS.find((t) => t.available)!.id);
  const [advisorId, setAdvisorId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const matching = useMemo(
    () => ADVISORS.filter((a) => a.cities.includes(city) && a.specialties.includes(type)),
    [city, type]
  );
  const pool = matching.length ? matching : ADVISORS.filter((a) => a.cities.includes(city));
  const advisor = pool.find((a) => a.id === advisorId) ?? pool[0];

  const typeMeta = consultationById(type)!;
  const cityMeta = cityById(city)!;
  const dayMeta = BOOKING_DAYS.find((d) => d.iso === day)!;
  const slotMeta = TIME_SLOTS.find((t) => t.id === slot)!;

  const submit = () => {
    const ref = `FJR-${dayMeta.iso.replace(/-/g, "").slice(4)}-${Math.floor(1000 + Math.random() * 8999)}`;
    setConfirmed(ref);
  };

  if (confirmed) {
    return (
      <div className="grid place-items-center gap-5 px-6 py-12 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
        </div>
        <div>
          <div className="text-[22px] font-bold text-navy-900">تم تأكيد الموعد</div>
          <p className="body mt-2 max-w-md">
            ستصلك رسالة تأكيد تتضمن تفاصيل الجلسة قبل الموعد بـ <Num value={24} /> ساعة.
          </p>
        </div>
        <div className="w-full max-w-md rounded-2xl border border-line bg-sand-50 p-5 text-right">
          <Row label="نوع الاستشارة" value={typeMeta.name} />
          <Row label="المستشار" value={advisor.name} />
          <Row
            label="المكان"
            value={city === "online" ? "جلسة مرئية عبر المنصة" : cityMeta.venue}
          />
          <Row
            label="الموعد"
            value={`${dayMeta.dayName} ${dayMeta.dayNum} ${dayMeta.monthName} — ${slotMeta.label}`}
          />
          <Row label="رقم الحجز" value={confirmed} mono />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setConfirmed(null)} className="btn-secondary">
            حجز موعد آخر
          </button>
          {onDone && (
            <button type="button" onClick={onDone} className="btn-primary">
              إغلاق
            </button>
          )}
        </div>
        <p className="text-[12px] font-semibold text-ink-faint">
          نموذج تجريبي لأغراض العرض — لا يتم إرسال أي بيانات إلى أي جهة.
        </p>
      </div>
    );
  }

  return (
    <div className={compact ? "p-6" : "p-7 sm:p-8"}>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-7">
          {/* نوع الاستشارة */}
          <Field title="نوع الاستشارة" step={1}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {CONSULTATION_TYPES.map((c) => {
                const active = c.id === type;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setType(c.id);
                      setAdvisorId(null);
                    }}
                    className={`rounded-xl border p-3.5 text-right transition-all duration-200 ${
                      active
                        ? "border-navy-400 bg-navy-50 shadow-card"
                        : "border-line bg-white hover:border-navy-200 hover:bg-sand-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                          active ? "bg-navy-700 text-white" : "bg-sand-100 text-ink-faint"
                        }`}
                      >
                        <Icon name={c.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-[14.5px] font-bold text-navy-900">{c.name}</span>
                        <span className="mt-0.5 block text-[11.5px] font-semibold text-ink-faint">
                          <Num value={c.minutes} /> دقيقة · {c.audience}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Field>

          {/* المدينة */}
          <Field title="المدينة أو نمط الجلسة" step={2}>
            <div className="flex flex-wrap gap-2.5">
              {ADVISOR_CITIES.map((c) => {
                const active = c.id === city;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCity(c.id);
                      setAdvisorId(null);
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
                      active
                        ? "border-navy-400 bg-navy-700 text-white"
                        : "border-line bg-white text-ink-soft hover:bg-sand-50"
                    }`}
                  >
                    {c.id === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    {c.name}
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-[12.5px] font-semibold text-ink-faint">{cityMeta.venue}</p>
          </Field>

          {/* المستشار */}
          <Field title="المستشار" step={3}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {pool.map((a) => {
                const active = a.id === advisor.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAdvisorId(a.id)}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-right transition-all duration-200 ${
                      active
                        ? "border-navy-400 bg-navy-50 shadow-card"
                        : "border-line bg-white hover:border-navy-200 hover:bg-sand-50"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[13px] font-bold ${
                        active ? "bg-navy-700 text-white" : "bg-sand-100 text-ink-faint"
                      }`}
                    >
                      {a.initials}
                    </span>
                    <span>
                      <span className="block text-[14px] font-bold text-navy-900">{a.name}</span>
                      <span className="block text-[11.5px] font-semibold text-ink-faint">{a.title}</span>
                      <span className="mt-1 block text-[11px] font-semibold text-gold-600">
                        <Num value={a.sessions} /> جلسة · {a.languages}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Field>

          {/* اليوم */}
          <Field title="اليوم" step={4}>
            <div className="-mx-1 flex min-w-0 gap-2.5 overflow-x-auto px-1 pb-2">
              {BOOKING_DAYS.map((d) => {
                const active = d.iso === day;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    disabled={!d.available}
                    onClick={() => setDay(d.iso)}
                    className={`min-w-[78px] shrink-0 rounded-xl border px-3 py-3 text-center transition-all duration-200 ${
                      !d.available
                        ? "cursor-not-allowed border-line bg-sand-50 opacity-45"
                        : active
                        ? "border-navy-400 bg-navy-700 text-white shadow-card"
                        : "border-line bg-white hover:border-navy-200 hover:bg-sand-50"
                    }`}
                  >
                    <div className={`text-[11.5px] font-bold ${active ? "text-white/75" : "text-ink-faint"}`}>
                      {d.dayName}
                    </div>
                    <div className={`text-[19px] font-bold ${active ? "text-white" : "text-navy-900"}`}>
                      <Num value={d.dayNum} />
                    </div>
                    <div className={`text-[10.5px] font-semibold ${active ? "text-white/75" : "text-ink-faint"}`}>
                      {d.monthName}
                    </div>
                  </button>
                );
              })}
            </div>
          </Field>

          {/* الوقت */}
          <Field title="الوقت" step={5}>
            <div className="flex flex-wrap gap-2.5">
              {TIME_SLOTS.map((t) => {
                const active = t.id === slot;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={!t.available}
                    onClick={() => setSlot(t.id)}
                    className={`rounded-xl border px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
                      !t.available
                        ? "cursor-not-allowed border-line bg-sand-50 text-ink-faint line-through opacity-50"
                        : active
                        ? "border-navy-400 bg-navy-700 text-white"
                        : "border-line bg-white text-ink-soft hover:bg-sand-50"
                    }`}
                  >
                    <span dir="ltr" className="ltr-num">
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        {/* الملخص */}
        <aside className="lg:self-start">
          <div className="rounded-2xl border border-line bg-sand-50 p-6">
            <div className="flex items-center gap-2 text-[13px] font-bold text-navy-900">
              <Sparkles className="h-4 w-4 text-gold-500" strokeWidth={2} />
              ملخص الحجز
            </div>

            <div className="mt-5 grid gap-3.5">
              <Summary icon={<Icon name={typeMeta.icon} className="h-4 w-4" />} label="نوع الاستشارة" value={typeMeta.name} />
              <Summary icon={<UserRound className="h-4 w-4" />} label="المستشار" value={advisor.name} />
              <Summary
                icon={city === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                label="المكان"
                value={cityMeta.venue}
              />
              <Summary
                icon={<CalendarDays className="h-4 w-4" />}
                label="الموعد"
                value={`${dayMeta.dayName} ${dayMeta.dayNum} ${dayMeta.monthName}`}
              />
              <Summary icon={<Clock className="h-4 w-4" />} label="الوقت والمدة" value={`${slotMeta.label} · ${typeMeta.minutes} دقيقة`} />
            </div>

            {persona && (
              <div className="mt-5 rounded-xl border border-navy-100 bg-white p-3.5">
                <div className="text-[11.5px] font-bold text-ink-faint">سيُربط الحجز بحساب</div>
                <div className="text-[14px] font-bold text-navy-900">{persona.name}</div>
                <div className="text-[11.5px] font-semibold text-gold-600">
                  التقييم المالي <Num value={persona.score} /> · مسار {persona.pathName}
                </div>
              </div>
            )}

            <button type="button" onClick={submit} className="btn-primary mt-6 w-full !py-3 text-[15px]">
              احجز موعدك
            </button>
            <p className="mt-3 text-center text-[11.5px] font-semibold text-ink-faint">
              الخدمة مجانية لمستفيدي المنظومة — نموذج تجريبي للعرض.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-navy-700 text-[11.5px] font-bold text-white">
          <Num value={step} />
        </span>
        <span className="text-[14.5px] font-bold text-navy-900">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Summary({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-navy-600">{icon}</span>
      <span>
        <span className="block text-[11.5px] font-bold text-ink-faint">{label}</span>
        <span className="block text-[13.5px] font-bold text-navy-900">{value}</span>
      </span>
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <span className="text-[12.5px] font-bold text-ink-faint">{label}</span>
      <span className={`text-[13.5px] font-bold text-navy-900 ${mono ? "ltr-num" : ""}`} dir={mono ? "ltr" : undefined}>
        {value}
      </span>
    </div>
  );
}
