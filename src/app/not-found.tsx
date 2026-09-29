import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[60vh] place-content-center gap-6 py-24 text-center">
      <div className="eyebrow">الصفحة غير متاحة</div>
      <h1 className="h2">لم نعثر على الصفحة المطلوبة</h1>
      <p className="lede mx-auto max-w-lg">
        قد يكون الرابط غير صحيح أو أن الصفحة غير متوفرة في النموذج التجريبي.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          العودة إلى الرئيسية
        </Link>
        <Link href="/demo" className="btn-secondary">
          استعرض التجربة
        </Link>
      </div>
    </div>
  );
}
