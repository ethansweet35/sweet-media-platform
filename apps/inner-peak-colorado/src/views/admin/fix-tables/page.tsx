"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FixTablesPage() {
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [results, setResults] = useState<string[]>([]);
  const [summary, setSummary] = useState<{ fixed: number; total: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const runMigration = async () => {
    setStatus("running");
    setResults([]);
    setSummary(null);
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("fix-table-blocks", {
        body: {},
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResults(data.results ?? []);
      setSummary({ fixed: data.fixed ?? 0, total: data.total ?? 0 });
      setStatus("done");
    } catch (err) {
      setErrorMsg(String(err));
      setStatus("error");
    }
  };

  const fixedResults = results.filter((r) => r.includes("FIXED"));
  const errorResults = results.filter((r) => r.includes("ERROR"));
  const skippedResults = results.filter((r) => !r.includes("FIXED") && !r.includes("ERROR"));

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl border border-neutral-200 p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Fix Table Blocks</h1>
        <p className="text-neutral-500 text-sm mb-6">
          Scans all blog posts and converts any paragraph blocks containing raw markdown table
          syntax into properly formatted table blocks. Safe to run multiple times.
        </p>

        {summary && status === "done" && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <p className="text-emerald-800 font-semibold text-lg">
              Done! Fixed {summary.fixed} post{summary.fixed !== 1 ? "s" : ""} out of {summary.total} total.
            </p>
            {summary.fixed === 0 && (
              <p className="text-emerald-700 text-sm mt-1">All posts already have correct table formatting.</p>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-800 font-semibold">Error occurred</p>
            {errorMsg && <p className="text-red-700 text-sm mt-1 font-mono">{errorMsg}</p>}
          </div>
        )}

        <button
          onClick={runMigration}
          disabled={status === "running"}
          className="whitespace-nowrap px-6 py-3 bg-[#3d6f7f] text-white rounded-lg font-medium hover:bg-[#3d6f7f]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-6"
        >
          {status === "running" ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Running migration...
            </span>
          ) : (
            "Run Migration"
          )}
        </button>

        {results.length > 0 && (
          <div className="space-y-4">
            {fixedResults.length > 0 && (
              <div className="border border-emerald-200 rounded-lg overflow-hidden">
                <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-200">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Fixed ({fixedResults.length})
                  </p>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {fixedResults.map((r, i) => (
                    <div key={i} className="px-4 py-2 text-sm text-emerald-700 border-b border-emerald-100 last:border-0">
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errorResults.length > 0 && (
              <div className="border border-red-200 rounded-lg overflow-hidden">
                <div className="bg-red-50 px-4 py-2 border-b border-red-200">
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">
                    Errors ({errorResults.length})
                  </p>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {errorResults.map((r, i) => (
                    <div key={i} className="px-4 py-2 text-sm text-red-700 border-b border-red-100 last:border-0">
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skippedResults.length > 0 && (
              <details className="border border-neutral-200 rounded-lg overflow-hidden">
                <summary className="bg-neutral-50 px-4 py-2 cursor-pointer text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Skipped / No Tables ({skippedResults.length})
                </summary>
                <div className="max-h-48 overflow-y-auto">
                  {skippedResults.map((r, i) => (
                    <div key={i} className="px-4 py-2 text-sm text-neutral-500 border-b border-neutral-100 last:border-0">
                      {r}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
