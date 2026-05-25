import { useState } from "react";
import { ExternalLink } from "lucide-react";

export const MuqeetCredit = () => {
    const [open, setOpen] = useState(false);
    const url = "https://abdulmuqeet.netlify.app/";

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-secondary-foreground/70 transition-colors hover:text-primary-glow"
            >
                Designed &amp; developed by{" "}
                <span className="font-medium text-secondary-foreground underline decoration-primary-glow/40 decoration-1 underline-offset-2 group-hover:decoration-primary-glow">
                    Muqeet
                </span>
                <ExternalLink className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
            </a>

            {open && (
                <span
                    className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-[320px] -translate-x-1/2 sm:block"
                    aria-hidden
                >
                    <span className="block overflow-hidden rounded-2xl border border-secondary-foreground/15 bg-secondary shadow-elev animate-fade-in">
                        <span className="block aspect-[16/10] overflow-hidden bg-secondary-foreground/5">
                            <iframe
                                src={url}
                                title="Abdul Muqeet — portfolio preview"
                                loading="lazy"
                                className="h-[600px] w-[800px] origin-top-left scale-[0.4] border-0"
                                style={{ pointerEvents: "none" }}
                            />
                        </span>
                        <span className="block px-4 py-3 text-left">
                            <span className="block font-display text-sm font-semibold text-secondary-foreground">
                                Abdul Muqeet
                            </span>
                            <span className="mt-0.5 block text-xs text-secondary-foreground/65">
                                Designer &amp; developer · abdulmuqeet.netlify.app
                            </span>
                        </span>
                    </span>
                </span>
            )}
        </span>
    );
};