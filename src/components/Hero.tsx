import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { StarField } from "./StarField";
import RotatingEarth from "./ui/rotating-earth";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {/* black backdrop */}
      <div className="absolute inset-0 bg-background" />
      {/* rotating halftone earth */}
      <div className="pointer-events-auto absolute left-1/2 top-1/2 z-0 w-[min(90vw,700px)] -translate-x-1/2 -translate-y-1/2 opacity-90">
        <RotatingEarth width={700} height={700} />
      </div>
      {/* converging stars */}
      <StarField count={140} />
      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(6,11,22,0.85)_80%)]" />


      <div className="pointer-events-none relative z-10 mx-auto max-w-5xl px-6 text-center [&_a]:pointer-events-auto">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {t("hero.eyebrow")}
        </div>
        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
          <span className="text-gradient">{t("hero.title")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          {t("hero.desc")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/40 transition-transform hover:scale-105"
          >
            {t("hero.explore")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/10"
          >
            {t("hero.enquire")}
          </Link>
        </div>
      </div>
    </section>
  );
}
