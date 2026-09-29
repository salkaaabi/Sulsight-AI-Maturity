"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock,
  Play,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { MODULE_TYPE_LABEL, type LearningModule, type ModuleType } from "@/data/paths";
import { Num, Progress } from "@/components/ui";
import { minutes } from "@/lib/text";

const TYPE_ICON: Record<ModuleType, typeof Play> = {
  video: Play,
  scenario: Target,
  quiz: ClipboardCheck,
  challenge: Trophy,
  workshop: ClipboardCheck,
};

const TYPE_TONE: Record<ModuleType, string> = {
  video: "bg-sky-50 text-sky-700",
  scenario: "bg-violet-50 text-violet-700",
  quiz: "bg-amber-50 text-amber-700",
  challenge: "bg-rose-50 text-rose-700",
  workshop: "bg-emerald-50 text-emerald-700",
};

export default function ModuleList({
  modules,
  initialCompleted = 0,
  barTone = "bg-navy-600",
}: {
  modules: LearningModule[];
  initialCompleted?: number;
  barTone?: string;
}) {
  const [done, setDone] = useState<string[]>(modules.slice(0, initialCompleted).map((m) => m.id));
  const [open, setOpen] = useState<LearningModule | null>(null);

  const toggle = (id: string) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const progress = Math.round((done.length / modules.length) * 100);

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-line bg-white p-5">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[14px] font-extrabold text-navy-900">تقدّمك في هذا المسار</span>
          <span className="text-[13px] font-bold text-ink-soft">
            <Num value={done.length} /> من <Num value={modules.length} /> وحدات
          </span>
        </div>
        <Progress value={progress} tone={barTone} height="h-2.5" showLabel />
      </div>

      <ul className="grid gap-3">
        {modules.map((m, i) => {
          const TypeIcon = TYPE_ICON[m.type];
          const isDone = done.includes(m.id);
          return (
            <li
              key={m.id}
              className={`card flex flex-col gap-4 p-5 transition-colors sm:flex-row sm:items-center ${
                isDone ? "!border-emerald-200 bg-emerald-50/30" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(m.id)}
                aria-label={isDone ? "إلغاء إكمال الوحدة" : "تعليم الوحدة كمكتملة"}
                className="shrink-0 self-start sm:self-center"
              >
                {isDone ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" strokeWidth={1.9} />
                ) : (
                  <Circle className="h-6 w-6 text-ink-faint transition-colors hover:text-navy-500" strokeWidth={1.6} />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11.5px] font-extrabold text-ink-faint">
                    الوحدة <Num value={i + 1} />
                  </span>
                  <span className={`chip ${TYPE_TONE[m.type]}`}>
                    <TypeIcon className="h-3.5 w-3.5" />
                    {MODULE_TYPE_LABEL[m.type]}
                  </span>
                  <span className="chip bg-sand-100 text-ink-soft">
                    <Clock className="h-3.5 w-3.5" />
                    {minutes(m.minutes)}
                  </span>
                </div>
                <div className="mt-2 text-[16px] font-extrabold text-navy-900">{m.title}</div>
                <p className="body mt-1.5">{m.summary}</p>
              </div>

              <button type="button" onClick={() => setOpen(m)} className="btn-secondary shrink-0 !py-2.5 text-[13.5px]">
                <Play className="h-4 w-4 text-gold-500" />
                فتح الوحدة
              </button>
            </li>
          );
        })}
      </ul>

      {open && (
        <ModulePlayer
          module={open}
          onClose={() => setOpen(null)}
          onComplete={() => {
            if (!done.includes(open.id)) toggle(open.id);
            setOpen(null);
          }}
        />
      )}
    </div>
  );
}

function ModulePlayer({
  module: m,
  onClose,
  onComplete,
}: {
  module: LearningModule;
  onClose: () => void;
  onComplete: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-navy-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <span className={`chip ${TYPE_TONE[m.type]}`}>{MODULE_TYPE_LABEL[m.type]}</span>
            <div className="mt-2.5 text-[19px] font-extrabold text-navy-900">{m.title}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-ink-soft hover:bg-sand-100"
            aria-label="إغلاق"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="p-5">
          <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-navy-900">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 225" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 170 L60 130 L120 165 L180 110 L240 160 L300 120 L360 170 L400 140 L400 225 L0 225Z" fill="#fff" />
              </svg>
            </div>
            <div className="relative grid place-items-center gap-3 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                <Play className="h-7 w-7 text-white" fill="currentColor" />
              </div>
              <div className="text-[13.5px] font-bold text-white/85">محتوى تجريبي — لا يوجد ملف فيديو فعلي</div>
              <div className="text-[12px] font-semibold text-white/55">{minutes(m.minutes)}</div>
            </div>
            <div className="absolute inset-x-4 bottom-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/25">
                <div className="h-full w-1/3 rounded-full bg-gold-400" />
              </div>
            </div>
          </div>

          <p className="body mt-5">{m.summary}</p>

          <div className="mt-5 rounded-xl border border-line bg-sand-50 p-4">
            <div className="text-[12.5px] font-extrabold text-navy-900">ماذا ستنجز بنهاية هذه الوحدة؟</div>
            <ul className="mt-2.5 grid gap-1.5 text-[13.5px] font-semibold text-ink-soft">
              <li>• تطبيق عملي واحد يُنفَّذ خارج المنصة</li>
              <li>• سؤالان للتحقق من الفهم</li>
              <li>• نقاط تُضاف إلى رصيدك عند الإتمام</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-sand-50 p-5">
          <span className="text-[12px] font-semibold text-ink-faint">
            نموذج تجريبي لأغراض العرض — البيانات المعروضة غير حقيقية.
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-secondary !py-2.5 text-[13.5px]">
              إغلاق
            </button>
            <button type="button" onClick={onComplete} className="btn-primary !py-2.5 text-[13.5px]">
              <CheckCircle2 className="h-4 w-4" />
              تسجيل الإتمام
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
