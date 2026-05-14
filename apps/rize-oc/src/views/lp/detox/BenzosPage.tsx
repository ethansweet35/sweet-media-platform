import LpShell from "@/components/lp/LpShell";
import LpHero from "@/components/lp/LpHero";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import TherapiesSection from "@/views/home/components/TherapiesSection";
import DaySection from "@/views/home/components/DaySection";
import EnvironmentSection from "@/views/home/components/EnvironmentSection";
import AdmissionsSection from "@/views/home/components/AdmissionsSection";
import InsuranceSection from "@/views/home/components/InsuranceSection";

const PHONE_HREF = "tel:9494612620";
const PHONE_DISPLAY = "(949) 461-2620";

const benzosConditions = {
  substance: [
    { name: "Benzodiazepine Dependence", body: "Specialized residential and outpatient detox protocols for all benzodiazepines, utilizing safe, medically-monitored tapering to prevent severe withdrawal symptoms and ensure your physical safety." },
    { name: "Fentanyl & Opioid Addiction", body: "Targeted medical detox protocols for fentanyl and synthetic opioids, including Medication-Assisted Treatment (MAT) for severe withdrawal management." },
    { name: "Alcohol Use Disorder", body: "Medically-supervised detox and evidence-based treatment for alcohol dependency." },
    { name: "Stimulant Addiction", body: "Treatment for cocaine, methamphetamine, and prescription stimulant abuse." },
    { name: "Polysubstance Use", body: "Comprehensive, medically-monitored detox for complex dependencies, including cases involving fentanyl-laced stimulants or counterfeit pills." },
  ],
  mentalHealth: [
    { name: "Anxiety Disorders", body: "Because benzos are often prescribed for anxiety, withdrawal can trigger intense 'rebound' symptoms. We provide specialized care to treat the root causes of panic and generalized anxiety safely." },
    { name: "Depression & Mood Disorders", body: "Evidence-based treatment for major depression, bipolar disorder, and dysthymia." },
    { name: "Trauma & PTSD", body: "Trauma-informed care addressing complex trauma, PTSD, and adverse childhood experiences." },
    { name: "Stress & Burnout", body: "Executive care for professionals experiencing chronic stress and occupational burnout." },
  ],
};

const benzosLevels = [
  { num: "01", intensity: "Most Intensive · 3–10 Days", title: "Medical Detox", body: "A 24/7 medically-supervised period of physical stabilization utilizing a slow, clinical taper to prioritize your safety and comfort above all." },
  { num: "02", intensity: "High Intensive · 30–90 Days", title: "Residential (RTC)", body: "After the most acute phase of detox, engage in deep, immersive therapy in our highly private Southern California sanctuary to heal the psychological toll of dependency." },
  { num: "03", intensity: "Medium Intensive · 2–4 Weeks", title: "PHP", body: "Intensive daytime therapy focused on relapse prevention and managing anxiety without medication. Provides high-level clinical support while allowing you to transition back to daily life in the evenings." },
  { num: "04", intensity: "Least Intensive · 8–12 Weeks", title: "IOP", body: "The gentle return. Flexible outpatient care that provides therapeutic check-ins and ongoing support as you integrate back into your daily life without relying on benzos." },
];

export default function BenzosPage() {
  return (
    <LpShell>
      <LpHero
        headline="Medically-Supervised Benzodiazepine Detox Center"
        subheadline="Safely manage benzo withdrawal with our customized, medically monitored tapering programs. Private, residential care in a comfortable, luxury setting."
        eyebrow="1,000+ Successful Recoveries"
        stat="24/7"
        statLabel="Medical Monitoring"
      />
      <AccreditationsBar />

      {/* Specialized intro */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-4">Private Residential Care</p>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
              >
                Safely Navigate Benzodiazepine Withdrawal
              </h2>
              <p className="text-base font-light leading-relaxed text-ink/70 mb-4">
                Detoxing from benzodiazepines requires expert medical intervention, as abrupt withdrawal can be severely uncomfortable and medically dangerous. At Rize, our clinical team specializes in safe, highly monitored tapering protocols for medications like Xanax, Valium, Klonopin, and Ativan.
              </p>
              <p className="text-base font-light leading-relaxed text-ink/70 mb-6">
                Located in a private, serene residential setting, we provide the 24/7 medical oversight you need to comfortably and safely begin your recovery.
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:opacity-90 transition-opacity"
              >
                <i className="ri-phone-line text-sm" />
                Call Now — {PHONE_DISPLAY}
              </a>
            </div>
            <div className="grid gap-4">
              {["Same Day Admissions", "Catered Meals", "Pet-Friendly", "24/7 Medical Monitoring", "Private Rooms", "Keep Laptop & Phone", "Upscale Amenities", "Comfort Medication for Withdrawals"].map((item) => (
                <div key={item} className="flex items-center gap-3 border border-warm/40 bg-[#F8F6F3] px-5 py-3">
                  <i className="ri-checkbox-circle-line text-accent text-sm shrink-0" />
                  <span className="text-sm font-medium text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="bg-[#F8F6F3] py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Specialized Benzo Detox Programs</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Personalized Detox & Treatment Plans
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm font-light text-ink/60">
              Evidence-based, medically supervised treatment to safely taper off benzos and manage co-occurring anxiety or mental health conditions.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent mb-5">Substance Use Disorders</h3>
              <div className="grid gap-4">
                {benzosConditions.substance.map((c) => (
                  <div key={c.name} className="bg-white border border-warm/40 p-5">
                    <p className="font-medium text-ink mb-1">{c.name}</p>
                    <p className="text-sm font-light leading-relaxed text-ink/65">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent mb-5">Mental Health Conditions</h3>
              <div className="grid gap-4">
                {benzosConditions.mentalHealth.map((c) => (
                  <div key={c.name} className="bg-white border border-warm/40 p-5">
                    <p className="font-medium text-ink mb-1">{c.name}</p>
                    <p className="text-sm font-light leading-relaxed text-ink/65">{c.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-l-2 border-accent pl-5">
                <p className="text-sm font-light leading-relaxed text-ink/70">
                  Our integrated dual-diagnosis approach ensures that while our medical doctors safely manage your physical taper, our clinical therapists simultaneously treat the underlying anxiety, stress, or trauma that led to the dependency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Levels of care */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Levels of Care</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Your Path Through Benzo Recovery
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benzosLevels.map((level) => (
              <div key={level.title} className="border border-warm/40 bg-[#F8F6F3] p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/60 mb-1">{level.num}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40 mb-3">{level.intensity}</p>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-3">{level.title}</h3>
                <p className="text-sm font-light leading-relaxed text-ink/70">{level.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TherapiesSection />
      <DaySection />
      <EnvironmentSection />
      <AdmissionsSection />
      <InsuranceSection />
    </LpShell>
  );
}
