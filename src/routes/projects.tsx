import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton } from "@/components/CTAButton";
import { PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "Selected industrial engineering, fabrication and construction projects delivered by Horizon 7 across Cameroon.",
      },
      { property: "og:title", content: "Projects — Horizon 7 Company Ltd" },
      {
        property: "og:description",
        content:
          "Fabrication yards, refinery turnarounds, bridges, warehouses and heavy equipment deployments.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work across Cameroon."
        intro="A cross-section of the projects our engineers, welders and site teams have delivered for industrial operators, EPC contractors and public infrastructure programs."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:gap-x-14">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.1}>
                <article className={i % 2 === 1 ? "md:mt-24" : ""}>
                  <RevealImage src={p.image} alt={p.name} aspect="aspect-[4/3]" />
                  <div className="mt-6 flex items-center justify-between">
                    <div className="eyebrow">{p.category}</div>
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] ${
                        p.status === "Completed" ? "text-orange" : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 ${
                          p.status === "Completed" ? "bg-orange" : "bg-muted-foreground"
                        }`}
                      />
                      {p.status}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
                    {p.name}
                  </h2>
                  <div className="mt-2 text-sm text-muted-foreground">{p.location}</div>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-navy text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Have a project in mind? Let's discuss the scope.
          </h2>
          <QuoteButton>Request a Quote</QuoteButton>
        </div>
      </section>
    </PageShell>
  );
}
