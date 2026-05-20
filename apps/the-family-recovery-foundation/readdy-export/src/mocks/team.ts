export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string[];
  category: "board" | "staff" | "advisory";
}

export const boardMembers: TeamMember[] = [
  {
    id: "paul-alexander",
    name: "Paul Alexander",
    title: "Founder",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/559ef2a0-4812-436b-9001-9650810c3f00/Paul-Alexander%402x.jpg",
    bio: ["Coming Soon…"],
    category: "board",
  },
  {
    id: "devon-wayt",
    name: "Devon Wayt",
    title: "Vice President",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/0ee7c3e9-014c-4f9f-ad08-42b4e507861a/devonwayt.jpeg",
    bio: ["Coming Soon…"],
    category: "board",
  },
  {
    id: "andrew-engbring",
    name: "Andrew Engbring",
    title: "CEO & Founder Reflection Family Interventions",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/8c6214bc-0191-45b1-8819-b4b39ea79b67/2613094827890475667.jpg",
    bio: [
      "Andrew's journey into recovery advocacy began with personal family experiences that ignited his passion for transformative change. In 2013, he launched his career managing a sober living home for young men in early recovery in Encinitas, California. Over the years, he advanced through roles as Housing Director, Director of Admissions, Program Director, Business Development Director, and CEO of a large scale operation—gaining invaluable insights into the recovery process and the importance of comprehensive support.",
      "Recognizing a critical gap in traditional intervention models—methods that focus solely on treatment without equipping families with the tools for healing—Andrew resigned from executive leadership and co-founded Reflection Family Interventions with his wife. This family-owned organization is built on decades of professional experience and deep personal commitment, emphasizing that families are central to successful recovery through compassionate guidance, education, and ongoing support.",
      "An Eagle Scout, Andrew's background reflects a lifelong commitment to leadership and service. Trained in intervention, psychology, and family systems, he remains steadfast in guiding families toward profound transformation. Outside of his work, he finds balance in nature through camping and hiking and cherishes time with his wife, daughter, and dogs.",
    ],
    category: "board",
  },
  {
    id: "ilana-zivkovich",
    name: "Ilana Zivkovich",
    title: "Founder and CEO of Werq",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/229f94ff-a206-4720-b27b-7270275b6348/IMG_4899.jpg",
    bio: [
      "Ilana is the Founder and CEO of Werq, an executive coaching and management consulting firm serving CEO's and their teams from around the world. An experienced executive leader and a Certified Executive Coach, Ilana specializes in coaching and advising CEO's from SMBs to multi-billion dollar publicly traded enterprises on strategy formulation, organizational design, performance optimization, team performance, and cultural transformation. A lifelong student of \"what makes people and organizations tick,\" Ilana is an enthusiastic change agent with a strong background in behavioral health who believes in embracing challenges in pursuit of growth. Prior to founding Werq, Ilana served as a C-Suite leader of premier behavioral healthcare organizations serving addicts and their families from around the world. Ilana is an LCSW and holds a Master's degree in Social Work. She is a proud contributing member to WPO (Women's Presidents Organization) - an invite-only membership group for female presidents of multi-milliion dollar organizations. She serves on the Board of VentureLab, a non-profit dedicated to expanding youth entrepreneurship around the globe. She spends her free time adoring her young children and enjoying living in the vibrant city of Austin, TX.",
    ],
    category: "board",
  },
  {
    id: "mike-early",
    name: "Mike S. Early, CSAC-WI",
    title: "",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/687f322a-8d61-49ab-9d19-1d6b2b7a902a/IMG_4907.jpg",
    bio: [
      "Mike S. Early, CSAC-WI, (retired) has devoted over 50 years to the field of addiction treatment and recovery, pioneering program development, evaluation, and strategic leadership. He has held senior roles at leading organizations including the Hazelden Foundation—where he re-engineered key departments such as Admissions and Continuing Care—and Caron Treatment Centers, where he served as EVP/Chief Clinical Officer, overseeing specialized programs for professionals, chronic pain, and relapse prevention.",
      "Mike has also provided executive-level guidance at Northbound Treatment Services and has been instrumental in shaping long-term recovery strategies by integrating 12-Step principles across disciplines. He is currently working with The Retreat in Wayzata MN in the area of New Business Development.",
      "His influence extends to professional training and credentialing, having served as President of the WI Alcohol and Drug Counselor Certification Board and Chair of the IC&RC's Case Presentation Method Committee.",
      "Appointed to the Wisconsin State Council on Alcohol and Drug Abuse and a former board member of NAATP, Mike's leadership and advocacy have left a lasting mark on the field. His personal recovery story was featured in Moments of Clarity by Christopher Kennedy Lawford, highlighting his legacy as both a professional pioneer and an inspiring voice for lifelong recovery.",
    ],
    category: "board",
  },
];

