import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { serviceCategories } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — FG Consulting" },
      {
        name: "description",
        content:
          "Comprehensive professional services: Digital Transformation, Audit, Tax, Advisory, ERP, and more.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useTranslation();
  const numOfPages = serviceCategories.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Drive active card from native scroll over a tall sticky wrapper.
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const idx = Math.max(
        0,
        Math.min(numOfPages - 1, Math.floor(scrolled / vh + 0.15))
      );
      setCurrentPage(idx + 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [numOfPages]);

  return (
    <>
      {/* Page intro — kept as-is */}
      <section className="pt-32 pb-16 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">
          {t("servicesSection.tag")}
        </div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">
          {t("servicesSection.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          {t("servicesSection.desc")}
        </p>
        <p className="mt-8 text-xs text-muted-foreground/70">
          ↓ {t("servicesSection.scrollHint")}
        </p>
      </section>

      {/* Split-panel sliding service showcase — tall wrapper drives sticky slider */}
      <div
        ref={wrapperRef}
        style={{ height: `${numOfPages * 100}vh` }}
        className="relative"
      >
        <section className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {serviceCategories.map((cat, i) => {
          const idx = i + 1;
          const isActive = currentPage === idx;
          // alternate which side shows content
          const contentOnLeft = i % 2 === 1;
          const Icon = cat.icon;

          const leftTrans = isActive ? "translateY(0)" : "translateY(100%)";
          const rightTrans = isActive ? "translateY(0)" : "translateY(-100%)";

          const VisualPanel = (
            <div className="relative grid h-full w-full place-items-center overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary) 55%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--sky) 40%, transparent), transparent 65%), linear-gradient(135deg, var(--card), var(--background))",
                }}
              />
              <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:40px_40px]" />
              <Icon
                className="relative h-48 w-48 text-primary drop-shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_60%,transparent)] lg:h-64 lg:w-64"
                strokeWidth={1}
              />
            </div>
          );

          const ContentPanel = (
            <div className="relative flex h-full w-full flex-col justify-center px-10 md:px-16 lg:px-24">
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-primary">
                {String(idx).padStart(2, "0")} / {String(numOfPages).padStart(2, "0")}
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {cat.title}
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">{cat.desc}</p>
              <ul className="mt-8 grid max-w-md gap-2">
                {cat.items.map((item) => {
                  const I = item.icon;
                  return (
                    <li
                      key={item.name}
                      className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 px-4 py-2.5 text-sm backdrop-blur"
                    >
                      <I className="h-4 w-4 text-primary" />
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );

          return (
            <div key={idx} className="absolute inset-0">
              {/* Left half */}
              <div
                className="absolute left-0 top-0 h-full w-1/2 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: leftTrans }}
              >
                {contentOnLeft ? ContentPanel : VisualPanel}
              </div>
              {/* Right half */}
              <div
                className="absolute left-1/2 top-0 h-full w-1/2 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: rightTrans }}
              >
                {contentOnLeft ? VisualPanel : ContentPanel}
              </div>
            </div>
          );
        })}

        {/* Pagination dots */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
          {serviceCategories.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentPage === i + 1 ? "h-8 w-2 bg-primary" : "w-2 bg-foreground/25"
              }`}
            />
          ))}
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-widest text-foreground/50">
          {currentPage < numOfPages ? "Scroll ↓" : "End"}
        </div>
      </section>
    </>
  );
}
