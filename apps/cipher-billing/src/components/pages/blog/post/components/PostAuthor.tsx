import type { BlogPost } from "@sweetmedia/blog-core";
import { blogAuthorName, blogAuthorRole } from "@/components/pages/blog/blogTokens";

interface PostAuthorProps {
  post: BlogPost;
}

export default function PostAuthor({ post }: PostAuthorProps) {
  return (
    <div className="mt-14 pt-8 border-t border-[#101E3F]/10">
      <p
        className="text-[9px] tracking-[0.35em] uppercase text-[#101E3F]/35 font-semibold mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        About the Author
      </p>

      <div className="flex items-center gap-4 bg-[#F5F7FA] p-6 border-l-4 border-[#166C96]">
        {/* Cipher logo mark — no photo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#101E3F]">
          <i className="ri-shield-check-line text-xl text-[#166C96]" />
        </div>

        <div>
          <h3
            className="text-[#101E3F] font-semibold"
            style={{ fontFamily: "'Marcellus', serif", fontSize: "17px" }}
          >
            {blogAuthorName(post.author)}
          </h3>
          <p
            className="mt-1 text-[12px] text-[#101E3F]/50"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {blogAuthorRole(post.author, post.authorRole)}
          </p>
        </div>
      </div>
    </div>
  );
}
