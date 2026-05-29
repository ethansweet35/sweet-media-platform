const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

export type TeamGroup = "leadership" | "administration" | "clinical" | "wellness";

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  img: string;
  bio: string;
  group: TeamGroup;
};

function img(slug: string, ext: "png" | "jpg" | "webp" = "png") {
  return `${SUPABASE}/mbh_team_${slug}.${ext}`;
}

/**
 * Full staff roster — order matches missouribehavioralhealth.com/about-us.
 * Bios and titles are copied verbatim from the live About Us page.
 * Jake Martin has no bio on the live site, so his bio is intentionally empty.
 */
export const MBH_TEAM: TeamMember[] = [
  {
    slug: "james",
    name: "James Voaklander",
    title: "CEO & Founder",
    img: img("james", "png"),
    group: "leadership",
    bio: "James Voaklander is the Founder and CEO of Missouri Behavioral Health, bringing over 20 years of leadership experience in healthcare, maritime, business development and consulting. Throughout his career, he has been driven by a passion for building high-performing teams, solving complex challenges, and creating systems that deliver meaningful impact. James has partnered with nationally recognized healthcare organizations to develop scalable, patient-centered solutions that enhance access to care and improve operational efficiency. His leadership is grounded in strategic vision, hands-on execution, and an unwavering commitment to those being served. At Missouri Behavioral Health, James's mission is to expand access to high-quality, person-centered mental health and substance use treatment across the state. Under his guidance, the organization delivers evidence-based, outcome-driven services—both in-person and virtually—tailored to meet the evolving needs of individuals and families throughout Missouri.",
  },
  {
    slug: "daniel",
    name: "Daniel Hart",
    title: "Executive Director",
    img: img("daniel", "png"),
    group: "leadership",
    bio: "Daniel Hart, CRADC, LCDC, has been working in treatment for mental health and substance use since 2013. He is known for his personable approach and ability to create positive impact with those he serves.",
  },
  {
    slug: "jen",
    name: "Jen Ramsden",
    title: "Chief Marketing Officer",
    /** Staff-only asset — do not reuse `mbh_gallery_02.jpg` as facility imagery elsewhere */
    img: img("jen", "png"),
    group: "administration",
    bio: "Jen assists with marketing and outreach efforts at Missouri Behavioral Health and has a decade of working experience in the behavioral health field. As someone that has benefitted from her own treatment experience, Jen feels privileged to be a part of Missouri Behavioral Health and loves to see the positive change that can occur in such a setting. She uses her professional experience and ongoing training in the substance abuse and mental health space to supplement her studies at the University of Miami to help those struggling in any way possible. Jen understands and has experienced the benefits of outpatient care and enjoys working alongside other aligned professionals to create a program truly tailored towards each client experience. She believes that if people are given a safe environment paired with compassionate and talented behavioral health professionals, they can ultimately design the life they deserve for themselves.",
  },
  {
    slug: "karynne",
    name: "Karynne Witkin",
    title: "Chief Human Resource Officer",
    img: img("karynne", "png"),
    group: "administration",
    bio: "Karynne Witkin is a scientist-practitioner with over eight years of industry experience and a strong commitment to fostering healthy, resilient workplaces. Holding a master's in Industrial-Organizational Psychology and being a trained leadership coach, Karynne is passionate about employee well-being and the prevention of substance use and mental health disorders in the workplace. Through her ongoing studies and fieldwork, Karynne integrates research-driven insights with practical solutions, leading organizations with purpose, innovation, and excellence. Her research, program design, and leadership work are dedicated to shaping the future of work by promoting mental wellness, resilience, and fulfillment in the workplace.",
  },
  {
    slug: "andrew",
    name: "Andrew Shaffer",
    title: "Admissions Coordinator",
    img: img("andrew", "png"),
    group: "administration",
    bio: "As the Admissions Coordinator at Missouri Behavioral Health, I bring over five years of experience in the treatment field, helping individuals and families navigate the first steps toward recovery. I am passionate about creating a welcoming and supportive environment for those seeking help, understanding that reaching out can often be the hardest part of the journey. Outside of work, I enjoy racing BMX bikes and traveling with my family, embracing the same balance and perseverance I encourage in others.",
  },
  {
    slug: "jake-whitcomb",
    name: "Jake Whitcomb",
    title: "Program Coordinator",
    img: img("jake-whitcomb", "jpg"),
    group: "administration",
    bio: "Jake Whitcomb has been working in case management since 2020 as a Certified Peer Support Specialist. As someone in long-term recovery, Jake brings a unique blend of personal insight and professional experience to the work. Passionate about the recovery journey, Jake aims to show others that it isn't a veil of tears—it can be a life full of joy, connection, and purpose.",
  },
  {
    slug: "shawn",
    name: "Dr. Shawn Stranckmeyer",
    title: "Medical Director",
    img: img("shawn", "png"),
    group: "leadership",
    bio: "Dr. Shawn Stranckmeyer is a double board-certified physician in Family Medicine and Addiction Medicine with over a decade of experience. He currently serves as medical director for several clinics across the region and holds active licenses in multiple states. His work focuses on behavioral health, substance use recovery, and integrated approaches to mental and physical wellness. Dr. Stranckmeyer is passionate about helping patients achieve long-term stability, resilience, and improved quality of life through evidence-based care and compassionate support.",
  },
  {
    slug: "stephanie",
    name: "Stephanie Behrens",
    title: "Clinical Director",
    img: img("stephanie", "png"),
    group: "leadership",
    bio: "Stephanie Behrens is a Licensed Professional Counselor, who earned her Masters in Clinical Psychology at Pepperdine University. She received her Bachelor's degree in Psychology from the University of California, Santa Barbara. Stephanie has been working in the treatment industry since 2014 with extensive experience as a Clinical Director. She also enjoys working as a therapist and specializes in substance abuse, complex trauma, co-dependency, and anxiety/depressive disorders. Stephanie also has an interest in animal-assisted psychotherapy where she and her dog are certified as an official therapy dog team. When she is not working, she enjoys spending time with family, friends and her Golden Retriever. CERTIFICATE/LICENSE NO. 2026001323",
  },
  {
    slug: "darla",
    name: "Darla Evans",
    title: "LPC and Trauma Therapist",
    img: img("darla", "jpg"),
    group: "clinical",
    bio: "Darla Evans is a Licensed Professional Counselor LPC and trauma therapist. She has worked in the field for the past 15 years. The therapies she subscribes to are: Eye Movement Desensitization Reprocessing (EMDR), Ego State, Somatic, and Attachment. She is also fluent in American Sign Language (ASL).",
  },
  {
    slug: "mary",
    name: "Mary DeMoss",
    title: "PLPC",
    img: img("mary", "jpg"),
    group: "clinical",
    bio: "Mary DeMoss has been a counselor for 16 years and is currently a PLPC. Her evidence-based therapeutic approaches include EMDR, EFT Tapping, Psychotherapy, CBT and Art therapy. Mary has a passion for helping, encouraging, validating and supporting others through this journey we call life.",
  },
  {
    slug: "bri",
    name: "Bri Beasley",
    title: "Therapist",
    img: img("bri", "jpg"),
    group: "clinical",
    bio: "I am a Licensed Clinical Social Worker (LCSW) and have been providing counseling services for the past 5 years. I prefer to utilize a variety of methods, but favor CBT, DBT, and solution focused. I have a passion for group facilitation and helping clients feel connected while healing their mental health.",
  },
  {
    slug: "jake-martin",
    name: "Jake Martin",
    title: "Meditation Instructor",
    img: img("jake-martin", "jpg"),
    group: "wellness",
    bio: "",
  },
  {
    slug: "brent",
    name: "Brent Gilstrap",
    title: "LPC",
    img: img("brent", "png"),
    group: "clinical",
    bio: "Brent has been an LPC for 25 years. Identifying and supporting greatness in others is what he values. Personal success is measured by his contribution to the success of others. He believes he can accomplish more together than we can individually.",
  },
  {
    slug: "morgan",
    name: "Morgan Geier",
    title: "LPC",
    img: img("morgan", "png"),
    group: "clinical",
    bio: "Morgan Geier is a Licensed Professional Counselor (LPC) with over five years of experience supporting clients through a compassionate, trauma-informed lens. She specializes in helping teens, children and young adults heal from trauma and relationship challenges using attachment-based approaches, Eye Movement Desensitization and Reprocessing (EMDR), and mindfulness practices. Morgan believes in creating a safe, collaborative space where clients can build self-awareness, strengthen emotional resilience, and foster healthier connections with themselves and others.",
  },
  {
    slug: "philip",
    name: "Philip Immekus",
    title: "Yoga Instructor",
    img: img("philip", "png"),
    group: "wellness",
    bio: "My name is Philip Immekus. My journey with yoga began in 2021 while I was in addiction rehabilitation. What started as a light introduction became a steady source of peace during a time filled with anxiety, depression, and uncertainty. Through surrender to a higher power and consistent practice—first online, then in local studios—I discovered how deeply yoga supports mental, spiritual, and physical healing. It has helped me become less reactive, more grounded, and more connected to the person I'm meant to be. I'm grateful to be part of Missouri Behavioral Health, where I can use my experience to support others on their own paths. Consider me your instructor, ally, and friend. I look forward to growing with this community.",
  },
  {
    slug: "alex",
    name: "Alex Seaton",
    title: "Recovery Care Advocate",
    img: img("alex", "jpg"),
    group: "wellness",
    bio: "My name is Alex Seaton. My own experience with addiction and recovery has driven me to want to pursue a career in treatment in many ways. I aim to be a living example of the miracles that recovery brings and show others that the grass is greener on the other side. I pride myself in being able to relate and empathize with others struggling with mental health and/or addiction and using my own experience, strength, and hope to guide others.",
  },
  {
    slug: "emily",
    name: "Emily Journagan",
    title: "Provisionally Licensed Professional Counselor",
    img: img("emily", "png"),
    group: "clinical",
    bio: "Emily Journagan is a Provisionally Licensed Professional Counselor (PLPC) who has been working in the behavioral health field for over 15 years. Emily integrates evidence-based practices including Cognitive Behavioral Therapy (CBT), Dialectical Behavioral Therapy (DBT), trauma-informed care, and solution-focused techniques. Her approach is holistic, addressing not only the immediate symptoms but also the underlying issues that contribute to our struggles.",
  },
  {
    slug: "monica",
    name: "Monica Loden",
    title: "Psychiatric Mental Health Nurse Practitioner",
    img: img("monica", "png"),
    group: "clinical",
    bio: "With over 30 years of healthcare experience, I founded Hope Mental Wellness LLC to provide a sanctuary where adults are treated with the dignity and individualized focus they deserve. As a Board-Certified PMHNP, I specialize in complex psychiatric evaluations and substance use treatment, blending evidence-based medicine with dedicated patient advocacy. My approach focuses on building your resilience and creating a meaningful impact through care that is both comprehensive and deeply respectful of your unique journey. Licensed in Missouri, Maryland, and Washington, I am committed to helping you reclaim your wellness through expert, compassionate support.",
  },
  {
    slug: "brooklynn",
    name: "Brooklynn Wright",
    title: "Licensed Master Social Worker",
    img: img("brooklynn", "png"),
    group: "clinical",
    bio: "Hi, I'm Brooklynn Wright. I'm a Licensed Master Social Worker (LMSW) and have been a social worker for 2 years. I have experience working with all populations, but I enjoy being in a position where I can help someone reach their full potential and be resilient. I'm a firm believer that it takes one person to make a difference in the life of another and I want to be that person.",
  },
  {
    slug: "tina",
    name: "Tina Simmons",
    title: "Licensed Master Social Worker",
    img: img("tina", "png"),
    group: "clinical",
    bio: "I am a Licensed Master Social Worker providing trauma-informed, client-centered psychotherapy to individuals and families across the lifespan. My clinical work focuses on anxiety, depression, trauma and PTSD, mood disorders, adjustment-related concerns, and crisis intervention. I have extensive experience supporting individuals impacted by substance use disorders, domestic violence, grief and loss, and significant life transitions.",
  },
  {
    slug: "andrea",
    name: "Andrea Guadalupe Gonzales",
    title: "MS - LPC",
    img: img("andrea", "jpg"),
    group: "clinical",
    bio: "Andrea Guadalupe Gonzales, MS, LPC, is a Licensed Professional Counselor. Andrea has a background that bridges counseling, education, writing, and creative communication. Andrea's professional experiences across education, counseling, and creative work have strengthened her ability to connect with individuals from a variety of backgrounds with warmth, curiosity, and understanding.",
  },
  {
    slug: "derrick",
    name: "Derrick Flores",
    title: "Recovery Care Advocate",
    img: img("derrick", "png"),
    group: "wellness",
    bio: "Derrick has been working in the mental health field for the past year. He entered this profession because of his deep compassion for others and his desire to make a meaningful difference in the lives of people who are struggling. Derrick prides himself on being consistently available and actively listening to support the clients he serves.",
  },
  {
    slug: "crystal",
    name: "Crystal Cramer",
    title: "LPC & Mental Health Coach",
    img: img("crystal", "png"),
    group: "clinical",
    bio: "Crystal Cramer brings over 22 years of experience in the behavioral health field. As a Licensed Professional Counselor and mental health coach, her therapeutic approach integrates evidence-based practices including Cognitive Behavioral Therapy (CBT), attachment-based work, psychotherapy, play therapy, trauma-informed care, and solution-focused techniques. In addition, she is a Certified Autism Specialist, offering specialized support to individuals on the autism spectrum and their families.",
  },
  {
    slug: "kellie",
    name: "Kellie Crain",
    title: "Yoga Instructor",
    img: img("kellie", "jpg"),
    group: "wellness",
    bio: "Kellie Crain began practicing yoga in 2003 and became a certified RYT 200 (Experienced Registered Yoga Teacher) in 2007. With over 17 years of teaching experience, she has led classes in Vinyasa, Yin, Power Yoga, Corporate Yoga, Yoga for Athletes, and Yoga for Recovery. For Kellie, yoga has been a path to learning how to sit comfortably in the uncomfortable, a lesson she gently passes on through every class.",
  },
];

/** Homepage leadership preview */
export const LEADERSHIP_TEAM: TeamMember[] = MBH_TEAM.filter((m) =>
  ["james", "daniel", "shawn", "stephanie"].includes(m.slug),
);

export const TEAM_GROUP_LABELS: Record<TeamGroup, string> = {
  leadership: "Leadership",
  administration: "Administration & admissions",
  clinical: "Clinical team",
  wellness: "Recovery support & wellness",
};

export const TEAM_GROUPS: TeamGroup[] = [
  "leadership",
  "administration",
  "clinical",
  "wellness",
];
