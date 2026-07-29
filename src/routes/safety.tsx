import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { HardHat, ShieldCheck, ClipboardCheck, AlertTriangle, Globe2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton } from "@/components/CTAButton";
import { IMG } from "@/lib/content";
import { client, urlFor } from "@/sanityclient";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Health, Safety & Environment — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "Zero-harm HSE culture, certified workforce, QA/QC discipline and international safety standards on every Horizon 7 project.",
      },
      { property: "og:title", content: "Safety — Horizon 7 Company Ltd" },
      {
        property: "og:description",
        content: "Zero-harm HSE culture and international safety standards on every site.",
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

function SafetyPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "safetyPage"][0]{
          pageEyebrow, pageTitle, pageIntro,
          commitmentEyebrow, commitmentHeading, commitmentParagraph,
          commitmentImage{ asset->{_id, url}, alt },
          pillarsEyebrow, pillarsHeading,
          pillars[]{ title, body }
        }`
      )
      .then(setData)
      .catch(console.error);
  }, []);

  const pageEyebrow = data?.pageEyebrow ?? "HSE & Quality";
  const pageTitle = data?.pageTitle ?? "Zero harm. Documented quality. International discipline.";
  const pageIntro = data?.pageIntro ?? "Safety is not a department at Horizon 7 — it is how every project is planned, permitted and executed. Our HSE and QA/QC systems are aligned with international operators' expectations.";

  const commitEyebrow = data?.commitmentEyebrow ?? "Commitment";
  const commitHeading = data?.commitmentHeading ?? "Every shift ends the way it started — safely.";
  const commitParagraph = data?.commitmentParagraph ?? "From high-risk refinery turnarounds to remote civil worksites, our HSE framework protects our people, our clients' assets and the communities we operate in.";
  const commitImgSrc = data?.commitmentImage?.asset ? urlFor(data.commitmentImage).width(800).quality(80).url() : IMG.scaffolding;
  const commitImgAlt = data?.commitmentImage?.alt ?? "Certified scaffolding on an industrial facility";

  const pillarsEyebrow = data?.pillarsEyebrow ?? "Five Pillars";
  const pillarsHeading = data?.pillarsHeading ?? "How safety and quality are embedded in every project.";
  const pillars = data?.pillars?.length ? data.pillars : FALLBACK_PILLARS;

  return (
    <PageShell>
      <PageHeader
        eyebrow={pageEyebrow}
        title={pageTitle}
        intro={pageIntro}
      />

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
                <RevealImage
                  src={commitImgSrc}
                  alt={commitImgAlt}
                  aspect="aspect-[4/3]"
                />
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
            {pillars.map((p: any, i: number) => {
              const Icon = PILLAR_ICONS[i] ?? HardHat;
              return (
                <Reveal
                  key={p.title}
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
