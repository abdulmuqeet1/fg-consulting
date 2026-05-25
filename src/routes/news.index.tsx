import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar } from "lucide-react";

import { posts } from "./news";

export const Route = createFileRoute("/news/")({
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
