export const programsList = [
  {
    id: "fix-your-family",
    title: "Fix Your Family",
    schedule: "Mondays at 7:00 PM CT / 5:00 PM PT",
    description:
      "A structured program designed to help families understand addiction, improve communication, and rebuild trust. Led by experienced facilitators who guide participants through evidence-based strategies for healing.",
  },
  {
    id: "family-room",
    title: "The Family Room",
    schedule: "Fridays at 10:00 AM CT / 8:00 AM PT",
    description:
      "An open support group where family members can share experiences, receive encouragement, and learn from others walking a similar path. A safe space for connection and community building.",
  },
  {
    id: "morning-meditation",
    title: "Morning Meditation",
    schedule: "Monday-Friday at 9:00 AM CT / 7:00 AM PT",
    description:
      "Start each day with guided meditation and mindfulness practices designed to reduce anxiety, build emotional resilience, and create a foundation of peace for navigating family challenges.",
  },
  {
    id: "courage-to-detach",
    title: "The Courage to Detach",
    schedule: "Last Wednesday of every month at 5 PT",
    description:
      "A specialized session focused on the difficult but essential skill of healthy detachment. Learn to set boundaries while maintaining love and compassion for your loved one in recovery.",
  },
  {
    id: "one-on-one-coaching",
    title: "1-on-1 Family Coaching",
    schedule: "By appointment",
    description:
      "Personalized one-on-one coaching sessions tailored to your family's unique situation. Work directly with a certified family recovery coach to develop customized strategies and action plans.",
  },
  {
    id: "family-education",
    title: "Family Education & Resources",
    schedule: "On-demand access",
    description:
      "Comprehensive educational materials, workshops, and resources designed to help families understand addiction, mental health, and the recovery process. Available anytime, anywhere.",
  },
  {
    id: "private-messaging",
    title: "Private Family Messaging Group with Clinical Director — 24/7 Access",
    schedule: "24/7 access",
    description:
      "A secure, private messaging platform where families can connect directly with TFRF's Clinical Director for guidance, questions, and support at any time of day or night.",
  },
  {
    id: "financial-aid",
    title: "Financial Aid for Treatment and Intervention Services",
    schedule: "Application-based",
    description:
      "Financial assistance programs to help families access quality treatment and intervention services. We believe cost should never be a barrier to getting the help your family needs.",
  },
];

const TFRF_DOCUMENTS_BASE =
  "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/documents";

export const familyModules = [
  {
    id: "module-1",
    number: 1,
    title: "Definition of Addiction",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_01_definition-of-addiction.pdf`,
    downloadFilename: "TFRF-Module-01-Definition-of-Addiction.pdf",
  },
  {
    id: "module-2",
    number: 2,
    title: "Our Central Nervous System",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_02_central-nervous-system.pdf`,
    downloadFilename: "TFRF-Module-02-Central-Nervous-System.pdf",
  },
  {
    id: "module-3",
    number: 3,
    title: "Codependency I: Characteristics and Strategies",
    hasVideo: true,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_03_codependency-i.pdf`,
    downloadFilename: "TFRF-Module-03-Codependency-I.pdf",
  },
  {
    id: "module-4",
    number: 4,
    title: "Codependency II: Manipulation and Enabling",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_04_codependency-ii.pdf`,
    downloadFilename: "TFRF-Module-04-Codependency-II.pdf",
  },
  {
    id: "module-5",
    number: 5,
    title: "Codependency III: The Neuroscience",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_05_codependency-iii.pdf`,
    downloadFilename: "TFRF-Module-05-Codependency-III.pdf",
  },
  {
    id: "module-6",
    number: 6,
    title: "Communication Skills: Difficult Conversations",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_06_communication-skills.pdf`,
    downloadFilename: "TFRF-Module-06-Communication-Skills.pdf",
  },
  {
    id: "module-7",
    number: 7,
    title: "Boundaries: Who I am and Who I am Not",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_07_boundaries.pdf`,
    downloadFilename: "TFRF-Module-07-Boundaries.pdf",
  },
  {
    id: "module-8",
    number: 8,
    title: "The Language of Connective Boundaries",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_08_connective-boundaries.pdf`,
    downloadFilename: "TFRF-Module-08-Connective-Boundaries.pdf",
  },
  {
    id: "module-9",
    number: 9,
    title: "Understanding and Navigating Gaslighting",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_09_gaslighting.pdf`,
    downloadFilename: "TFRF-Module-09-Gaslighting.pdf",
  },
  {
    id: "module-10",
    number: 10,
    title:
      "I am coming home: Navigating the Transition When Your Loved One Comes Home from Treatment",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_10-coming-home.pdf`,
    downloadFilename: "TFRF-Module-10-Coming-Home.pdf",
  },
  {
    id: "module-11",
    number: 11,
    title: "When the Addict Hits THE WALL",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_11_the-wall.pdf`,
    downloadFilename: "TFRF-Module-11-The-Wall.pdf",
  },
  {
    id: "module-12",
    number: 12,
    title: "Just For Today",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_12_just-for-today.pdf`,
    downloadFilename: "TFRF-Module-12-Just-For-Today.pdf",
  },
];

