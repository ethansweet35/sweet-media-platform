"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/blog";

interface AdminBlogDeleteModalProps {
  post: BlogPost;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function AdminBlogDeleteModal({ post, onConfirm, onCancel }: AdminBlogDeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <i className="ri-delete-bin-line text-red-500 text-xl"></i>
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 text-center mb-2">
          Delete this post?
        </h2>
        <p className="text-sm text-neutral-500 text-center mb-1 leading-relaxed">
          You&apos;re about to permanently delete:
        </p>
        <p className="text-sm font-medium text-neutral-800 text-center mb-6 px-4 line-clamp-2">
          &ldquo;{post.title}&rdquo;
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex gap-2">
          <i className="ri-alert-line text-amber-500 text-sm mt-0.5 flex-shrink-0"></i>
          <p className="text-xs text-amber-700 leading-relaxed">
            This action cannot be undone. The post will be permanently removed from the database.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:border-neutral-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 bg-red-500 text-white text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {deleting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin"></i>
                Deleting...
              </span>
            ) : (
              "Delete Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}