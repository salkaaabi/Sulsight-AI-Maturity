/**
 * مشهد بصري للفجيرة يُستخدم كموضع للصورة الرئيسية.
 * رسم متجهي هادئ (بحر، جبال، حصن، نخيل) إلى حين توفر الصور الرسمية.
 */
export default function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BBD4EC" />
            <stop offset="45%" stopColor="#DCE7F2" />
            <stop offset="100%" stopColor="#F2E9DA" />
          </linearGradient>
          <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#77A7C4" />
            <stop offset="100%" stopColor="#4D82A6" />
          </linearGradient>
          <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9AAFC2" />
            <stop offset="100%" stopColor="#7E96AC" />
          </linearGradient>
          <linearGradient id="mtnMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7E8FA0" />
            <stop offset="100%" stopColor="#5F7286" />
          </linearGradient>
          <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8D8271" />
            <stop offset="100%" stopColor="#6A6053" />
          </linearGradient>
          <linearGradient id="fade" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#FBFAF7" stopOpacity=".92" />
            <stop offset="42%" stopColor="#FBFAF7" stopOpacity=".55" />
            <stop offset="100%" stopColor="#FBFAF7" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1440" height="720" fill="url(#sky)" />
        <circle cx="1140" cy="170" r="74" fill="#FBF0DC" opacity=".75" />

        {/* الجبال البعيدة */}
        <path
          d="M0 392 L118 300 L206 356 L300 262 L392 340 L470 288 L560 366 L648 300 L742 380 L840 318 L940 388 L1050 330 L1160 396 L1270 344 L1370 404 L1440 366 L1440 520 L0 520Z"
          fill="url(#mtnFar)"
          opacity=".85"
        />
        {/* الجبال الأمامية */}
        <path
          d="M0 452 L96 372 L188 438 L286 356 L380 430 L478 378 L580 446 L690 386 L790 452 L900 396 L1010 460 L1120 404 L1230 466 L1340 412 L1440 470 L1440 560 L0 560Z"
          fill="url(#mtnMid)"
        />

        {/* البحر */}
        <rect y="520" width="1440" height="200" fill="url(#seaG)" />
        <g stroke="#FFFFFF" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round">
          <path d="M80 566 h120 M260 594 h96 M470 574 h140 M700 606 h110 M930 578 h130 M1180 600 h120" />
          <path d="M150 640 h150 M400 664 h120 M660 646 h160 M960 672 h140 M1220 650 h130" />
        </g>

        {/* الصخرة والحصن */}
        <path d="M120 560 L200 470 L330 452 L430 500 L470 560 Z" fill="url(#rock)" />
        <g fill="#B8A88C">
          <rect x="228" y="392" width="128" height="74" rx="4" />
          <rect x="214" y="380" width="30" height="88" rx="3" />
          <rect x="340" y="368" width="34" height="100" rx="3" />
          <rect x="268" y="360" width="48" height="36" rx="3" />
        </g>
        <g fill="#A3937A">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={230 + i * 21} y={384} width="11" height="10" />
          ))}
        </g>
        <rect x="378" y="330" width="3" height="52" fill="#7E7360" />
        <path d="M381 332 h46 v26 h-46 z" fill="#C8443C" />

        {/* النخيل */}
        <g stroke="#6E7A55" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M986 560 q6 -52 2 -86" />
          <path d="M1046 566 q-4 -46 -2 -74" />
          <path d="M1112 558 q8 -56 4 -92" />
        </g>
        <g fill="#7D8A5E">
          {[
            [988, 470],
            [1044, 486],
            [1116, 462],
          ].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x - 26} cy={y + 6} rx="30" ry="9" transform={`rotate(-18 ${x - 26} ${y + 6})`} />
              <ellipse cx={x + 26} cy={y + 6} rx="30" ry="9" transform={`rotate(18 ${x + 26} ${y + 6})`} />
              <ellipse cx={x - 16} cy={y - 10} rx="26" ry="8" transform={`rotate(-42 ${x - 16} ${y - 10})`} />
              <ellipse cx={x + 16} cy={y - 10} rx="26" ry="8" transform={`rotate(42 ${x + 16} ${y - 10})`} />
            </g>
          ))}
        </g>

        {/* تلاشٍ نحو اليمين لإبراز النص */}
        <rect width="1440" height="720" fill="url(#fade)" />
      </svg>

      <div className="absolute bottom-4 left-4 rounded-lg bg-white/70 px-2.5 py-1 text-[10.5px] font-bold text-navy-800 backdrop-blur-sm">
        موضع صورة — بانتظار الصور الرسمية
      </div>
    </div>
  );
}
