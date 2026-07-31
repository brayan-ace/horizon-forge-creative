import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { QuoteButton, CTALink } from "@/components/CTAButton";
import { SERVICES } from "@/lib/content";
import { urlFor } from "@/sanityclient/index";
import { useSanityQuery } from "@/hooks/useSanityQuery";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    // Allow even if not found locally — Sanity might have it
    return { service: service || null, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.service) {
      return {
        meta: [{ title: "Service — Horizon 7 Company Ltd" }],
      };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.name} — Horizon 7 Company Ltd` },
        { name: "description", content: s.description },
        { property: "og:title", content: `${s.name} — Horizon 7` },
        { property: "og:description", content: s.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
    };
  },
  component: ServiceDetail,
});

interface ServiceItem {
  _id?: string;
  index?: string;
  name?: string;
  slug?: string;
  short?: string;
  description?: string;
  image?: { asset?: unknown; alt?: string } | string;
  capabilities?: string[];
}

function ServiceDetail() {
  const { service: localService, slug } = Route.useLoaderData();

  const { data: sanityService } = useSanityQuery(
    `*[_type == "service" && slug.current == $slug][0]{ _id, index, name, "slug": slug.current, short, description, image{ asset->{_id, url}, alt }, capabilities }`,
    { slug },
  );

  const { data: fetchedOther } = useSanityQuery(
    `*[_type == "service" && slug.current != $slug] | order(index asc) [0...3] { _id, index, name, "slug": slug.current, image{ asset->{_id, url}, alt } }`,
    { slug },
  );

  const otherServices: ServiceItem[] = Array.isArray(fetchedOther) ? fetchedOther : [];

  const service: ServiceItem | null =
    (sanityService as ServiceItem) || (localService as ServiceItem);
  const isSanity = !!sanityService;

  if (!service) {
    return (
      <PageShell>
        <div className="mx-auto max-w-[1440px] px-6 py-32 text-center">
          <h1 className="font-display text-4xl font-medium">Service not found</h1>
        </div>
      </PageShell>
    );
  }

  const imgSrc =
    isSanity && typeof service.image === "object" && service.image?.asset
      ? urlFor(service.image).width(1200).quality(80).url()
      : (service.image as string);
  const imgAlt =
    isSanity && typeof service.image === "object" && service.image?.alt
      ? service.image.alt
      : (service.name ?? "Service image");

  const others: ServiceItem[] =
    otherServices.length > 0
      ? otherServices
      : (SERVICES.filter((s) => s.slug !== (service.slug || slug)).slice(0, 3) as ServiceItem[]);
  const othersIsSanity = otherServices.length > 0;

  return (
    <PageShell>
      <section className="relative h-[70svh] min-h-[520px] overflow-hidden bg-foreground">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-10 lg:pb-24">
            <div className="eyebrow text-orange">{service.index} — Service</div>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              {service.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow">Overview</div>
              <p className="mt-6 font-display text-2xl font-medium leading-snug tracking-[-0.01em] sm:text-3xl">
                {service.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <QuoteButton subject={service.name}>Request a Quote</QuoteButton>
                <CTALink to="/services" variant="outline">
                  All Services
                </CTALink>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="eyebrow">Capabilities</div>
              <ul className="mt-6 space-y-4">
                {(service.capabilities || []).map((c: string) => (
                  <li key={c} className="flex items-start gap-3 border-b border-hairline pb-4">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange" strokeWidth={2} />
                    <span className="text-base">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-muted/40">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow">Explore More</div>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
                Other services
              </h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {others.map((s: ServiceItem) => {
              const otherSlug = s.slug ?? "";
              const otherImg =
                othersIsSanity && typeof s.image === "object" && s.image?.asset
                  ? urlFor(s.image).width(800).quality(80).url()
                  : (s.image as string);
              const otherAlt =
                othersIsSanity && typeof s.image === "object" && s.image?.alt
                  ? s.image.alt
                  : (s.name ?? "Service image");
              return (
                <Link
                  key={otherSlug}
                  to="/services/$slug"
                  params={{ slug: otherSlug }}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-foreground aspect-[4/5]">
                    <img
                      src={otherImg}
                      alt={otherAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                      <div className="eyebrow text-orange">{s.index}</div>
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium">{s.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
