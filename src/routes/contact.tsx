import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SITE, mailLink, waLink } from "@/lib/site";
import { SERVICES } from "@/lib/content";
import { CTAButton } from "@/components/CTAButton";

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
      />

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="eyebrow">Direct Channels</div>
              <div className="mt-6 space-y-4">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-hairline p-5 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center bg-orange text-white">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        WhatsApp
                      </div>
                      <div className="mt-1 font-medium">{SITE.whatsapp}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={mailLink()}
                  className="group flex items-center justify-between border border-hairline p-5 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center bg-navy text-white">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Email
                      </div>
                      <div className="mt-1 break-all font-medium">{SITE.email}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-10 space-y-5 border-t border-hairline pt-8">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-orange" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Office
                    </div>
                    <div className="mt-1">{SITE.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-4 w-4 text-orange" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Office Hours
                    </div>
                    <div className="mt-1">{SITE.hours}</div>
                    <div className="text-sm text-muted-foreground">Quick response · within one working day.</div>
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
            className="input"
          />
        </Field>
        <Field label="Company">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Phone / WhatsApp">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input"
          />
        </Field>
      </div>
      <Field label="Service">
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="input"
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
          className="input resize-y"
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
      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--hairline);
          background: var(--background);
          padding: 14px 16px;
          font-size: 15px;
          color: var(--foreground);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: var(--foreground);
          box-shadow: 0 0 0 3px oklch(0.19 0.03 258 / 0.08);
        }
        .input::placeholder { color: var(--muted-foreground); }
      `}</style>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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
