import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SITE, mailLink, waLink } from "@/lib/site";
import { SERVICES } from "@/lib/content";
import { CTAButton } from "@/components/CTAButton";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Horizon 7 Company Ltd" },
      {
        name: "description",
        content:
          "Contact Horizon 7 Company Ltd. WhatsApp +237 678 258 919 · info@hashtagnexasmartai.org. Douala, Cameroon.",
      },
      { property: "og:title", content: "Contact Horizon 7 Company Ltd" },
      {
        property: "og:description",
        content: "Reach our engineering team. Response within one working day.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          email: SITE.email,
          telephone: SITE.whatsapp,
          address: { "@type": "PostalAddress", addressLocality: "Douala", addressCountry: "CM" },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Speak to our engineering team."
        intro="Share your project scope, timeline and location. We reply to every enquiry within one working day, and mobilize where the work is."
        variant="dark"
      />

      <section className="bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="relative overflow-hidden bg-navy p-8 text-white shadow-2xl lg:p-12">
                {/* Ambient glow inside the navy card */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/10 blur-[80px]" />

                <div className="relative z-10">
                  <div className="eyebrow text-orange">Direct Channels</div>
                  <div className="mt-8 space-y-4">
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center bg-[#25D366] text-white shadow-sm">
                          <WhatsAppIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                            WhatsApp
                          </div>
                          <div className="mt-1 font-medium text-white">{SITE.whatsapp}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                    </a>

                    <a
                      href={mailLink()}
                      className="group flex items-center justify-between border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center bg-white/10 text-white">
                          <Mail className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                            Email
                          </div>
                          <div className="mt-1 break-all font-medium text-white">{SITE.email}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                    </a>
                  </div>

                  <div className="mt-12 space-y-6 border-t border-white/10 pt-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 text-orange" />
                      <div>
                        <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                          Office
                        </div>
                        <div className="mt-1.5 leading-relaxed text-white/90">{SITE.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="mt-1 h-5 w-5 text-orange" />
                      <div>
                        <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                          Office Hours
                        </div>
                        <div className="mt-1.5 leading-relaxed text-white/90">{SITE.hours}</div>
                        <div className="mt-1 text-sm text-white/60">
                          Quick response · within one working day.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-muted/40">
        <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="eyebrow">Location</div>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
                Find us
              </h2>
            </div>
            <a
              href={SITE.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hidden text-sm font-medium sm:inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-hairline bg-background">
            <iframe
              src={SITE.mapEmbed}
              title="Horizon 7 Company Ltd — office location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Enquiry — ${form.service || "General"}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      ``,
      form.message,
    ].join("\n");
    window.location.href = mailLink(subject, body);
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="eyebrow">Send an enquiry</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Full Name" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-hairline bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.19_0.03_258_/_0.08)]"
          />
        </Field>
        <Field label="Company">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-hairline bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.19_0.03_258_/_0.08)]"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-hairline bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.19_0.03_258_/_0.08)]"
          />
        </Field>
        <Field label="Phone / WhatsApp">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-hairline bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.19_0.03_258_/_0.08)]"
          />
        </Field>
      </div>
      <Field label="Service">
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full border border-hairline bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.19_0.03_258_/_0.08)]"
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other / General</option>
        </select>
      </Field>
      <Field label="Project details" required>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-y border border-hairline bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:shadow-[0_0_0_3px_oklch(0.19_0.03_258_/_0.08)]"
          placeholder="Scope, timeline, location, quantities…"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <CTAButton type="submit" variant="secondary">
          Send Enquiry
        </CTAButton>
        <span className="text-sm text-muted-foreground">
          {sent ? "Opening your email client…" : "Or reach us directly on WhatsApp."}
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow flex items-center gap-2">
        {label}
        {required && <span className="text-orange">*</span>}
      </span>
      <div className="mt-3">{children}</div>
    </label>
  );
}
