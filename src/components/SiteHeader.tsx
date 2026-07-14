import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useQuote } from "./QuoteDialog";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/equipment", label: "Equipment" },
  { to: "/safety", label: "Safety" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openQuote } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-hairline bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Logo variant={solid ? "dark" : "light"} />

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium transition-colors link-underline ${
                solid ? "text-foreground hover:text-orange" : "text-white/90 hover:text-white"
              }`}
              activeProps={{ className: solid ? "text-orange" : "text-orange" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => openQuote()}
            className={`group inline-flex items-center gap-3 border px-5 py-3 text-sm font-medium transition-all ${
              solid
                ? "border-foreground bg-foreground text-background hover:bg-orange hover:border-orange"
                : "border-white bg-transparent text-white hover:bg-white hover:text-foreground"
            }`}
          >
            Request a Quote
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <button
          className={`inline-flex h-11 w-11 items-center justify-center lg:hidden ${
            solid ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md text-white lg:hidden">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Logo variant="light" />
            <button
              className="inline-flex h-11 w-11 items-center justify-center text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-5 font-display text-3xl font-medium text-white transition-colors hover:text-orange"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                openQuote();
              }}
              className="mt-8 inline-flex items-center justify-center gap-3 bg-orange px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-orange/90"
            >
              Request a Quote →
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
