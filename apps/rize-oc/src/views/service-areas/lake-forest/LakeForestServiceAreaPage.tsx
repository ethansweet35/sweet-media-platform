import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "lake-forest",
  city: "Lake Forest",
  heroImage: "lake-forest_hero01.jpg",
  heroImageAlt: "Suburban South Orange County landscape — quiet tree-lined streets, tile-roofed homes, and the Saddleback Mountains under a clear blue California sky",
  heroEyebrow: "Serving Lake Forest, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Lake Forest, CA",
  heroBody:
    "Rize OC provides Lake Forest and South Orange County residents with premium, evidence-based addiction and mental health treatment — close to home, built around family life.",
  driveTime: "~20 min",
  introQuote:
    "South Orange County families deserve access to the highest level of addiction care — without having to travel far from the communities they are working to get back to.",
  introParagraphs: [
    "Lake Forest is a thriving South Orange County community home to families, small business owners, and professionals who value privacy, quality, and community. When addiction or mental health challenges arise — as they do in every community — finding the right care nearby matters enormously for family stability and long-term recovery.",
    "Rize OC is approximately 20 minutes from Lake Forest and offers a full continuum of care — from medically supervised detox through flexible outpatient programming. Our clinical team works with families throughout the treatment process, providing education, support, and coordination that extends well beyond the client.",
    "Whether you are dealing with alcohol dependence, opioid use disorder, anxiety, depression, or a combination of conditions, Rize OC's physician-led team develops a personalized treatment plan from day one — one that accounts for your life, your family, and your goals.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Lake Forest?",
      a: "Rize OC is approximately 20 minutes from Lake Forest. Our admissions team can provide specific directions and discuss transportation assistance for clients who need it.",
    },
    {
      q: "Can family members be involved in treatment?",
      a: "Yes. Family involvement is an integral part of our clinical model. We offer family therapy sessions, family education programs, and regular communication with designated family members — all with the client's consent — throughout the treatment process.",
    },
    {
      q: "Does Rize accept PPO insurance common in South OC?",
      a: "Yes. We accept most major commercial PPO plans including Aetna, Cigna, Anthem, Blue Cross Blue Shield, and UHC. Our team verifies your exact benefits — including deductibles, co-pays, and authorized length of stay — within hours, at no cost.",
    },
    {
      q: "What levels of care are available to Lake Forest residents?",
      a: "We offer the full continuum: medical detox, Partial Hospitalization Program (PHP), Intensive Outpatient Program (IOP), Outpatient Program (OP), and Virtual IOP. Our clinical team recommends the appropriate level based on a free assessment.",
    },
    {
      q: "Is same-day admission possible?",
      a: "In many cases, yes. When a bed is available and clinical assessment is completed, we can often coordinate same-day or next-day admission. Call our admissions line at (949) 461-2620 for current availability.",
    },
    {
      q: "Does Rize treat both addiction and mental health together?",
      a: "Yes. Dual-diagnosis treatment — simultaneously addressing substance use and co-occurring conditions like anxiety, depression, or PTSD — is a core specialty at Rize OC. Treating only the substance use while leaving underlying mental health conditions unaddressed leads to significantly higher relapse rates.",
    },
  ],
};

export default function LakeForestServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
