import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { serviceCategories } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — FG Consulting" },
      { name: "description", content: "Comprehensive professional services: Digital Transformation, Audit, Tax, Advisory, ERP, and more." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Each category gets one viewport-height of scroll
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = serviceCategories.length;
      const scrolled = -rect.top;
      const idx = Math.max(0, Math.min(total - 1, Math.floor(scrolled / vh)));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = serviceCategories[active];
  const CurrentIcon = current.icon;

  return (
    <>
      {/* Page intro */}
      <section className="pt-32 pb-16 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("servicesSection.tag")}</div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">{t("servicesSection.title")}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t("servicesSection.desc")}</p>
        <p className="mt-8 text-xs text-muted-foreground/70">↓ {t("servicesSection.scrollHint")}</p>
      </section>

      {/* Scroll-driven category showcase */}
      <div
        ref={sectionRef}
        style={{ height: `${serviceCategories.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 grid h-screen grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-12 lg:px-24">
          {/* LEFT: text */}
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">
              {String(active + 1).padStart(2, "0")} / {String(serviceCategories.length).padStart(2, "0")}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">{current.title}</h2>
                <p className="mt-5 max-w-md text-muted-foreground">{current.desc}</p>
                <ul className="mt-8 grid gap-2 max-w-md">
                  {current.items.map((item) => {
                    const I = item.icon;
                    return (
                      <li
                        key={item.name}
                        className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 px-4 py-2.5 text-sm"
                      >
                        <I className="h-4 w-4 text-primary" />
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: visual */}
          <div className="relative hidden h-[70vh] items-center justify-center md:flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotateY: 25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid h-full w-full place-items-center"
              >
                <div
                  className="absolute inset-12 rounded-full opacity-70 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 40%, rgba(129,74,200,0.55), transparent 55%), radial-gradient(circle at 65% 60%, rgba(96,165,250,0.35), transparent 60%)",
                  }}
                />
                <div className="relative grid h-72 w-72 place-items-center rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl lg:h-96 lg:w-96">
                  <CurrentIcon className="h-32 w-32 text-primary lg:h-44 lg:w-44" strokeWidth={1} />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {serviceCategories.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2 bg-white/20"}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
