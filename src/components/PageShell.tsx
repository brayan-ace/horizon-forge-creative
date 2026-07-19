import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({
  children,
  transparentHeader = false,
}: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <>
      <SiteHeader transparent={transparentHeader} />
      <main id="main" className={transparentHeader ? "" : "pt-20"}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  variant = "dark",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <section
      className={`border-b ${isDark ? "border-white/10 bg-navy text-white" : "border-hairline bg-muted/40 text-foreground"}`}
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className={`eyebrow ${isDark ? "text-orange" : ""}`}>{eyebrow}</div>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p
            className={`mt-8 max-w-2xl text-lg leading-relaxed ${isDark ? "text-white/80" : "text-muted-foreground"}`}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
