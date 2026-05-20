/**
 * Upload "Copy of Addiction Interventions 2 of 2.docx" as draft blog post.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(appRoot, ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase env in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const TITLE =
  "Why Private Residential Treatment Helps After an Eating Disorder Intervention";

const H2_HEADINGS = [
  "Leaving Daily Stress Behind",
  "Privacy Encourages Honesty",
  "Medical Support Matters",
  "Interventions Change Families",
  "Comfort Can Improve Engagement",
];

const BODY_BY_SECTION = {
  intro: `When someone agrees to treatment after an intervention, emotions tend to move in every direction at once. Relief mixes with fear. Family members may feel hopeful for the first time in months, while the person entering care often feels overwhelmed by the speed of everything happening around them. That moment matters more than people realize. The hours and days immediately following an intervention can shape whether treatment feels safe and supportive or forced and chaotic.

A private residential program can create the kind of environment that helps someone settle emotionally and physically before deeper treatment begins. While no facility can magically fix years of pain, stress, trauma, or unhealthy coping patterns overnight, the right setting can remove distractions and provide structure that makes recovery more realistic. For many families, luxury care is not about pampering. It is about privacy, comfort, medical support, and having enough space to breathe during one of the hardest periods of a person's life.`,
  "Leaving Daily Stress Behind": `One of the biggest challenges after an intervention is separation from familiar routines. Even routines that contribute to unhealthy behaviors can feel emotionally safe because they are predictable. Returning home too soon after agreeing to treatment can place someone directly back into the same stressors, relationship dynamics, or environmental triggers that helped fuel the problem in the first place.

That is one reason residential care often works well during the early stages of recovery. A structured environment reduces decision fatigue and creates consistency around meals, therapy, sleep, and medical monitoring. Instead of trying to balance work obligations, social pressure, family conflict, and recovery all at once, the focus narrows to stabilization and healing.

In many cases, luxury mental health facilities in California, the Pacific Northwest or Hawaii can get you away from your triggers and in idyllic locations conducive to true and lasting healing. The setting itself cannot do the emotional work for someone, but it can lower stress levels enough for therapy and treatment to become more effective. A calm ocean view, wooded trails, or peaceful outdoor spaces may sound superficial to some people until they experience how exhausting emotional hypervigilance can become in a chaotic environment.`,
  "Privacy Encourages Honesty": `Shame keeps many people from seeking help for eating disorders. Some avoid treatment because they fear judgment from coworkers, extended family, classmates, or even close friends. Others minimize what they are going through because admitting the severity feels frightening or embarrassing. That secrecy can continue long after an intervention if the treatment setting feels exposed or uncomfortable.

Private residential care tends to offer more discretion than standard outpatient programs. Smaller client populations, confidential settings, and individualized treatment plans can help people feel safer discussing behaviors they may have hidden for years. That matters because recovery usually requires honesty before progress becomes possible.

Many luxury programs also provide individualized therapy schedules alongside group work. Some people benefit from group connection immediately, while others need time before they feel emotionally ready to open up in front of strangers. Flexibility allows clinicians to meet someone where they are instead of forcing a one size fits all model.

Families often underestimate how emotionally exhausting treatment can feel during the first week or two. Privacy can reduce sensory overload and help people remain engaged rather than shutting down completely.`,
  "Medical Support Matters": `Eating disorders affect far more than appearance or eating habits. They can impact cardiovascular health, digestion, hormones, electrolyte balance, cognitive functioning, sleep quality, and emotional regulation. Some people entering treatment may also struggle with anxiety, depression, trauma, obsessive thoughts, or substance use at the same time.

That is why medical supervision should never become an afterthought. Residential treatment provides monitoring that families simply cannot replicate at home, even with the best intentions. Nutritional rehabilitation and stabilization often require trained professionals who understand how quickly physical complications can escalate.

Luxury treatment centers sometimes have access to broader clinical teams and lower staff to patient ratios, which may allow for more individualized attention. That does not automatically make every high end program better than every standard facility, but resources can affect the overall treatment experience.

People recovering from eating disorders often feel emotionally fragile after an intervention. Physical exhaustion can intensify emotional distress, making therapeutic support even more important. A setting that combines psychiatric care, nutrition support, therapy, and medical oversight in one location may reduce gaps in treatment during a vulnerable period.`,
  "Interventions Change Families": `Interventions rarely affect only one person. Families enter recovery too, whether they expect to or not. Resentment, fear, guilt, enabling behaviors, communication problems, and emotional burnout often exist long before the intervention itself takes place.

That is why strong programs involve loved ones throughout treatment. Family therapy sessions, educational workshops, and structured communication plans can help rebuild trust and reduce unhealthy dynamics that may unintentionally contribute to relapse risk.

Effective mental health interventions usually continue long after the initial conversation that convinces someone to seek treatment. Recovery requires ongoing support, clearer boundaries, and healthier communication patterns from everyone involved. Otherwise, people can leave residential care only to reenter the exact emotional environment that made progress difficult before treatment began.

Families sometimes expect dramatic improvement within a few weeks because the intervention itself felt emotionally intense and transformative. In reality, recovery tends to move unevenly. There may be resistance, setbacks, emotional withdrawal, or periods where motivation fluctuates. That does not mean treatment failed. It means healing is rarely linear.`,
  "Comfort Can Improve Engagement": `People sometimes hear the phrase "luxury treatment" and immediately picture spa robes and expensive furniture. While upscale amenities exist at many facilities, comfort can serve a deeper purpose when used appropriately.

A person who feels physically safe may participate more openly in therapy. Better sleep, nutritious meals, calming surroundings, and reduced environmental stress can improve emotional regulation during treatment. For someone arriving emotionally depleted after months or years of struggle, basic comfort may increase the likelihood that they stay engaged rather than leaving prematurely.

That does not mean expensive treatment guarantees better outcomes. Some excellent programs operate without luxury branding, and some costly facilities fail to provide meaningful clinical care. Families should evaluate staff credentials, medical services, therapy approaches, aftercare planning, and specialization in eating disorder treatment before making decisions.

Still, for people who have the financial ability to choose private residential care, the added privacy and supportive environment may help create emotional stability during a difficult transition period.

After an intervention, momentum matters. The transition into treatment can either reinforce hope or deepen fear and resistance. Private residential care gives many people the opportunity to step away from daily pressures, receive medical and emotional support, and begin recovery in a setting designed for stabilization and healing. The surroundings alone will never do the work, but the right environment can make it easier for someone to finally start.`,
};

const INLINE_IMAGE_AFTER_H2 = "Leaving Daily Stress Behind";

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
    .replace(/-+$/, "");
}

function paragraphsToSections(text) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({ type: "paragraph", text: p }));
}

function buildContent(inlineImage) {
  const sections = paragraphsToSections(BODY_BY_SECTION.intro);
  for (const heading of H2_HEADINGS) {
    sections.push({ type: "h2", text: heading });
    sections.push(...paragraphsToSections(BODY_BY_SECTION[heading]));
    if (heading === INLINE_IMAGE_AFTER_H2 && inlineImage) {
      sections.push({
        type: "image",
        text: inlineImage.url,
        alt: inlineImage.alt,
      });
    }
  }
  return sections;
}

const slug = slugify(TITLE);
const excerpt =
  "After an eating disorder intervention, private residential treatment can offer privacy, medical support, and distance from daily triggers. What families should know about luxury care, family involvement, and early recovery.";

const wordCount = Object.values(BODY_BY_SECTION).join(" ").split(/\s+/).length;
const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

async function uploadFile(storagePath, localPath, contentType) {
  const body = fs.readFileSync(localPath);
  const { error } = await supabase.storage.from("site-assets").upload(storagePath, body, {
    contentType,
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) throw new Error(`Upload failed (${storagePath}): ${error.message}`);
  return `${supabaseUrl}/storage/v1/object/public/site-assets/${storagePath}`;
}

async function main() {
  const heroLocal =
    process.env.HERO_IMAGE ||
    "/Users/ethansweet/.cursor/projects/Users-ethansweet-Code-sweet-media-platform/assets/ai_eating-disorder-residential_hero01.jpg";
  const inlineLocal =
    process.env.INLINE_IMAGE || "/tmp/ai-blog-2-doc-image1.png";

  const [heroUrl, inlineUrl] = await Promise.all([
    uploadFile("images/blog/ai_eating-disorder-residential_hero01.jpg", heroLocal, "image/jpeg"),
    uploadFile("images/blog/ai_eating-disorder-residential_inline01.png", inlineLocal, "image/png"),
  ]);

  const content = buildContent({
    url: inlineUrl,
    alt: "Peaceful private residential mental health treatment setting after an eating disorder intervention",
  });

  const row = {
    title: TITLE,
    slug,
    excerpt,
    content: JSON.stringify(content),
    status: "draft",
    category: "Mental Health",
    author: "Addiction Interventions",
    author_title: "Editorial Team",
    author_bio:
      "Helpful educational resources from Addiction Interventions for families navigating intervention and treatment.",
    tags: ["eating disorders", "residential treatment", "intervention", "family support"],
    hero_image_url: heroUrl,
    read_time: readTime,
    meta_title: `${TITLE} | Addiction Interventions`,
    meta_description: excerpt.slice(0, 160),
    focus_keyword: "eating disorder intervention residential treatment",
    featured: false,
    approved_for_publish: false,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  const result = existing?.id
    ? await supabase.from("blog_posts").update(row).eq("id", existing.id).select("id,slug,status").single()
    : await supabase.from("blog_posts").insert(row).select("id,slug,status").single();

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        ...result.data,
        heroUrl,
        inlineUrl,
        previewPath: `/blog/${slug}?preview=admin`,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
