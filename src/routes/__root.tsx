import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { QuoteProvider } from "../components/QuoteDialog";
import { SITE } from "../lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-4 font-display text-5xl font-medium">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-foreground px-6 py-4 text-sm font-medium text-background transition-colors hover:bg-orange"
          >
            Return home →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-medium">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. Please try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-orange"
          >
            Try again
          </button>
          <a href="/" className="border border-foreground px-5 py-3 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon" },
      {
        name: "description",
        content:
          "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon.",
      },
      { name: "author", content: "Horizon 7 Company Ltd" },
      { name: "theme-color", content: "#0D1B2A" },
      { property: "og:site_name", content: "Horizon 7 Company Ltd" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon" },
      {
        property: "og:description",
        content:
          "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Horizon 7 Company Ltd — Industrial Engineering & Fabrication in Cameroon" },
      { name: "twitter:description", content: "Engineering excellence and industrial precision. Welding, fabrication, construction, civil engineering and heavy equipment services across Cameroon." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3929c67-128a-4a70-9134-bd8d3a4c212d/id-preview-80d2c222--cf995722-8aa9-4072-8991-1d1e9e5727a5.lovable.app-1783995340652.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3929c67-128a-4a70-9134-bd8d3a4c212d/id-preview-80d2c222--cf995722-8aa9-4072-8991-1d1e9e5727a5.lovable.app-1783995340652.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          description: SITE.description,
          email: SITE.email,
          telephone: SITE.whatsapp,
          address: { "@type": "PostalAddress", addressLocality: "Douala", addressCountry: "CM" },
          areaServed: "Cameroon",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <QuoteProvider>
        <Outlet />
      </QuoteProvider>
    </QueryClientProvider>
  );
}
