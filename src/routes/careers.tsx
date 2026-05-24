import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkRateLimit } from "@/lib/rate-limiter";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — FG Consulting" },
      { name: "description", content: "Join FG Consulting. Send us your CV and tell us about yourself." },
      { property: "og:title", content: "Careers — FG Consulting" },
      { property: "og:description", content: "Join FG Consulting. Send us your CV and tell us about yourself." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "ok" | "rate">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!checkRateLimit("careers", 3, 60_000)) {
      setStatus("rate");
      return;
    }
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("nav.careers")}</div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">{t("careers.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("careers.desc")}</p>
      </section>

      <section className="mx-auto mt-16 max-w-2xl px-6">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("contact.name")} name="name" required />
            <Field label={t("contact.email")} name="email" type="email" required />
          </div>
          <Field label={t("contact.phone")} name="phone" />
          <Field label="Position of interest" name="position" />
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t("contact.message")}</label>
            <textarea name="message" rows={5} required className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            {t("careers.apply")}
          </button>
          {status === "ok" && <p className="text-sm text-emerald-400">{t("contact.success")}</p>}
          {status === "rate" && <p className="text-sm text-amber-400">{t("contact.rateLimit")}</p>}
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
