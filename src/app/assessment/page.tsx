"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  Briefcase,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { DemoNote, Num, Pct, Progress, Ring, Tag } from "@/components/ui";
import {
  AUDIENCE_META,
  FIRST_STEPS,
  QUESTIONS,
  levelForScore,
  suggestedPath,
  type AssessmentAudience,
} from "@/data/assessment";
import { PATH_TONES, pathById } from "@/data/paths";
import { useSession } from "@/lib/session";

type Stage = "intro" | "quiz" | "result";

const LEVEL_TONE: Record<string, { ring: string; chip: string; color: string }> = {
  rose: { ring: "#BE3455", chip: "bg-rose-50 text-rose-700", color: "#BE3455" },
  amber: { ring: "#C9952A", chip: "bg-amber-50 text-amber-700", color: "#C9952A" },
  sky: { ring: "#1F4E81", chip: "bg-sky-50 text-sky-700", color: "#1F4E81" },
  emerald: { ring: "#0F7B5A", chip: "bg-emerald-50 text-emerald-700", color: "#0F7B5A" },
};

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [audience, setAudience] = useState<AssessmentAudience>("student");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const { saveAssessment } = useSession();

  const questions = QUESTIONS[audience];
  const current = questions[index];

  const result = useMemo(() => {
    const max = questions.length * 4;
    const total = questions.reduce((a, q) => a + (answers[q.id] ?? 0), 0);
    const score = Math.round((total / max) * 100);
    const level = levelForScore(score);
    const path = suggestedPath(audience, score);

    const byDimension = new Map<string, number[]>();
    questions.forEach((q) => {
      const arr = byDimension.get(q.dimension) ?? [];
      arr.push(((answers[q.id] ?? 0) / 4) * 100);
      byDimension.set(q.dimension, arr);
    });
    const dimensions = Array.from(byDimension.entries()).map(([key, vals]) => ({
      key,
      value: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
    }));

    const ranked = [...questions].sort((a, b) => (answers[b.id] ?? 0) - (answers[a.id] ?? 0));
    const strengths = Array.from(new Set(ranked.filter((q) => (answers[q.id] ?? 0) >= 3).map((q) => q.topic))).slice(0, 3);
    const gaps = Array.from(new Set([...ranked].reverse().filter((q) => (answers[q.id] ?? 0) <= 2).map((q) => q.topic))).slice(0, 3);

    return { score, level, path, dimensions, strengths, gaps };
  }, [answers, audience, questions]);

  const start = (a: AssessmentAudience) => {
    setAudience(a);
    setAnswers({});
    setIndex(0);
    setStage("quiz");
  };

  const choose = (value: number) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    window.setTimeout(() => {
      if (index + 1 < questions.length) setIndex(index + 1);
      else finish(next);
    }, 180);
  };

  const finish = (final: Record<string, number>) => {
    const max = questions.length * 4;
    const total = questions.reduce((a, q) => a + (final[q.id] ?? 0), 0);
    const score = Math.round((total / max) * 100);
    const level = levelForScore(score);
    const path = suggestedPath(audience, score);
    saveAssessment({
      audience,
      score,
      levelKey: level.key,
      pathId: path.pathId,
      dimensions: [],
      strengths: [],
      gaps: [],
      takenAt: new Date().toISOString(),
    });
    setStage("result");
  };

  const restart = () => {
    setStage("intro");
    setAnswers({});
    setIndex(0);
  };

  return (
    <>
      <PageHeader
        eyebrow="قياس المستوى"
        title="قيّم مستواك المالي"
        description="تقييم قصير يختلف باختلاف المرحلة العمرية، يقيس السلوك لا المعرفة فقط، ويعطيك نتيجة من 100 مع مسار مقترح وأول ثلاث خطوات."
        breadcrumbs={[{ href: "/assessment", label: "قياس المستوى" }]}
      />

      <section className="section">
        <div className="shell">
          {stage === "intro" && <Intro onStart={start} />}
          {stage === "quiz" && (
            <Quiz
              audience={audience}
              index={index}
              total={questions.length}
              question={current}
              selected={answers[current.id]}
              onChoose={choose}
              onBack={() => (index === 0 ? setStage("intro") : setIndex(index - 1))}
            />
          )}
          {stage === "result" && <Result result={result} audience={audience} onRestart={restart} />}
        </div>
      </section>
    </>
  );
}

