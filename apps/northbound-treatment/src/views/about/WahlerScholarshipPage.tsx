import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

export default function WahlerScholarshipPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedText>{"Financial Assistance"}</AutoLinkedText></p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            The Wahler <span className="italic text-[#e97a52]">Scholarship</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Northbound is committed to ensuring that cost is never a barrier to recovery.\n            The Wahler Scholarship was established to help individuals who might not otherwise\n            be able to afford treatment access the care they deserve."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedText>{"About the Scholarship"}</AutoLinkedText></p>
              <h2 className="font-heading text-3xl font-bold text-[#3a6697] mb-6">
                Named in Honor of Jason Wahler
              </h2>
              <p className="text-sm leading-7 text-[#64748b] mb-4">
                <AutoLinkedText>{"The Wahler Scholarship honors Jason Wahler, a public advocate for addiction recovery and\n                mental health awareness who experienced firsthand the transformative power of Northbound&apos;s\n                programs. In his spirit, this scholarship is offered to individuals whose financial circumstances\n                would otherwise prevent them from receiving treatment."}</AutoLinkedText>
              </p>
              <p className="text-sm leading-7 text-[#64748b]">
                <AutoLinkedText>{"We believe that a lack of funds should never be a reason someone cannot access help.\n                Our team will work with every applicant to explore all available options — including\n                insurance coverage, financing, and scholarship funds — to make treatment possible."}</AutoLinkedText>
              </p>
            </div>
            <div className="bg-[#eef2f7] p-8 flex flex-col gap-6">
              <h3 className="font-heading text-xl font-bold text-[#3a6697]">Eligibility &amp; Application</h3>
              <ul className="space-y-4">
                {[
                  "Demonstrated financial need",
                  "Commitment to completing the full treatment program",
                  "Acceptance into the Northbound Treatment program",
                  "Willingness to engage in all clinical requirements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="ri-check-line text-[#e97a52] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#64748b]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact-us/"
                className="mt-2 inline-flex items-center gap-2 bg-[#e97a52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f09068] self-start"
              >
                Inquire About Scholarship <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Also see */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Other financial assistance options
            </h2>
            <p className="mt-3 text-white/70"><AutoLinkedText>{"Insurance, financing, and payment plans are available."}</AutoLinkedText></p>
          </div>
          <Link href="/financial-assistance/" className="shrink-0 inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
            Financial Assistance <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
