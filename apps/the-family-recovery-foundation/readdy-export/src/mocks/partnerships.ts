export type PartnerTier = "platinum" | "silver" | "community";

export interface Partner {
  id: string;
  name: string;
  tier: PartnerTier;
  description: string;
  website: string;
  logo: string;
  logoAlt: string;
  accent: string;
}

export interface ResourceLink {
  id: string;
  label: string;
  url: string;
  description: string;
}

export const partners: Partner[] = [
  {
    id: "northbound",
    name: "Northbound Treatment Center",
    tier: "platinum",
    description:
      "Northbound Treatment Center has been a leader in addiction recovery, offering personalized care and evidence-based programs for individuals and families. Their holistic approach focuses on long-term success through therapy, life skills training, and a supportive community. We are grateful for their generous support in helping us empower families impacted by addiction.",
    website: "https://www.northboundtreatment.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/c7cbbac1-d64d-4db8-907d-7ba220fe0af8/Screenshot+2024-11-21+at+6.32.01+AM.png",
    logoAlt: "Northbound Treatment Center logo with a compass and the word NORTHBOUND against a dark background",
    accent: "from-tfrf-blue to-sky-blue",
  },
  {
    id: "la-ventana",
    name: "La Ventana Treatment Center",
    tier: "silver",
    description:
      "La Ventana Treatment Center provides a compassionate and comprehensive approach to mental health and substance abuse recovery. Known for their highly individualized care, they offer specialized programs tailored to each client\u2019s unique needs. Their partnership strengthens our mission to support families through education and prevention.",
    website: "https://laventanatreatment.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/3f8724c4-b03c-4061-aa3c-a58843120843/Screenshot+2024-11-21+at+6.35.15+AM.png",
    logoAlt: "La Ventana Treatment Center logo on a dark blue background",
    accent: "from-sky-blue to-powder-blue",
  },
  {
    id: "restore-health",
    name: "Restore Health and Wellness Center",
    tier: "community",
    description:
      "Restore Health and Wellness Center is dedicated to guiding individuals on their journey to sobriety through compassionate care and evidence-based treatments. Their focus on restoring balance and health in the lives of their clients reflects their values of hope and healing.",
    website: "https://www.restorecenterla.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/22eaa6a4-258b-44c2-94f6-a4b59006bb71/Restore.jpg",
    logoAlt: "Restore Health and Wellness Center logo with a circular symbol",
    accent: "from-powder-blue to-mist",
  },
  {
    id: "trauma-beyond",
    name: "Trauma and Beyond Psychological Center",
    tier: "community",
    description:
      "Trauma and Beyond Psychological Center specializes in treating trauma-related disorders through innovative and integrative therapies. Their dedication to addressing the root causes of emotional pain aligns with our mission to help families heal. We deeply appreciate their commitment to making a difference through their support.",
    website: "https://www.traumaandbeyondcenter.com",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/77c34f78-b008-4cca-9289-c11e3f63867d/Trauma.jpg",
    logoAlt: "Trauma and Beyond logo with colorful interconnected nodes",
    accent: "from-tfrf-blue to-deep-navy",
  },
  {
    id: "purpose-health",
    name: "Purpose Health",
    tier: "community",
    description:
      "Purpose Health offers tailored addiction treatment programs that empower clients to rediscover their purpose and live fulfilling lives. Their innovative and caring approach is instrumental in helping individuals and families find lasting recovery. We are grateful for their generosity and shared vision for healthier communities.",
    website: "https://purposehealth.com",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/d59842eb-c247-4cf8-9754-0d52504c53c7/Purpose.jpg",
    logoAlt: "Purpose Health logo inside a purple circular brushstroke",
    accent: "from-deep-navy to-sky-blue",
  },
  {
    id: "canyon-santa-monica",
    name: "The Canyon at Santa Monica",
    tier: "community",
    description:
      "The Canyon at Santa Monica is a premier treatment center that provides compassionate and comprehensive care for addiction and co-occurring disorders. Their serene setting and dedicated team create an environment for true healing. Their support helps us extend this hope and healing to the families we serve.",
    website: "https://canyonsantamonica.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/a91f6b1a-12d5-465c-a5a1-97f6c9e9c5da/Canyon.jpg",
    logoAlt: "The Canyon at Santa Monica logo featuring a green tree",
    accent: "from-sky-blue to-tfrf-blue",
  },
  {
    id: "the-retreat",
    name: "The Retreat",
    tier: "community",
    description:
      "In 1991, The Community of Recovering People (CORP), a non-profit organization consisting of a group of dedicated professionals and recovered individuals, shared their commitment to creating a continuum of affordable, accessible and effective residential recovery services to help alcohol and drug dependent individuals recover.",
    website: "https://www.theretreat.org/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/f2380a3d-1d58-4d5d-b37d-199a35cd7322/TheRetreat.jpg",
    logoAlt: "The Retreat logo with the number 12 and lowercase green letters",
    accent: "from-powder-blue to-sky-blue",
  },
  {
    id: "reflection-family",
    name: "Reflection Family Interventions",
    tier: "community",
    description:
      "At Reflection Family Interventions, we believe that addiction and mental health challenges are not just individual struggles but family experiences. Founded on the principles of compassion, education, and long-term family healing, we are dedicated to supporting families as they navigate the complexities of addiction.",
    website: "https://www.reflectionfamilyinterventions.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/006d3169-bd00-4883-9609-57c0b30d6cf2/Reflections.jpg",
    logoAlt: "Reflection Family Interventions logo with a green circle reflecting on water",
    accent: "from-tfrf-blue to-powder-blue",
  },
  {
    id: "pathways-recovery",
    name: "Pathways Recovery Centers",
    tier: "community",
    description:
      "Pathways Recovery Centers offer welcoming campus environments and comprehensive clinical care. Our intensive, trauma-informed treatment can support the needs of individuals at every stage of their recovery. While each client\u2019s treatment plan is different, our caring clinical team members are adept at facilitating a wide array of addiction treatment modalities.",
    website: "https://www.pathwaysrecoverycenters.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/75499744-c4c1-4074-9717-4c607c3fa49d/IMG_4954.jpeg",
    logoAlt: "Pathways Recovery Centers logo with a stylized P inside a circle",
    accent: "from-deep-navy to-powder-blue",
  },
  {
    id: "robs-ranch",
    name: "Rob\u2019s Ranch",
    tier: "community",
    description:
      "The Rob\u2019s Ranch Addiction Treatment Program focuses on the time-tested, proven model of the 12 steps of Alcoholics Anonymous. Our treatment program provides our men the best care available in the addiction recovery community. Our curriculum offers a full spectrum of teaching, counseling, and life-building methods.",
    website: "http://www.robsranch.org/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/db74db7e-a54d-4a43-b481-a2a04ede8cfa/RR+Logo+web1.jpg",
    logoAlt: "Rob's Ranch logo with intertwined stylized letters R and R",
    accent: "from-sky-blue to-mist",
  },
  {
    id: "recovery-beach",
    name: "Recovery Beach",
    tier: "community",
    description:
      "Recovery Beach in Garden Grove, California, is a trusted addiction treatment center offering detox, residential, and outpatient services. With a focus on personalized care, they address both substance use and co-occurring mental health disorders using evidence-based and holistic therapies.",
    website: "https://recoverybeach.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/93a803af-0a79-4639-9523-4a6b7681c977/RecoveryBeach.jpg",
    logoAlt: "Recovery Beach logo with a sun, wave, and the words Recovery Beach",
    accent: "from-tfrf-blue to-sky-blue",
  },
  {
    id: "hart-recovery",
    name: "Hart Recovery",
    tier: "community",
    description:
      "At Hart Recovery for Women, we lead with the heart. Located in Tulsa Oklahoma, Hart Recovery is a sober living home for women seeking true transformation in early sobriety. Our mission is to provide a safe, structured, and nurturing environment where women feel seen and supported as they rebuild their lives.",
    website: "https://www.hartrecovery.org/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/6c6493ad-724c-46c6-8fc3-2d3668e0f335/HartRecovery.jpg",
    logoAlt: "Hart Recovery text in pink cursive font",
    accent: "from-powder-blue to-sky-blue",
  },
  {
    id: "apex-recovery",
    name: "Apex Recovery",
    tier: "community",
    description:
      "Apex Recovery is one of the few rehab centers in Tennessee that offers accredited care for five levels of substance use treatment programs, from detox to outpatient and aftercare. Apex Recovery\u2019s clinical addiction program is built around evidence-based treatment practices designed to give the individuals in our care the tools they need for genuine, long-term recovery.",
    website: "https://apex.rehab/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/52d998b4-bfa0-4268-909a-dcf84e20a809/Apex.jpg",
    logoAlt: "Apex Recovery logo with bold black text",
    accent: "from-deep-navy to-tfrf-blue",
  },
  {
    id: "tunnel-vision",
    name: "Tunnel Vision Recovery",
    tier: "community",
    description:
      "Our Mission is to treat individuals with substance use disorders by treating the underlying issues that contribute to substance use. We aim to assist in the healing and re-integration of all persons served by providing quality care from trained professionals.",
    website: "https://tunnelvisionrecovery.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/b48d6be4-4dd8-4c28-9d01-48f7b5e44ebe/TunnelVision.png",
    logoAlt: "Tunnel Vision Recovery logo with a spiral design on light blue background",
    accent: "from-sky-blue to-tfrf-blue",
  },
  {
    id: "clear-path",
    name: "Clear Path Intervention",
    tier: "community",
    description:
      "Turn to the professional and compassionate team at Clear Path Interventions. We will build a team within the family and formulate a plan to approach the individual struggling with love and respect. We support the team throughout the process and afterward to create a long-term recovery plan for the individual and the family. Contact Clear Path Interventions today to learn more about how we can help.",
    website: "https://clearpathintervention.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/800be128-4e6a-43d9-894d-c6a9980a3e71/clearpath.png",
    logoAlt: "Clear Path Intervention logo with a stylized compass rose",
    accent: "from-tfrf-blue to-powder-blue",
  },
  {
    id: "alliance-housing",
    name: "Alliance Housing",
    tier: "community",
    description:
      "Since 2019, we have committed ourselves to creating not just a safe and supportive environment for men on their recovery journey, but also to offering each individual a life-changing opportunity. Our long term faith based work facility focuses on empowering individuals using a practical approach that includes a combination of spiritual support and personal development.",
    website: "https://www.alliancehousingllc.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/8997f2f5-ca29-4086-912b-375997b23070/alliance-logo_orig.jpg",
    logoAlt: "Alliance Housing logo with globe graphic",
    accent: "from-powder-blue to-mist",
  },
  {
    id: "carepossible",
    name: "CarePossible",
    tier: "community",
    description:
      "The vision of CarePossible is to make mental health and addiction care possible for veterans, military families, and low-income families. Our desire is to save lives and save families by offering free, professional care to those in need. Addiction, suicide, PTSD and overdose rates are incredibly high. Our mission is to reduce these numbers by making care possible for anyone in need but lacking resources.",
    website: "https://carepossible.org/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/85e6815b-50bb-4b03-b28e-cf5a67d7a426/Care-Possible+logo.png",
    logoAlt: "CarePossible logo",
    accent: "from-tfrf-blue to-deep-navy",
  },
  {
    id: "dr-randy",
    name: "Dr. Randy Moraitis",
    tier: "community",
    description:
      "Randy Moraitis is a Certified Intervention Professional, Board Certified Pastoral Counselor, Certified Professional Coach and Certified Recovery Coach. He has helped thousands of individuals and families with mental health, addiction and wellness issues for over 20 years. His clients include therapists, physicians, dentists, attorneys, CEOs, and people from all walks of life.",
    website: "https://www.randymoraitis.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/9163c903-2f90-4597-98f4-1c9f290b164d/Dr.+Randy+logo.png",
    logoAlt: "Dr. Randy Moraitis logo with RM initials",
    accent: "from-deep-navy to-sky-blue",
  },
  {
    id: "plugged-in",
    name: "Plugged In Recovery",
    tier: "community",
    description:
      "Plugged In Recovery offers a safe, supportive environment to heal from substance abuse and build a sober future. Our luxury facilities in Scottsdale and Chandler combine evidence-based care with modern amenities, designed for your comfort, privacy, and long-term success.",
    website: "https://pluggedinrecovery.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/155a9f30-91a6-49e2-b556-ed27bed7c002/PIR_logo.png",
    logoAlt: "Plugged In Recovery logo",
    accent: "from-sky-blue to-powder-blue",
  },
  {
    id: "into-action",
    name: "Into Action Recovery Centers",
    tier: "community",
    description:
      "Help is available for anyone struggling. Change is possible and recovery is the outcome. Our rehabilitation programs help families and individuals who have been living with addiction or mental health disorders feel alive again.",
    website: "https://www.intoactionrecovery.com/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/ed71b896-d462-421a-8032-3121e09947cd/IMG_7586.png",
    logoAlt: "Into Action Recovery Centers logo with stylized letter A",
    accent: "from-tfrf-blue to-mist",
  },
  {
    id: "change-brain",
    name: "Change Your Brain Foundation",
    tier: "community",
    description:
      "The Change Your Brain Foundation is on a mission to transform the way we understand mental health by leading a revolution in brain health. We believe that by looking at the brain, we can change lives. Through advanced brain imaging and innovative treatment approaches, we are unlocking new pathways to healing and hope.",
    website: "https://www.changeyourbrain.org/",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/20c7dc74-41d8-4090-922c-938e687405f0/CYBF+logo+cmyk+%281%29+%281%29+copy.png",
    logoAlt: "Change Your Brain Foundation logo with a blue brain and interconnected lines",
    accent: "from-powder-blue to-sky-blue",
  },
  {
    id: "finding-hope",
    name: "Finding Hope",
    tier: "community",
    description:
      "Just like addicts, loved-ones need: community, education and encouragement. Through our meetings, you\u2019ll find education, inspiration, and a community of other loved ones who\u2019ve been impacted by addiction. Each week, you will have the opportunity to learn more about addiction, find tools to help those you love, and discover hope to help yourself as you journey down this road to recovery.",
    website: "https://www.hopeisalive.net/finding-hope",
    logo: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/09e438f1-c20b-4519-ba45-53dc4f00f5b0/Finding+Hope+.png",
    logoAlt: "Finding Hope logo with blue background",
    accent: "from-sky-blue to-tfrf-blue",
  },
];

