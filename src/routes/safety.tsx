import { createFileRoute } from "@tanstack/react-router";
import { HardHat, ShieldCheck, ClipboardCheck, AlertTriangle, Globe2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton } from "@/components/CTAButton";
import { IMG } from "@/lib/content";

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

const PILLARS = [
  {
    icon: HardHat,
    title: "Safety Culture",
    body: "Zero-harm mindset embedded from board level to site level. Daily toolbox talks, pre-task risk assessments and permit-to-work discipline on every shift.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Workforce",
    body: "Coded welders, certified scaffold inspectors, trained rigging supervisors. Continuous training and re-certification is non-negotiable.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Control",
    body: "Documented QA/QC procedures, NDT partnerships, ITP compliance and full traceability on every fabrication and construction package.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Management",
    body: "HAZID / HAZOP-aligned risk registers, method statements reviewed before mobilization, and a proactive stop-work culture.",
  },
  {
    icon: Globe2,
    title: "International Standards",
    body: "Procedures aligned to ASME, AWS D1.1, API, ISO 9001 and OHSAS 18001 / ISO 45001 principles.",
  },
];

function SafetyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="HSE & Quality"
        title="Zero harm. Documented quality. International discipline."
        intro="Safety is not a department at Horizon 7 — it is how every project is planned, permitted and executed. Our HSE and QA/QC systems are aligned with international operators' expectations."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <div className="eyebrow">Commitment</div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
                Every shift ends the way it started — safely.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                From high-risk refinery turnarounds to remote civil worksites, our HSE framework
                protects our people, our clients' assets and the communities we operate in.
              </p>
              <div className="mt-10">
                <QuoteButton subject="HSE-critical scope">Discuss your HSE requirements</QuoteButton>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <RevealImage src={IMG.scaffolding} alt="Certified scaffolding on an industrial facility" aspect="aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-muted/40">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="eyebrow">Five Pillars</div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              How safety and quality are embedded in every project.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 0.06}
                className="border-l border-t border-hairline bg-background p-8 lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <p.icon className="h-8 w-8 text-orange" strokeWidth={1.5} />
                  <div className="eyebrow">{String(i + 1).padStart(2, "0")}</div>
                </div>
                <h3 className="mt-10 font-display text-2xl font-medium">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
