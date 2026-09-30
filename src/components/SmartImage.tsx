"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IMAGE_SLOTS, sourcesFor, type ImageSlotKey } from "@/lib/assets";

/**
 * صورة تبحث عن الملف الرسمي أولاً (.jpg / .png / .webp)
 * ثم تعود إلى الصورة المؤقتة المرفقة مع المشروع.
 * استبدال الصورة لا يتطلب أي تعديل في الكود.
 */
export default function SmartImage({
  slot,
  className = "",
  imgClassName = "",
  priority = false,
  showBadge = true,
  overlay,
}: {
  slot: ImageSlotKey;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  showBadge?: boolean;
  overlay?: React.ReactNode;
}) {
  const meta = IMAGE_SLOTS[slot];
  const sources = sourcesFor(meta);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  const advance = useCallback(() => {
    setIndex((i) => (i < sources.length - 1 ? i + 1 : i));
  }, [sources.length]);

  // قد يقع خطأ التحميل قبل ربط React للمعالِج، فنتحقق بعد التركيب
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) advance();
  }, [index, advance]);

  const isPlaceholder = index >= sources.length - 1;

  return (
    <div className={`relative overflow-hidden bg-sand-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={sources[index]}
        alt={meta.alt}
        loading="eager"
        decoding="async"
        onError={advance}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {overlay}
      {showBadge && isPlaceholder && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-white/80 px-2 py-1 text-[10.5px] font-bold text-navy-800 backdrop-blur-sm">
          صورة مؤقتة
        </span>
      )}
    </div>
  );
}
