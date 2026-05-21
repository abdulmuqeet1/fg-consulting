import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Calendar, ArrowRight } from "lucide-react";

export const posts = [
  {
    slug: "uae-corporate-tax-2025",
    title: "UAE Corporate Tax — What Businesses Need to Know in 2025",
    excerpt: "A practical guide to compliance, exemptions, and key deadlines for UAE corporate tax.",
    date: "2025-02-12",
    category: "Tax",
    body: "The UAE corporate tax regime continues to evolve. In this article we cover registration, taxable persons, qualifying free-zone income, and how to prepare your finance function for filing.",
  },
  {
    slug: "erp-implementation-best-practices",
    title: "Five ERP Implementation Best Practices",
    excerpt: "Common mistakes that derail ERP rollouts — and how to avoid them.",
    date: "2025-01-22",
    category: "Digital",
    body: "Successful ERP projects share a common discipline: a clear scope, executive sponsorship, data hygiene, change management, and a phased go-live strategy.",
  },
  {
    slug: "ifrs-update-2025",
    title: "IFRS Updates You Cannot Ignore",
    excerpt: "Key IFRS amendments effective this reporting cycle.",
    date: "2024-12-05",
    category: "Audit",
    body: "Several IFRS standards have been amended this period. Our advisory team summarizes the changes and their practical impact.",
  },
];

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — FG Consulting" },
      { name: "description", content: "Insights, announcements and industry updates from FG Consulting." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("nav.news")}</div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">{t("news.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("news.desc")}</p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to="/news/$slug"
            params={{ slug: p.slug }}
            className="group overflow-hidden rounded-2xl border border-border/50 bg-card/40 transition-all hover:-translate-y-1 hover:border-primary/60"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-primary/30 via-card to-[oklch(0.74_0.14_245)]/20" />
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-primary">{p.category}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("news.readMore")} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
