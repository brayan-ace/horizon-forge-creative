import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useQuote } from "./QuoteDialog";

type Variant = "primary" | "secondary" | "outline" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-foreground",
  secondary: "bg-foreground text-background hover:bg-orange",
  outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
  "outline-light": "border border-white text-white hover:bg-white hover:text-foreground",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function CTAButton({
  variant = "primary",
  children,
  onClick,
  className = "",
  type = "button",
}: CommonProps & { onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

export function CTALink({
  variant = "primary",
  children,
  to,
  className = "",
}: CommonProps & { to: string }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function QuoteButton({
  subject,
  variant = "primary",
  children = "Request a Quote",
  className = "",
}: {
  subject?: string;
  variant?: Variant;
  children?: ReactNode;
  className?: string;
}) {
  const { open } = useQuote();
  return (
    <CTAButton variant={variant} onClick={() => open(subject)} className={className}>
      {children}
    </CTAButton>
  );
}
