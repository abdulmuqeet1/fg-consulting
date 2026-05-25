"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }, [location.pathname]);

  const toggleLang = () => {
    const next = i18n.language?.startsWith("ar") ? "en" : "ar";
    i18n.changeLanguage(next);
    if (typeof document !== "undefined") {
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = next;
    }
  };

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/about", label: t("nav.about") },
    { to: "/careers", label: t("nav.careers") },
    { to: "/news", label: t("nav.news") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border/40" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <img className="grid h-10 w-10 place-items-center" src="/fg_consulting-logo.png" alt="FG Consulting Logo" />
          <span className="hidden sm:block">FG Consulting</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground bg-white/5" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-xs font-medium hover:bg-white/5"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {i18n.language?.startsWith("ar") ? t("lang.en") : t("lang.ar")}
          </button>
          <Link
            to="/contact"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 md:inline-block"
          >
            {t("nav.enquire")}
          </Link>
          <details ref={mobileMenuRef} className="group relative lg:hidden">
            <summary
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-border/60 hover:bg-white/5 [&::-webkit-details-marker]:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
            </summary>
            <div
              id="mobile-navigation"
              className="absolute right-0 top-[calc(100%+0.75rem)] z-[60] w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-border/60 bg-background/95 p-2 shadow-2xl shadow-black/40 backdrop-blur"
            >
              <nav className="flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="rounded-md px-3 py-3 text-sm text-foreground/90 hover:bg-white/5 hover:text-foreground"
                    activeProps={{ className: "rounded-md px-3 py-3 text-sm bg-white/5 text-foreground" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
