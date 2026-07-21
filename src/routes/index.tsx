import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Award, Wrench, Truck, Clock, Sparkles } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { CTALink, QuoteButton } from "@/components/CTAButton";
import { Reveal, RevealImage } from "@/components/Reveal";
import { StatStrip } from "@/components/StatStrip";
import { SITE } from "@/lib/site";
import { IMG, SERVICES, WHY_CHOOSE_US, STATS, TESTIMONIALS, PROJECTS } from "@/lib/content";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon" },
      {
        name: "description",
        content:
          "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon.",
      },
      {
        property: "og:title",
        content: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon",
      },
      {
        property: "og:description",
        content:
          "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon.",
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
        <motion.img
          src={IMG.heroWelder}
          alt="Certified industrial welder performing structural steel welding at a Horizon 7 fabrication yard"
          className="h-[115%] w-full object-cover"
          fetchPriority="high"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-6 pb-24 pt-32 text-center lg:px-10 lg:pb-32"
      >
        <Reveal delay={0.1}>
          <div className="eyebrow text-orange mt-12">01 — Horizon 7 Company Ltd</div>
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTALink to="/services" variant="outline-light">
              Explore Services
            </CTALink>
            <QuoteButton variant="primary" className="min-w-[240px] justify-center">Request a Quote</QuoteButton>
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

function IntroBand() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Premium subtle gradient orb in the top left */}
      <div className="absolute -left-[20%] -top-[20%] h-[600px] w-[600px] rounded-full bg-orange/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-40">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative lg:col-span-5">
            {/* Oversized Typographic Watermark */}
            <div
              className="absolute -left-6 -top-16 -z-10 select-none font-display text-[160px] font-bold leading-none tracking-tighter text-white/[0.03] sm:-top-24 sm:text-[220px] lg:-left-12 lg:-top-32 lg:text-[280px]"
              aria-hidden
            >
              H7
            </div>

            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-6 bg-orange" />
              About
            </div>
            <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              A Cameroonian engineering firm building to international standards.
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            {/* Layered Content Card with Accent */}
            <div className="relative border border-hairline bg-background p-8 text-foreground shadow-sm sm:p-10 lg:p-14">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-orange" />

              <p className="text-lg leading-relaxed text-muted-foreground">
                Horizon 7 Company Ltd is an industrial engineering and construction firm delivering
                coded welding, precision fabrication, civil works and heavy equipment services to
                refineries, power plants, mines and government infrastructure programs across
                Central Africa.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our discipline is engineering-led. Every scope is planned, executed and handed over
                with the documentation, safety record and quality control our clients expect from
                world-class contractors.
              </p>

              <div className="mt-10">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-orange"
                >
                  Read our story
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
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
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlight.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group block">
                <div className="relative overflow-hidden bg-foreground aspect-[4/5]">
                  <RevealImage
                    src={s.image}
                    alt={s.name}
                    aspect="aspect-[4/5]"
                    hoverZoom={true}
                    priority={i === 0}
                    className="absolute inset-0 h-full w-full"
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

        <Reveal delay={0.3} className="mt-12 flex justify-center lg:justify-end">
          <CTALink to="/services" variant="primary">
            View all nine services
          </CTALink>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/80">
      {/* Subtle Oversized Watermark */}
      <div
        className="absolute -right-20 top-20 select-none font-display text-[400px] font-bold leading-none tracking-tighter text-foreground/[0.02]"
        aria-hidden
      >
        03
      </div>
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="relative z-10">
          <div className="eyebrow">03 — Why Horizon 7</div>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.02em] text-orange sm:text-5xl lg:text-6xl">
            Six commitments we deliver on every project.
          </h2>
        </Reveal>

        <div className="relative z-10 mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICON_MAP[i] ?? Award;
            return (
              <Reveal key={item.index} delay={i * 0.06} className="h-full">
                <div className="group relative h-full overflow-hidden border border-hairline bg-background p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-10">
                  {/* Decorative Top Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-transparent transition-colors duration-300 group-hover:bg-orange" />

                  {/* Ambient Interactive Glow */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange/5 blur-2xl transition-all duration-700 group-hover:scale-[2.5] group-hover:bg-orange/15" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center bg-muted/50 transition-colors duration-500 group-hover:bg-orange/10">
                      <Icon className="h-6 w-6 text-orange" strokeWidth={1.5} />
                    </div>
                    <div className="eyebrow text-muted-foreground transition-colors group-hover:text-foreground">
                      {item.index}
                    </div>
                  </div>

                  <div className="relative z-10 mt-12">
                    <h3 className="font-display text-2xl font-medium">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
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
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="eyebrow">05 — Client Trust</div>
        </Reveal>
        
        <div className="mt-16 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {TESTIMONIALS.map((t, i) => {
                const styles = [
                  {
                    wrapper: "bg-navy text-white border-transparent",
                    quoteMark: "text-orange/60 group-hover:text-orange",
                    role: "text-white/60",
                    border: "border-t border-white/10",
                    glow: "bg-orange/10 group-hover:bg-orange/20"
                  },
                  {
                    wrapper: "bg-orange/5 text-foreground border-orange/10",
                    quoteMark: "text-orange/40 group-hover:text-orange",
                    role: "text-muted-foreground",
                    border: "border-t border-orange/20",
                    glow: "bg-orange/10 group-hover:bg-orange/20"
                  },
                  {
                    wrapper: "bg-muted/50 text-foreground border-hairline",
                    quoteMark: "text-orange/30 group-hover:text-orange",
                    role: "text-muted-foreground",
                    border: "hairline-top",
                    glow: "bg-orange/5 group-hover:bg-orange/15"
                  },
                ];
                const s = styles[i % styles.length];

                return (
                  <CarouselItem key={i} className="pl-4 md:pl-6 md:basis-1/2 xl:basis-1/3">
                    <div className={`group relative h-full overflow-hidden border p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl sm:p-10 ${s.wrapper}`}>
                      <div className="absolute inset-x-0 top-0 h-1 bg-transparent transition-colors duration-300 group-hover:bg-orange" />
                      <div className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-2xl transition-all duration-700 group-hover:scale-[2.5] ${s.glow}`} />
                      <div className="relative z-10 flex h-full flex-col">
                        <div className={`font-display text-6xl transition-colors duration-300 ${s.quoteMark}`}>"</div>
                        <blockquote className="mt-2 flex-grow font-display text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl">
                          {t.quote}
                        </blockquote>
                        <div className={`mt-8 pt-6 ${s.border}`}>
                          <div className="font-medium">{t.author}</div>
                          <div className={`text-sm ${s.role}`}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="hidden xl:block">
              <CarouselPrevious className="absolute -left-5 top-1/2 -translate-y-1/2 h-12 w-12 hover:bg-orange hover:text-white" />
              <CarouselNext className="absolute -right-5 top-1/2 -translate-y-1/2 h-12 w-12 hover:bg-orange hover:text-white" />
            </div>

            <div className="mt-12 flex justify-center gap-4 xl:hidden">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-hairline hover:bg-orange hover:text-white" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-hairline hover:bg-orange hover:text-white" />
            </div>
          </Carousel>
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
