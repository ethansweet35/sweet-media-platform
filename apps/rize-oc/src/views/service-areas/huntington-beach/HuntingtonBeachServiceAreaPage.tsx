import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "huntington-beach",
  city: "Huntington Beach",
  heroImage: "huntington-beach_hero01.jpg",
  heroImageAlt: "Aerial golden-hour view of Huntington Beach California pier stretching over the Pacific Ocean with surfers and the long sandy coastline",
  heroEyebrow: "Serving Huntington Beach, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Huntington Beach, CA",
  heroBody:
    "Rize OC provides Orange County's most clinically rigorous addiction and mental health treatment — a short drive from Surf City, with programs built around the lives of coastal Southern California residents.",
  driveTime: "~20 min",
  introQuote:
    "Huntington Beach residents are resilient — but resilience alone doesn't treat addiction. Clinical excellence, close to home, is what recovery actually requires.",
  introParagraphs: [
    "Huntington Beach is one of Southern California's most iconic communities — but behind the surf culture and coastal lifestyle, addiction and mental health conditions affect residents at every age and background. The casual culture around alcohol and recreational substances can normalize patterns that quietly escalate into serious disorders.",
    "Rize OC was built to provide the same standard of care to coastal OC communities that major metropolitan centers offer. Our programs combine physician-led medical oversight, evidence-based therapies, and flexible scheduling — designed for the active, working lifestyles common among Huntington Beach residents.",
    "Located just 20 minutes away in Orange County, Rize is accessible enough for family support and regular visits, while offering the clinical distance from daily triggers that sustained recovery requires.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Huntington Beach?",
      a: "Rize OC is located in Orange County, approximately 20–25 minutes from Huntington Beach depending on your location and traffic. Our admissions team can provide directions and discuss transportation assistance if needed.",
    },
    {
      q: "Does Rize OC accept insurance common in Huntington Beach?",
      a: "Yes. We accept most major commercial PPO plans, including Aetna, Cigna, Anthem, Blue Cross Blue Shield, and UHC — plans common among Huntington Beach residents and local employers.",
    },
    {
      q: "Do you have programs for alcohol addiction specifically?",
      a: "Yes. Alcohol use disorder is one of the most common conditions we treat. We offer medically supervised alcohol detox, PHP, IOP, and outpatient programming — with dual-diagnosis support for anxiety and depression that often co-occur with alcohol misuse.",
    },
    {
      q: "Can I keep surfing or exercising during treatment?",
      a: "In many cases, yes. Our IOP and outpatient programs are structured to preserve daily routines outside of clinical hours. We actively support physical wellness as part of the recovery process.",
    },
    {
      q: "What is the admissions process like?",
      a: "It starts with a free, confidential assessment by phone or in person. Our team verifies your insurance benefits, recommends the appropriate level of care, and can often arrange same-day or next-day admission.",
    },
    {
      q: "Does Rize OC treat co-occurring mental health conditions?",
      a: "Yes. Dual-diagnosis treatment — addressing both substance use and co-occurring conditions like anxiety, depression, PTSD, or trauma simultaneously — is a core clinical specialty at Rize OC.",
    },
  ],
};

export default function HuntingtonBeachServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
