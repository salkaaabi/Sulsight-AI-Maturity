import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import ModuleList from "@/components/ModuleList";
import SmartImage from "@/components/SmartImage";
import { DemoNote, Num, Pct, Tag } from "@/components/ui";
import { ALL_PATHS, PATH_TONES, pathById } from "@/data/paths";
import { BADGES } from "@/data/badges";
import { TRAINING_PROGRAMS } from "@/data/training";
import { arDate, gradeLabel } from "@/lib/text";

export function generateStaticParams() {
  return ALL_PATHS.map((p) => ({ id: p.id }));
}

export default async function PathPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = pathById(id);
  if (!path) notFound();

  const tone = PATH_TONES[path.tone];
  const totalMinutes = path.modules.reduce((a, m) => a + m.minutes, 0);
  const badges = BADGES.filter((b) => path.badges.includes(b.id));
  const programs = TRAINING_PROGRAMS.filter((p) => p.pathIds.includes(path.id));

  return (
    <>
      <PageHeader
        eyebrow={path.kind === "school" ? `المرحلة الأولى · المستوى ${path.level}` : "المرحلة الثانية"}
        title={path.name}
        description={path.description}
        breadcrumbs={[{ href: "/paths", label: "المسارات" }]}
        action={
          <Link href="/assessment" className="btn-primary">
            قيّم مستواك قبل البدء
            <ArrowLeft className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "الفئة المستهدفة", value: path.gradeRange ? gradeLabel(path.gradeRange) : path.audience },
            { label: "عدد الوحدات", value: <><Num value={path.modules.length} /> وحدات</> },
            { label: "إجمالي الزمن", value: <><Num value={totalMinutes} /> دقيقة</> },
            { label: "متوسط الإكمال", value: <Pct value={path.stats.completion} /> },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-sand-50 px-4 py-3.5">
              <div className="text-[11.5px] font-bold text-ink-faint">{s.label}</div>
              <div className="mt-1 text-[15.5px] font-extrabold text-navy-900">{s.value}</div>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.55fr_1fr]">
          <div>
            <div className="mb-8">
              <div className="eyebrow mb-3">السلوكيات المستهدفة</div>
              <h2 className="h3">ما الذي يتغيّر فعلياً بنهاية المسار؟</h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {path.behaviours.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-4 py-3"
                  >
                    <CheckCircle2 className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${tone.text}`} strokeWidth={1.9} />
                    <span className="text-[14px] font-semibold text-ink-soft">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <h2 className="h3">الوحدات التعليمية</h2>
              <div className="h-px flex-1 bg-line" />
            </div>
            <ModuleList modules={path.modules} initialCompleted={1} barTone={tone.bar} />
          </div>

          <aside className="grid content-start gap-6">
            <div className={`card overflow-hidden p-0`}>
              <div className={`flex items-center gap-4 ${tone.soft} p-6`}>
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-white ${tone.text}`}>
                  <Icon name={path.icon} className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[17px] font-extrabold text-navy-900">{path.tagline}</div>
                  <div className="text-[12.5px] font-bold text-ink-faint">{path.audience}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-line">
                <div className="bg-white px-5 py-4 text-center">
                  <div className="text-[19px] font-extrabold text-navy-900">
                    <Num value={path.stats.learners} />
                  </div>
                  <div className="text-[11.5px] font-bold text-ink-faint">مستفيد مسجّل</div>
                </div>
                <div className="bg-white px-5 py-4 text-center">
                  <div className="text-[19px] font-extrabold text-navy-900">
                    <Num value={path.stats.hours} />
                  </div>
                  <div className="text-[11.5px] font-bold text-ink-faint">ساعة تعلّم</div>
                </div>
              </div>
            </div>

            <SmartImage
              slot={path.kind === "school" ? "classroom" : "workshop"}
              className="aspect-[4/3] rounded-2xl border border-line"
            />

            <div className="card p-6">
              <div className="text-[14px] font-extrabold text-navy-900">الشارات المرتبطة بالمسار</div>
              <p className="mt-1.5 text-[12.5px] font-semibold text-ink-faint">
                تُمنح عند إنجاز سلوك محدد لا عند مشاهدة المحتوى.
              </p>
              <ul className="mt-4 grid gap-3">
                {badges.map((b) => (
                  <li key={b.id} className="flex items-start gap-3 rounded-xl border border-line p-3.5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-50 text-gold-600">
                      <Icon name={b.icon} className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[13.5px] font-extrabold text-navy-900">{b.name}</div>
                      <div className="mt-0.5 text-[12px] font-semibold leading-relaxed text-ink-faint">
                        {b.criterion}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {programs.length > 0 && (
              <div className="card p-6">
                <div className="text-[14px] font-extrabold text-navy-900">برامج تدريبية مرتبطة</div>
                <ul className="mt-4 grid gap-3">
                  {programs.map((p) => (
                    <li key={p.id} className="rounded-xl border border-line p-4">
                      <div className="flex items-center justify-between gap-2">
                        <Tag tone="bg-navy-50 text-navy-700">
                          <MapPin className="h-3.5 w-3.5" />
                          {p.city}
                        </Tag>
                        <span className="text-[11.5px] font-bold text-ink-faint">
                          <Clock className="ml-1 inline h-3.5 w-3.5" />
                          {p.duration}
                        </span>
                      </div>
                      <div className="mt-2.5 text-[14.5px] font-extrabold text-navy-900">{p.name}</div>
                      <div className="mt-1 text-[12px] font-bold text-ink-faint">{arDate(p.date)}</div>
                    </li>
                  ))}
                </ul>
                <Link href="/training" className="btn-secondary mt-4 w-full !py-2.5 text-[13.5px]">
                  <Users className="h-4 w-4" />
                  جميع البرامج التدريبية
                </Link>
              </div>
            )}

            <DemoNote />
          </aside>
        </div>
      </section>
    </>
  );
}
