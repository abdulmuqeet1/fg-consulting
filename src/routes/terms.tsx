import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — FG Consulting" },
      { name: "description", content: "FG Consulting terms and conditions." },
      { property: "og:title", content: "Terms & Conditions — FG Consulting" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-muted-foreground">
      <h1 className="text-5xl font-bold text-gradient">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Acceptance</h2>
          <p className="mt-2">By accessing this website you agree to be bound by these terms. If you do not agree, please discontinue use.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Services</h2>
          <p className="mt-2">Content on this site is for informational purposes and does not constitute professional advice. Engagements are governed by separate written agreements.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Intellectual Property</h2>
          <p className="mt-2">All site content is the property of FG Consulting unless otherwise stated. You may not reproduce material without permission.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Liability</h2>
          <p className="mt-2">FG Consulting is not liable for indirect or consequential damages arising from your use of this website.</p>
        </section>
      </div>
    </div>
  );
}
