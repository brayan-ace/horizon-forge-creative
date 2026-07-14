import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Award, Wrench, Truck, Clock, Sparkles } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { CTALink, QuoteButton } from "@/components/CTAButton";
import { Reveal, RevealImage } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { SITE } from "@/lib/site";
import { IMG, SERVICES, WHY_CHOOSE_US, STATS, TESTIMONIALS, PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon" },
      {
        name: "description",
        content:
          "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon.",
      },
      { property: "og:title", content: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon" },
      {
        property: "og:description",
        content: "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const ICON_MAP = [Award, Shield, Wrench, Truck, Clock, Sparkles];

function HomePage() {
  return (
    <PageShell transparentHeader>
      <Hero />
      <StatStrip />
      <IntroBand />
      <ServicesTeaser />
      <WhyChooseUs />
      <FeaturedProjects />
      <Testimonials />
      <CTABand />
    </PageShell>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[720px] overflow-hidden bg-foreground">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={IMG.heroWelder}
          alt="Certified industrial welder performing structural steel welding at a Horizon 7 fabrication yard"
          className="h-[115%] w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-24 pt-32 lg:px-10 lg:pb-32"
      >
        <Reveal delay={0.1}>
          <div className="eyebrow text-orange">01 — Horizon 7 Company Ltd</div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-white">
            Engineering Excellence.
            <br />
            Industrial Precision.
            <br />
            <span className="text-orange">Built for Tomorrow.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {SITE.description}
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <QuoteButton variant="primary">Request a Quote</QuoteButton>
            <CTALink to="/services" variant="outline-light">
              Explore Services
            </CTALink>
          </div>
        </Reveal>
      </motion.div>

      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 lg:right-10 lg:flex">
        <div className="h-px w-12 bg-white/60" />
        <span className="eyebrow text-white/60">Scroll</span>
      </div>
    </section>
  );
}

function StatStrip() {
  return (
    <section className="border-b border-hairline bg-background">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-16 lg:grid-cols-4 lg:px-10 lg:py-20">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="hairline-top pt-6">
              <div className="font-display text-5xl font-medium tracking-tight lg:text-6xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IntroBand() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-40">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow">About</div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              A Cameroonian engineering firm building to international standards.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Horizon 7 Company Ltd is an industrial engineering and construction firm delivering
              coded welding, precision fabrication, civil works and heavy equipment services to
              refineries, power plants, mines and government infrastructure programs across Central
              Africa.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our discipline is engineering-led. Every scope is planned, executed and handed over
              with the documentation, safety record and quality control our clients expect from
              world-class contractors.
            </p>
            <div className="mt-10">
              <Link to="/about" className="link-underline text-sm font-medium">
                Read our story →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  const highlight = SERVICES.slice(0, 3);
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal>
            <div className="eyebrow">02 — Capabilities</div>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Integrated services for complex industrial projects.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/services"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium"
            >
              View all nine services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlight.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group block">
                <div className="relative overflow-hidden bg-foreground aspect-[4/5]">
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
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="eyebrow">03 — Why Horizon 7</div>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Six commitments we deliver on every project.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICON_MAP[i] ?? Award;
            return (
              <Reveal
                key={item.index}
                delay={i * 0.06}
                className="group border-l border-t border-hairline p-8 transition-colors hover:bg-muted/50 lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-orange" strokeWidth={1.5} />
                  <div className="eyebrow">{item.index}</div>
                </div>
                <h3 className="mt-10 font-display text-2xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <div className="eyebrow text-white/60">04 — Selected Work</div>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Delivered across Cameroon.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/projects"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              View portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <div className="group">
                <RevealImage src={p.image} alt={p.name} aspect="aspect-[4/5]" />
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/60">
                  <span>{p.category}</span>
                  <span>{p.location}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="eyebrow">05 — Client Trust</div>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div>
                <div className="font-display text-6xl text-orange">"</div>
                <blockquote className="mt-4 font-display text-2xl font-medium leading-snug tracking-[-0.01em] sm:text-3xl">
                  {t.quote}
                </blockquote>
                <div className="mt-8 hairline-top pt-6">
                  <div className="font-medium">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <img
        src={IMG.craneDusk}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-8 h-px w-16 bg-orange" />
          <Reveal>
            <h2 className="font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Ready to build with precision?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Speak to our engineering team. Share your scope, timeline and location — we'll come
              back within one working day.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <QuoteButton variant="primary">Request a Quote</QuoteButton>
              <CTALink to="/contact" variant="outline-light">
                Contact Us
              </CTALink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
