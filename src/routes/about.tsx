import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton, CTALink } from "@/components/CTAButton";
import { IMG, STATS } from "@/lib/content";
import { StatStrip } from "@/components/StatStrip";

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

const VALUES = [
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

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About Horizon 7"
        title="A Cameroonian engineering company built for continental delivery."
        intro="Founded to raise the industrial engineering standard in Central Africa, Horizon 7 combines local knowledge with international discipline — engineering, fabricating, welding and constructing to the specifications the world's most demanding operators expect."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <RevealImage src={IMG.engineer} alt="Horizon 7 site engineer" aspect="aspect-[4/5]" />
            </div>
            <Reveal className="lg:col-span-6 lg:pt-10">
              <div className="eyebrow">Our Story</div>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                Precision is not a promise. It is a procedure.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Horizon 7 was built on a simple observation: Africa's most ambitious industrial
                projects deserve contractors who deliver to the same standards demanded in Europe,
                the Gulf or North America. We assembled a team of coded welders, chartered engineers
                and heavy-equipment specialists to close that gap.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Today, we support refineries, mining operators, EPC contractors and government
                infrastructure programs from our base in Cameroon — with the safety culture, QA/QC
                documentation and delivery discipline that make us a first-call contractor.
              </p>
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
            <div className="eyebrow">Values</div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              The commitments that shape our work.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
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
