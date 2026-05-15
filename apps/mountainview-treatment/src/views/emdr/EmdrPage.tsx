import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";

import EmdrConditionsSection from "./EmdrConditionsSection";
import EmdrHero from "./EmdrHero";
import EmdrUnderstandingSection from "./EmdrUnderstandingSection";
import EmdrWhoBenefitsSection from "./EmdrWhoBenefitsSection";
import EmdrWhyUsSection from "./EmdrWhyUsSection";
import EvidenceBasedSection from "./EvidenceBasedSection";

const FAQS = [
  {
    q: "What is EMDR therapy and how does it work?",
    a: "EMDR (Eye Movement Desensitization and Reprocessing) is an evidence-based therapy that helps the brain reprocess traumatic memories so they no longer trigger present-day distress. During an EMDR session, your therapist guides you through brief sets of bilateral stimulation \u2014 typically side-to-side eye movements, tactile tapping, or alternating tones \u2014 while you focus on a target memory. This dual-attention process activates the brain\u2019s natural healing mechanism, allowing distressing memories to integrate with adaptive beliefs and lose their emotional charge. Most clients experience meaningful symptom reduction within 6 to 12 sessions for single-incident trauma.",
  },
  {
    q: "Is EMDR therapy effective for PTSD?",
    a: "Yes. EMDR is recognized as a first-line treatment for PTSD by the American Psychological Association, the World Health Organization, and the U.S. Department of Veterans Affairs. More than 30 randomized controlled trials have demonstrated EMDR\u2019s effectiveness in reducing PTSD symptoms, often more rapidly than traditional talk therapy. Research shows that 84-90% of single-trauma survivors no longer meet PTSD criteria after just three 90-minute EMDR sessions, making it one of the most efficient trauma treatments available.",
  },
  {
    q: "Do I have to talk about my trauma in detail during EMDR?",
    a: "No. Unlike traditional talk therapy or exposure-based approaches, EMDR does not require you to describe traumatic events in detail or repeatedly verbalize what happened. You only need to briefly bring the memory to mind while engaging in bilateral stimulation \u2014 your therapist does not need to know every specific. This makes EMDR particularly accessible for clients who find verbal processing of trauma overwhelming, who experience dissociation when discussing painful memories, or who simply prefer not to recount difficult events out loud.",
  },
  {
    q: "How long does EMDR therapy take to work?",
    a: "Treatment length varies based on your history and goals. Single-incident trauma (such as a car accident or assault) often resolves in 6 to 12 sessions. Complex PTSD, childhood trauma, or trauma compounded by substance use typically requires longer treatment \u2014 often 6 months to a year or more \u2014 because multiple interconnected memories need to be reprocessed. Your EMDR therapist will discuss a realistic timeline with you during the initial assessment phase, and progress is measured at each session using standardized clinical scales.",
  },
  {
    q: "What\u2019s the difference between EMDR and CBT or talk therapy?",
    a: "Traditional talk therapy and CBT primarily work through cognitive insight and behavioral change \u2014 understanding your thoughts and practicing new responses. EMDR works differently: it directly targets how traumatic memories are stored in the brain, using bilateral stimulation to help the nervous system reprocess them. Many clients who haven\u2019t made progress with talk therapy find significant relief through EMDR because it addresses trauma at a neurobiological level rather than only a cognitive one. EMDR also doesn\u2019t require homework between sessions, and healing often happens without the need to repeatedly relive painful events.",
  },
  {
    q: "Is EMDR therapy safe? Are there side effects?",
    a: "EMDR is considered safe when delivered by a trained, licensed clinician. Like any effective trauma treatment, it can bring up difficult emotions and memories during processing \u2014 this is part of how the therapy works. Some clients experience vivid dreams, increased emotional sensitivity, or new memories surfacing between sessions, which typically subside as treatment progresses. Our Seattle EMDR therapists follow the standardized 8-phase protocol, which includes extensive preparation and stabilization work before any reprocessing begins, ensuring you have the coping resources needed to engage with the work safely.",
  },
  {
    q: "Does insurance cover EMDR therapy in Seattle?",
    a: "Yes, EMDR therapy is typically covered by most major insurance plans when delivered by a licensed mental health provider, as it\u2019s billed under standard psychotherapy codes rather than a separate modality. Mountain View Treatment accepts most major insurance providers in Washington State, and our admissions team can verify your benefits and out-of-pocket costs before you begin treatment. We also offer self-pay options for clients who prefer not to use insurance for privacy reasons or who have out-of-network coverage.",
  },
  {
    q: "How do I get started with EMDR therapy in Seattle?",
    a: "Getting started is straightforward. Call our Seattle team at (253)-252-5564 or contact us through our website to schedule a confidential consultation. During this initial call, we\u2019ll discuss what brings you in, answer your questions, verify your insurance, and match you with an EMDR-trained therapist whose specialties fit your needs. Whether you\u2019re seeking weekly outpatient EMDR, an intensive trauma program, or EMDR as part of co-occurring addiction treatment, we\u2019ll help you find the right level of care to begin healing.",
  },
];

export default function EmdrPage() {
  return (
    <>
      <EmdrHero />
      <EmdrUnderstandingSection />
      <EvidenceBasedSection />
      <EmdrConditionsSection />
      <EmdrWhoBenefitsSection />
      <EmdrWhyUsSection />
      <FaqAccordion
        eyebrow="Common Questions"
        headline={
          <>
            Frequently Asked <span className="italic">Questions</span>
          </>
        }
        faqs={FAQS}
      />
      <FinancialConcierge />
    </>
  );
}
