import { useState, useEffect, useMemo } from "react";
import { getSanityClient, isPreviewActive } from "@/sanityclient/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSanityQuery<T = any>(
  query: string,
  params: Record<string, unknown> = {},
  initialData?: T,
): { data: any; isPreview: boolean; loading: boolean; error: Error | null } {
  const [data, setData] = useState<any>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  // Check preview mode state on mount
  useEffect(() => {
    setIsPreview(isPreviewActive());
  }, []);

  const serializedParams = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    let isMounted = true;
    const clientToUse = getSanityClient(isPreview);

    setLoading(true);
    clientToUse
      .fetch<T>(query, params)
      .then((res: any) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          console.error("Sanity query error:", err);
          setError(err);
          setLoading(false);
        }
      });

    // If preview mode is active, set up real-time listener for live updates
    let subscription: { unsubscribe: () => void } | null = null;
    if (isPreview) {
      try {
        subscription = clientToUse.listen(query, params).subscribe((_update: unknown) => {
          if (!isMounted) return;
          // When a document is mutated, re-fetch the GROQ query to update the state in real-time
          clientToUse
            .fetch<T>(query, params)
            .then((res: any) => {
              if (isMounted) {
                setData(res);
              }
            })
            .catch((err: Error) => {
              console.error("Sanity live update fetch error:", err);
            });
        });
      } catch (err: unknown) {
        console.error("Failed to subscribe to Sanity live updates:", err);
      }
    }

    return () => {
      isMounted = false;
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, serializedParams, isPreview]);

  return { data, isPreview, loading, error };
}
