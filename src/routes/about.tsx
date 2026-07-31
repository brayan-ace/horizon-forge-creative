import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton, CTALink } from "@/components/CTAButton";
import { IMG } from "@/lib/content";
import { StatStrip } from "@/components/StatStrip";
import { urlFor } from "@/sanityclient/index";
import { useSanityQuery } from "@/hooks/useSanityQuery";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "Horizon 7 is a Cameroonian industrial engineering firm delivering welding, fabrication, civil works and heavy equipment to international standards.",
      },
      { property: "og:title", content: "About — Horizon 7 Company Ltd" },
      {
        property: "og:description",
        content: "Engineering-led. Safety-first. Built in Cameroon for continental delivery.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const FALLBACK_VALUES = [
  {
    title: "Engineering Excellence",
    body: "Every scope is engineered before it's built — from procedure qualification records to structural calculations.",
  },
  {
    title: "Innovation",
    body: "We adopt modern equipment, digital planning and international best practice to raise the industry standard.",
  },
  {
    title: "Integrity",
    body: "Transparent quotes, honest schedules, disciplined execution. Our word is our contract.",
  },
  {
    title: "Safety",
    body: "Zero-harm is a policy, not a slogan. Every site runs on permit-to-work discipline.",
  },
  {
    title: "Client Satisfaction",
    body: "Our best marketing is a client who calls us back. Long-term partnerships drive our delivery.",
  },
  {
    title: "Professional Workforce",
    body: "Coded welders, chartered engineers, certified scaffolders — training and re-certification never stop.",
  },
];

interface ValueItem {
  title?: string;
  body?: string;
}

function AboutPage() {
  const { data } = useSanityQuery(
    `*[_type == "aboutPage"][0]{
      pageEyebrow, pageTitle, pageIntro,
      storyEyebrow, storyHeading, storyParagraph1, storyParagraph2,
      storyImage{ asset->{_id, url}, alt },
      valuesEyebrow, valuesHeading,
      values[]{ title, body }
    }`,
  );

  const pageEyebrow = (data?.pageEyebrow as string) ?? "About Horizon 7";
  const pageTitle =
    (data?.pageTitle as string) ??
    "A Cameroonian engineering company built for continental delivery.";
  const pageIntro =
    (data?.pageIntro as string) ??
    "Founded to raise the industrial engineering standard in Central Africa, Horizon 7 combines local knowledge with international discipline — engineering, fabricating, welding and constructing to the specifications the world's most demanding operators expect.";

  const storyEyebrow = (data?.storyEyebrow as string) ?? "Our Story";
  const storyHeading =
    (data?.storyHeading as string) ?? "Precision is not a promise. It is a procedure.";
  const storyP1 =
    (data?.storyParagraph1 as string) ??
    "Horizon 7 was built on a simple observation: Africa's most ambitious industrial projects deserve contractors who deliver to the same standards demanded in Europe, the Gulf or North America. We assembled a team of coded welders, chartered engineers and heavy-equipment specialists to close that gap.";
  const storyP2 =
    (data?.storyParagraph2 as string) ??
    "Today, we support refineries, mining operators, EPC contractors and government infrastructure programs from our base in Cameroon — with the safety culture, QA/QC documentation and delivery discipline that make us a first-call contractor.";
  const storyImgSrc = data?.storyImage?.asset
    ? urlFor(data.storyImage).width(800).quality(80).url()
    : IMG.engineer;
  const storyImgAlt = (data?.storyImage?.alt as string) ?? "Horizon 7 site engineer";

  const valuesEyebrow = (data?.valuesEyebrow as string) ?? "Values";
  const valuesHeading = (data?.valuesHeading as string) ?? "The commitments that shape our work.";
  const values: ValueItem[] = data?.values?.length ? data.values : FALLBACK_VALUES;

  return (
    <PageShell>
      <PageHeader eyebrow={pageEyebrow} title={pageTitle} intro={pageIntro} />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              {data?.storyImage?.asset ? (
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src={storyImgSrc} alt={storyImgAlt} className="h-full w-full object-cover" />
                </div>
              ) : (
                <RevealImage src={storyImgSrc} alt={storyImgAlt} aspect="aspect-[4/5]" />
              )}
            </div>
            <Reveal className="lg:col-span-6 lg:pt-10">
              <div className="eyebrow">{storyEyebrow}</div>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                {storyHeading}
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{storyP1}</p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{storyP2}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <QuoteButton>Work With Us</QuoteButton>
                <CTALink to="/projects" variant="outline">
                  See Projects
                </CTALink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatStrip className="border-y border-hairline bg-muted/40" />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="eyebrow">{valuesEyebrow}</div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {valuesHeading}
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v: ValueItem, i: number) => (
              <Reveal
                key={v.title ?? i}
                delay={(i % 3) * 0.06}
                className="border-l border-t border-hairline p-8 lg:p-10"
              >
                <div className="eyebrow text-orange">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-6 font-display text-2xl font-medium">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
