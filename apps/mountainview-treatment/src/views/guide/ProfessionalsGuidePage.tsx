import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function ProfessionalsGuidePage() {
  return (
    <GuideArticlePage
      title="The Seattle Professional's Guide to Outpatient Addiction Treatment"
      intro="Executives, healthcare workers, attorneys, and high-performing professionals face unique barriers to seeking addiction treatment — privacy, scheduling, career concerns. This guide explains how to access effective care without sacrificing your professional life."
      readTime="10 min read"
      topics={["Professionals", "IOP", "Confidentiality", "Work"]}
      heroImage={`${BASE}/mvt_guide_insurance.jpg`}
      heroAlt="A professional desk with laptop overlooking Pacific Northwest mountains — balancing work and recovery"
      keyFacts={[
        { label: "US Professionals in Recovery", value: "Millions" },
        { label: "HIPAA Protected", value: "Yes" },
        { label: "IOP Hours", value: "9–15 hrs/wk" },
        { label: "FMLA / PFML Eligibility", value: "Often Yes" },
      ]}
      sections={[
        {
          heading: "Can I Keep Working While in Treatment?",
          body: [
            "For many professionals, the idea of taking 30 or 90 days away from work is not just inconvenient — it feels career-ending. The good news is that many people receive highly effective addiction treatment without stepping away from work at all, through intensive outpatient programs (IOP) specifically designed for working adults.",
            "Mountain View Treatment offers IOP tracks with both morning and evening scheduling. You attend 3 hours of clinical programming 3–5 days per week and maintain your professional responsibilities on the same schedule. Many clients continue working full-time throughout IOP.",
            "For those who do need residential care, Washington State's PFML and federal FMLA provide legal job protection for medical leave — including addiction treatment. Our admissions team can walk you through the process.",
          ],
          callout:
            "Many professionals complete IOP before their employer or colleagues are aware they were ever in treatment. Confidentiality is absolute under HIPAA.",
        },
        {
          heading: "Understanding Intensive Outpatient Programs (IOP)",
          body: [
            "Intensive Outpatient Programs offer clinical rigor comparable to partial hospitalization but with the flexibility of daily independent living. Research shows IOP produces outcomes equivalent to residential treatment for many substance use presentations — particularly those with stable living situations and strong motivation.",
            "Mountain View's IOP includes group therapy sessions, individual counseling, medication management as needed, psychiatric evaluation for co-occurring conditions, family therapy, and relapse prevention planning. Our IOP is fully licensed and accredited by the Joint Commission.",
            "The clinical content mirrors our residential program — same evidence-based modalities (CBT, DBT, EMDR), same treatment team — just with the flexibility of a schedule that allows you to continue work, family, and daily life.",
          ],
          list: [
            "9–15 hours of programming per week",
            "Morning and evening tracks available",
            "Individual + group therapy included",
            "Psychiatric evaluation and medication management",
            "Family sessions available",
            "HIPAA-compliant — completely private from employer",
          ],
        },
        {
          heading: "Confidentiality: What Your Employer Can and Cannot Know",
          body: [
            "Federal law — specifically HIPAA (Health Insurance Portability and Accountability Act) — prohibits your treatment provider from sharing any information about your care with your employer without your explicit written consent. Your employer cannot call Mountain View, your therapist, or your psychiatrist and obtain information about your treatment.",
            "Additionally, 42 CFR Part 2 — a federal regulation specific to substance use disorder treatment records — provides even stronger confidentiality protections than HIPAA. These records cannot be shared without your consent even with your own physician without a specific authorization form.",
            "There are limited exceptions: if you are an imminent danger to yourself or others, or if you sign a consent form for release of information. But routine employer inquiries, performance review processes, or HR investigations do not create an exception.",
          ],
          callout:
            "Your employer cannot legally require you to disclose the specific nature of a medical condition when you request FMLA leave — \"medical condition requiring treatment\" is legally sufficient.",
        },
        {
          heading: "FMLA and PFML Protections for Professionals",
          body: [
            "Two separate legal frameworks protect your employment while you seek treatment: the federal Family and Medical Leave Act (FMLA) and Washington State's Paid Family and Medical Leave (PFML).",
            "FMLA: Provides up to 12 weeks of unpaid, job-protected leave per year for qualifying medical conditions — including addiction treatment. You must have worked for your employer for at least 12 months and at least 1,250 hours in the past year, and your employer must have 50 or more employees within 75 miles.",
            "WA PFML: Provides paid leave benefits (up to 90% of wages for lower earners) for qualifying medical conditions, including addiction treatment. The program is funded by employee and employer payroll contributions. Most Washington employees who have worked 820+ hours in the prior year are eligible.",
            "You do not need to disclose that your medical leave is for addiction treatment on FMLA or PFML paperwork. A healthcare provider certifying that you have a \"serious health condition requiring treatment\" is sufficient.",
          ],
          list: [
            "FMLA: up to 12 weeks unpaid, job-protected — federal",
            "WA PFML: up to 12 weeks paid (partial wage replacement) — state",
            "Specific diagnosis does not need to be disclosed to HR",
            "Your provider completes the certification form, not you",
            "Cannot be retaliated against for taking protected leave",
          ],
        },
        {
          heading: "Schedule-Flexible Treatment at Mountain View",
          body: [
            "Mountain View Treatment is designed with the professional client in mind. Our private accommodations, discrete location, and flexible scheduling reduce the visible footprint of treatment in your daily life. All treatment is delivered in a private, confidential setting — we do not operate in shared community settings or facilities that might expose clients to acquaintances.",
            "Our IOP tracks operate in the morning (typically 8–11 AM) and evening (typically 5–8 PM), allowing most working clients to choose a track that doesn't conflict with core business hours. Telehealth components can supplement in-person sessions for clients with travel or schedule demands.",
          ],
          callout:
            "Many executive and professional clients prefer our evening IOP track — attending after the workday and returning home without any professional schedule disruption.",
        },
        {
          heading: "Planning a Smooth Return to Full Professional Capacity",
          body: [
            "Recovery is not a destination that ends treatment — it is an ongoing process. Planning your return to full professional engagement is a clinical process, not just a logistical one. Our care team works with you on stress management, boundary-setting, and identifying professional triggers before you re-enter high-pressure environments.",
            "Employee Assistance Programs (EAPs), available through most large employers, can provide continuing confidential counseling at no cost to you. Professional monitoring programs (available for healthcare workers and others in licensed professions through Washington's Professional Programs) offer structured accountability that protects both your license and your recovery.",
            "The professionals who sustain long-term recovery do so not by white-knuckling through high-stress careers, but by building a recovery infrastructure — therapy, community, self-care practices — that is at least as robust as their professional support systems.",
          ],
          list: [
            "Enroll in your employer's EAP for free continuing counseling",
            "Step down progressively: IOP → OP → monthly check-ins",
            "Identify 1–2 trusted colleagues as 'accountability partners' if appropriate",
            "Use Washington's healthcare professional monitoring program if applicable",
            "Continue individual therapy throughout the return-to-work transition",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "Taking Leave for Rehab: WA PFML & FMLA Guide",
          href: "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/",
          excerpt: "Your step-by-step guide to filing for protected medical leave for addiction treatment in Washington.",
        },
        {
          title: "How to Pay for Drug Rehab in Washington State",
          href: "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
          excerpt: "Insurance, EAPs, and financing options — understanding the cost of quality addiction treatment.",
        },
        {
          title: "What to Expect and Pack for Treatment",
          href: "/guide/what-to-expect-and-pack-for-treatment/",
          excerpt: "A practical first-timer's guide to the admission process, your daily schedule, and what to bring.",
        },
      ]}
    />
  );
}
