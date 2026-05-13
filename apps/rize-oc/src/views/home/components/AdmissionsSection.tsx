import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const steps = [
  {
    icon: "ri-phone-line",
    title: "Initial Contact",
    desc: "Reach out via phone or our confidential online form. Our compassionate admissions team is available 24/7 to answer questions and provide guidance.",
    boldNote: null,
    duration: "15-30 Min",
    availability: "Available 24/7",
    availabilityColor: "amber",
  },
  {
    icon: "ri-file-add-line",
    title: "Verify Insurance",
    desc: "Our admissions team verifies your insurance benefits and discusses financial options, ensuring transparency about coverage and costs.",
    boldNote: "We do not accept Medical.",
    duration: "45-60 Min",
    availability: "Confidential & Private",
    availabilityColor: "muted",
  },
  {
    icon: "ri-file-add-line",
    title: "Clinical Assessment",
    desc: "A licensed clinician conducts a comprehensive evaluation to understand your unique needs, medical history, and mental health concerns for an individualized plan.",
    boldNote: null,
    duration: "45-60 Min",
    availability: "No Obligation",
    availabilityColor: "muted",
  },
  {
    icon: "ri-file-add-line",
    title: "Admission & Arrival",
    desc: "We coordinate transportation, schedule your arrival, and prepare your private suite. Your healing journey begins the moment you arrive.",
    boldNote: null,
    duration: "Same Day",
    availability: "White-Glove Service",
    availabilityColor: "amber",
  },
];

export default function AdmissionsSection() {
  return (
    <section className="bg-cream">
      <SectionWrapper>
        <SectionHeader
          eyebrow="Simple & Seamless"
          eyebrowColorClass="text-ink/45"
          heading="The Admissions Process"
          headingStyle={{ fontSize: "clamp(42px, 4vw, 56px)" }}
          body="From your first call to your first day, we make the process as smooth and stress-free as possible. We handle the details so you can focus on healing."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(({ icon, title, desc, boldNote, duration, availability, availabilityColor }) => (
            <div key={title} className="bg-white border border-soft p-7 flex flex-col">
              <IconCircle icon={icon} variant="accent-subtle" size="md" iconSize="text-lg" className="mb-6" />
              <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-3">
                {title}
              </h3>
              <p className="text-[15px] font-light leading-relaxed text-ink/60 flex-1">
                {desc}
                {boldNote && (
                  <> <strong className="font-semibold text-ink/80">{boldNote}</strong></>
                )}
              </p>

              <div className="mt-6 pt-5 border-t border-soft">
                <div className="flex justify-between items-center text-[10px] text-ink/45 mb-3">
                  <span className="uppercase tracking-[0.15em]">Duration</span>
                  <span className="font-semibold text-ink/70 uppercase tracking-[0.1em]">{duration}</span>
                </div>
                <p className={`text-[13px] font-medium ${availabilityColor === "amber" ? "text-accent" : "text-muted"}`}><AutoLinkedText>{availability}</AutoLinkedText></p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
