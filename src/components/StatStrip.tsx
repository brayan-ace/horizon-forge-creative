import { Reveal } from "./Reveal";
import { StatCounter } from "./StatCounter";
import { STATS } from "@/lib/content";

export function StatStrip({
  className = "border-y border-hairline bg-background",
}: {
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-16 lg:grid-cols-4 lg:px-10 lg:py-20">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="hairline-top pt-6">
              <div className="font-display text-5xl font-medium tracking-tight lg:text-6xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
