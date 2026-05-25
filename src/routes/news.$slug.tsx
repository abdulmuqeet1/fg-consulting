import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Calendar } from "lucide-react";
import { posts } from "./news";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    const title = post ? `${post.title} — FG Consulting` : "Article — FG Consulting";
    const desc = post?.excerpt ?? "Article";
    const url = `/news/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              articleSection: post.category,
            }),
          },
        ]
        : [],
    };
  },
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: NewsDetail,
  notFoundComponent: () => (
    <div className="pt-40 pb-24 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Link to="/news" className="mt-6 inline-flex text-primary hover:underline">Back to News</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="pt-40 text-center"><p>{error.message}</p></div>,
});

function NewsDetail() {
  const { post }: any = Route.useLoaderData();
  const { t } = useTranslation();
  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("news.back")}
      </Link>
      <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-primary">{post.category}</span>
        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
      </div>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl text-gradient">{post.title}</h1>
      <div className="mt-8 aspect-[16/8] rounded-2xl bg-gradient-to-br from-primary/30 via-card to-[oklch(0.74_0.14_245)]/20" />
      <div className="prose prose-invert mt-10 max-w-none">
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        <p className="mt-6">{post.body}</p>
      </div>
    </article>
  );
}
