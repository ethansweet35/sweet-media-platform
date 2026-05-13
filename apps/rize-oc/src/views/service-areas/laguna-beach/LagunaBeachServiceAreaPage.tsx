import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "laguna-beach",
  city: "Laguna Beach",
  heroImage: "laguna-beach_hero01.jpg",
  heroImageAlt: "Stunning sunset view of Laguna Beach California — dramatic rocky cliffs, turquoise Pacific Ocean, and the hillside community above",
  heroEyebrow: "Serving Laguna Beach, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Laguna Beach, CA",
  heroBody:
    "Rize OC offers Laguna Beach residents premier addiction and mental health treatment grounded in clinical excellence — with the discretion and individual attention that this community values.",
  driveTime: "~20 min",
  introQuote:
    "Laguna Beach is one of California's most beautiful communities. The people who call it home deserve treatment that reflects that same standard of excellence.",
  introParagraphs: [
    "Laguna Beach is an affluent, artistic coastal city where the pressures of success, social performance, and the high cost of coastal living can quietly fuel substance use and mental health disorders. Alcohol misuse, prescription drug dependence, and anxiety disorders are as present in beachside communities as anywhere else — often more so, and often less discussed.",
    "Rize OC offers the level of clinical sophistication and personal attention that Laguna Beach residents expect. Our admissions process is discreet, our clinical staff is exceptional, and our individualized treatment plans are built around each person's specific circumstances — not a standardized protocol.",
    "Located approximately 20 minutes from Laguna Beach, Rize provides the therapeutic distance that meaningful recovery requires, while remaining close enough for family participation and community connection throughout the treatment process.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Laguna Beach?",
      a: "Rize OC is approximately 20–25 minutes from Laguna Beach, depending on your location and traffic. Our admissions team can provide exact directions and coordinate transportation if needed.",
    },
    {
      q: "Is the admissions process discreet?",
      a: "Completely. All communications are confidential under HIPAA. We never share information about clients or inquiries with anyone without explicit written consent. Discretion is a fundamental value, not an afterthought.",
    },
    {
      q: "Does Rize accept insurance common in Laguna Beach?",
      a: "Yes. We accept most major commercial PPO plans — including Aetna, Anthem, Cigna, Blue Cross Blue Shield, and UHC — which are common among Laguna Beach residents. We verify benefits within hours at no cost to you.",
    },
    {
      q: "Can high-functioning professionals manage treatment around work?",
      a: "Yes. Our IOP and OP programs are specifically designed for working professionals — with scheduling flexibility built in. Many Laguna Beach clients complete IOP while maintaining their professional lives, with their employer entirely unaware they are in treatment.",
    },
    {
      q: "Does Rize treat alcohol and prescription drug misuse?",
      a: "Yes. Alcohol use disorder and prescription drug dependence (including benzodiazepines and opioids) are among the most common conditions we treat. Our medical team specializes in safe, supervised withdrawal followed by comprehensive evidence-based therapy.",
    },
    {
      q: "What makes Rize different from other treatment options near Laguna Beach?",
      a: "Our physician-led clinical model, Joint Commission accreditation, individualized treatment planning, and full continuum of care — from medical detox through outpatient — set us apart from single-level or non-accredited programs. We treat the whole person, not just the substance.",
    },
  ],
};

export default function LagunaBeachServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
