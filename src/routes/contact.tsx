import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import { checkRateLimit } from "@/lib/rate-limiter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FG Consulting" },
      { name: "description", content: "Get in touch with FG Consulting. Office in Dubai, UAE." },
      { property: "og:title", content: "Contact — FG Consulting" },
      { property: "og:description", content: "Get in touch with FG Consulting. Office in Dubai, UAE." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "ok" | "rate">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!checkRateLimit("contact", 3, 60_000)) {
      setStatus("rate");
      return;
    }
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">{t("nav.contact")}</div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">{t("contact.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("contact.desc")}</p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          {[
            { icon: MapPin, label: t("contact.address"), value: t("contact.addressValue") },
            { icon: Phone, label: t("contact.phoneLabel"), value: t("contact.phoneValue") },
            { icon: Mail, label: t("contact.emailLabel"), value: t("contact.emailValue") },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 rounded-xl border border-border/50 bg-card/40 p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
                <div className="mt-1 text-sm font-medium">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-8 md:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("contact.name")} name="name" required />
            <Field label={t("contact.email")} name="email" type="email" required />
          </div>
          <Field label={t("contact.phone")} name="phone" />
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t("contact.message")}</label>
            <textarea name="message" rows={5} required className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            {t("contact.submit")}
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