export const staffMembers: TeamMember[] = [
  {
    id: "beth-durling",
    name: "Beth Durling, MS, CADCII, ICADC",
    title: "Executive Director",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/29bff584-e47e-4ce9-b635-25afdaeb4319/1315322828466389822.jpg",
    bio: [
      "Beth Durling is a nationally recognized clinician, educator, and consultant with over 20 years of experience in the behavioral health field. She holds a Master's degree in Psychology and is certified in addiction counseling at both the state and international levels. Her work integrates Cognitive Behavioral Therapy, Inner Child healing, family systems theory, spirituality, and trauma recovery—offering a comprehensive, clinically grounded approach to healing both the individual and the family unit.",
      "Beth is one of the founders and Executive Director of the Family Recovery Foundation, a nonprofit organization committed to ensuring no one faces addiction alone. Through weekly support groups, digital resources, and educational curriculum, the foundation provides free clinical and spiritual care to families across the country. Her national, signature program, Fix Your Family, offers accessible, evidence-based support for parents, partners, and loved ones.",
      "Beth's leadership is grounded in decades of experience working with dual-diagnosed clients and leading treatment teams nationwide. She has served as CEO, COO, and Clinical Director in renowned behavioral health settings, and previously founded The Center for Life Change, a nationally respected nonprofit treatment center.",
      "Today, alongside her nonprofit work, Beth leads The Agency, a behavioral health consulting firm specializing in executive strategy, clinical systems training, and organizational health for treatment centers nationwide. Beth lives in San Clemente, California, and is a proud mother of two incredible adult children. She remains deeply devoted to helping families heal, grow, and create generational change through recovery and love.",
    ],
    category: "staff",
  },
  {
    id: "ashley-drake",
    name: "Ashley Drake, MA",
    title: "Chief Marketing & Development Officer",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/0c377316-d53e-4098-bbc1-f32090bd669a/5030244353513498792.jpg",
    bio: [
      "Ashley's passion is to aid in the recovery process of those suffering from addiction as well as their loved ones caught in the vicious cycle.",
      "Her motivation to help others is rooted in her own recovery. In 2010, Ashley entered treatment for polysubstance use and began her recovery journey. She has been in recovery for 13 years and continues to work a 12-step program. She is dedicated to giving back to addicts, families, and communities what she has been given.",
      "Ashley earned an MA in Ministry at Carolina University, magna cum laude; a BS in Psychology at Bethel University, summa cum laude; and an Associate's degree in Sociology at Nashville State Community College, summa cum laude. She is a member of Sigma Alpha Pi, the National Honor Society of Leadership and Success.",
    ],
    category: "staff",
  },
  {
    id: "michelle-stevens",
    name: "Michelle Stevens, LVN",
    title: "One-on-One Coach",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/60a0388c-8732-4472-b0d2-97270b493e48/50B0B4F2-DCF3-4B59-8B1F-AD423CF0785F.png",
    bio: [
      "For over two decades, Michelle has advocated for the inclusion of families in the recovery journey—drawing from her experience as a psychiatric and chemical dependency nurse, a director of a women's recovery program, and the owner of a transitional home.",
      "Her understanding of recovery runs deeper than professional experience; it's woven into her personal story. Michelle has been in recovery herself for nearly 20 years. Yet it was when addiction touched the lives of her loved ones that she felt trapped in a relentless cycle—one that seemed impossible to break.",
      "Then came a turning point. Michelle walked into a 12-step support group—overwhelmed, heartbroken, and exhausted—simply saying, \"I just need to be okay, even if they aren't.\" That vulnerable moment of surrender became the catalyst for change. As she opened herself to healing, something remarkable unfolded: her personal recovery began to ripple outward, inspiring transformation within her family. What started as her search for peace grew into a shared journey of healing.",
      "Today, Michelle is deeply committed to helping families find that same hope. Guiding others through their own paths to recovery and wholeness is not just her profession—it's her honor.",
    ],
    category: "staff",
  },
  {
    id: "jay-staples",
    name: "Jay Staples",
    title: "One On One Coach",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/895cdfe0-f251-4d26-af47-db618b4b2a95/IMG_0087.jpg",
    bio: [
      "Jay Staples is a family coach and behavioral health professional with a deep passion for helping families navigate addiction, mental health challenges, and complex relational dynamics. His work is grounded not only in extensive professional experience, but in powerful lived experience. A former young athlete whose life was derailed by addiction, Jay understands firsthand how quickly identity, purpose, and direction can be lost. Sober since October 2008, he rebuilt his life through accountability, structure, and daily discipline—the same principles he now instills in the individuals and families he serves.",
      "Jay brings a long and diverse history within the behavioral health field. He has worked as an interventionist, guided families through crisis stabilization, supported treatment placement, and provided ongoing family systems coaching. His broad industry experience gives him a comprehensive understanding of both the family system and the treatment landscape. He believes that meaningful recovery requires more than treating one individual—it demands transformation of the entire family system. Through a direct yet compassionate approach, Jay partners with parents, spouses, and loved ones to strengthen communication, establish healthy boundaries, and build sustainable accountability. His work empowers families to move from chaos and reactivity to clarity, leadership, and long-term stability.",
      "Jay is especially passionate about helping families shift out of patterns and into unified, values-driven action. A proud Wisconsin native, Jay brings authenticity and relatability to his work. When he's not supporting families, you'll find him following Wisconsin sports, out on the golf course, or enjoying great comedy. Jay's mission is simple: to help families rebuild trust, reclaim stability, and create lasting recovery—for everyone involved.",
    ],
    category: "staff",
  },
  {
    id: "kelsey-gearhart",
    name: "Kelsey Gearhart",
    title: "Advisory Board",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/ba0ffcbb-4334-4455-bf18-58e6eccc48fa/Credentials+%3F.jpg",
    bio: [
      "Kelsey Gearhart is a dedicated recovery professional, interventionist, and sober companion with over a decade of experience helping individuals reclaim their lives from addiction. As the Founder & Director of Hart Recovery for Women, she has created a structured and empowering environment where women in early recovery find stability, support, and purpose.",
      "As a Certified Intervention Professional (CIP) and Recovery Specialist (CRS), Kelsey specializes in interventions, crisis support, sober companionship, and relapse prevention. She works closely with individuals and families to create tailored recovery plans that provide accountability, structure, and emotional support during life's most critical transitions.",
      "Her passion for recovery is deeply personal. At 18 years old, in her seventh treatment program, she made the life-changing decision to embrace sobriety. She received long-term treatment in Long Beach, California, where she built the foundation for lasting recovery. Since April 30, 2014, she has remained sober and committed to using her lived experience to help others navigate their own journeys toward healing.",
    ],
    category: "advisory",
  },
  {
    id: "dana-bowden",
    name: "Dana Bowden, BSW",
    title: "Advisory Board",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/46876faf-f2b1-4ada-9b21-485507d49c6f/DanaBowden.jpg",
    bio: [
      "Dana Bowden, BSW has over 20 years of experience working with children and families impacted by substance use, mental health challenges, and crisis situations. She began her career in Child Protective Services, where she developed a deep understanding of family systems under stress, before transitioning into substance use and mental health work with adults.",
      "Dana's passion for crisis intervention and restoration is deeply personal—rooted in her own recovery journey and transformative encounter with Christ. Her calling to support women and their children is evident in every aspect of her work, as she consistently brings compassion, wisdom, and hope to those navigating their most difficult seasons.",
    ],
    category: "advisory",
  },
  {
    id: "myra-wood",
    name: "Myra Wood",
    title: "Advisory Board",
    image: "https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/b6e758e6-d3da-4f7b-8bec-f656b263e675/MyraWood.jpg",
    bio: ["Coming Soon…"],
    category: "advisory",
  },
];