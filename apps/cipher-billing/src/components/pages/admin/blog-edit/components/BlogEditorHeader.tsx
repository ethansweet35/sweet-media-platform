interface BlogEditorHeaderProps {
  title: string;
  status: string;
  saving: boolean;
  saved: boolean;
  hasChanges: boolean;
  onBack: () => void;
  onSave: () => void;
  onPreview: () => void;
}

export default function BlogEditorHeader({
  title,
  status,
  saving,
  saved,
  hasChanges,
  onBack,
  onSave,
  onPreview,
}: BlogEditorHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
      <div className="max-w-screen-xl mx-auto px-6 py-3.5 flex items-center gap-4">
        {/* Back */}
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
        >
          <i className="ri-arrow-left-line text-sm"></i>
        </button>

        {/* Title + status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-sm font-semibold text-neutral-900 truncate max-w-md">
              {title || "Untitled Post"}
            </h1>
            <span className={`inline-flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
              status === "published"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-neutral-100 text-neutral-500"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status === "published" ? "bg-emerald-500" : "bg-neutral-400"}`} />
              {status === "published" ? "Published" : "Draft"}
            </span>
            {hasChanges && !saving && !saved && (
              <span className="text-[10px] text-amber-500 font-medium flex-shrink-0">
                Unsaved changes
              </span>
            )}
            {saved && !hasChanges && (
              <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 flex-shrink-0">
                <i className="ri-check-line text-xs"></i>
                Saved
              </span>
            )}
          </div>
          <p className="text-[10px] text-neutral-400 mt-0.5">Blog Post Editor</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onPreview}
            className="flex items-center gap-1.5 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl hover:border-neutral-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-eye-line text-xs"></i>
            Preview
          </button>
          <button
            onClick={onSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-1.5 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-5 py-2 rounded-xl hover:bg-[#35636f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xs"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line text-xs"></i>
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}