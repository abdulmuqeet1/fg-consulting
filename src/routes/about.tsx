import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2 } from "lucide-react";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FG Consulting" },
      { name: "description", content: "Trusted advisors since 2015. Learn about FG Consulting's mission, values, and team." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("about.tag")}</div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">{t("about.title")}</h1>
      </section>
      <section className="mx-auto mt-16 grid max-w-5xl gap-6 px-6 text-muted-foreground md:text-lg">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="text-3xl font-bold md:text-4xl">{t("values.title")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(t("values.items", { returnObjects: true }) as string[]).map((v) => (
            <div key={v} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/40 mt-24 py-24">
        <div className="orb" style={{ opacity: 0.4 }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl text-gradient">{t("cta.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("cta.desc")}</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/40 hover:scale-105 transition-transform">
            {t("cta.btn")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );

}
