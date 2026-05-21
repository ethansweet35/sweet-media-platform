"use client";

interface AdminContentPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AdminContentPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AdminContentPaginationProps) {
  if (totalPages <= 1) return null;

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 2)
    .reduce<(number | "…")[]>((acc, n, idx, arr) => {
      if (idx > 0 && (arr[idx - 1] as number) < n - 1) acc.push("…");
      acc.push(n);
      return acc;
    }, []);

  const navBtn =
    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#F4F7FB] disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-[11px] text-[#94A3B8]">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onPageChange(1)} disabled={currentPage === 1} className={navBtn}>
          <i className="ri-skip-left-line text-sm" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={navBtn}
        >
          <i className="ri-arrow-left-s-line text-sm" />
        </button>
        {pageButtons.map((item, idx) =>
          item === "…" ? (
            <span key={`ellipsis-${idx}`} className="w-8 text-center text-xs text-[#94A3B8]">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item as number)}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                currentPage === item
                  ? "bg-[#0A1F44] text-white"
                  : "text-[#64748B] hover:bg-[#F4F7FB]"
              }`}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={navBtn}
        >
          <i className="ri-arrow-right-s-line text-sm" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={navBtn}
        >
          <i className="ri-skip-right-line text-sm" />
        </button>
      </div>
    </div>
  );
}
