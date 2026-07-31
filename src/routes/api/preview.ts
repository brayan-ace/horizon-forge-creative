import { createFileRoute, redirect } from "@tanstack/react-router";
import { setCookie, deleteCookie } from "@tanstack/start-server-core";

export const Route = createFileRoute("/api/preview")({
  loader: async ({ location }) => {
    const search = location.search as Record<string, string | undefined>;
    const secret = search.secret;
    const disable = search.disable;
    const slug = search.slug || "/";

    const expectedSecret =
      process.env.SANITY_PREVIEW_SECRET ||
      process.env.VITE_SANITY_PREVIEW_SECRET ||
      "horizon7-preview-secret-2026";

    // Disable preview mode
    if (disable === "true" || disable === "1") {
      deleteCookie("sanity_preview", { path: "/" });
      throw redirect({ href: slug });
    }

    // Validate secret
    if (secret !== expectedSecret) {
      throw new Response(JSON.stringify({ message: "Invalid preview secret" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Enable preview mode
    setCookie("sanity_preview", "true", {
      path: "/",
      sameSite: "lax",
      maxAge: 86400,
    });

    throw redirect({ href: slug });
  },
});
