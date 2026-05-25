import { createFileRoute, Outlet } from "@tanstack/react-router";

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
      { property: "og:title", content: "News & Events — FG Consulting" },
      { property: "og:description", content: "Insights, announcements and industry updates from FG Consulting." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: Outlet,
});
