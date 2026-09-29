"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, LogOut, ShieldAlert } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { DemoNote, Num, Pct, Progress, Tag } from "@/components/ui";
import { PATH_TONES, pathById } from "@/data/paths";
import { schoolById } from "@/data/schools";
import { useSession } from "@/lib/session";
import { PERSONAS } from "@/data/users";

export default function DemoPage() {
  const { persona, signIn, signOut } = useSession();
  const router = useRouter();

  const enter = (id: string) => {
    signIn(id);
    router.push("/dashboard");
  };

  const school = PERSONAS.filter((p) => p.stage === "school");
  const adult = PERSONAS.filter((p) => p.stage === "adult");

  return (
    <>
      <PageHeader
        eyebrow="وضع العرض التجريبي"
        title="استعرض التجربة"
        description="اختر إحدى الشخصيات التجريبية للدخول مباشرة إلى منصة المستفيد — دون اسم مستخدم أو كلمة مرور. لكل شخصية بيانات ومسار ونتائج مختلفة."
        action={
          persona ? (
            <button type="button" onClick={signOut} className="btn-secondary">
              <LogOut className="h-4 w-4" />
              الخروج من الشخصية الحالية
            </button>
          ) : undefined
        }
      >
        <div className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50/70 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.9} />
          <p className="text-[13.5px] font-bold leading-relaxed text-gold-800">
            جميع الأسماء والبيانات المعروضة في هذا النموذج تجريبية وغير حقيقية، ولا تمثل أشخاصاً أو
            مدارس أو بيانات حكومية فعلية.
          </p>
        </div>
      </PageHeader>

      <section className="section">
        <div className="shell">
          <Group title="المرحلة الأولى — طلبة المدارس" items={school} onEnter={enter} activeId={persona?.id} />
          <div className="h-12" />
          <Group title="المرحلة الثانية — الجامعة وما بعدها" items={adult} onEnter={enter} activeId={persona?.id} />

          <div className="mt-14 grid gap-4 rounded-2xl border border-line bg-white p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="h3">لا ترى شخصية تناسبك؟</div>
              <p className="body mt-2">
                يمكنك خوض تقييم المستوى المالي مباشرة والحصول على نتيجة ومسار مقترح دون تسجيل دخول.
              </p>
            </div>
            <Link href="/assessment" className="btn-primary">
              قيّم مستواك المالي
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <DemoNote className="mt-6" />
        </div>
      </section>
    </>
  );
}

function Group({
  title,
  items,
  onEnter,
  activeId,
}: {
  title: string;
  items: typeof PERSONAS;
  onEnter: (id: string) => void;
  activeId?: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-[19px] font-extrabold text-navy-900">{title}</h2>
        <div className="h-px flex-1 bg-line" />
        <span className="text-[13px] font-bold text-ink-faint">
          <Num value={items.length} /> شخصيات
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => {
          const path = pathById(p.pathId);
          const tone = path ? PATH_TONES[path.tone] : PATH_TONES.navy;
          const school = p.schoolId ? schoolById(p.schoolId) : undefined;
          const active = activeId === p.id;
          return (
            <div
              key={p.id}
              className={`card flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                active ? "!border-navy-300 ring-2 ring-navy-100" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tone.soft} text-[15px] font-extrabold ${tone.text}`}>
                  {p.initials}
                </div>
                {active && (
                  <span className="chip bg-navy-50 text-navy-700">
                    <Check className="h-3.5 w-3.5" />
                    نشطة
                  </span>
                )}
              </div>
              <div className="mt-4 text-[16px] font-extrabold leading-snug text-navy-900">{p.name}</div>
              <div className="mt-1 text-[12.5px] font-bold text-ink-faint">{p.roleLabel}</div>
              {school && <div className="mt-1 text-[12px] font-semibold text-ink-faint">{school.name}</div>}

              <div className="mt-4">
                <Tag tone={`${tone.soft} ${tone.text}`}>مسار {p.pathName}</Tag>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                <div>
                  <div className="text-[15px] font-extrabold text-navy-900">
                    <Num value={p.score} />
                  </div>
                  <div className="text-[10.5px] font-bold text-ink-faint">التقييم</div>
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-navy-900">
                    <Num value={p.points} />
                  </div>
                  <div className="text-[10.5px] font-bold text-ink-faint">النقاط</div>
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-navy-900">
                    <Num value={p.badges.length} />
                  </div>
                  <div className="text-[10.5px] font-bold text-ink-faint">الشارات</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[11.5px] font-bold text-ink-faint">
                  <span>التقدم</span>
                  <span className="text-navy-800">
                    <Pct value={p.progress} />
                  </span>
                </div>
                <Progress value={p.progress} tone={tone.bar} height="h-1.5" />
              </div>

              <button
                type="button"
                onClick={() => onEnter(p.id)}
                className="btn-primary mt-5 w-full !py-2.5 text-[14px]"
              >
                الدخول كـ {p.name.split(" ")[0]}
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
