import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { QuoteButton } from "@/components/CTAButton";
import { EQUIPMENT } from "@/lib/content";
import { client, urlFor } from "@/sanityclient";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment Rentals — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "Modern excavators, cranes, forklifts, boom lifts, generators, dump trucks and heavy machinery for rent across Cameroon.",
      },
      { property: "og:title", content: "Equipment Rentals — Horizon 7" },
      {
        property: "og:description",
        content: "Inspection-ready industrial and construction equipment fleet.",
      },
      { property: "og:url", content: "/equipment" },
    ],
    links: [{ rel: "canonical", href: "/equipment" }],
  }),
  component: EquipmentPage,
});

const availabilityStyle: Record<string, string> = {
  Available: "text-orange border-orange",
  Limited: "text-foreground border-foreground",
  "On Request": "text-muted-foreground border-muted-foreground",
};

function EquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "equipmentItem"] | order(_createdAt asc) { _id, name, "slug": slug.current, category, specs[]{ label, value }, availability, image{ asset->{_id, url}, alt } }`)
      .then((res: any[]) => {
        if (res && res.length > 0) setEquipment(res);
      })
      .catch(console.error);

    client
      .fetch(`*[_type == "equipmentPage"][0]{ pageEyebrow, pageTitle, pageIntro }`)
      .then(setPageData)
      .catch(console.error);
  }, []);

  const displayEquipment = equipment.length > 0 ? equipment : EQUIPMENT;
  const isSanity = equipment.length > 0;

  const pageEyebrow = pageData?.pageEyebrow ?? "Equipment Rental";
  const pageTitle = pageData?.pageTitle ?? "A maintained fleet, dispatched nationwide.";
  const pageIntro = pageData?.pageIntro ?? "Modern equipment for earthmoving, lifting, access, haulage and power — inspected, serviced and dispatched with operators when required. Available for short-term and long-term contracts.";

  return (
    <PageShell>
      <PageHeader
        eyebrow={pageEyebrow}
        title={pageTitle}
        intro={pageIntro}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayEquipment.map((e: any, i: number) => {
              const imgSrc = isSanity && e.image?.asset ? urlFor(e.image).width(800).quality(80).url() : e.image;
              const imgAlt = isSanity ? (e.image?.alt || e.name) : e.name;
              return (
                <Reveal key={e.slug || e._id} delay={(i % 3) * 0.06}>
                  <article className="group flex h-full flex-col border border-hairline bg-background transition-colors hover:border-foreground">
                    <div className="relative overflow-hidden bg-foreground aspect-[4/3]">
                      <img
                        src={imgSrc}
                        alt={imgAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                      />
                      <span
                        className={`absolute right-4 top-4 border bg-background px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${availabilityStyle[e.availability] || availabilityStyle["Available"]}`}
                      >
                        {e.availability}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 lg:p-8">
                      <div className="eyebrow">{e.category}</div>
                      <h2 className="mt-3 font-display text-2xl font-medium">{e.name}</h2>
                      <dl className="mt-6 space-y-2 border-t border-hairline pt-4 text-sm">
                        {(e.specs || []).map((spec: any) => (
                          <div key={spec.label} className="flex justify-between gap-3">
                            <dt className="text-muted-foreground">{spec.label}</dt>
                            <dd className="text-right font-medium">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-6 flex-1" />
                      <div className="mt-6">
                        <QuoteButton
                          subject={`${e.name} rental`}
                          variant="secondary"
                          className="w-full justify-center"
                        >
                          Request Quote
                        </QuoteButton>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
