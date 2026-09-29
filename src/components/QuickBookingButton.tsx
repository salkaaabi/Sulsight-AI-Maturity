"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import BookingDialog from "@/components/BookingDialog";

export default function QuickBookingButton({
  label = "احجز موعدك",
  className = "btn-primary",
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
        <ArrowLeft className="h-4 w-4" />
      </button>
      <BookingDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
