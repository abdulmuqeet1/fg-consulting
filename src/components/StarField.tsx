import { useMemo } from "react";

/**
 * Stars converging from edges toward the center, fading out as they reach it.
 * Pure CSS animations (no JS per frame).
 */
export function StarField({ count = 90, className = "" }: { count?: number; className?: string }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Random edge origin (relative to center)
      const angle = Math.random() * Math.PI * 2;
      const radius = 400 + Math.random() * 600;
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius;
      const duration = 6 + Math.random() * 10;
      const delay = -Math.random() * duration;
      const size = 1 + Math.random() * 2.5;
      return { sx, sy, duration, delay, size };
    });
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            ["--sx" as string]: `${s.sx}px`,
            ["--sy" as string]: `${s.sy}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
