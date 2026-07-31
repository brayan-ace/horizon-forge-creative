import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal, RevealImage } from "@/components/Reveal";
import { QuoteButton } from "@/components/CTAButton";
import { PROJECTS } from "@/lib/content";
import { urlFor } from "@/sanityclient/index";
import { useSanityQuery } from "@/hooks/useSanityQuery";

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

interface ProjectItem {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  location?: string;
  status?: string;
  description?: string;
  image?: { asset?: unknown; alt?: string } | string;
}

function ProjectsPage() {
  const { data: fetchedProjects } = useSanityQuery(
    `*[_type == "project"] | order(_createdAt asc) { _id, name, "slug": slug.current, category, location, status, description, image{ asset->{_id, url}, alt } }`,
  );
  const { data: pageData } = useSanityQuery(
    `*[_type == "projectsPage"][0]{ pageEyebrow, pageTitle, pageIntro, ctaHeading }`,
  );

  const projects: ProjectItem[] = Array.isArray(fetchedProjects) ? fetchedProjects : [];
  const displayProjects: ProjectItem[] =
    projects.length > 0 ? projects : (PROJECTS as ProjectItem[]);
  const isSanity = projects.length > 0;

  const pageEyebrow = (pageData?.pageEyebrow as string) ?? "Portfolio";
  const pageTitle = (pageData?.pageTitle as string) ?? "Selected work across Cameroon.";
  const pageIntro =
    (pageData?.pageIntro as string) ??
    "A cross-section of the projects our engineers, welders and site teams have delivered for industrial operators, EPC contractors and public infrastructure programs.";
  const ctaHeading =
    (pageData?.ctaHeading as string) ?? "Have a project in mind? Let's discuss the scope.";

  return (
    <PageShell>
      <PageHeader eyebrow={pageEyebrow} title={pageTitle} intro={pageIntro} />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:gap-x-14">
            {displayProjects.map((p: ProjectItem, i: number) => {
              const imgSrc =
                isSanity && typeof p.image === "object" && p.image?.asset
                  ? urlFor(p.image).width(800).quality(80).url()
                  : (p.image as string);
              const imgAlt =
                isSanity && typeof p.image === "object" && p.image?.alt
                  ? p.image.alt
                  : (p.name ?? "Project image");

              return (
                <Reveal key={p.slug || p._id || i} delay={(i % 2) * 0.1}>
                  <article className={i % 2 === 1 ? "md:mt-24" : ""}>
                    {isSanity ? (
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={imgSrc}
                          alt={imgAlt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <RevealImage src={imgSrc} alt={imgAlt} aspect="aspect-[4/3]" />
                    )}
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-navy text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            {ctaHeading}
          </h2>
          <QuoteButton>Request a Quote</QuoteButton>
        </div>
      </section>
    </PageShell>
  );
}
