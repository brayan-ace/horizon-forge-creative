import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { QuoteButton, CTALink } from "@/components/CTAButton";
import { SERVICES } from "@/lib/content";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "Industrial welding, mechanical fabrication, scaffolding, PWHT, pipe welding, civil engineering, construction and equipment rentals across Cameroon.",
      },
      { property: "og:title", content: "Services — Horizon 7 Company Ltd" },
      {
        property: "og:description",
        content:
          "Nine integrated industrial engineering services delivered to international standards.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Capabilities"
        title="Nine integrated services. One engineering standard."
        intro="From coded pipe welding to civil infrastructure and heavy equipment supply, Horizon 7 covers the full industrial delivery chain — engineered, executed and documented to international standards."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <div className="group flex h-full flex-col">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="relative block overflow-hidden bg-foreground aspect-[4/5]"
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                      <div className="eyebrow text-orange">{s.index}</div>
                      <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    <h2 className="mt-6 font-display text-2xl font-medium transition-colors hover:text-orange">{s.name}</h2>
                  </Link>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.short}
                  </p>
                  <div className="mt-6">
                    <a
                      href={waLink(`Hi! I'd like to learn more about the ${s.name} service.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 border-2 border-orange bg-transparent px-6 py-3 text-sm font-semibold text-orange transition-all duration-300 hover:bg-orange hover:text-white active:scale-95 sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Learn more
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-muted/40">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="eyebrow">Bespoke Scope</div>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
                Don't see your scope listed? We build to specification.
              </h2>
            </div>
            <div className="flex gap-3">
              <QuoteButton>Request a Quote</QuoteButton>
              <CTALink to="/contact" variant="outline">
                Contact
              </CTALink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
