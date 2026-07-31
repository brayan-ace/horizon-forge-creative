import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/api/preview")({
  loader: async ({ location }) => {
    const search = location.search as Record<string, string | undefined>;
    const secret = search.secret;
    const disable = search.disable;
    const slug = search.slug || "/";

    const expectedSecret =
      (typeof process !== "undefined" &&
        process.env &&
        (process.env.SANITY_PREVIEW_SECRET || process.env.VITE_SANITY_PREVIEW_SECRET)) ||
      "horizon7-preview-secret-2026";

    // Client-side environment
    if (typeof window !== "undefined") {
      if (disable === "true" || disable === "1") {
        document.cookie = "sanity_preview=; path=/; max-age=0";
        throw redirect({ href: slug });
      }

      if (secret === expectedSecret) {
        document.cookie = "sanity_preview=true; path=/; max-age=86400; SameSite=Lax";
        throw redirect({ href: slug });
      }

      throw redirect({ href: slug });
    }

    // Server-side environment
    const { setCookie, deleteCookie } = await import("@tanstack/start-server-core");

    if (disable === "true" || disable === "1") {
      deleteCookie("sanity_preview", { path: "/" });
      throw redirect({ href: slug });
    }

    if (secret !== expectedSecret) {
      throw new Response(JSON.stringify({ message: "Invalid preview secret" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    setCookie("sanity_preview", "true", {
      path: "/",
      sameSite: "lax",
      maxAge: 86400,
    });

    throw redirect({ href: slug });
  },
});
