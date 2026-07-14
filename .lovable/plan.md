
# Horizon 7 Company Ltd — Premium Industrial Engineering Website

A multi-page corporate site built to feel like a global engineering firm (Fluor / Bechtel / Vinci tier) — white-dominant, deep-navy structure, industrial-orange accents, oversized editorial typography, and generous whitespace. Everything routed properly (no hash-anchor navigation) so each section is a shareable page with its own SEO metadata.

## Design system

- **Palette (tokens in `src/styles.css`)**: `--background` white `#FFFFFF`, `--foreground` deep navy `#0D1B2A`, `--primary` navy, `--accent` industrial orange `#F77F00`, `--muted` soft off-white `#F5F5F3`, `--muted-foreground` steel gray `#6B7280`, hairline borders `#E5E7EB`. Values authored in `oklch`.
- **Typography**: display — **Fraunces** (editorial serif, tight tracking, weight 500/600) for hero + section titles; body — **Inter Tight** (400/500/600). Loaded via `<link>` in `__root.tsx` head. Massive headline scale (clamp 3rem → 7rem), long line-height on body, uppercase micro-labels with wide tracking on eyebrows.
- **Motion**: Framer Motion. Fade+rise on scroll (subtle, 24px, 600ms, easeOut), parallax on hero image, magnetic hover on primary buttons, number counters on stats, image reveal masks on project cards. Nothing bouncy or flashy.
- **Grid**: 12-col, max-w 1400px, section vertical rhythm 128–160px desktop / 80px mobile. Numbered section labels (`01 — Services`) for corporate editorial feel.

## Logo

Custom SVG wordmark (no image generation): "**Horizon 7**" in Fraunces 600 with a precise geometric mark to the left — a stacked pair of horizontal bars intersecting a vertical rule, with a small orange "7" glyph counter. "Company Ltd" set in tracked-out Inter Tight 500 below at ~35% size. Clean at 16px favicon and hard-hat scale. Delivered as `src/components/Logo.tsx` (SVG) + `public/favicon.svg` + `public/favicon.png`. Removes template `favicon.ico`.

## Photography

Every image generated via `generate_image` (premium tier for photorealism) with prompts specifying: DSLR, 35mm/50mm, natural lighting, correct PPE, no artifacts, documentary industrial photography style. Saved to `src/assets/` and imported. Prompts scoped per shot (hero welder in sparks, aerial fabrication yard, crane silhouette at dusk, engineer with tablet on site, pipe welding closeup, scaffolding lattice, etc.). All served through Lovable Assets pipeline for large files.

## Route architecture (TanStack Start, one file per page)

Each route sets its own `head()` — title, description, og:title, og:description, canonical. og:image only on leaf routes with a meaningful hero.

```text
/                       Home (hero + services teaser + why + featured projects + CTA)
/about                  Company story, values, leadership
/services               Overview grid of 9 services
/services/$slug         Per-service detail (Industrial Welding, Mechanical Fabrication,
                        Scaffolding & Mounting, Post Weld Heat Treatment, Pipe Welding,
                        Civil Engineering, Construction, Equipment Rentals,
                        Heavy Duty Machinery)
/projects               Portfolio grid
/projects/$slug         Project detail
/equipment              Rental fleet showcase (9 categories)
/safety                 HSE / quality
/contact                Form + WhatsApp + Email + Google Map embed
```

Shared `<SiteHeader>` (transparent → solid white with border on scroll, using `useScroll` from Framer Motion) and `<SiteFooter>` (4-col: logo+blurb / Services / Company / Contact + embedded map thumbnail, copyright bar).

## Page compositions

**Home**
1. Hero — full-viewport photo (welder in sparks), navy 40% overlay, headline "Engineering Excellence. Industrial Precision. Built for Tomorrow." set in Fraunces at ~6rem, supporting paragraph, primary CTA "Request a Quote" (opens `<QuoteDialog>` — WhatsApp / Email choice), secondary "Explore Services". Scroll cue.
2. Intro strip — three animated stat counters (Years of Experience, Projects Delivered, Skilled Workforce) with editorial numerals.
3. Services teaser — 3 flagship cards linking to `/services`.
4. Why Choose Us — 6 items (Experienced Professionals, Safety First, Quality Assurance, Modern Equipment, Reliable Delivery, Engineering Excellence) in a numbered 3×2 grid with hairline dividers, monoline icons.
5. Featured Projects — 3-up asymmetric grid with image-reveal masks.
6. Testimonials — 2-card editorial layout with large quote marks in orange.
7. CTA band — navy section with orange accent line, "Ready to build with precision?" + Request a Quote.

**Services** — 9 cards in a 3-col grid, each card: photo (aspect 4/5), category eyebrow, title, one-line description, "Learn More →" with underline sweep on hover. Detail pages: hero image, overview, capabilities list, related projects, CTA.

**Projects** — grid with filter chips (Category / Location). Card shows image, name, category, location, status pill (Completed / In Progress).

**Equipment** — 9 cards (Excavators, Bulldozers, Forklifts, Boom Lifts, Scaffolding, Cranes, Generators, Dump Trucks, Heavy Duty Trucks). Each: photo, short spec table (capacity, reach, power), Availability badge, Request Quote button.

**About** — editorial two-column: large statement + supporting story, values grid, leadership placeholder cards.

**Safety** — HSE culture, certifications strip, risk management pillars, international standards reference.

**Contact** — split layout: left = form (name, company, email, phone, service, message) with premium field styling; right = contact block (Email `info@hashtagnexasmartai.org`, WhatsApp `+237 678 258 919`, office hours), WhatsApp CTA button (opens `wa.me/237678258919`), Email CTA. Full-width Google Maps iframe embed below, pointing at the provided location.

**Global QuoteDialog** — every "Request a Quote" button opens a shadcn Dialog offering two actions: **Message on WhatsApp** (deeplinks to `wa.me/237678258919` with a prefilled service line) or **Send Email** (`mailto:info@hashtagnexasmartai.org` with prefilled subject).

## Technical details

- Tailwind v4 tokens in `src/styles.css` under `@theme inline`; fonts loaded via `<link>` in `__root.tsx`.
- Framer Motion for all animations; `prefers-reduced-motion` respected.
- shadcn Dialog / Button / Input / Textarea / Select — restyled to match design tokens.
- Contact form is presentation-only (submits via `mailto:` fallback); no backend enabled. If the user later wants form persistence + email delivery, we can add Lovable Cloud.
- SEO: per-route `head()` with unique title/description/og; JSON-LD `Organization` on root, `Service` on service detail, `LocalBusiness` on contact. `public/robots.txt` + `public/sitemap.xml`. Semantic `<main>`, single `<h1>` per page, alt text on every image, aspect-ratio wrappers to prevent CLS.
- Google Map embedded via standard iframe (`https://www.google.com/maps?...&output=embed` derived from the shared short-link's coordinates) — no Maps API key needed.
- Accessibility: focus rings on all interactive elements, aria-labels on icon-only buttons, 44×44 tap targets on mobile.
- Responsive: dedicated mobile compositions (hero collapses to 90vh with reduced type scale, services grid → single column with larger cards, footer stacks into accordion).

## Deliverables

- Design system tokens + font wiring
- `Logo.tsx`, favicon files, template favicon removed
- `SiteHeader`, `SiteFooter`, `QuoteDialog`, `Section`, `StatCounter`, `RevealImage` primitives
- All routes listed above with real content and generated photography
- Sitemap, robots, per-route metadata, JSON-LD

Confirm and I'll build it.
