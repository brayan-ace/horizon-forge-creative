import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = "nz6n7tde";
export const dataset = "production";
export const apiVersion = "2024-01-01";

const previewToken =
  (typeof process !== "undefined" &&
    process.env &&
    (process.env.SANITY_API_READ_TOKEN || process.env.VITE_SANITY_API_TOKEN)) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env.VITE_SANITY_API_TOKEN || import.meta.env.SANITY_API_READ_TOKEN)) ||
  "";

export const client: SanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
});

export const previewClient: SanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  perspective: "previewDrafts",
  ...(previewToken ? { token: previewToken } : {}),
});

export function getSanityClient(preview = false): SanityClient {
  if (preview) {
    return previewClient;
  }
  return client;
}

export function isPreviewActive(): boolean {
  if (typeof window === "undefined") return false;
  // Check cookie
  const match = document.cookie.match(/(?:^|; )sanity_preview=([^;]*)/);
  if (match && match[1] === "true") return true;
  // Check iframe embedding in Sanity Studio
  try {
    if (window.self !== window.top) return true;
  } catch {
    // Cross-origin iframe
    return true;
  }
  // Check URL query param
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("preview") === "true") return true;
  return false;
}

const builder = imageUrlBuilder(client);
export const urlFor = (source: unknown) =>
  builder.image(source as Parameters<typeof builder.image>[0]);
