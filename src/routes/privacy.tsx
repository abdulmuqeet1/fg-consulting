import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FG Consulting" },
      { name: "description", content: "FG Consulting privacy policy." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-muted-foreground">
      <h1 className="text-5xl font-bold text-gradient">Privacy Policy</h1>
      <p className="mt-2 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p className="mt-2">We collect information you provide directly, such as contact details when you submit our forms, and basic technical information about your browser for site security and analytics.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
          <p className="mt-2">We use the information to respond to enquiries, deliver services, and improve our website. We do not sell personal information.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Cookies</h2>
          <p className="mt-2">We use essential cookies and language preference storage. You can disable cookies in your browser settings.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Contact</h2>
          <p className="mt-2">For privacy questions, email info@fgconsulting.ae.</p>
        </section>
      </div>
    </div>
  );
}
