import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Briefcase, MapPin } from "lucide-react";

const openings: { title: string; location: string; type: string }[] = [
  { title: "Senior Auditor", location: "Dubai, UAE", type: "Full-time" },
  { title: "Tax Consultant — Corporate Tax", location: "Dubai, UAE", type: "Full-time" },
  { title: "ERP Implementation Lead", location: "Remote / GCC", type: "Full-time" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — FG Consulting" },
      { name: "description", content: "Join FG Consulting. Open positions across audit, tax, ERP and advisory." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("nav.careers")}</div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">{t("careers.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("careers.desc")}</p>
      </section>

      <section className="mx-auto mt-16 max-w-4xl px-6">
        <h2 className="mb-6 text-2xl font-semibold">{t("careers.openings")}</h2>
        <div className="space-y-3">
          {openings.map((o) => (
            <div key={o.title} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/50 bg-card/40 p-5">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary"><Briefcase className="h-5 w-5" /></div>
                <div>
                  <div className="font-semibold">{o.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {o.location} · {o.type}
                  </div>
                </div>
              </div>
              <Link to="/contact" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">{t("careers.apply")}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
