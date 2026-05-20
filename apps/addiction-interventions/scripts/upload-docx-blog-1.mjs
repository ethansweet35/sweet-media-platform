/**
 * One-off: upload "Copy of Addiction Interventions 1 of 2.docx" as draft blog post.
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
const projectRef = process.env.SUPABASE_PROJECT_REF || "bxtwcdgjzzjxjvqdiuvn";

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase env in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const TITLE =
  "Women's Alcohol Recovery After Intervention Starts With Feeling Safe Again";

const H2_HEADINGS = [
  "The First 72 Hours",
  "Finding The Right Program",
  "Building New Habits",
  "Support After Treatment",
  "Why Women's Treatment Helps",
];

const BODY_BY_SECTION = {
  intro: `An intervention can feel like a breaking point, but for many women, it also becomes the first honest moment in a long time. Family members stop pretending everything is fine. Friends stop covering up missed responsibilities or emotional outbursts. Most importantly, the woman at the center of the conversation finally hears concern delivered with structure instead of chaos. That shift matters more than people realize.

The hours and days after an intervention are emotional. Some women feel relief because the pressure of hiding is over. Others feel angry, embarrassed, defensive, or exhausted. None of those reactions mean treatment will fail. In fact, emotional overload is common because alcohol dependence often develops alongside stress, trauma, burnout, caregiving pressure, relationship problems, or untreated mental health concerns. Recovery starts when those realities stop being minimized.

Women's only treatment programs can make that transition easier because the environment tends to remove distractions, judgment, and social pressure that many women experience in mixed settings. Healing is difficult enough already. Feeling physically and emotionally safe should not be optional.`,
  "The First 72 Hours": `The first few days after an intervention usually move fast. Transportation to treatment may happen the same day. Intake assessments begin almost immediately. Medical staff often ask detailed questions about drinking patterns, medications, physical symptoms, family history, anxiety, depression, eating habits, and sleep. It can feel invasive at first, but those conversations help treatment teams create a plan that actually fits the person instead of forcing everyone into the same approach.

Detox may also become part of the process depending on how heavily someone has been drinking. Alcohol withdrawal can be dangerous, especially for people who have been consuming large amounts regularly. Medical supervision matters because symptoms can escalate quickly. Women entering treatment are often surprised by how much physical recovery affects emotional stability. Better sleep, hydration, nutrition, and consistent routines can dramatically change how someone feels within days.

By the end of the first week, many women begin realizing treatment is not just about stopping alcohol use. It is also about understanding why alcohol became tied to stress relief, self-esteem, relationships, or emotional survival in the first place.`,
  "Finding The Right Program": `One of the biggest decisions after treatment begins involves the level of care. Some women benefit from residential treatment because they need distance from triggering environments. Others do well in outpatient programs that allow them to maintain work or parenting responsibilities while attending therapy several days a week.

This is also where specialized care becomes important. Programs designed specifically for women often address experiences that mixed-gender settings sometimes gloss over. Topics like motherhood, trauma, abusive relationships, body image, caregiving fatigue, reproductive health, and emotional manipulation frequently surface during recovery. Many women open up faster when they are surrounded by peers who understand those experiences firsthand.

For many families researching options, alcohol rehab for women becomes an important search because the treatment environment itself can influence whether someone stays engaged. A woman who feels heard is more likely to continue participating honestly in therapy, group discussions, and long-term recovery planning.

Treatment is also more effective when it avoids shame-based language. Women entering recovery are often already carrying enormous guilt. Programs that focus on accountability without humiliation usually create stronger long-term outcomes because they encourage honesty instead of fear.`,
  "Building New Habits": `One thing surprises many women after treatment begins. Recovery can feel emotionally awkward before it feels empowering. Alcohol often becomes tied to routines, social habits, conflict avoidance, or emotional regulation. Removing it leaves empty space behind.

That is why treatment programs spend so much time helping women build structure. Daily schedules, therapy appointments, movement, journaling, peer support, nutrition planning, and healthy sleep routines are not random activities. They help retrain the brain to function without relying on alcohol during stress or emotional discomfort.

Therapy also becomes more productive once the body stabilizes physically. Women frequently begin recognizing patterns they ignored for years. Some notice they used alcohol to cope with loneliness. Others realize they were constantly overwhelmed by work, caregiving, or unhealthy relationships. Some uncover unresolved trauma that had never been addressed directly.

This stage can feel emotionally raw, but it is also where real progress starts happening. The goal is not perfection. The goal is learning how to respond to life without self-destructive coping mechanisms taking over every difficult moment.`,
  "Support After Treatment": `The transition out of structured treatment deserves more attention than it usually gets. Leaving a treatment center does not magically erase stress, relationship tension, financial pressure, or emotional triggers. Recovery continues long after formal treatment ends.

That is why aftercare planning matters so much. Women often continue therapy, outpatient counseling, recovery meetings, sober living programs, or peer mentorship after completing primary treatment. Consistency matters more than intensity over time.

Families also need guidance during this stage. Loved ones may expect immediate transformation after an intervention, but recovery rarely unfolds in a perfectly straight line. Emotional rebuilding takes time. Trust takes time too. Healthy support means encouraging accountability without turning into surveillance or control.

Women who maintain recovery often build strong support systems intentionally. That may include therapy, friendships rooted in healthier habits, exercise, spiritual communities, creative outlets, or recovery groups. Isolation tends to make relapse risk worse. Connection usually strengthens recovery.`,
  "Why Women's Treatment Helps": `Women's only treatment programs are not about separating people unnecessarily. They exist because women often experience addiction differently, enter treatment later, and carry unique emotional burdens into recovery.

Many women report feeling safer discussing trauma, abuse, motherhood struggles, grief, or relationship dynamics in women-centered settings. That emotional safety can speed up honesty in therapy, which directly affects treatment progress. Women also tend to benefit from programs that understand how caregiving expectations and social pressure influence mental health and alcohol use.

There is another practical factor people rarely discuss. Women are often conditioned to prioritize everyone else before themselves. Treatment environments focused on women sometimes do a better job challenging that mindset directly. Learning to care for personal mental and physical health without guilt becomes part of recovery itself.

The intervention may be the moment that starts the process, but the treatment environment often determines whether healing continues long enough to become sustainable.

A successful intervention is not the finish line. It is the beginning of a longer process that involves physical recovery, emotional honesty, healthier relationships, and consistent support. Women's only treatment programs can provide the safety, understanding, and structure many women need during one of the hardest transitions of their lives.`,
};

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

function buildContent() {
  const sections = paragraphsToSections(BODY_BY_SECTION.intro);
  for (const heading of H2_HEADINGS) {
    sections.push({ type: "h2", text: heading });
    sections.push(...paragraphsToSections(BODY_BY_SECTION[heading]));
  }
  return sections;
}

const slug = slugify(TITLE);
const excerpt =
  "An intervention can feel like a breaking point, but for many women it also becomes the first honest moment in a long time. What happens in the first 72 hours, how to choose women's treatment, and how families support recovery after rehab.";

const wordCount = Object.values(BODY_BY_SECTION).join(" ").split(/\s+/).length;
const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

async function uploadHero() {
  const heroLocal =
    process.env.HERO_IMAGE ||
    "/Users/ethansweet/.cursor/projects/Users-ethansweet-Code-sweet-media-platform/assets/ai_womens-alcohol-recovery_hero01.jpg";
  const storagePath = `images/blog/ai_womens-alcohol-recovery_hero01.jpg`;
  const body = fs.readFileSync(heroLocal);
  const { error } = await supabase.storage.from("site-assets").upload(storagePath, body, {
    contentType: "image/jpeg",
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) throw new Error(`Hero upload failed: ${error.message}`);
  return `${supabaseUrl}/storage/v1/object/public/site-assets/${storagePath}`;
}

async function main() {
  const heroUrl = await uploadHero();
  const content = buildContent();

  const row = {
    title: TITLE,
    slug,
    excerpt,
    content: JSON.stringify(content),
    status: "draft",
    category: "Addiction & Recovery",
    author: "Addiction Interventions",
    author_title: "Editorial Team",
    author_bio:
      "Helpful educational resources from Addiction Interventions for families navigating intervention and treatment.",
    tags: ["women's recovery", "alcohol intervention", "treatment", "family support"],
    hero_image_url: heroUrl,
    read_time: readTime,
    meta_title: `${TITLE} | Addiction Interventions`,
    meta_description: excerpt.slice(0, 160),
    focus_keyword: "women's alcohol recovery after intervention",
    featured: false,
    approved_for_publish: false,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  let result;
  if (existing?.id) {
    result = await supabase.from("blog_posts").update(row).eq("id", existing.id).select("id,slug,status").single();
  } else {
    result = await supabase.from("blog_posts").insert(row).select("id,slug,status").single();
  }

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  console.log(JSON.stringify({ ...result.data, heroUrl, previewPath: `/blog/${slug}?preview=admin` }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
