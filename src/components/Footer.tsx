import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import { StarField } from "./StarField";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-card/40">
      <StarField count={60} className="opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.74_0.14_245)] text-white">FG</span>
            FG Consulting
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{t("contact.addressValue")}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{t("contact.phoneValue")}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{t("contact.emailValue")}</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/services" className="hover:text-foreground">{t("nav.services")}</Link></li>
            <li><Link to="/careers" className="hover:text-foreground">{t("nav.careers")}</Link></li>
            <li><Link to="/news" className="hover:text-foreground">{t("nav.news")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("footer.legal")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">{t("footer.privacy")}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{t("footer.terms")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-border/30 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FG Consulting. {t("footer.rights")}
      </div>
    </footer>
  );
}
