import InsuranceForm from "./InsuranceForm";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const features = [
  { icon: "ri-shield-fill",          title: "In-Network",       desc: "With most major PPO plans" },
  { icon: "ri-checkbox-circle-fill", title: "Free Verification", desc: "No obligation assessment" },
  { icon: "ri-bank-card-fill",       title: "Payment Plans",    desc: "Flexible financing available" },
  { icon: "ri-headphone-fill",       title: "Dedicated Team",   desc: "Expert billing specialists" },
];

const coverageItems = [
  { title: "Out Of Network Benefits",    desc: "Your coverage level and network status" },
  { title: "Deductible & Co-pays",       desc: "Exact out-of-pocket costs" },
  { title: "Authorization Requirements", desc: "Pre-certification and approval process" },
  { title: "Length of Stay Coverage",    desc: "Approved treatment duration" },
];

const carriers = ["AETNA", "CIGNA", "ANTHEM", "UHC", "BLUE CROSS", "+ MORE"];

export default function InsuranceSection() {
  return (
    <section id="insurance" className="bg-white">
      <SectionWrapper>
        <SectionHeader
          eyebrow="Financial Options"
          eyebrowColorClass="text-ink/45"
          heading="Insurance &amp; Payment Options"
          headingStyle={{ fontSize: "clamp(42px, 4vw, 56px)" }}
          body="We work with most major insurance providers and offer flexible payment solutions to make treatment accessible when you need it most."
        />

        {/* 4 feature tiles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="border border-soft bg-cream-tile p-8 flex flex-col items-center text-center">
              <i className={`${icon} text-accent text-4xl mb-5`} />
              <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink">{title}</h3>
              <p className="mt-2 text-[14px] font-light text-ink/55"><AutoLinkedText>{desc}</AutoLinkedText></p>
            </div>
          ))}
        </div>

        {/* Verify coverage + form */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 items-start bg-cream-alt px-16 py-16 lg:px-20 lg:py-20">
          {/* Left */}
          <div className="pr-0 lg:pr-16">
            <h3 className="font-[family-name:var(--font-display)] text-[32px] font-normal text-ink mb-4">
              Verify Your Coverage
            </h3>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              <AutoLinkedText>{"Navigating behavioral health benefits can be overwhelming. Our dedicated utilization review team will contact your provider directly to determine your exact coverage, out-of-pocket costs, and optimal treatment path—completely free and confidentially."}</AutoLinkedText>
            </p>

            <div className="flex flex-col gap-5 mb-8">
              {coverageItems.map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-ink shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[15px] font-medium text-accent leading-snug"><AutoLinkedText>{title}</AutoLinkedText></p>
                    <p className="text-[13px] font-light text-ink/60 mt-0.5"><AutoLinkedText>{desc}</AutoLinkedText></p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Eyebrow colorClass="text-ink/50" tracking="wide" className="mb-4">We Accept:</Eyebrow>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                {carriers.map((c) => (
                  <p key={c} className="text-[13px] font-medium uppercase tracking-wide text-ink"><AutoLinkedText>{c}</AutoLinkedText></p>
                ))}
              </div>
              <p className="text-[13px] font-light text-ink/50">
                <AutoLinkedText>{"We Don't Accept Medicaid Or Medical"}</AutoLinkedText>
              </p>
            </div>
          </div>

          {/* Right — embedded form */}
          <div className="bg-white p-8">
            <div className="flex items-center gap-3 mb-6">
              <IconCircle icon="ri-shield-fill" variant="ink" size="sm" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Get Started Today</p>
                <p className="text-xs text-ink/45 mt-0.5"><AutoLinkedText>{"Verify your insurance in minutes"}</AutoLinkedText></p>
              </div>
            </div>
            <InsuranceForm showNotesField />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
