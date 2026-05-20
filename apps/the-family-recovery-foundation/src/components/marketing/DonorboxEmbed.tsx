import Script from "next/script";

const DONORBOX_EMBED_URL = "https://donorbox.org/embed/the-family-recovery-foundation";

interface DonorboxEmbedProps {
  className?: string;
  /** Matches live homepage embed height */
  height?: string;
}

export default function DonorboxEmbed({
  className = "",
  height = "900px",
}: DonorboxEmbedProps) {
  return (
    <div className={className}>
      <Script src="https://donorbox.org/widget.js" strategy="lazyOnload" />
      <iframe
        src={DONORBOX_EMBED_URL}
        name="donorbox"
        title="Donate to The Family Recovery Foundation"
        allow="payment *"
        className="w-full border-0"
        style={{
          maxWidth: "500px",
          minWidth: "250px",
          width: "100%",
          height,
          maxHeight: "none",
        }}
      />
    </div>
  );
}
