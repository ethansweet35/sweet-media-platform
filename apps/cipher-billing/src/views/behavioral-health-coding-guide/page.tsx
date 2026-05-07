import { loadCipherElementorFullPage } from "@/lib/cipherElementorMigrated";

export default function BehavioralHealthCodingGuidePage() {
  const html = loadCipherElementorFullPage("behavioral-health-coding-guide/migrated-raw.html");

  return (
    <main className="min-h-screen bg-white">
      {/*
        elementor-kit-8: required ancestor for post-8.css global colors & typography vars (matches WP body kit).
        Avoid cipher-migrated-html here — those rules fight Elementor’s flex/grid.
      */}
      <div className="elementor-kit-8 w-full overflow-x-hidden text-[var(--e-global-color-text,#000)]">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
