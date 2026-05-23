"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, type MotionValue } from "framer-motion";
import { useRef, forwardRef, type ComponentType, type SVGProps } from "react";

export interface StackingCardItem {
  title: string;
  description: string;
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: { name: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[];
}

interface CardProps {
  i: number;
  item: StackingCardItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({ i, item, progress, range, targetScale }: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const Icon = item.icon;

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center px-4"
    >
      <motion.div
        style={{
          backgroundColor: item.color,
          scale,
          top: `calc(-5vh + ${i * 28}px)`,
        }}
        className="relative -top-[25%] flex h-[520px] w-full max-w-5xl origin-top flex-col overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl md:flex-row md:p-12"
      >
        {/* decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-white/60">
              {String(i + 1).padStart(2, "0")} / Service
            </div>
            <h2 className="text-3xl font-bold text-white md:text-5xl">{item.title}</h2>
            <p className="mt-4 max-w-md text-white/75">{item.description}</p>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-1 flex-col md:mt-0 md:pl-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 backdrop-blur">
              <Icon className="h-9 w-9 text-white" />
            </div>
            <div className="text-sm uppercase tracking-widest text-white/60">
              What we offer
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {item.items.map(({ name, icon: I }) => (
              <li
                key={name}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur"
              >
                <I className="h-4 w-4 shrink-0 text-white/80" />
                <span className="truncate">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

interface StackingCardsProps {
  items: StackingCardItem[];
}

const StackingCards = forwardRef<HTMLDivElement, StackingCardsProps>(({ items }, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main ref={ref}>
        <div ref={container} className="relative">
          {items.map((item, i) => {
            const targetScale = 1 - (items.length - i) * 0.05;
            return (
              <Card
                key={`card_${i}`}
                i={i}
                item={item}
                progress={scrollYProgress}
                range={[i * (1 / items.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </main>
    </ReactLenis>
  );
});

StackingCards.displayName = "StackingCards";

export default StackingCards;
