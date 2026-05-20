import { cn } from "@/lib/utils";

interface DownloadLinkProps {
  href: string;
  filename: string;
  className?: string;
  children?: React.ReactNode;
}

/** Opens the file in the same tab — avoids popup blockers on cross-origin PDFs. */
export default function DownloadLink({
  href,
  filename,
  className,
  children = "Download Now",
}: DownloadLinkProps) {
  return (
    <a
      href={href}
      download={filename}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-tfrf-blue px-6 py-2.5 text-[13px] font-body font-medium text-pure-white transition-colors hover:bg-deep-navy",
        className,
      )}
    >
      <i className="ri-download-line w-4 h-4 flex items-center justify-center" />
      {children}
    </a>
  );
}
