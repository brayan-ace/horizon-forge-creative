import { Reveal } from "./Reveal";
import { StatCounter } from "./StatCounter";
import { STATS } from "@/lib/content";
import { useSanityQuery } from "@/hooks/useSanityQuery";

export function StatStrip({
  className = "border-y border-hairline bg-background",
}: {
  className?: string;
}) {
  const { data } = useSanityQuery(`*[_type == "statsStrip"][0]{ stats[]{ value, suffix, label } }`);

  const stats = data?.stats?.length ? data.stats : STATS;

  return (
    <section className={className}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-16 lg:grid-cols-4 lg:px-10 lg:py-20">
        {stats.map((s: { label: string; value: string | number; suffix?: string }, i: number) => (
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
