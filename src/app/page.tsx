import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  ClipboardList,
  Gauge,
  GraduationCap,
  Medal,
  PlayCircle,
  Users,
  Wrench,
} from "lucide-react";
import HeroScene from "@/components/HeroScene";
import Icon from "@/components/Icon";
import { CardLink, DemoNote, Frac, ImageFrame, Num, Pct, Progress, SectionHead, Tag } from "@/components/ui";
import { ADULT_PATHS, PATH_TONES, SCHOOL_PATHS } from "@/data/paths";
import { BADGES } from "@/data/badges";
import { PERSONAS } from "@/data/users";
import { TRAINING_PROGRAMS } from "@/data/training";
import { EXEC_KPIS } from "@/data/executive";
import { arDate, gradeLabel } from "@/lib/text";

const JOURNEY = [
  { icon: ClipboardList, title: "تقييم المستوى الحالي", note: "نقطة انطلاق مبنية على قياس لا على تخمين", href: "/assessment" },
  { icon: GraduationCap, title: "التعلّم", note: "وحدات قصيرة مبنية على سلوك محدد", href: "/paths" },
  { icon: Wrench, title: "التطبيق العملي", note: "تحديات تُنفَّذ في الحياة اليومية", href: "/paths" },
  { icon: Medal, title: "الشارات والمكافآت", note: "تحفيز مرتبط بالإنجاز لا بالمشاهدة", href: "/rewards" },
  { icon: Gauge, title: "قياس الأثر", note: "معرفة، سلوك، ثقة، عادات، تطبيق", href: "/impact" },
];

