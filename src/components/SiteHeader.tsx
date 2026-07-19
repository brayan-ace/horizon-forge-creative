import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useQuote } from "./QuoteDialog";
import { SITE, mailLink, waLink } from "@/lib/site";

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

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

  // Scroll lock for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = !transparent || scrolled;

  return (
    <>
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
              activeProps={{
                className: `text-orange after:scale-x-100 ${solid ? "after:bg-orange" : "after:bg-orange"}`,
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => openQuote()}
            className={`group inline-flex items-center gap-3 border px-5 py-3 text-sm font-medium transition-all active:scale-[0.98] ${
              solid
                ? "border-foreground bg-foreground text-background hover:border-orange hover:bg-orange"
                : "border-white bg-transparent text-white hover:bg-white hover:text-foreground"
            }`}
          >
            Request a Quote
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        <button
          className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-navy text-white shadow-lg transition-all active:scale-[0.98] lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex flex-col bg-navy text-white lg:hidden"
          >
            {/* Header Area */}
            <div className="flex h-20 shrink-0 items-center justify-between px-6">
              <Logo variant="light" />
              <button
                className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-white/10 text-white transition-transform active:scale-[0.98]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-8 w-8" strokeWidth={1.5} />
              </button>
            </div>

            {/* Immersive Navigation */}
            <div className="flex flex-1 flex-col justify-center px-8 pb-20">
              <nav className="flex flex-col space-y-4">
                {NAV.map((item) => (
                  <motion.div key={item.to} variants={itemVariants}>
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="inline-block font-display text-2xl font-medium tracking-tight text-orange transition-colors hover:text-white active:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div variants={itemVariants} className="mt-14">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openQuote();
                  }}
                  className="inline-flex w-full items-center justify-between border border-white/20 bg-white/5 px-6 py-4 text-base font-medium text-white transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  Request a Quote <span aria-hidden>→</span>
                </button>
              </motion.div>

              {/* Direct Channels Footer */}
              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <a
                  href={mailLink()}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  Email Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