export type FamilyModule = (typeof familyModules)[number];

export const worksheets = [
  {
    id: "worksheet-1",
    number: 1,
    title: "Relapse Prevention Plan",
    downloadUrl:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/documents/tfrf_worksheet_01_relapse-prevention-plan.pdf",
    downloadFilename: "TFRF-Relapse-Prevention-Plan.pdf",
  },
  {
    id: "worksheet-2",
    number: 2,
    title: "Family Support Plan",
    downloadUrl:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/documents/tfrf_worksheet_02_family-support-plan.pdf",
    downloadFilename: "TFRF-Family-Support-Plan.pdf",
  },
];

export const blogPosts = [
  {
    id: "discipline-of-healing",
    title: "The Discipline of Healing",
    excerpt:
      "We often hear about discipline in recovery. The desire to change. The resolve to stay strong. But while desire is powerful—it often isn't enough on its own. Discipline without direction is just a dream.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_101.jpg",
    category: "Recovery",
  },
  {
    id: "clarity-confusion",
    title: "Clarity Is the Key: Stepping Out of Confusion",
    excerpt:
      "It's that dizzying vertigo, that unsettling sensation where nothing feels quite solid. The foggy shifts between euphoria and dread. And in that moment—when the ground feels like it's slipping out from under you—you're not sure what's happening or how to respond.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_102.jpg",
    category: "Mental Health",
  },
  {
    id: "communicating-boundaries",
    title: "Communicating Boundaries: A New Approach",
    excerpt:
      "Traditional boundary-setting often feels like a battle—an ultimatum, a push, a demand for change backed by consequences. In the world of addiction, relationships, and family dynamics, we've all worn the ineffective this approach can be.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_103.jpg",
    category: "Boundaries",
  },
  {
    id: "not-your-fault",
    title: "It's Not Your Fault: Healing from Addiction and the Impact on Families",
    excerpt:
      "Addiction is a complex and devastating disease that affects not just the individual struggling with substance use but the entire family. If you love someone battling addiction, you may carry feelings of guilt, shame, or responsibility for their struggles.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_104.jpg",
    category: "Family Healing",
  },
  {
    id: "recovery-journey",
    title: "Recovery is a Journey, Not a Race",
    excerpt:
      "When we think about recovery, it's easy to imagine it as a straight road with clear milestones and a final destination. But the truth is, recovery isn't a race to the finish line. It's a personal journey that unfolds at its own pace, often with unexpected turns.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_105.jpg",
    category: "Recovery",
  },
  {
    id: "gaslighting-families",
    title: "Understanding and Responding to Gaslighting in Families Affected by Addiction",
    excerpt:
      "Gaslighting is a form of psychological manipulation where one person makes another doubt their perception of reality, often used to maintain control. This tactic is particularly damaging in families dealing with addiction.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_106.jpg",
    category: "Education",
  },
  {
    id: "brain-science",
    title: "Understanding Addiction Through Brain Science",
    excerpt:
      "Addiction is far more complex than a lack of willpower or a simple bad habit—it's a chronic disorder that profoundly impacts the brain, leading to compulsive behaviors despite harmful consequences.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_107.jpg",
    category: "Science",
  },
  {
    id: "internal-triggers",
    title: "Understanding Internal Triggers in Addiction",
    excerpt:
      "When supporting a loved one through addiction recovery, understanding triggers—those cues that drive cravings—can be incredibly valuable. Triggers can be divided into two main types: internal and external.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_108.jpg",
    category: "Triggers",
  },
  {
    id: "keeping-door-open",
    title: "The Power of Keeping the Door Open",
    excerpt:
      "In the world of recovery and family support, the notion of 'keeping the door open' holds a beautiful spiritual significance. It represents hope, unconditional love, and the willingness to welcome your loved one back at any stage of their journey.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_109.jpg",
    category: "Family Healing",
  },
  {
    id: "family-foundations",
    title: "Building Strong Family Foundations: The Power of Values in Parenting",
    excerpt:
      "Your family's values serve as the bedrock of your home and the relationships within it. From the moment your children arrive, you seek to instill in them the principles that will guide them through life.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_110.jpg",
    category: "Parenting",
  },
  {
    id: "trauma-responses",
    title: "Navigating Trauma Responses: Embracing Patience and Resilience",
    excerpt:
      "In the journey of life, we often encounter moments that test our strength and resilience. Whether it's facing personal challenges or external circumstances, how we respond to adversity can shape our experiences.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_111.jpg",
    category: "Trauma",
  },
  {
    id: "child-development",
    title: "Navigating the Journey of Child Development: Encouraging Individuality and Connection",
    excerpt:
      "As parents, we embark on a remarkable journey alongside our children, witnessing their growth, development, and unique individuality. One pivotal stage in this journey occurs around the ages of 10 to 12.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_112.jpg",
    category: "Parenting",
  },
  {
    id: "codependency",
    title: "Codependency",
    excerpt:
      "Codependency and codependent relationships are more common among people who have suffered trauma and substance use disorders. Understanding the patterns can help break the cycle.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_113.jpg",
    category: "Codependency",
  },
  {
    id: "boundaries",
    title: "Boundaries",
    excerpt:
      "At The Family Recovery Foundation we believe that it is critical to set boundaries in all of our relationships, and that it's not just something that will benefit those in the world of codependency and addiction recovery.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_114.jpg",
    category: "Boundaries",
  },
  {
    id: "responding-struggling",
    title: "How To Respond To Struggling Loved Ones",
    excerpt:
      "When it comes to talking with struggling loved ones some communication strategies are much more helpful to show support and compassion.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_115.jpg",
    category: "Communication",
  },
  {
    id: "detach-with-love",
    title: "How To Detach With Love",
    excerpt:
      "Detaching with love is a term used in recovery that is a core component of both Al-Anon and Codependency recovery programs. It allows you to step back while still maintaining care and compassion.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_116.jpg",
    category: "Detachment",
  },
  {
    id: "enabling",
    title: "Enabling",
    excerpt:
      "Enabling is a family dynamic that may arise from a need to keep the peace as the devastating patterns of abuse play out. Understanding enabling behavior is the first step toward breaking the cycle.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_117.jpg",
    category: "Education",
  },
  {
    id: "coping-skills",
    title: "Coping Skills For Families & Loved Ones",
    excerpt:
      "Millions of families and loved ones are struggling every day because of the disease of drug and alcohol addiction. Developing healthy coping skills is essential for maintaining your own well-being.",
    image:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_118.jpg",
    category: "Coping",
  },
];