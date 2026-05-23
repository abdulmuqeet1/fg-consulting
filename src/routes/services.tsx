import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { serviceCategories } from "@/lib/services-data";
import StackingCards, { type StackingCardItem } from "@/components/ui/stacking-card";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — FG Consulting" },
      {
        name: "description",
        content:
          "Comprehensive professional services: Digital Transformation, Audit, Tax, Advisory, ERP, and more.",
      },
    ],
  }),
  component: ServicesPage,
});

// Brand-aligned palette for card backgrounds (purple/indigo/blue family)
const cardColors = [
  "#4c1d95", // deep violet
  "#5b21b6",
  "#6d28d9",
  "#7c3aed",
  "#1e3a8a", // deep indigo
  "#1e40af",
  "#312e81",
  "#0f172a", // slate
  "#581c87",
];

function ServicesPage() {
  const { t } = useTranslation();

  const items: StackingCardItem[] = serviceCategories.map((cat, i) => ({
    title: cat.title,
    description: cat.desc,
    color: cardColors[i % cardColors.length],
    icon: cat.icon,
    items: cat.items,
  }));

  return (
    <>
      <section className="pt-32 pb-16 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">
          {t("servicesSection.tag")}
        </div>
        <h1 className="text-5xl font-bold md:text-6xl text-gradient">
          {t("servicesSection.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          {t("servicesSection.desc")}
        </p>
        <p className="mt-8 text-xs text-muted-foreground/70">↓ Scroll to explore</p>
      </section>

      <StackingCards items={items} />

      <div className="h-32" />
    </>
  );
}