export const resources: ResourceLink[] = [
  {
    id: "drugabuse",
    label: "DRUGABUSE.GOV",
    url: "https://drugabuse.gov",
    description: "National Institute on Drug Abuse \u2014 research, education, and treatment resources.",
  },
  {
    id: "drugfree",
    label: "DRUGFREE.ORG",
    url: "https://drugfree.org",
    description: "Partnership to End Addiction \u2014 tools and support for families.",
  },
  {
    id: "samhsa",
    label: "SAMHSA.GOV",
    url: "https://samhsa.gov",
    description: "Substance Abuse and Mental Health Services Administration \u2014 national helpline and treatment locator.",
  },
  {
    id: "niaaa",
    label: "NIAAA.NIH.GOV",
    url: "https://niaaa.nih.gov",
    description: "National Institute on Alcohol Abuse and Alcoholism \u2014 research and resources.",
  },
  {
    id: "healthchildren",
    label: "HEALTHCHILDREN.ORG",
    url: "https://healthychildren.org",
    description: "American Academy of Pediatrics \u2014 information for parents on child health and substance use.",
  },
  {
    id: "cdc",
    label: "CDC.ORG",
    url: "https://cdc.gov",
    description: "Centers for Disease Control and Prevention \u2014 data, statistics, and prevention strategies.",
  },
];

export const tierBadge = {
  platinum: {
    label: "Platinum Partner",
    bg: "bg-tfrf-blue",
    text: "text-pure-white",
  },
  silver: {
    label: "Silver Partner",
    bg: "bg-slate",
    text: "text-pure-white",
  },
  community: {
    label: "Community Champion",
    bg: "bg-mist",
    text: "text-deep-navy",
  },
};