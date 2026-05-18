import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function MeetingsGuidePage() {
  return (
    <GuideArticlePage
      title="A Guide to Seattle AA, NA, and SMART Recovery Meetings"
      intro="Peer support is one of the most powerful predictors of long-term recovery. This guide maps the meeting options across Seattle and King County — from AA and NA to SMART Recovery and other secular alternatives."
      readTime="8 min read"
      topics={["Peer Support", "AA", "NA", "SMART Recovery", "Seattle"]}
      heroImage={`${BASE}/mvt_guide_meetings.jpg`}
      heroAlt="Chairs arranged in a welcoming circle in a warm community room with afternoon light — a recovery meeting space"
      keyFacts={[
        { label: "AA Meetings in Seattle", value: "200+/wk" },
        { label: "NA Groups in KC", value: "Active" },
        { label: "SMART Recovery", value: "Online + In-Person" },
        { label: "Meeting Cost", value: "Free" },
      ]}
      sections={[
        {
          heading: "The Role of Peer Support in Long-Term Recovery",
          body: [
            "Decades of recovery research converge on a single consistent finding: social connection and peer support are among the strongest predictors of sustained sobriety. Clinical treatment creates the foundation — detox, therapy, medication management — but the community woven around that foundation is what makes recovery durable.",
            "Peer support meetings offer something clinical treatment cannot replicate at scale: the lived experience of others who have been exactly where you are and found a way through. The credibility of 'someone who has been there' is qualitatively different from clinical advice, however skilled the clinician.",
          ],
          callout:
            "Research published in Substance Abuse Treatment, Prevention, and Policy found that active participation in mutual aid groups (AA, NA, SMART) nearly doubled the likelihood of sustained abstinence at 3 years compared to those who did not attend.",
        },
        {
          heading: "Alcoholics Anonymous (AA) in Seattle",
          body: [
            "Alcoholics Anonymous is the most widely available peer support network in the Seattle area. Seattle Intergroup coordinates AA meetings across King County — currently more than 200 weekly meetings spanning different neighborhoods, formats, and focus areas.",
            "AA meetings in Seattle range from traditional 12-step discussion groups to speaker meetings, Big Book study groups, step workshops, and specialty meetings for specific populations (young people, LGBTQ+, professionals, newcomers). Meetings are held in churches, community centers, treatment facilities, and online.",
            "If you are new to AA, attending 3–5 different meetings is recommended before drawing conclusions about whether it fits you — meeting culture varies significantly from group to group. A sponsor (an experienced AA member who guides you through the steps) is optional but strongly encouraged.",
          ],
          list: [
            "Seattle Intergroup: seattleaa.org — full meeting directory",
            "Daily newcomer meetings available in multiple neighborhoods",
            "Online AA: online-aa.org — 24/7 meetings accessible from anywhere",
            "Big Book meetings: discussion-based on the core AA text",
            "Speaker meetings: members share personal stories of addiction and recovery",
            "Step study groups: structured work through the 12 Steps",
          ],
        },
        {
          heading: "Narcotics Anonymous (NA) in King County",
          body: [
            "Narcotics Anonymous follows a similar 12-step framework to AA but focuses on all drug addiction rather than alcohol specifically. NA maintains an active presence throughout King County and the Puget Sound region.",
            "NA meetings use their own text (the NA Basic Text, or \"the Basic Text\") and step workbooks. Like AA, NA meetings vary in format and culture. Washington State has an active NA service structure with regular area service committee meetings and regional events.",
            "For people whose substance of choice was opioids, methamphetamine, or other drugs (vs. primarily alcohol), many find NA's focus more relevant than AA's, though many AA groups welcome all addictions.",
          ],
          list: [
            "Washington NA: wa-na.org — meeting directory",
            "NA World Services meeting finder: na.org",
            "Regular daily and weekly meetings across Seattle and suburbs",
            "Women's meetings, LGBTQ+ meetings, young people's meetings available",
            "Phone line for newcomers: check wa-na.org for current number",
          ],
        },
        {
          heading: "SMART Recovery: A Science-Based Alternative",
          body: [
            "SMART Recovery (Self-Management and Recovery Training) is a secular, evidence-based alternative to 12-step programs. It draws on cognitive behavioral therapy, motivational interviewing, and rational emotive behavior therapy to help participants manage urges, build motivation, and develop healthy coping strategies.",
            "SMART Recovery does not require belief in a higher power or acceptance of addiction as a \"disease\" in the spiritual 12-step sense. This makes it a preferred option for people who find the spiritual framework of AA/NA to be a barrier.",
            "SMART Recovery in Seattle includes in-person meetings at various locations and a robust online meeting schedule accessible from anywhere. Their website (smartrecovery.org) provides a free toolbox of CBT-based worksheets and exercises for self-directed use between meetings.",
          ],
          list: [
            "SMART Recovery: smartrecovery.org — in-person and online",
            "Secular, science-based (CBT / MI / REBT framework)",
            "No sponsor system or step work — self-directed with facilitator",
            "Online meetings: multiple daily options, globally accessible",
            "Free toolbox: cost-benefit analysis, DISARM (urge management), etc.",
          ],
          callout:
            "Many people in recovery attend both 12-step and SMART Recovery meetings — the approaches complement each other and offer different perspectives on the same challenges.",
        },
        {
          heading: "How to Find the Right Meeting for You",
          body: [
            "There is no single right meeting — there is the right meeting for you. The goal in your first few weeks is exposure: attending different meetings, trying different formats, and observing which community feels most resonant and safe.",
            "Consider format: Do you want structured step work, or open discussion? Do you want a spiritual framework, or a secular one? Do you want to be with people who share your specific substance background, or does a mixed group feel more comfortable?",
            "Consider location and consistency: the best meeting is the one you actually attend. Proximity and scheduling convenience matter. Pick 1–2 anchor meetings that fit your regular schedule and treat them as appointments, then supplement with others as you go.",
          ],
          list: [
            "Attend 3–5 different meetings before deciding a format doesn't fit you",
            "Look for a meeting where you leave feeling better, not worse",
            "Find at least one anchor meeting you can attend weekly, consistently",
            "Consider specialty meetings (young people, women-only, LGBTQ+) if relevant",
            "Online meetings are fully valid — especially for early mornings or travel days",
            "Ask your counselor or a peer specialist to accompany you to a first meeting",
          ],
        },
        {
          heading: "Using Meetings Alongside Professional Treatment",
          body: [
            "Peer support meetings work best as a supplement to — not a replacement for — professional addiction treatment. Clinical treatment addresses the neurobiological, psychological, and behavioral dimensions of addiction; peer support provides the ongoing community and accountability that sustains recovery in daily life.",
            "Mountain View Treatment integrates 12-step and SMART Recovery orientation into our clinical programming. Many clients who complete our residential or IOP program are already connected to their first few meetings before discharge, with a home group identified and a sponsor relationship in progress.",
            "The goal is a seamless, reinforcing recovery ecosystem: clinical care, peer support, sober living or a supportive home environment, and ongoing professional therapy. No single element is sufficient alone; together, they are transformative.",
          ],
          callout:
            "Mountain View works with every client to identify their preferred peer support framework — 12-step or secular — and build meeting attendance into their aftercare plan before discharge.",
        },
      ]}
      relatedGuides={[
        {
          title: "Seattle Sober Living and Aftercare Guide",
          href: "/guide/seattle-sober-living-and-aftercare-guide/",
          excerpt: "Beyond meetings — step-down care, sober living homes, and the full Seattle recovery ecosystem.",
        },
        {
          title: "Understanding Dual Diagnosis: Addiction & Mental Health",
          href: "/guide/understanding-dual-diagnosis-addiction-mental-health/",
          excerpt: "Why co-occurring mental health conditions require integrated treatment alongside peer support.",
        },
        {
          title: "Resources for Families of Addicts in King County",
          href: "/guide/resources-for-families-of-addicts-in-king-county/",
          excerpt: "Al-Anon, Nar-Anon, NAMI, and other family support resources across King County.",
        },
      ]}
    />
  );
}
