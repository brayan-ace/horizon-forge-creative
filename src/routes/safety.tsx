import { createFileRoute } from "@tanstack/react-router";
import { HardHat, ShieldCheck, ClipboardCheck, AlertTriangle, Globe2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton } from "@/components/CTAButton";
import { IMG } from "@/lib/content";
import { urlFor } from "@/sanityclient/index";
import { useSanityQuery } from "@/hooks/useSanityQuery";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety & Quality — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "HSE policies, QA/QC standards, coded welder qualifications and ISO-aligned risk management at Horizon 7 Company Ltd.",
      },
      { property: "og:title", content: "HSE & Quality — Horizon 7 Company Ltd" },
      {
        property: "og:description",
        content: "Zero-harm commitment and ASME / AWS D1.1 quality procedures on every site.",
      },
      { property: "og:url", content: "/safety" },
    ],
    links: [{ rel: "canonical", href: "/safety" }],
  }),
  component: SafetyPage,
});

const PILLAR_ICONS = [HardHat, ShieldCheck, ClipboardCheck, AlertTriangle, Globe2];

const FALLBACK_PILLARS = [
  {
    title: "Safety Culture",
    body: "Zero-harm mindset embedded from board level to site level. Daily toolbox talks, pre-task risk assessments and permit-to-work discipline on every shift.",
  },
  {
    title: "Certified Workforce",
    body: "Coded welders, certified scaffold inspectors, trained rigging supervisors. Continuous training and re-certification is non-negotiable.",
  },
  {
    title: "Quality Control",
    body: "Documented QA/QC procedures, NDT partnerships, ITP compliance and full traceability on every fabrication and construction package.",
  },
  {
    title: "Risk Management",
    body: "HAZID / HAZOP-aligned risk registers, method statements reviewed before mobilization, and a proactive stop-work culture.",
  },
  {
    title: "International Standards",
    body: "Procedures aligned to ASME, AWS D1.1, API, ISO 9001 and OHSAS 18001 / ISO 45001 principles.",
  },
];

interface PillarItem {
  title?: string;
  body?: string;
}

function SafetyPage() {
  const { data } = useSanityQuery(
    `*[_type == "safetyPage"][0]{
      pageEyebrow, pageTitle, pageIntro,
      commitmentEyebrow, commitmentHeading, commitmentParagraph,
      commitmentImage{ asset->{_id, url}, alt },
      pillarsEyebrow, pillarsHeading,
      pillars[]{ title, body }
    }`,
  );

  const pageEyebrow = (data?.pageEyebrow as string) ?? "HSE & Quality";
  const pageTitle =
    (data?.pageTitle as string) ?? "Zero harm. Documented quality. International discipline.";
  const pageIntro =
    (data?.pageIntro as string) ??
    "Safety is not a department at Horizon 7 — it is how every project is planned, permitted and executed. Our HSE and QA/QC systems are aligned with international operators' expectations.";

  const commitEyebrow = (data?.commitmentEyebrow as string) ?? "Commitment";
  const commitHeading =
    (data?.commitmentHeading as string) ?? "Every shift ends the way it started — safely.";
  const commitParagraph =
    (data?.commitmentParagraph as string) ??
    "From high-risk refinery turnarounds to remote civil worksites, our HSE framework protects our people, our clients' assets and the communities we operate in.";
  const commitImgSrc = data?.commitmentImage?.asset
    ? urlFor(data.commitmentImage).width(800).quality(80).url()
    : IMG.scaffolding;
  const commitImgAlt =
    (data?.commitmentImage?.alt as string) ?? "Certified scaffolding on an industrial facility";

  const pillarsEyebrow = (data?.pillarsEyebrow as string) ?? "Five Pillars";
  const pillarsHeading =
    (data?.pillarsHeading as string) ?? "How safety and quality are embedded in every project.";
  const pillars: PillarItem[] = data?.pillars?.length ? data.pillars : FALLBACK_PILLARS;

  return (
    <PageShell>
      <PageHeader eyebrow={pageEyebrow} title={pageTitle} intro={pageIntro} />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <div className="eyebrow">{commitEyebrow}</div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
                {commitHeading}
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                {commitParagraph}
              </p>
              <div className="mt-10">
                <QuoteButton subject="HSE-critical scope">
                  Discuss your HSE requirements
                </QuoteButton>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              {data?.commitmentImage?.asset ? (
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={commitImgSrc}
                    alt={commitImgAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <RevealImage src={commitImgSrc} alt={commitImgAlt} aspect="aspect-[4/3]" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-muted/40">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="eyebrow">{pillarsEyebrow}</div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              {pillarsHeading}
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p: PillarItem, i: number) => {
              const Icon = PILLAR_ICONS[i] ?? HardHat;
              return (
                <Reveal
                  key={p.title ?? i}
                  delay={(i % 3) * 0.06}
                  className="border-l border-t border-hairline bg-background p-8 lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-8 w-8 text-orange" strokeWidth={1.5} />
                    <div className="eyebrow">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-medium">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
