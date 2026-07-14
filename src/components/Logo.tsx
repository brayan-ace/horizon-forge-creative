import { Link } from "@tanstack/react-router";

type Props = {
  variant?: "dark" | "light";
  compact?: boolean;
};

export function Logo({ variant = "dark", compact = false }: Props) {
  const fg = variant === "dark" ? "text-foreground" : "text-white";
  const sub = variant === "dark" ? "text-muted-foreground" : "text-white/70";
  return (
    <Link to="/" aria-label="Horizon 7 Company Ltd — Home" className="group inline-flex items-center gap-3">
      <LogoMark variant={variant} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.35rem] font-semibold tracking-[-0.02em] ${fg}`}
          >
            Horizon <span className="text-orange">7</span>
          </span>
          <span
            className={`mt-1 text-[0.58rem] font-medium uppercase tracking-[0.28em] ${sub}`}
          >
            Company Ltd
          </span>
        </span>
      )}
    </Link>
  );
}

export function LogoMark({ variant = "dark", size = 34 }: { variant?: "dark" | "light"; size?: number }) {
  const stroke = variant === "dark" ? "#0D1B2A" : "#FFFFFF";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.75" y="0.75" width="38.5" height="38.5" stroke={stroke} strokeWidth="1.5" />
      {/* Horizon bars */}
      <line x1="6" y1="14" x2="34" y2="14" stroke={stroke} strokeWidth="2" />
      <line x1="6" y1="20" x2="26" y2="20" stroke={stroke} strokeWidth="2" />
      <line x1="6" y1="26" x2="34" y2="26" stroke={stroke} strokeWidth="2" />
      {/* Orange 7 */}
      <path
        d="M27 18 L33 18 L29 33"
        stroke="#F77F00"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
