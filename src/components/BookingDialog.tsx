"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export default function BookingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="حجز موعد مع مستشار مالي"
    >
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <div className="eyebrow mb-1.5">استشارة مالية</div>
            <div className="text-[20px] font-bold text-navy-900">احجز موعداً مع مستشار مالي</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-ink-soft hover:bg-sand-100"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <BookingForm compact onDone={onClose} />
      </div>
    </div>
  );
}
