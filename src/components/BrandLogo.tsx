"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LOGO_SLOTS, logoSourcesFor, type LogoSlotKey } from "@/lib/assets";

/**
 * يعرض الشعار الرسمي إذا كان الملف موجوداً داخل /public/assets/logos،
 * وإلا يعرض إطاراً بديلاً نظيفاً (Placeholder) دون إنشاء أي شعار وهمي.
 */
export default function BrandLogo({
  slot = "government",
  size = 44,
  className = "",
}: {
  slot?: LogoSlotKey;
  size?: number;
  className?: string;
}) {
  const meta = LOGO_SLOTS[slot];
  const sources = logoSourcesFor(meta);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  const advance = useCallback(() => setIndex((i) => i + 1), []);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) advance();
  }, [index, advance]);

  if (index >= sources.length) {
    return (
      <div
        className={`grid shrink-0 place-items-center rounded-xl border border-dashed border-navy-200 bg-navy-50/60 ${className}`}
        style={{ width: size, height: size }}
        title={meta.note}
        aria-label={`${meta.label} — موضع الشعار الرسمي`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="text-navy-400"
          style={{ width: size * 0.46, height: size * 0.46 }}
        >
          <path
            d="M12 3 20 7v6c0 4.2-3.4 7.2-8 8-4.6-.8-8-3.8-8-8V7l8-4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={sources[index]}
      alt={meta.alt}
      onError={advance}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
