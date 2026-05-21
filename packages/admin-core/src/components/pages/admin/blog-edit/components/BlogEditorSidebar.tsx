import Image from "next/image";
import { categories } from "@sweetmedia/blog-core";

interface SidebarForm {
  slug: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorPhoto: string;
  image: string;
  readTime: string;
  tags: string;
  status: string;
  featured: boolean;
  metaDescription: string;
  excerpt: string;
  focusKeyword: string;
}

interface BlogEditorSidebarProps {
  form: SidebarForm;
  onChange: (field: keyof SidebarForm, value: string | boolean) => void;
  postDate: string;
  slugError?: string | null;
}

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0A1F44] focus:outline-none focus:border-[#7B9FD4] focus:ring-1 focus:ring-[#0A1F44]/10 transition-all";
const labelCls = "block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#64748B] mb-1.5";

export default function BlogEditorSidebar({ form, onChange, postDate, slugError }: BlogEditorSidebarProps) {
  const slugHasError = !!slugError;

  return (
    <aside className="w-72 flex-shrink-0 space-y-4">

      {/* Publish settings */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#64748B] mb-4">Publish Settings</p>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Status</label>
            <div className="flex gap-2">
              {["published", "draft"].map((s) => (
                <button
                  key={s}
                  onClick={() => onChange("status", s)}
                  className={`flex-1 py-2 rounded-xl text-[11px] tracking-[0.1em] uppercase font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    form.status === s
                      ? s === "published"
                        ? "bg-emerald-500 text-white"
                        : "bg-[#0d2a5e] text-white"
                      : "bg-[#F4F7FB] text-[#64748B] hover:bg-[#E2E8F0]"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm text-[#334155] font-medium">Featured Post</p>
              <p className="text-[11px] text-[#94A3B8]">Shown in hero section</p>
            </div>
            <button
              onClick={() => onChange("featured", !form.featured)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${form.featured ? "bg-[#0A1F44]" : "bg-[#E2E8F0]"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div className="pt-1 border-t border-[#E2E8F0]">
            <p className="text-[10px] text-[#94A3B8]">Published: <span className="text-[#64748B]">{postDate}</span></p>
          </div>
        </div>
      </div>

      {/* Post details */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-4">
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#64748B]">Post Details</p>

        <div>
          <label className={labelCls}>URL Slug</label>
          <div className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border bg-[#F4F7FB] transition-all ${
            slugHasError
              ? "border-red-300 ring-1 ring-red-100"
              : "border-[#E2E8F0] focus-within:border-[#0A1F44] focus-within:ring-1 focus-within:ring-[#0A1F44]/10"
          }`}>
            <span className="text-xs text-[#94A3B8] whitespace-nowrap">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                const sanitized = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
                  .replace(/-+/g, "-");
                onChange("slug", sanitized);
              }}
              className="flex-1 bg-transparent text-sm text-[#0A1F44] font-mono focus:outline-none min-w-0"
            />
          </div>
          {slugHasError ? (
            <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
              <i className="ri-error-warning-line text-xs"></i>
              {slugError}
            </p>
          ) : (
            <p className="text-[10px] text-[#94A3B8] mt-1">Only lowercase letters, numbers, and hyphens.</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Category</label>
          <select
            value={form.category}
            onChange={(e) => onChange("category", e.target.value)}
            className={`${inputCls} cursor-pointer`}
          >
            {categories.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Read Time</label>
          <input
            type="text"
            value={form.readTime}
            onChange={(e) => onChange("readTime", e.target.value)}
            placeholder="8 min read"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Tags <span className="normal-case font-normal text-[#94A3B8]">(comma-separated)</span></label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => onChange("tags", e.target.value)}
            placeholder="keywords, topics, services"
            className={inputCls}
          />
          {form.tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                <span key={tag} className="text-[9px] tracking-widest uppercase text-[#0A1F44] bg-[#0A1F44]/6 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero image */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-3">
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#64748B]">Hero Image</p>
        {form.image && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#F4F7FB]">
            <Image
              src={form.image}
              alt="Hero preview"
              fill
              loading="lazy"
              sizes="280px"
              unoptimized={
                !form.image.includes("ynmldknprfusujudvutq.supabase.co") &&
                !form.image.includes("grbxnkgzhquwdqxlscv.supabase.co") &&
                !form.image.includes("lh3.googleusercontent.com")
              }
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <label className={labelCls}>Image URL</label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => onChange("image", e.target.value)}
            placeholder="https://..."
            className={`${inputCls} font-mono text-xs`}
          />
        </div>
      </div>

      {/* Author */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-4">
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#64748B]">Author</p>

        {form.authorPhoto && (
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F4F7FB] flex-shrink-0">
              <Image
                src={form.authorPhoto}
                alt={form.author || "Author"}
                fill
                loading="lazy"
                sizes="40px"
                unoptimized={
                  !form.authorPhoto.includes("ynmldknprfusujudvutq.supabase.co") &&
                  !form.authorPhoto.includes("grbxnkgzhquwdqxlscv.supabase.co") &&
                  !form.authorPhoto.includes("lh3.googleusercontent.com")
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0A1F44]">{form.author || "Author name"}</p>
              <p className="text-xs text-[#94A3B8]">{form.authorRole || "Title"}</p>
            </div>
          </div>
        )}

        <div>
          <label className={labelCls}>Name</label>
          <input type="text" value={form.author} onChange={(e) => onChange("author", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Title</label>
          <input type="text" value={form.authorRole} onChange={(e) => onChange("authorRole", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Bio</label>
          <textarea
            value={form.authorBio}
            onChange={(e) => onChange("authorBio", e.target.value)}
            rows={3}
            maxLength={500}
            className={`${inputCls} resize-none`}
          />
        </div>
        <div>
          <label className={labelCls}>Photo URL</label>
          <input type="text" value={form.authorPhoto} onChange={(e) => onChange("authorPhoto", e.target.value)} className={`${inputCls} font-mono text-xs`} />
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-4">
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#64748B]">SEO</p>

        <div>
          <label className={labelCls}>
            Focus Keyword
            <span className="ml-1.5 normal-case font-normal text-[#94A3B8]">used by Content Editor</span>
          </label>
          <input
            type="text"
            value={form.focusKeyword}
            onChange={(e) => onChange("focusKeyword", e.target.value)}
            placeholder="e.g. drug rehab los angeles"
            className={inputCls}
          />
          <p className="text-[10px] text-[#94A3B8] mt-1">The primary keyword this post targets.</p>
        </div>

        <div>
          <label className={labelCls}>Meta Description</label>
          <textarea
            value={form.metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            rows={3}
            maxLength={160}
            placeholder="120–160 characters"
            className={`${inputCls} resize-none`}
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#94A3B8]">Recommended: 120–160 chars</span>
            <span className={`text-[10px] font-medium ${
              form.metaDescription.length > 160 ? "text-red-500"
              : form.metaDescription.length >= 120 ? "text-emerald-500"
              : "text-[#94A3B8]"
            }`}>
              {form.metaDescription.length}/160
            </span>
          </div>
        </div>

        {/* Google preview */}
        <div className="bg-[#F4F7FB] rounded-xl p-3 border border-[#E2E8F0]">
          <p className="text-[9px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] mb-2">Google Preview</p>
          <p className="text-sm font-medium leading-snug line-clamp-1" style={{ color: "#1a0dab" }}>
            {form.excerpt ? form.excerpt.slice(0, 60) + "..." : "Post title here"} | Client Brand
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#006621" }}>sweetmedia.com/blog/{form.slug || "post-slug"}</p>
          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">
            {form.metaDescription || form.excerpt || "No description set."}
          </p>
        </div>
      </div>
    </aside>
  );
}
