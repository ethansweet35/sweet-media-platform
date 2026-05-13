import ServiceAreaTemplate, { type ServiceAreaData } from "../ServiceAreaTemplate";

const data: ServiceAreaData = {
  slug: "irvine",
  city: "Irvine",
  heroImage: "irvine_hero01.jpg",
  heroImageAlt: "Aerial view of Irvine California — palm-lined boulevards, green parks, and the Santa Ana mountains in the distance at golden hour",
  heroEyebrow: "Serving Irvine, California",
  heroHeadline: "Addiction Treatment",
  heroHeadlineEmphasis: "Near Irvine, CA",
  heroBody:
    "Rize OC provides Orange County's most clinically rigorous addiction and mental health treatment — minutes from Irvine, with programs designed around the lives of Southern California professionals and families.",
  driveTime: "~15 min",
  introQuote:
    "Irvine residents deserve access to the same standard of care as any major metropolitan center — we built Rize to provide exactly that.",
  introParagraphs: [
    "Irvine is one of the most educated and professionally accomplished communities in Southern California — yet addiction and mental health conditions affect people in every zip code, at every income level, and in every industry. The demands of high-performance careers and family life can both mask the early signs of a developing disorder and create barriers to seeking treatment.",
    "Rize OC was built specifically for this population. Our programs are designed around the schedules of working professionals — with flexible IOP options, discreet admissions, and a level of clinical rigor that matches the expectations of Irvine's discerning community.",
    "Located just minutes away in Orange County, Rize is close enough for family involvement and regular visits, while offering the therapeutic separation from daily triggers that recovery requires.",
  ],
  faqs: [
    {
      q: "How far is Rize OC from Irvine?",
      a: "Rize OC is located in Orange County, approximately 15–20 minutes from Irvine depending on your exact location and traffic. Our admissions team can provide specific directions and discuss transportation assistance if needed.",
    },
    {
      q: "Does Rize OC accept insurance from Irvine-based employers?",
      a: "Yes. We accept most major commercial PPO plans, including many employer-sponsored plans common among Irvine's large tech and professional workforce — including Aetna, Cigna, Anthem, Blue Cross Blue Shield, and UHC.",
    },
    {
      q: "Can I continue working while attending treatment?",
      a: "In many cases, yes. Our IOP and OP programs are designed with working professionals in mind — with morning, afternoon, and evening scheduling options to fit around professional responsibilities.",
    },
    {
      q: "Does Rize OC offer telehealth options for Irvine residents?",
      a: "Yes. Our Virtual Outpatient Program delivers the same evidence-based clinical programming as our in-person IOP via a secure telehealth platform — popular among Irvine clients who work from home.",
    },
    {
      q: "What is the admissions process like?",
      a: "It begins with a free, confidential phone or in-person clinical assessment. Our admissions team verifies your insurance benefits, recommends the appropriate level of care, and can often coordinate same-day or next-day admission.",
    },
    {
      q: "Does Rize OC treat co-occurring mental health conditions?",
      a: "Yes. Dual-diagnosis treatment — addressing both substance use and co-occurring conditions like anxiety, depression, PTSD, or ADHD simultaneously — is a core clinical specialty at Rize OC.",
    },
  ],
};

export default function IrvineServiceAreaPage() {
  return <ServiceAreaTemplate data={data} />;
}
