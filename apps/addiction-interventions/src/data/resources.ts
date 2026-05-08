/**
 * Long-form educational resources. Each resource is a single article with
 * mixed content blocks. Rendered by the shared ResourceArticle template.
 */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title?: string; text: string };

export type ResourceConfig = {
  slug: string;
  category: string;
  heroEyebrow?: string;
  heroHeadline: string;
  heroBody: string;
  intro?: string;
  blocks: ArticleBlock[];
  recommendedServices?: string[];
  ctaTitle?: string;
  ctaBody?: string;
  seoTitle?: string;
  metaDescription?: string;
};

export const RESOURCES: ResourceConfig[] = [
  {
    slug: "how-to-plan-an-intervention-for-success",
    category: "Family Resources",
    heroEyebrow: "Family Guide",
    heroHeadline: "How to Plan an Intervention for Success",
    heroBody:
      "A practical, step-by-step guide for families preparing to confront a loved one's addiction or mental health crisis. Built on more than two decades of front-line intervention experience.",
    intro:
      "An intervention is one of the most important conversations a family will ever have. Done well, it opens the door to recovery. Done poorly, it can drive a loved one further into denial. This guide walks you through the planning process we use with every family we work with.",
    blocks: [
      { type: "heading", text: "Step 1: Decide whether an intervention is the right move" },
      {
        type: "paragraph",
        text:
          "Not every situation calls for a formal intervention. If your loved one has expressed willingness to seek help, a structured family meeting may be enough. An intervention is most appropriate when denial is entrenched, prior conversations have failed, and the situation is escalating in severity or risk.",
      },
      {
        type: "callout",
        title: "When in doubt, ask a professional.",
        text: "A free consultation with a certified interventionist can help you determine the right approach for your specific situation — without obligation.",
      },

      { type: "heading", text: "Step 2: Assemble the intervention team" },
      {
        type: "paragraph",
        text:
          "Your team should be small — typically 4 to 8 people — and made up of those who matter most to your loved one. Choose people who can stay calm under pressure and who genuinely want to help, not vent.",
      },
      {
        type: "list",
        items: [
          "A spouse or partner",
          "Adult children or parents",
          "A close sibling or two",
          "One or two trusted friends",
          "An employer or pastor (only if appropriate)",
          "A certified interventionist to lead the meeting",
        ],
      },

      { type: "heading", text: "Step 3: Choose an intervention model" },
      {
        type: "paragraph",
        text:
          "There are several evidence-based intervention models — including the Johnson Model, ARISE®, the SMART Recovery Family & Friends approach, and Systemic Family Intervention. Each one fits different situations. Your interventionist will recommend a model based on your loved one's history, the substance involved, and the readiness of the family.",
      },

      { type: "heading", text: "Step 4: Pre-arrange treatment" },
      {
        type: "paragraph",
        text:
          "An intervention without a treatment plan is not an intervention — it is a confrontation. Before the meeting takes place, your interventionist will identify the appropriate level of care, contact the treatment program, verify insurance, and arrange same-day admission. The goal is for your loved one to be able to say yes and walk straight into treatment.",
      },

      { type: "heading", text: "Step 5: Rehearse the meeting" },
      {
        type: "paragraph",
        text:
          "Every team member writes a personal letter to your loved one — specific, honest, and free of blame. The interventionist coaches each person on tone, structure, and what to do if your loved one becomes angry, defensive, or tries to leave. We rehearse the meeting at least once before the day arrives.",
      },

      { type: "heading", text: "Step 6: Hold the intervention" },
      {
        type: "paragraph",
        text:
          "Choose a private, neutral location — usually a home, a hotel meeting room, or the interventionist's office. Schedule the meeting for a time when your loved one is sober and not under acute work or family pressure. The interventionist leads the conversation, guides each person through their letter, and presents the treatment offer.",
      },

      { type: "heading", text: "Step 7: Plan for every outcome" },
      {
        type: "paragraph",
        text:
          "Most loved ones say yes — often within the first hour. But you also have to plan for the possibility of a no, or a maybe-but-not-now. Your interventionist will guide the family in setting clear, loving boundaries that hold, even if your loved one initially refuses.",
      },

      { type: "heading", text: "Step 8: Follow through after treatment begins" },
      {
        type: "paragraph",
        text:
          "The intervention is the beginning, not the end. The family system that made addiction possible needs to change too. Family therapy, support groups (like Al-Anon or Nar-Anon), and ongoing coaching from your interventionist are all part of long-term success.",
      },
    ],
    recommendedServices: [
      "family-interventions",
      "alcohol-abuse-interventions",
      "drug-abuse-interventions",
    ],
    ctaTitle: "Want help planning your loved one's intervention?",
    ctaBody:
      "Speak with a certified interventionist today. The first call is free, confidential, and judgment-free.",
  },
  {
    slug: "is-it-time-for-an-intervention",
    category: "Family Resources",
    heroEyebrow: "Decision Guide",
    heroHeadline: "Is It Time For An Intervention?",
    heroBody:
      "Most families wait too long. Use this guide to honestly assess whether your loved one's situation has reached the point where a structured intervention is the right next step.",
    intro:
      "Families almost always know — long before they admit it — that something has to change. The question is rarely 'is there a problem?' It is usually 'is it bad enough yet to act?' Here is how we help families answer that question.",
    blocks: [
      { type: "heading", text: "The hard truth about timing" },
      {
        type: "paragraph",
        text:
          "There is no magic threshold that says 'now it's time.' Waiting for rock bottom is a myth that has cost too many lives. The right time is whenever the substance use or mental health crisis is causing significant harm — and whenever the family is willing to act.",
      },

      { type: "heading", text: "Signs an intervention may be needed now" },
      {
        type: "list",
        items: [
          "Your loved one's substance use or mental health symptoms are escalating",
          "Direct conversations have failed or made the situation worse",
          "The behaviour is starting to harm your loved one's job, health, or relationships",
          "Family members are arguing about how to handle it",
          "You are walking on eggshells to keep the peace",
          "Children in the home are being affected",
          "You suspect your loved one is hiding the true extent of the problem",
          "There has been a recent crisis — overdose, DUI, hospital visit, suicidal talk",
        ],
      },

      { type: "heading", text: "Signs the situation is urgent" },
      {
        type: "callout",
        title: "Call us immediately if any of these are true:",
        text:
          "Recent overdose or near-overdose · Active suicidal ideation or plans · Use of fentanyl, heroin, or unknown street drugs · Severe withdrawal symptoms · Acts of self-harm · Threats of violence toward self or others",
      },

      { type: "heading", text: "Why families wait — and why they shouldn't" },
      {
        type: "paragraph",
        text:
          "Most families delay because they don't want to overreact, embarrass their loved one, or trigger a fight. But delay almost never makes the problem easier to solve. Substance use disorders progress. Mental health crises escalate. The longer the wait, the more entrenched the patterns become.",
      },
      {
        type: "paragraph",
        text:
          "The most common regret we hear from families post-intervention is not 'we acted too soon.' It is 'we should have done this years ago.'",
      },

      { type: "heading", text: "What if your loved one refuses to engage?" },
      {
        type: "paragraph",
        text:
          "Refusal is not a reason to wait. Most successful interventions happen when the loved one would never have agreed in advance. The structure of the intervention itself is what creates the opportunity for a yes. That is exactly what an interventionist is trained to do.",
      },

      { type: "heading", text: "Take the next step" },
      {
        type: "paragraph",
        text:
          "If you have read this far, you already know something needs to change. The next step is the easiest one — a free, confidential call with a certified interventionist who will listen to your specific situation and help you decide what comes next.",
      },
    ],
    recommendedServices: [
      "family-interventions",
      "alcohol-abuse-interventions",
      "crisis-interventions",
    ],
    ctaTitle: "Not sure if it's time? We'll help you decide.",
    ctaBody:
      "A 15-minute call with a certified interventionist will give you clarity. No obligation, no pressure — just experienced guidance.",
  },
  {
    slug: "find-your-missing-loved-one",
    category: "Crisis Resources",
    heroEyebrow: "Crisis Resource",
    heroHeadline: "How to Find a Missing Loved One Struggling with Addiction",
    heroBody:
      "When a family member disappears in the middle of an addiction or mental health crisis, every minute matters. Here is what to do — in order — to bring them home safely.",
    intro:
      "We have helped families locate loved ones who have disappeared into addiction, vanished after a relapse, or gone silent during a mental health crisis. The steps below are drawn from those experiences. If your loved one is missing right now, start with Step 1 immediately and call us in parallel.",
    blocks: [
      { type: "heading", text: "Step 1: File a missing persons report" },
      {
        type: "paragraph",
        text:
          "Contrary to popular belief, you do not have to wait 24 or 48 hours. Most jurisdictions allow a missing persons report to be filed immediately, especially when there is reason to believe the person is in danger — and an active addiction or mental health crisis qualifies. Call your local police non-emergency line or visit the precinct in person.",
      },
      {
        type: "callout",
        title: "Bring with you:",
        text:
          "A recent photo · Physical description · Last known location · Vehicle description and plate · Medical or psychiatric history · Phone number and email · Names of friends or contacts they may be with",
      },

      { type: "heading", text: "Step 2: Contact local hospitals and emergency departments" },
      {
        type: "paragraph",
        text:
          "Call every hospital within driving distance of where your loved one was last seen. Ask whether they have admitted anyone matching your loved one's description. HIPAA limits what they can share — but most hospitals will confirm whether a person is currently a patient if you provide enough identifying information.",
      },

      { type: "heading", text: "Step 3: Check jails, detention centers, and treatment facilities" },
      {
        type: "paragraph",
        text:
          "Use county and state inmate locator websites. Call any treatment programs your loved one has been to before — they may have voluntarily checked themselves in. Many states also have public-facing involuntary commitment search tools.",
      },

      { type: "heading", text: "Step 4: Reach out to known associates" },
      {
        type: "paragraph",
        text:
          "Contact friends, sponsors, dealers, ex-partners, and anyone else your loved one may have contacted. Be honest about why you are calling — this is not the time for embarrassment. Most people will help if you ask directly.",
      },

      { type: "heading", text: "Step 5: Use technology" },
      {
        type: "list",
        items: [
          "If 'Find My Phone' or Google Location Sharing was previously enabled, check it",
          "Review credit and debit card activity for recent transactions",
          "Check social media for recent posts, check-ins, or messages",
          "Contact the cell phone provider — they can ping the device for police",
          "Check rideshare and delivery apps for recent activity if you have account access",
        ],
      },

      { type: "heading", text: "Step 6: Engage a missing persons resource" },
      {
        type: "paragraph",
        text:
          "Several non-profits specialise in locating missing people in active addiction. The National Center for Missing & Exploited Children (for under 18s), the National Missing and Unidentified Persons System (NamUs), and local addiction-focused outreach organisations can provide critical support and visibility.",
      },

      { type: "heading", text: "Step 7: Plan for what happens when they are found" },
      {
        type: "paragraph",
        text:
          "If your loved one is located, the next 24 hours are critical. This is the moment when an intervention is most effective — and when relapse is most dangerous. Have a treatment plan and an interventionist ready before you make contact. Otherwise, you risk losing them again.",
      },
      {
        type: "callout",
        title: "We can help — at any stage.",
        text:
          "Whether your loved one is currently missing or has been found, our crisis intervention team mobilises rapidly to coordinate the next steps and prevent the situation from escalating again.",
      },
    ],
    recommendedServices: [
      "crisis-interventions",
      "drug-abuse-interventions",
      "mental-health-interventions",
    ],
    ctaTitle: "Need help bringing your loved one home?",
    ctaBody:
      "Call us 24/7. Our crisis intervention team will guide you through every step — and be ready to act the moment your loved one is found.",
  },
];

export const RESOURCE_BY_SLUG = new Map(RESOURCES.map((r) => [r.slug, r]));
