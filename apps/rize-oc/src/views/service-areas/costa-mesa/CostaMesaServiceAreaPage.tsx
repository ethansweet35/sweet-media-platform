import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "costa-mesa",
  city: "Costa Mesa",
  heroImage: "costa-mesa_hero01.jpg",
  heroImageAlt: "Aerial golden-hour view of Costa Mesa California — wide boulevards, palm trees, and the Orange County landscape stretching toward the coast",
  heroEyebrow: "Serving Costa Mesa, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Costa Mesa, CA",
  heroBody:
    "Rize OC provides Costa Mesa residents with best-in-class addiction and mental health treatment — minutes from home, built for the vibrant, fast-paced lives of one of Orange County's most dynamic communities.",
  driveTime: "~10 min",
  introQuote:
    "Costa Mesa sits at the center of Orange County — and Rize OC is built to serve the full spectrum of people who live here, from young professionals to families to artists.",
  introParagraphs: [
    "Costa Mesa is one of Orange County's most energetic communities — home to a thriving arts scene, major retail, and a diverse mix of young professionals, creatives, and families. It is also adjacent to Newport Beach and UCI, drawing a wide range of people navigating the pressures of high-achievement environments.",
    "Substance use and mental health disorders are prevalent across all demographics in Costa Mesa — alcohol and stimulant misuse are especially common among the professional and young adult population. Rize OC is designed to meet these clients where they are: with flexible scheduling, evidence-based therapies, and the full continuum of care from detox to outpatient.",
    "Just approximately 10 minutes from Costa Mesa, Rize provides exceptional clinical care within the Orange County community. Our admissions process is fast, discreet, and pressure-free — call or submit the form and we will handle the rest.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Costa Mesa?",
      a: "Rize OC is approximately 10–15 minutes from Costa Mesa. Our admissions team can provide directions and discuss transportation options for clients who need them.",
    },
    {
      q: "Does Rize treat stimulant and alcohol use disorders?",
      a: "Yes. Alcohol use disorder, stimulant use disorder (cocaine, methamphetamine, Adderall misuse), and prescription drug dependence are all conditions we treat with evidence-based, physician-supervised protocols.",
    },
    {
      q: "Is there a program for young professionals?",
      a: "While we don't have a track exclusively labeled for young professionals, our IOP and OP programs are specifically designed to fit professional schedules — with flexible timing, discretion, and therapists experienced in the pressures of high-demand careers.",
    },
    {
      q: "How quickly can someone get admitted from Costa Mesa?",
      a: "We can often facilitate same-day or next-day admission when assessment is complete and clinical criteria are met. Call (949) 461-2620 and our team will move as quickly as your situation requires.",
    },
    {
      q: "Does Rize accept insurance?",
      a: "Yes. We accept most major commercial PPO plans — Aetna, Cigna, Anthem, Blue Cross Blue Shield, UHC, and more. Submit the form above or call us and we will verify your exact benefits within hours, at no charge.",
    },
    {
      q: "Does Rize treat anxiety, depression, and trauma alongside addiction?",
      a: "Yes. Dual-diagnosis treatment is central to our clinical model. Many clients from Costa Mesa and the surrounding area come in with both a substance use disorder and an underlying condition like anxiety, depression, or PTSD. We treat both from day one using an integrated clinical approach.",
    },
  ],
};

export default function CostaMesaServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