export default function HomePage() {
  const showcase = PERSONAS[0];
  const showcasePathTone = PATH_TONES.sky;
  const upcoming = TRAINING_PROGRAMS.slice(0, 3);
  const heroKpis = [
    EXEC_KPIS[0],
    EXEC_KPIS[1],
    EXEC_KPIS[3],
    EXEC_KPIS[6],
  ];

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative -mt-[76px] pt-[76px]">
        <div className="shell pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="absolute inset-0">
              <HeroScene className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/35 to-white/5 lg:hidden" />
            </div>
            <div className="relative grid gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:py-28">
              <div className="max-w-xl animate-fadeUp">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white/85 px-3.5 py-1.5 text-[12.5px] font-extrabold text-gold-700 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  مبادرة على مستوى إمارة الفجيرة
                </div>
                <h1 className="h1">
                  وعي مالي يبدأ <span className="text-gold-600">مبكّراً</span>
                </h1>
                <p className="lede mt-6 max-w-lg">
                  منصة رقمية وتدريبية تبني سلوكاً مالياً واعياً من المدرسة إلى مختلف مراحل الحياة.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/demo" className="btn-primary !px-7 !py-3.5 text-[16px]">
                    ابدأ رحلتك
                    <ArrowLeft className="h-4.5 w-4.5" />
                  </Link>
                  <Link href="/assessment" className="btn-secondary !px-6 !py-3.5 text-[16px]">
                    <PlayCircle className="h-5 w-5 text-gold-500" />
                    قيّم مستواك المالي
                  </Link>
                </div>
                <DemoNote className="mt-8" />
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>

          {/* شريط المؤشرات */}
          <div className="relative z-10 -mt-10 px-2 sm:px-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card lg:grid-cols-4">
              {heroKpis.map((k) => (
                <div key={k.id} className="bg-white px-5 py-6 text-center">
                  <div className="text-[26px] font-extrabold leading-none text-navy-900 sm:text-[30px]">
                    <Num value={k.value} />
                    {k.unit === "%" && <span className="text-[18px]">%</span>}
                  </div>
                  <div className="mt-2 text-[12.5px] font-bold text-ink-faint">{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── المرحلتان ───────────────────── */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="بنية المنظومة"
            title="مرحلتان تغطيان العمر كله"
            description="مسار متصل يبدأ من الصف الأول ولا ينتهي عند التخرج، بل يرافق المستفيد في كل قرار مالي كبير."
            action={
              <Link href="/paths" className="btn-secondary">
                استعرض جميع المسارات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            }
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* المرحلة الأولى */}
            <div className="card overflow-hidden p-0">
              <div className="flex items-start gap-4 p-6 pb-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-600">
                  <GraduationCap className="h-6 w-6" strokeWidth={1.9} />
                </div>
                <div>
                  <div className="h3">المرحلة الأولى</div>
                  <div className="mt-1 text-[14px] font-bold text-gold-600">طلبة المدارس حتى الثانوية</div>
                  <p className="body mt-3">
                    مسارات عمرية متدرجة، تعلّم تفاعلي، وشارات تحفيزية مرتبطة بسلوك حقيقي.
                  </p>
                </div>
              </div>
              <div className="px-6">
                <ImageFrame
                  label="طلبة مدارس الفجيرة"
                  caption="صورة رسمية مطلوبة"
                  ratio="aspect-[16/7]"
                  variant="people"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4">
                {SCHOOL_PATHS.map((p) => {
                  const t = PATH_TONES[p.tone];
                  return (
                    <Link
                      key={p.id}
                      href={`/path/${p.id}`}
                      className={`rounded-xl border ${t.border} ${t.soft} p-3.5 text-center transition-transform duration-200 hover:-translate-y-0.5`}
                    >
                      <div className={`mx-auto mb-2 grid h-9 w-9 place-items-center rounded-lg bg-white/70 ${t.text}`}>
                        <Icon name={p.icon} className="h-4.5 w-4.5" />
                      </div>
                      <div className="text-[14px] font-extrabold text-navy-900">{p.name}</div>
                      <div className="mt-0.5 text-[11.5px] font-bold text-ink-faint">
                        {gradeLabel(p.gradeRange!)}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* المرحلة الثانية */}
            <div className="card overflow-hidden p-0">
              <div className="flex items-start gap-4 p-6 pb-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Users className="h-6 w-6" strokeWidth={1.9} />
                </div>
                <div>
                  <div className="h3">المرحلة الثانية</div>
                  <div className="mt-1 text-[14px] font-bold text-navy-700">الجامعة وما بعدها</div>
                  <p className="body mt-3">
                    مسارات متخصصة للجامعة والموظفين والادخار والاستثمار والزواج وبيت العمر والتقاعد.
                  </p>
                </div>
              </div>
              <div className="px-6">
                <ImageFrame
                  label="شباب ومواطنو الفجيرة"
                  caption="صورة رسمية مطلوبة"
                  ratio="aspect-[16/7]"
                  variant="city"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3">
                {ADULT_PATHS.map((p) => {
                  const t = PATH_TONES[p.tone];
                  return (
                    <Link
                      key={p.id}
                      href={`/path/${p.id}`}
                      className={`rounded-xl border ${t.border} ${t.soft} p-3.5 text-center transition-transform duration-200 hover:-translate-y-0.5`}
                    >
                      <div className={`mx-auto mb-2 grid h-9 w-9 place-items-center rounded-lg bg-white/70 ${t.text}`}>
                        <Icon name={p.icon} className="h-4.5 w-4.5" />
                      </div>
                      <div className="text-[13.5px] font-extrabold leading-tight text-navy-900">{p.name}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── رحلة المستفيد ───────────────────── */}
      <section id="journey" className="section bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="كيف تعمل المنظومة"
            title="رحلة المستفيد في خمس محطات"
            description="من قياس المستوى إلى قياس الأثر — كل محطة تُنتج بياناً يمكن البناء عليه."
            align="center"
          />
          <div className="relative">
            <div className="absolute inset-x-8 top-[38px] hidden h-px bg-line lg:block" />
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {JOURNEY.map((step, i) => (
                <Link
                  key={step.title}
                  href={step.href}
                  className="group rounded-2xl border border-line bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="mx-auto grid h-[76px] w-[76px] place-items-center rounded-full border border-line bg-sand-50 text-navy-700 transition-colors group-hover:border-gold-200 group-hover:bg-gold-50 group-hover:text-gold-600">
                    <step.icon className="h-7 w-7" strokeWidth={1.7} />
                  </div>
                  <div className="mt-4 text-[11px] font-extrabold tracking-[.14em] text-gold-600">
                    المحطة <Num value={i + 1} />
                  </div>
                  <div className="mt-1.5 text-[15.5px] font-extrabold text-navy-900">{step.title}</div>
                  <p className="mt-2 text-[12.5px] font-semibold leading-relaxed text-ink-faint">{step.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── منصة المستفيد ───────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="eyebrow mb-3">منصة المستفيد</div>
              <h2 className="h2">حساب واحد يرافق المستفيد في كل مرحلة</h2>
              <p className="lede mt-5">
                ملف مالي شخصي ينتقل مع المستفيد من المدرسة إلى الجامعة إلى الوظيفة والأسرة. يحتفظ
                بالتقييمات والشارات والنقاط، ويقترح الخطوة التالية بناءً على السلوك لا على العمر فقط.
              </p>
              <ul className="mt-7 grid gap-3">
                {[
                  "تقييم مالي متجدد يقيس التقدم لا المعرفة فقط",
                  "توصيات شخصية مبنية على نقاط القوة والفجوات",
                  "ربط مباشر بالبرامج التدريبية الحضورية",
                  "شارات ونقاط تُمنح عند إنجاز سلوك محدد",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.9} />
                    <span className="text-[15px] font-semibold text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demo" className="btn-primary">
                  <PlayCircle className="h-4.5 w-4.5" />
                  استعرض التجربة بشخصيات جاهزة
                </Link>
                <Link href="/dashboard" className="btn-secondary">
                  منصة المستفيد
                </Link>
              </div>
            </div>

            {/* بطاقة معاينة */}
            <div className="card p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-[17px] font-extrabold text-navy-700">
                    {showcase.initials}
                  </div>
                  <div>
                    <div className="text-[17px] font-extrabold text-navy-900">{showcase.name}</div>
                    <div className="text-[13px] font-bold text-ink-faint">{showcase.roleLabel}</div>
                  </div>
                </div>
                <Tag tone={`${showcasePathTone.soft} ${showcasePathTone.text}`}>
                  مسار {showcase.pathName}
                </Tag>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "التقييم المالي", value: <Frac a={showcase.score} b={100} /> },
                  { label: "النقاط", value: <Num value={showcase.points} /> },
                  { label: "الشارات", value: <Num value={showcase.badges.length} /> },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-sand-50 p-4 text-center">
                    <div className="text-[20px] font-extrabold text-navy-900">{s.value}</div>
                    <div className="mt-1 text-[11.5px] font-bold text-ink-faint">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-[13px] font-bold">
                  <span className="text-ink-soft">تقدّم المسار</span>
                  <span className="text-navy-900">
                    <Pct value={showcase.progress} />
                  </span>
                </div>
                <Progress value={showcase.progress} tone="bg-navy-600" height="h-2.5" />
              </div>

              <div className="mt-6">
                <div className="mb-3 text-[13px] font-extrabold text-navy-900">الشارات المكتسبة</div>
                <div className="flex flex-wrap gap-2">
                  {BADGES.filter((b) => showcase.badges.includes(b.id)).map((b) => (
                    <span
                      key={b.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12.5px] font-bold text-navy-800"
                    >
                      <Icon name={b.icon} className="h-4 w-4 text-gold-500" />
                      {b.name}
                    </span>
                  ))}
                  {BADGES.filter((b) => showcase.nextBadges.includes(b.id)).map((b) => (
                    <span
                      key={b.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line bg-sand-50 px-2.5 py-1.5 text-[12.5px] font-bold text-ink-faint"
                    >
                      <Icon name={b.icon} className="h-4 w-4" />
                      {b.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-gold-100 bg-gold-50/70 p-4">
                <div className="text-[12px] font-extrabold text-gold-700">التحدي الحالي</div>
                <div className="mt-1 text-[15px] font-extrabold text-navy-900">
                  {showcase.currentChallenge.title}
                </div>
                <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-ink-soft">
                  {showcase.currentChallenge.detail}
                </p>
                <div className="mt-3">
                  <Progress value={showcase.currentChallenge.progress} tone="bg-gold-400" height="h-1.5" showLabel />
                </div>
              </div>

              <DemoNote className="mt-5" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── عن البرنامج ───────────────────── */}
      <section id="about" className="section bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="عن البرنامج"
            title="لماذا الوعي المالي أولوية على مستوى الإمارة؟"
            description="لأن أغلب القرارات المالية المؤثرة تُتخذ قبل سن الثلاثين، بينما يبدأ التثقيف المالي غالباً بعدها."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "من المعرفة إلى السلوك",
                body:
                  "لا نقيس عدد الدروس المكتملة، بل التغيّر في السلوك المالي: هل بدأ المستفيد يدّخر فعلاً؟ هل صار يقارن قبل الشراء؟",
                icon: "Target",
              },
              {
                title: "تدرّج عمري مدروس",
                body:
                  "أربعة مستويات مدرسية وستة مسارات لما بعد المدرسة، كل مستوى يبني على ما قبله بسلوكيات محددة وقابلة للقياس.",
                icon: "BarChart3",
              },
              {
                title: "رقمي وحضوري معاً",
                body:
                  "المحتوى الرقمي يبني الأساس، والبرامج التدريبية المباشرة في الفجيرة ودبي وأبوظبي تحوّله إلى تطبيق حقيقي.",
                icon: "Users",
              },
            ].map((c) => (
              <div key={c.title} className="card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={c.icon} className="h-5 w-5" />
                </div>
                <div className="mt-5 h3">{c.title}</div>
                <p className="body mt-3">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── التدريب المباشر ───────────────────── */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="التدريب المباشر"
            title="البرامج القادمة"
            description="يتحول التعلم الرقمي إلى تطبيق عبر برامج حضورية في الفجيرة ودبي وأبوظبي، بشروط التحاق مرتبطة بالإنجاز."
            action={
              <Link href="/training" className="btn-secondary">
                جميع البرامج
                <ArrowLeft className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {upcoming.map((p) => (
              <CardLink key={p.id} href="/training">
                <div className="flex items-center justify-between gap-3">
                  <Tag tone="bg-navy-50 text-navy-700">{p.city}</Tag>
                  <span className="text-[12px] font-bold text-ink-faint">{p.duration}</span>
                </div>
                <div className="mt-4 text-[17px] font-extrabold leading-snug text-navy-900">{p.name}</div>
                <p className="body mt-2.5 line-clamp-2">{p.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[12.5px] font-bold">
                  <span className="text-ink-faint">{arDate(p.date)}</span>
                  <span className="text-gold-600">
                    <Num value={p.seatsLeft} /> مقعد متبقٍّ
                  </span>
                </div>
              </CardLink>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── دعوة ───────────────────── */}
      <section className="pb-4">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-navy-800 bg-navy-900 px-7 py-14 text-center sm:px-14">
            <div className="absolute inset-0 opacity-[.07]">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 150 L80 100 L160 140 L240 80 L320 140 L400 90 L480 150 L560 100 L600 140 L600 200 L0 200Z" fill="#fff" />
              </svg>
            </div>
            <div className="relative">
              <div className="mb-4 text-[12.5px] font-extrabold uppercase tracking-[.18em] text-gold-300">
                نموذج عرض تفاعلي
              </div>
              <h2 className="text-[30px] font-extrabold leading-snug text-white sm:text-[38px]">
                جرّب المنصة بعين المستفيد خلال دقيقة واحدة
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.9] text-navy-100">
                ثماني شخصيات تجريبية جاهزة للدخول مباشرة — من طالب في الصف السادس إلى مقبل على
                التقاعد — بأرقام ومسارات مختلفة لكل واحدة.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn-gold !px-7 !py-3.5 text-[16px]">
                  استعرض التجربة
                  <ArrowLeft className="h-4.5 w-4.5" />
                </Link>
                <Link
                  href="/executive"
                  className="btn !border !border-white/25 !bg-white/10 !px-6 !py-3.5 text-[16px] text-white hover:!bg-white/20"
                >
                  لوحة المؤشرات التنفيذية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
