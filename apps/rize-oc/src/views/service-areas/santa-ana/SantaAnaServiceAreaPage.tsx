import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "santa-ana",
  city: "Santa Ana",
  heroImage: "santa-ana_hero01.jpg",
  heroImageAlt: "Golden-hour aerial view of Santa Ana California downtown — palm-lined boulevards, historic architecture, and the Orange County skyline",
  heroEyebrow: "Serving Santa Ana, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Santa Ana, CA",
  heroBody:
    "Rize OC delivers evidence-based addiction and mental health care to Santa Ana residents — compassionate, clinically rigorous treatment that meets people where they are, regardless of background.",
  driveTime: "~10 min",
  introQuote:
    "Every community in Orange County deserves access to world-class addiction treatment. Rize OC is committed to making that a reality for Santa Ana.",
  introParagraphs: [
    "Santa Ana is the heart of Orange County — a vibrant, diverse city that is home to hundreds of thousands of families, professionals, and students. Like every community, Santa Ana faces the challenges of addiction and mental health disorders, which cross every demographic, cultural, and economic line.",
    "Rize OC is just minutes from Santa Ana and accepts most major commercial PPO insurance plans. Our bilingual admissions team is sensitive to the diverse cultural backgrounds of the communities we serve, and our clinical approach is individualized — never one-size-fits-all.",
    "Whether you are seeking treatment for yourself or helping a loved one take the first step, Rize OC's team is available 24 hours a day to provide a free, confidential assessment and guide you through the process with compassion and expertise.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Santa Ana?",
      a: "Rize OC is approximately 10–15 minutes from Santa Ana. Our admissions team can provide directions and discuss transportation options, including assistance for clients who need it.",
    },
    {
      q: "Do you accept insurance commonly held by Santa Ana residents?",
      a: "Yes. We accept most major commercial PPO plans including Aetna, Cigna, Anthem, Blue Cross Blue Shield, UHC, and others. We do not accept Medi-Cal or Medicaid. Call us or submit the verification form and we will confirm your specific benefits within hours.",
    },
    {
      q: "Is treatment available in Spanish?",
      a: "Our admissions team includes bilingual staff. We work to ensure every client can communicate comfortably through the assessment and admissions process. Please let us know your preferred language when you call.",
    },
    {
      q: "What if I or my loved one doesn't have insurance?",
      a: "We offer private-pay options and can discuss flexible financial arrangements. Contact our admissions team to learn what options may be available for your specific situation.",
    },
    {
      q: "What is the first step to getting help?",
      a: "Call our 24/7 admissions line at (949) 461-2620 or submit the insurance verification form above. Our team will conduct a free, confidential clinical assessment, verify your benefits, and walk you through what to expect — with no pressure and no obligation.",
    },
    {
      q: "Does Rize treat dual-diagnosis conditions?",
      a: "Yes. Many of our clients have both a substance use disorder and a co-occurring mental health condition such as depression, anxiety, PTSD, or bipolar disorder. Our clinical model addresses both simultaneously — which research shows produces significantly better outcomes.",
    },
  ],
};

export default function SantaAnaServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
