import Link from "next/link";
import { ArrowLeft, Clock, Layers, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { DemoNote, Num, Pct, Progress, Tag } from "@/components/ui";
import { ADULT_PATHS, PATH_TONES, SCHOOL_PATHS, type LearningPath } from "@/data/paths";
import { gradeLabel } from "@/lib/text";

export const metadata = { title: "المسارات التعليمية — منظومة الفجيرة للوعي والتمكين المالي" };

export default function PathsPage() {
  return (
    <>
      <PageHeader
        eyebrow="المسارات"
        title="عشرة مسارات تغطي العمر كله"
        description="أربعة مستويات مدرسية متدرجة، وستة مسارات متخصصة لما بعد المدرسة. كل مسار مبني على سلوكيات مستهدفة محددة، لا على مواضيع عامة."
        breadcrumbs={[{ href: "/paths", label: "المسارات" }]}
      />

      <section className="section">
        <div className="shell">
          <StageBlock
            label="المرحلة الأولى"
            title="طلبة المدارس حتى الثانوية"
            note="أربعة مستويات متدرجة من الصف الأول إلى الثاني عشر"
            paths={SCHOOL_PATHS}
            columns="lg:grid-cols-4"
          />

          <div className="my-16 hairline" />

          <StageBlock
            label="المرحلة الثانية"
            title="الجامعة وما بعدها"
            note="ستة مسارات متخصصة ترافق المستفيد في القرارات المالية الكبرى"
            paths={ADULT_PATHS}
            columns="lg:grid-cols-3"
          />

          <DemoNote className="mt-12" />
        </div>
      </section>
    </>
  );
}

function StageBlock({
  label,
  title,
  note,
  paths,
  columns,
}: {
  label: string;
  title: string;
  note: string;
  paths: LearningPath[];
  columns: string;
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow mb-2">{label}</div>
        <h2 className="h2">{title}</h2>
        <p className="body mt-3">{note}</p>
      </div>
      <div className={`grid gap-5 sm:grid-cols-2 ${columns}`}>
        {paths.map((p) => {
          const t = PATH_TONES[p.tone];
          const totalMinutes = p.modules.reduce((a, m) => a + m.minutes, 0);
          return (
            <Link
              key={p.id}
              href={`/path/${p.id}`}
              className="card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${t.soft} ${t.text}`}>
                  <Icon name={p.icon} className="h-5.5 w-5.5" />
                </div>
                {p.level && (
                  <span className="chip bg-sand-100 text-ink-faint">
                    المستوى <Num value={p.level} />
                  </span>
                )}
              </div>

              <div className="mt-5 text-[19px] font-extrabold text-navy-900">{p.name}</div>
              <div className={`mt-1 text-[13px] font-bold ${t.text}`}>
                {p.gradeRange ? gradeLabel(p.gradeRange) : p.audience}
              </div>
              <p className="body mt-3 flex-1">{p.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Tag tone="bg-sand-100 text-ink-soft">
                  <Layers className="h-3.5 w-3.5" />
                  <Num value={p.modules.length} /> وحدات
                </Tag>
                <Tag tone="bg-sand-100 text-ink-soft">
                  <Clock className="h-3.5 w-3.5" />
                  <Num value={totalMinutes} /> دقيقة
                </Tag>
                <Tag tone="bg-sand-100 text-ink-soft">
                  <Users className="h-3.5 w-3.5" />
                  <Num value={p.stats.learners} />
                </Tag>
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <div className="mb-1.5 flex items-center justify-between text-[12px] font-bold text-ink-faint">
                  <span>متوسط الإكمال</span>
                  <span className="text-navy-800">
                    <Pct value={p.stats.completion} />
                  </span>
                </div>
                <Progress value={p.stats.completion} tone={t.bar} height="h-1.5" />
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-[13.5px] font-extrabold text-navy-700 transition-transform group-hover:-translate-x-1">
                استعرض المسار
                <ArrowLeft className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
