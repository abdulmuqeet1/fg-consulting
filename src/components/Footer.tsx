import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import { StarField } from "./StarField";
import { useTheme } from "@/lib/theme";
import { MuqeetCredit } from "./MuqeetCredit";

const social = [
  { name: "facebook", url: "" },
  // { "name": "instagram", "url": "" },
  { name: "linkedin", url: "" },
  { name: "x", url: "" },
];

export function Footer() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const assetBase = import.meta.env.BASE_URL;

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-card/40">
      <StarField count={60} className="opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <img
              className="grid h-9 w-9 place-items-center rounded-lg dark:hidden"
              src={theme === "dark" ? `${assetBase}fg_consulting-logo.png` : `${assetBase}fg_consulting-logo_blue.png`}
              alt="FG Consulting"
            />
            <img
              className="hidden h-9 w-9 place-items-center rounded-lg dark:grid"
              src={theme === "dark" ? `${assetBase}fg_consulting-logo.png` : `${assetBase}fg_consulting-logo_blue.png`}
              alt="FG Consulting"
            />
            FG Consulting
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {t("contact.addressValue")}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {t("contact.phoneValue")}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              {t("contact.emailValue")}
            </li>
          </ul>
          <div className="flex gap-3 mt-2">
            {social.map((s, idx) => (
              <a
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                href={s.url}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs uppercase font-semibold"
              >
                <img src={`${assetBase}${s.name}.png`} alt={s.name} className="w-7 h-7" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-foreground">
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-foreground">
                {t("nav.careers")}
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-foreground">
                {t("nav.news")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("footer.legal")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground">
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl mt-16 pt-8 pb-10 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
        <div>© {new Date().getFullYear()} MN Studio. {t("footer.rights")}</div>
        <div><MuqeetCredit /></div>
      </div>
    </footer>
  );
}
