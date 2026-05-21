export type RewriteStatus = "idle" | "generating" | "ready" | "error";

interface BlogEditorHeaderProps {
  title: string;
  status: string;
  saving: boolean;
  saved: boolean;
  hasChanges: boolean;
  rewriteStatus: RewriteStatus;
  rewriteError?: string | null;
  onBack: () => void;
  onSave: () => void;
  onPreview: () => void;
  onAiRewrite: () => void;
}

export default function BlogEditorHeader({
  title,
  status,
  saving,
  saved,
  hasChanges,
  rewriteStatus,
  onBack,
  onSave,
  onPreview,
  onAiRewrite,
}: BlogEditorHeaderProps) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30">
      <div className="max-w-screen-xl mx-auto px-6 py-3.5 flex items-center gap-4">
        {/* Back */}
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F4F7FB] hover:bg-[#E2E8F0] text-[#64748B] transition-colors cursor-pointer flex-shrink-0"
        >
          <i className="ri-arrow-left-line text-sm"></i>
        </button>

        {/* Title + status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-sm font-semibold text-[#0A1F44] truncate max-w-md">
              {title || "Untitled Post"}
            </h1>
            <span className={`inline-flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
              status === "published"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-[#F4F7FB] text-[#64748B]"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status === "published" ? "bg-emerald-500" : "bg-[#94A3B8]"}`} />
              {status === "published" ? "Published" : "Draft"}
            </span>
            {hasChanges && !saving && !saved && (
              <span className="text-[10px] text-amber-500 font-medium flex-shrink-0">Unsaved changes</span>
            )}
            {saved && !hasChanges && (
              <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 flex-shrink-0">
                <i className="ri-check-line text-xs"></i>Saved
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#94A3B8] mt-0.5">Blog Post Editor</p>
        </div>

        {/* Rewrite status chip */}
        {rewriteStatus === "generating" && (
          <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-[11px] font-semibold px-3.5 py-1.5 rounded-xl flex-shrink-0">
            <i className="ri-loader-4-line animate-spin text-xs"></i>
            Writing with AI...
          </div>
        )}
        {rewriteStatus === "ready" && (
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-3.5 py-1.5 rounded-xl flex-shrink-0">
            <i className="ri-check-line text-xs"></i>
            Rewrite ready — scroll down to apply
          </div>
        )}
        {rewriteStatus === "error" && (
          <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-[11px] font-semibold px-3.5 py-1.5 rounded-xl flex-shrink-0">
            <i className="ri-error-warning-line text-xs"></i>
            Rewrite failed
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onAiRewrite}
            disabled={rewriteStatus === "generating"}
            className="flex items-center gap-1.5 border border-violet-200 text-violet-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl hover:bg-violet-50 hover:border-violet-300 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i className="ri-sparkling-2-line text-xs"></i>
            AI Rewrite
          </button>
          <button
            onClick={onPreview}
            className="flex items-center gap-1.5 border border-[#E2E8F0] text-[#64748B] text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl hover:border-[#CBD5E1] transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-eye-line text-xs"></i>
            Preview
          </button>
          <button
            onClick={onSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-1.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-5 py-2 rounded-xl hover:bg-[#0d2a5e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {saving ? (
              <><i className="ri-loader-4-line animate-spin text-xs"></i>Saving...</>
            ) : (
              <><i className="ri-save-line text-xs"></i>Save</>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
