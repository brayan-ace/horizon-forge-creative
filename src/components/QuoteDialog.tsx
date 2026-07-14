import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { SITE, mailLink, waLink } from "@/lib/site";

type QuoteContext = {
  open: (subject?: string) => void;
};

const Ctx = createContext<QuoteContext | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();

  const open = useCallback((s?: string) => {
    setSubject(s);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  const waMessage = subject
    ? `Hello Horizon 7, I would like to request a quote for: ${subject}.`
    : `Hello Horizon 7, I would like to request a quote.`;
  const mailSubject = subject ? `Quote request — ${subject}` : "Quote request";

  return (
    <Ctx.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg gap-0 rounded-none border-hairline p-0">
          <div className="p-8 sm:p-10">
            <DialogHeader className="space-y-3 text-left">
              <span className="eyebrow">Request a Quote</span>
              <DialogTitle className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Let's build something precise.
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                {subject
                  ? `Reach us directly about ${subject}. We reply within one working day.`
                  : "Reach us directly. Our team replies within one working day."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 space-y-3">
              <a
                href={waLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-hairline bg-background px-5 py-4 transition-colors hover:border-foreground"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-orange text-white">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-medium">Message on WhatsApp</div>
                    <div className="text-sm text-muted-foreground">{SITE.whatsapp}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>

              <a
                href={mailLink(mailSubject)}
                className="group flex items-center justify-between border border-hairline bg-background px-5 py-4 transition-colors hover:border-foreground"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-navy text-white">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-medium">Send an Email</div>
                    <div className="text-sm text-muted-foreground">{SITE.email}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              {SITE.hours} · Response within one working day.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}
