import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckResult {
  url: string;
  status: "ok" | "broken" | "redirect" | "error";
  statusCode?: number;
  finalUrl?: string;
  errorMessage?: string;
}

async function checkUrl(url: string): Promise<CheckResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkChecker/1.0)",
      },
    });

    clearTimeout(timeout);

    const statusCode = response.status;
    const finalUrl = response.url;

    if (statusCode === 404 || statusCode === 410 || statusCode === 403) {
      if (statusCode === 403) {
        try {
          const getController = new AbortController();
          const getTimeout = setTimeout(() => getController.abort(), 12000);
          const getResponse = await fetch(url, {
            method: "GET",
            signal: getController.signal,
            redirect: "follow",
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; LinkChecker/1.0)",
            },
          });
          clearTimeout(getTimeout);
          if (getResponse.status < 400) {
            return {
              url,
              status: getResponse.url !== url ? "redirect" : "ok",
              statusCode: getResponse.status,
              finalUrl: getResponse.url !== url ? getResponse.url : undefined,
            };
          }
        } catch {
          // fall through to broken
        }
      }
      return { url, status: "broken", statusCode };
    }

    if (statusCode >= 500) {
      return { url, status: "error", statusCode, errorMessage: `Server error ${statusCode}` };
    }

    const normalizedFinal = finalUrl.replace(/\/$/, "");
    const normalizedOriginal = url.replace(/\/$/, "");
    if (normalizedFinal !== normalizedOriginal) {
      return { url, status: "redirect", statusCode, finalUrl };
    }

    return { url, status: "ok", statusCode };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      return { url, status: "error", errorMessage: "Timed out after 12s" };
    }
    return { url, status: "error", errorMessage: err instanceof Error ? err.message : "Unknown error" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json() as { urls: string[] };

    if (!Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: "urls array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const batch = urls.slice(0, 20);
    const results = await Promise.all(batch.map(checkUrl));

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
