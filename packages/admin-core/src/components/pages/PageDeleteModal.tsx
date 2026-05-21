"use client";

import { useState } from "react";
import type { TrackedPage } from "../../types/tracked-page";

interface PageDeleteModalProps {
  page: TrackedPage;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function PageDeleteModal({ page, onConfirm, onCancel }: PageDeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} aria-hidden />

      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <i className="ri-delete-bin-line text-red-500 text-xl" />
        </div>

        <h2 className="text-lg font-semibold text-[#0A1F44] text-center mb-4">
          Remove this page from tracking?
        </h2>
        <p className="text-sm text-[#64748B] text-center mb-6 leading-relaxed px-1">
          This will delete the tracking record but does NOT delete the actual page from your website
          (which lives in code).
        </p>
        <p className="text-sm font-medium text-[#0A1F44] text-center mb-6 px-2">
          <span className="font-mono text-[#0A1F44]">{page.route_path}</span>
          <span className="text-[#94A3B8]"> · </span>
          <span className="line-clamp-2">{page.page_title}</span>
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-[#E2E8F0] text-[#64748B] text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:border-[#CBD5E1] transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 bg-red-500 text-white text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {deleting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
