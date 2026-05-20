import Link from "next/link";
import MarketingPageHero, { MarketingCtaLink } from "@/components/marketing/MarketingPageHero";
import { worksheets } from "@/mocks/family-programming";

export default function WorksheetsPage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Family Tools"
        title="Worksheets"
        body="Download practical worksheets designed to support relapse prevention planning and family recovery. For additional modules and live support, explore our Family Programming."
      >
        <MarketingCtaLink href="/family-programming" label="Family Programming" />
      </MarketingPageHero>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {worksheets.map((worksheet) => (
              <article
                key={worksheet.id}
                className="rounded-2xl bg-pure-white border border-mist/60 p-8 text-center shadow-sm"
              >
                <h2 className="text-[18px] md:text-[20px] font-display text-deep-navy mb-2">
                  Worksheet {worksheet.number}
                </h2>
                <p className="text-[15px] font-body text-slate mb-6">{worksheet.title}</p>
                <a
                  href={worksheet.downloadUrl}
                  download={worksheet.downloadFilename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-tfrf-blue px-6 py-2.5 text-[13px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
                >
                  <i className="ri-download-line" />
                  Download Now
                </a>
              </article>
            ))}
          </div>
          <p className="text-center text-[14px] font-body text-slate mt-10 max-w-lg mx-auto">
            Questions about using these tools at home?{" "}
            <Link href="/contact" className="text-tfrf-blue font-semibold hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
