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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_c7cbbac1_Screenshot_2024-11-21_at_6_32_01_AM.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_3f8724c4_Screenshot_2024-11-21_at_6_35_15_AM.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_22eaa6a4_Restore.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_77c34f78_Trauma.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_d59842eb_Purpose.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_a91f6b1a_Canyon.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_f2380a3d_TheRetreat.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_006d3169_Reflections.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_75499744_IMG_4954.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_db74db7e_RR_Logo_web1.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_93a803af_RecoveryBeach.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_6c6493ad_HartRecovery.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_52d998b4_Apex.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_b48d6be4_TunnelVision.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_800be128_clearpath.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_8997f2f5_alliance-logo_orig.jpg",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_85e6815b_Care-Possible_logo.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_9163c903_Dr_Randy_logo.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_155a9f30_PIR_logo.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_ed71b896_IMG_7586.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_20c7dc74_CYBF_logo_cmyk_1_1_copy.png",
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
    logo: "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_09e438f1_Finding_Hope_.png",
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