import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "mission-viejo",
  city: "Mission Viejo",
  heroImage: "mission-viejo_hero01.jpg",
  heroImageAlt: "Peaceful aerial view of Mission Viejo California — Lake Mission Viejo, tree-lined neighborhoods, and the Santa Ana mountains in the distance",
  heroEyebrow: "Serving Mission Viejo, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Mission Viejo, CA",
  heroBody:
    "Rize OC provides Mission Viejo residents with compassionate, evidence-based addiction and mental health treatment — close to home, with the family focus that this community deserves.",
  driveTime: "~25 min",
  introQuote:
    "Mission Viejo families are among the most invested in their community — and that investment makes high-quality, nearby treatment more important than anywhere else.",
  introParagraphs: [
    "Mission Viejo is consistently ranked among the safest and most family-oriented cities in the United States. Yet addiction and mental health challenges are no stranger to even the most carefully built communities — and in family-focused environments, the stigma around seeking help can be especially powerful.",
    "Rize OC understands that Mission Viejo residents often face the added pressure of maintaining appearances in a close-knit community. Our process is fully confidential, and our programs are designed to fit within the realities of suburban family life — flexible scheduling, family integration, and step-down programming that allows clients to return home as quickly as clinically appropriate.",
    "Located approximately 25 minutes from Mission Viejo, Rize is close enough for family visits and involvement while providing the clinical separation needed for genuine recovery. Our team is available 24 hours a day to answer your questions and guide you through the first steps.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Mission Viejo?",
      a: "Rize OC is approximately 25–30 minutes from Mission Viejo. Our admissions team can provide exact directions and assist with transportation coordination if needed.",
    },
    {
      q: "How does Rize protect client privacy in a close community?",
      a: "All client information is protected under HIPAA. We never share any information about clients — including the fact that they are in treatment — without their explicit written consent. Confidentiality is absolute and non-negotiable.",
    },
    {
      q: "Can teens or young adults from Mission Viejo receive treatment?",
      a: "Rize OC provides adult treatment (18+). For minors, our admissions team can provide referrals to appropriate adolescent programs in Orange County.",
    },
    {
      q: "Does Rize accept PPO insurance?",
      a: "Yes. We accept most major commercial PPO plans including Aetna, Cigna, Anthem, Blue Cross Blue Shield, and UHC. Our team verifies your specific benefits within hours — completely free and confidential.",
    },
    {
      q: "What is the step-down process after PHP or IOP?",
      a: "After PHP or IOP, clients typically step down to our Outpatient Program (OP) for continued weekly therapy, relapse prevention work, and community support. Aftercare planning — including alumni programming and long-term support resources — begins on the first day of treatment.",
    },
    {
      q: "Can a spouse or parent accompany someone to an assessment?",
      a: "Yes. Family members or loved ones are welcome to accompany clients to the initial assessment and admissions meeting. We encourage family involvement from the very beginning of the process.",
    },
  ],
};

export default function MissionViejoServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
