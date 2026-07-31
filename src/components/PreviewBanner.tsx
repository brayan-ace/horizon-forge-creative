import { useEffect, useState } from "react";
import { isPreviewActive } from "@/sanityclient";
import { Eye, X } from "lucide-react";

export function PreviewBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isPreviewActive());
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-3 rounded-full bg-navy/95 border border-orange/40 px-4 py-2 text-xs font-medium text-white shadow-2xl backdrop-blur-md transition-all hover:border-orange">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange"></span>
      </span>
      <div className="flex items-center gap-1.5 text-white/90">
        <Eye className="h-3.5 w-3.5 text-orange" />
        <span>Sanity Live Preview</span>
      </div>
      <a
        href="/api/preview?disable=true"
        className="ml-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-orange hover:text-black"
        title="Exit Preview Mode"
      >
        <span>Exit</span>
        <X className="h-3 w-3" />
      </a>
    </div>
  );
}