/* ── الخطوة 1: اختيار الفئة ─────────────────────────────────── */
function Intro({ onStart }: { onStart: (a: AssessmentAudience) => void }) {
  const cards: { key: AssessmentAudience; icon: typeof Backpack; topics: string[] }[] = [
    {
      key: "student",
      icon: Backpack,
      topics: ["الحاجة والرغبة", "الادخار", "المصروف", "التخطيط", "الشراء الذكي", "الاحتيال", "الاستخدام المسؤول للمال"],
    },
    {
      key: "adult",
      icon: Briefcase,
      topics: ["إدارة الراتب", "الميزانية", "الديون", "الادخار", "الاستثمار", "التأمين", "التخطيط طويل المدى"],
    },
  ];

  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="eyebrow mb-3">الخطوة الأولى</div>
        <h2 className="h2">اختر الفئة التي تصفك</h2>
        <p className="lede mt-4">تختلف الأسئلة والمحاور باختلاف المرحلة، لتكون النتيجة دقيقة والمسار المقترح واقعياً.</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {cards.map((c) => {
          const meta = AUDIENCE_META[c.key];
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onStart(c.key)}
              className="card group p-7 text-right transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-600">
                  <c.icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[20px] font-extrabold text-navy-900">{meta.title}</div>
                  <div className="text-[13px] font-bold text-ink-faint">{meta.note}</div>
                </div>
              </div>
              <div className="mt-6 text-[12.5px] font-extrabold text-navy-900">المحاور التي يقيسها التقييم</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.topics.map((t) => (
                  <Tag key={t} tone="bg-sand-100 text-ink-soft">
                    {t}
                  </Tag>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                <span className="text-[13px] font-bold text-ink-faint">
                  <Num value={8} /> أسئلة · أقل من <Num value={4} /> دقائق
                </span>
                <span className="flex items-center gap-1.5 text-[14px] font-extrabold text-navy-700 transition-transform group-hover:-translate-x-1">
                  ابدأ التقييم
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <DemoNote className="mt-10 text-center" />
    </div>
  );
}

/* ── الخطوة 2: الأسئلة ──────────────────────────────────────── */
function Quiz({
  audience,
  index,
  total,
  question,
  selected,
  onChoose,
  onBack,
}: {
  audience: AssessmentAudience;
  index: number;
  total: number;
  question: (typeof QUESTIONS)["student"][number];
  selected?: number;
  onChoose: (v: number) => void;
  onBack: () => void;
}) {
  const progress = Math.round((index / total) * 100);
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-7">
        <div className="mb-2.5 flex items-center justify-between text-[13px] font-bold">
          <span className="text-ink-soft">
            السؤال <Num value={index + 1} /> من <Num value={total} />
          </span>
          <span className="text-navy-800">{AUDIENCE_META[audience].title}</span>
        </div>
        <Progress value={progress} tone="bg-gold-400" height="h-2" />
      </div>

      <div key={question.id} className="card animate-fadeUp p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="bg-navy-50 text-navy-700">{question.topic}</Tag>
          <Tag tone="bg-sand-100 text-ink-faint">محور {question.dimension}</Tag>
        </div>
        <h3 className="mt-5 text-[21px] font-extrabold leading-[1.6] text-navy-900 sm:text-[24px]">
          {question.text}
        </h3>

        <div className="mt-7 grid gap-3">
          {question.options.map((o, i) => {
            const active = selected === o.value;
            return (
              <button
                key={o.label}
                type="button"
                onClick={() => onChoose(o.value)}
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-right transition-all duration-200 ${
                  active
                    ? "border-navy-400 bg-navy-50 shadow-card"
                    : "border-line bg-white hover:border-navy-200 hover:bg-sand-50"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[13px] font-extrabold ${
                    active ? "bg-navy-700 text-white" : "bg-sand-100 text-ink-faint"
                  }`}
                >
                  {["أ", "ب", "ج", "د"][i]}
                </span>
                <span className="text-[15.5px] font-semibold leading-relaxed text-ink">{o.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <button type="button" onClick={onBack} className="btn-ghost !px-3 !py-2 text-[13.5px]">
            <ArrowRight className="h-4 w-4" />
            السابق
          </button>
          <span className="text-[12.5px] font-semibold text-ink-faint">
            اختر الإجابة الأقرب إلى واقعك، لا الأفضل نظرياً.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── الخطوة 3: النتيجة ──────────────────────────────────────── */
function Result({
  result,
  audience,
  onRestart,
}: {
  result: {
    score: number;
    level: ReturnType<typeof levelForScore>;
    path: { pathId: string; reason: string };
    dimensions: { key: string; value: number }[];
    strengths: string[];
    gaps: string[];
  };
  audience: AssessmentAudience;
  onRestart: () => void;
}) {
  const path = pathById(result.path.pathId);
  const tone = LEVEL_TONE[result.level.tone] ?? LEVEL_TONE.sky;
  const pathTone = path ? PATH_TONES[path.tone] : PATH_TONES.navy;
  const steps = FIRST_STEPS[result.level.key] ?? [];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="card overflow-hidden p-0">
        <div className="grid gap-8 border-b border-line p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="mx-auto lg:mx-0">
            <Ring value={result.score} size={168} stroke={13} color={tone.color} sublabel="من 100" />
          </div>
          <div>
            <div className="eyebrow mb-3">نتيجة التقييم</div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="h2">{result.level.name}</h2>
              <span className={`chip ${tone.chip}`}>
                النطاق <Num value={result.level.range} />
              </span>
            </div>
            <p className="lede mt-4">{result.level.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/demo" className="btn-primary">
                ادخل منصة المستفيد
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <button type="button" onClick={onRestart} className="btn-secondary">
                <RotateCcw className="h-4 w-4" />
                إعادة التقييم
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-line lg:grid-cols-3">
          <div className="bg-white p-7">
            <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" strokeWidth={2} />
              نقاط القوة
            </div>
            <ul className="mt-4 grid gap-2.5">
              {(result.strengths.length ? result.strengths : ["لم تُرصد نقاط قوة واضحة بعد"]).map((s) => (
                <li key={s} className="rounded-xl bg-emerald-50/60 px-4 py-3 text-[14px] font-semibold text-emerald-800">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-7">
            <div className="flex items-center gap-2 text-[14px] font-extrabold text-navy-900">
              <TriangleAlert className="h-4.5 w-4.5 text-amber-600" strokeWidth={2} />
              فرص التحسين
            </div>
            <ul className="mt-4 grid gap-2.5">
              {(result.gaps.length ? result.gaps : ["لا توجد فجوات جوهرية — ركّز على الاستمرارية"]).map((s) => (
                <li key={s} className="rounded-xl bg-amber-50/70 px-4 py-3 text-[14px] font-semibold text-amber-800">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-7">
            <div className="text-[14px] font-extrabold text-navy-900">توزيع المحاور</div>
            <ul className="mt-4 grid gap-3.5">
              {result.dimensions.map((d) => (
                <li key={d.key}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px] font-bold">
                    <span className="text-ink-soft">{d.key}</span>
                    <span className="text-navy-900">
                      <Pct value={d.value} />
                    </span>
                  </div>
                  <Progress value={d.value} tone="bg-navy-600" height="h-1.5" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {path && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="card p-7">
            <div className="eyebrow mb-3">المسار المقترح</div>
            <div className="flex items-start gap-4">
              <div className={`grid h-13 w-13 shrink-0 place-items-center rounded-2xl p-3 ${pathTone.soft} ${pathTone.text}`}>
                <Icon name={path.icon} className="h-6 w-6" />
              </div>
              <div>
                <div className="text-[21px] font-extrabold text-navy-900">{path.name}</div>
                <div className={`mt-0.5 text-[13px] font-bold ${pathTone.text}`}>{path.audience}</div>
              </div>
            </div>
            <p className="body mt-4">{result.path.reason}</p>
            <Link href={`/path/${path.id}`} className="btn-secondary mt-6 !py-2.5 text-[13.5px]">
              استعرض المسار
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-gold-500" strokeWidth={2} />
              <div className="text-[14px] font-extrabold text-navy-900">أول ثلاث خطوات مقترحة</div>
            </div>
            <ol className="mt-5 grid gap-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3.5 rounded-xl border border-line p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-700 text-[12.5px] font-extrabold text-white">
                    <Num value={i + 1} />
                  </span>
                  <span className="text-[14px] font-semibold leading-relaxed text-ink-soft">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-line bg-white px-6 py-5">
        <DemoNote />
        <p className="mt-1.5 text-[12.5px] font-semibold text-ink-faint">
          فئة التقييم: {AUDIENCE_META[audience].title} — النتيجة محسوبة داخل المتصفح ولا تُرسل إلى أي خادم.
        </p>
      </div>
    </div>
  );
}
