import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SITE, mailLink, waLink } from "@/lib/site";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              {SITE.description}
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 transition hover:border-orange hover:text-orange"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={mailLink()}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 transition hover:border-orange hover:text-orange"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-white/50">Company</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-orange">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/80 hover:text-orange">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-white/80 hover:text-orange">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-orange">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="eyebrow text-white/50">Services</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/services" className="text-white/80 hover:text-orange">
                  Industrial Welding
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-orange">
                  Mechanical Fabrication
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-orange">
                  Civil Engineering
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-orange">
                  Construction
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="text-white/80 hover:text-orange">
                  Equipment Rentals
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="eyebrow text-white/50">Contact</div>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={mailLink()} className="text-white/80 hover:text-orange">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-orange"
                >
                  {SITE.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="text-white/60">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="eyebrow text-white/40">Cameroon · Central Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
