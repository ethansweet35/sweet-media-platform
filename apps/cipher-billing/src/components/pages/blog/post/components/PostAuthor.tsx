import Image from "next/image";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  const validPhoto =
    post.authorPhoto &&
    !post.authorPhoto.includes("ynmldknprfu") &&
    post.authorPhoto.startsWith("http");

  return (
    <div className="mt-14 pt-8 border-t border-[#101E3F]/10">
      <p
        className="text-[9px] tracking-[0.35em] uppercase text-[#101E3F]/35 font-semibold mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        About the Author
      </p>

      <div className="flex flex-col sm:flex-row gap-5 items-start bg-[#F5F7FA] p-6 border-l-4 border-[#166C96]">
        {/* Avatar */}
        <div className="relative w-16 h-16 overflow-hidden bg-[#101E3F] flex-shrink-0 flex items-center justify-center">
          {validPhoto ? (
            <Image
              src={post.authorPhoto}
              alt={post.author}
              width={64}
              height={64}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <span
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "'Marcellus', serif" }}
            >
              {post.author ? post.author.split(" ").map((n) => n[0]).join("").slice(0, 2) : "CB"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3
              className="text-[#101E3F] font-semibold"
              style={{ fontFamily: "'Marcellus', serif", fontSize: "17px" }}
            >
              {post.author || "Cipher Billing"}
            </h3>
            {post.authorRole && (
              <span
                className="text-[9px] tracking-[0.2em] uppercase font-semibold bg-[#166C96]/10 text-[#166C96] border border-[#166C96]/20 px-2.5 py-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.authorRole}
              </span>
            )}
          </div>
          {post.authorBio && (
            <p
              className="text-[13px] text-[#101E3F]/55 leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {post.authorBio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
