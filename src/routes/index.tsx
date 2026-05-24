import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Hero } from "@/components/Hero";
import { serviceCategories } from "@/lib/services-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FG Consulting — Your Digital Transformation Partner" },
      { name: "description", content: "ERP, Audit, Tax, Accounting, and Advisory firm serving the GCC since 2015." },
      { property: "og:title", content: "FG Consulting — Your Digital Transformation Partner" },
      { property: "og:description", content: "ERP, Audit, Tax, Accounting, and Advisory firm serving the GCC since 2015." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-bold text-gradient md:text-5xl">{value}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Index() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="relative border-y border-border/40 bg-card/40 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <Stat value="10+" label={t("stats.years")} />
          <Stat value="50+" label={t("stats.clients")} />
          <Stat value="2" label={t("stats.offices")} />
          <Stat value="10+" label={t("stats.pros")} />
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("about.tag")}</div>
            <h2 className="text-4xl font-bold md:text-5xl">{t("about.title")}</h2>
            <p className="mt-6 text-muted-foreground">{t("about.p1")}</p>
            <p className="mt-4 text-muted-foreground">{t("about.p2")}</p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              {t("about.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-8">
            <div className="orb" style={{ filter: "blur(40px)", opacity: 0.6 }} />
            <div className="relative grid h-full grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/50 bg-background/50 p-6">
                <div className="font-display text-3xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">{t("stats.offices")}</div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/50 p-6">
                <div className="font-display text-3xl font-bold">10+</div>
                <div className="text-xs text-muted-foreground">{t("stats.pros")}</div>
              </div>
              <div className="col-span-2 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/20 to-transparent p-6">
                <div className="text-sm font-semibold">Partner-led approach</div>
                <p className="mt-2 text-xs text-muted-foreground">Senior consultants stay close to every engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-t border-border/40 bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("servicesSection.tag")}</div>
          <h2 className="max-w-3xl text-4xl font-bold md:text-5xl">{t("servicesSection.title")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.slice(0, 6).map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  to="/services"
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("values.tag")}</div>
        <h2 className="text-4xl font-bold md:text-5xl">{t("values.title")}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(t("values.items", { returnObjects: true }) as string[]).map((v) => (
            <div key={v} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/40 py-24">
        <div className="orb" style={{ opacity: 0.4 }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl text-gradient">{t("cta.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("cta.desc")}</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/40 hover:scale-105 transition-transform">
            {t("cta.btn")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
