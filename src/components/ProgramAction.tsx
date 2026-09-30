"use client";

import Link from "next/link";
import { useState } from "react";
import { BellRing, CheckCircle2, Lock, Ticket } from "lucide-react";
import { Num } from "@/components/ui";
import type { TrainingProgram } from "@/data/training";
import type { Persona } from "@/data/users";
import type { Eligibility } from "@/lib/eligibility";

/** إجراء الحجز أو تسجيل الاهتمام لبرنامج تدريبي — تفاعل تجريبي بالكامل */
export default function ProgramAction({
  program,
  persona,
  eligibility,
}: {
  program: TrainingProgram;
  persona: Persona | null;
  eligibility: Eligibility;
}) {
  const [state, setState] = useState<"idle" | "booked" | "interested">("idle");
  const ref = `FJR-${program.date.replace(/-/g, "").slice(4)}-${program.id.slice(0, 3).toUpperCase()}`;

  if (!persona) {
    return (
      <Link href="/demo" className="btn-secondary w-full !py-3 text-[14px]">
        اختر شخصية لعرض الأهلية
      </Link>
    );
  }

  if (state === "booked") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
        <div className="flex items-center gap-2 text-[13.5px] font-bold text-emerald-800">
          <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={2.2} />
          تم حجز المقعد
        </div>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-emerald-700">
          رقم الحجز{" "}
          <span dir="ltr" className="ltr-num font-bold">
            {ref}
          </span>{" "}
          — ستصلك رسالة تأكيد بتفاصيل الوصول قبل الموعد بأسبوع.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn-ghost mt-2 !px-2 !py-1.5 text-[12.5px]"
        >
          إلغاء الحجز
        </button>
      </div>
    );
  }

  if (state === "interested") {
    return (
      <div className="rounded-xl border border-navy-200 bg-navy-50/70 p-4">
        <div className="flex items-center gap-2 text-[13.5px] font-bold text-navy-800">
          <BellRing className="h-4.5 w-4.5" strokeWidth={2.2} />
          تم تسجيل اهتمامك
        </div>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-navy-700">
          سنُعلمك فور استيفاء شروط الالتحاق أو عند فتح دورة جديدة من البرنامج.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn-ghost mt-2 !px-2 !py-1.5 text-[12.5px]"
        >
          تراجع
        </button>
      </div>
    );
  }

  if (eligibility.eligible) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
        <div className="flex items-center gap-2 text-[13.5px] font-bold text-emerald-800">
          <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={2.2} />
          {persona.name.split(" ")[0]} مؤهل للالتحاق بهذا البرنامج
        </div>
        <button
          type="button"
          onClick={() => setState("booked")}
          className="btn-primary mt-3 w-full !py-2.5 text-[13.5px]"
        >
          <Ticket className="h-4 w-4" />
          احجز مقعدك
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
      <div className="flex items-center gap-2 text-[13.5px] font-bold text-amber-800">
        <Lock className="h-4.5 w-4.5" strokeWidth={2.2} />
        غير مؤهل حالياً — ما ينقص {persona.name.split(" ")[0]}
      </div>
      <ul className="mt-2 grid gap-1 text-[12.5px] font-semibold text-amber-800">
        {eligibility.missingPoints > 0 && (
          <li>
            • <Num value={eligibility.missingPoints} /> نقطة إضافية
          </li>
        )}
        {eligibility.missingBadges.map((b) => (
          <li key={b}>• شارة {b}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setState("interested")}
          className="btn-primary flex-1 !py-2.5 text-[13.5px]"
        >
          <BellRing className="h-4 w-4" />
          سجّل اهتمامك
        </button>
        <Link href={`/path/${persona.pathId}`} className="btn-secondary flex-1 !py-2.5 text-[13.5px]">
          أكمل مسارك للتأهل
        </Link>
      </div>
    </div>
  );
}
