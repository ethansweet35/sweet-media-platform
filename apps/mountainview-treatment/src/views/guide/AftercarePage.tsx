import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function AftercarePage() {
  return (
    <GuideArticlePage
      title="Seattle Sober Living and Aftercare Guide"
      intro="Completing residential treatment is a milestone — not a finish line. This guide maps the Seattle recovery ecosystem: sober living homes, step-down programs, peer support, and the resources that make lasting sobriety achievable."
      readTime="10 min read"
      topics={["Aftercare", "Sober Living", "Seattle", "Recovery"]}
      heroImage={`${BASE}/mvt_guide_aftercare.jpg`}
      heroAlt="Group silhouetted against a Seattle sunset over Puget Sound — community in recovery"
      keyFacts={[
        { label: "Relapse Risk Reduction", value: "50–70%" },
        { label: "Sober Living Homes (KC)", value: "40+" },
        { label: "Step-Down Options", value: "PHP / IOP / OP" },
        { label: "AA Meetings in Seattle", value: "200+/wk" },
      ]}
      sections={[
        {
          heading: "Why Aftercare Matters More Than You Think",
          body: [
            "The period immediately following residential treatment is statistically the highest-risk window for relapse. The clinical intensity of inpatient care creates real momentum — and when that structure suddenly disappears, many people find the transition jarring. Without a robust aftercare plan, the environmental and emotional triggers that contributed to addiction are waiting at home.",
            "Research consistently shows that 90 or more days of continued care following residential treatment produces significantly better long-term outcomes than discharge directly to independent living. Aftercare isn't a sign that treatment didn't work — it's the evidence-based continuation of a process that takes time.",
          ],
          callout:
            "NIDA research shows that treatment outcomes for addiction are similar to those for other chronic conditions like diabetes and hypertension — requiring ongoing management and support, not a single intervention.",
        },
        {
          heading: "Understanding Levels of Step-Down Care",
          body: [
            "After completing residential treatment or a PHP program, most clients step down through lower levels of care progressively. The American Society of Addiction Medicine (ASAM) defines these levels with clinical criteria.",
            "Partial Hospitalization Program (PHP): 5–6 hours of daily programming, 5 days per week. This is the most intensive outpatient option, appropriate for those transitioning from residential care who still need significant daily structure.",
            "Intensive Outpatient Program (IOP): Typically 3 hours of programming, 3–5 days per week. Allows clients to live at home or in sober living while maintaining meaningful clinical support. Mountain View offers IOP in Seattle with both morning and evening tracks.",
            "Outpatient (OP): Individual therapy plus group sessions, weekly or biweekly. Suitable for those with a stable home environment and strong recovery support.",
          ],
          list: [
            "Residential (RTC): 24/7 clinical care — the most intensive level",
            "Partial Hospitalization (PHP): 25–30 hours/week of structured programming",
            "Intensive Outpatient (IOP): 9–15 hours/week, live at home or sober living",
            "General Outpatient (OP): 1–5 hours/week, ongoing maintenance",
          ],
        },
        {
          heading: "Sober Living in King County: What to Look For",
          body: [
            "Sober living homes (also called recovery residences) provide drug and alcohol-free housing for people in recovery. They bridge the gap between clinical treatment and fully independent living by offering community, accountability, and structure.",
            "King County and greater Seattle have dozens of certified recovery residences. Quality varies. When evaluating a sober living home, look for Washington State certification, staff trained in recovery coaching, clear house rules and accountability structures, and proximity to your treatment center or IOP program.",
            "Mountain View's care coordinators maintain relationships with vetted sober living partners throughout the Seattle area and can match you with a home that fits your clinical needs, gender preferences, sobriety focus, and budget.",
          ],
          list: [
            "Washington State certified (WSCRA or equivalent)",
            "Staff available on-site or on-call",
            "Random drug testing policy",
            "Curfew and accountability structures",
            "Proximity to IOP, employment, or other resources",
            "Peer community with shared recovery goals",
          ],
          callout:
            "Ask any sober living home whether they are NARR (National Alliance for Recovery Residences) affiliated — this is the gold standard for recovery residence quality standards.",
        },
        {
          heading: "Building a Recovery Support Network in Seattle",
          body: [
            "Long-term sobriety depends far more on community than willpower. Research on recovery capital — the resources that support long-term recovery — consistently points to social connection as the single most protective factor.",
            "Seattle has a vibrant and diverse recovery community. In addition to traditional 12-step programs (AA and NA), the city hosts SMART Recovery meetings, recovery community organizations like the Alano Club, faith-based recovery programs, and a growing network of recovery-oriented social activities through organizations like Sober in Seattle.",
            "Beyond peer support, building a recovery network means establishing relationships with a therapist, a primary care physician familiar with addiction medicine, and possibly a recovery coach or peer support specialist who can provide real-time guidance during difficult moments.",
          ],
          list: [
            "AA: Seattle Intergroup — 200+ weekly meetings across King County",
            "NA: Washington Narcotics Anonymous — regular meetings in Seattle and suburbs",
            "SMART Recovery: secular, science-based meetings (in-person and online)",
            "Alano Club of Seattle: daily meetings, sober events, community space",
            "Recovery Café: peer-led recovery center in South Lake Union",
            "Cascade Recovery Community Organization: advocacy + peer support",
          ],
        },
        {
          heading: "Outpatient Programs After Residential",
          body: [
            "Most people leaving residential treatment benefit from continuing with the treatment center that knows them clinically. Mountain View Treatment offers integrated PHP and IOP programming that follows directly from our residential track, ensuring continuity of care, familiar therapeutic relationships, and a clinical team that already understands your history.",
            "Our outpatient programs are available with both morning and evening scheduling, accommodating those returning to work, school, or family responsibilities. Transportation coordination to and from programming is available for clients in our partnered sober living homes.",
          ],
          callout:
            "Staying with the same clinical team from residential through IOP produces better outcomes than switching providers — our integrated continuum is designed around this principle.",
        },
        {
          heading: "Online Resources and Apps for Ongoing Recovery",
          body: [
            "Digital tools can supplement — though never replace — in-person clinical care and peer support. Several apps have solid evidence for supporting people in recovery between sessions.",
            "Connections: A SAMHSA-funded mobile app for recovery support. WEconnect: daily goal-setting with peer accountability. Sober Grid: a social network specifically for people in recovery. Monument: online alcohol treatment with access to physicians and therapists. SMART Recovery toolbox: CBT-based tools for managing cravings and emotions.",
            "The key is not to rely on any single digital tool as your primary support, but to use these as bridges between your formal treatment, peer meetings, and personal recovery practice.",
          ],
          list: [
            "WEconnect — daily accountability and goal-tracking",
            "Connections (SAMHSA) — peer support and resources",
            "Sober Grid — peer recovery social network",
            "SMART Recovery Toolbox — CBT / REBT-based exercises",
            "Calm / Headspace — mindfulness and stress management",
            "AA Meeting Finder — locates local meetings in real time",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "A Guide to Seattle AA, NA, and SMART Recovery Meetings",
          href: "/guide/a-guide-to-seattle-aa-na-and-smart-recovery-meetings/",
          excerpt: "Where to find peer support meetings across King County and greater Seattle — and how to choose the right fit.",
        },
        {
          title: "The Complete Guide to Drug and Alcohol Detox",
          href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
          excerpt: "What medically supervised detox involves, why it matters, and what to expect at each stage.",
        },
        {
          title: "Resources for Families of Addicts in King County",
          href: "/guide/resources-for-families-of-addicts-in-king-county/",
          excerpt: "Support groups, boundary-setting guidance, and family resources available throughout King County.",
        },
      ]}
    />
  );
}
