import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Music Therapy for Addiction in Springfield, MO | Missouri Behavioral Health",
  description:
    "Music therapy at Missouri Behavioral Health — credentialed music therapists using musical engagement to access emotions, process experiences, and build connection in early addiction recovery. Springfield, MO.",
  alternates: { canonical: "/music-therapy-springfield" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/music-therapy-springfield", fallback);
}

const WHO_BENEFITS = [
  {
    icon: "ri-mute-line",
    label: "People who struggle with verbal expression",
    desc: "Some clients find direct verbal processing of emotional pain difficult or impossible, especially early in recovery. Music offers an alternative pathway — accessing and communicating emotional experience without requiring words.",
  },
  {
    icon: "ri-seedling-line",
    label: "Early recovery clients",
    desc: "In early recovery, emotions are often raw and overwhelming — verbal processing can re-traumatize or flood clients before they have the skills to manage intense emotional states. Music provides a gentler, more modulated entry point.",
  },
  {
    icon: "ri-history-line",
    label: "Trauma survivors",
    desc: "Trauma memories are encoded in sensory and somatic form, not primarily in verbal narrative. Music — which is deeply sensory — can access and gently process trauma-related emotional content in ways that talk therapy cannot.",
  },
  {
    icon: "ri-wind-line",
    label: "Those with anxiety",
    desc: "Active musical engagement — especially rhythm-based activities — activates the parasympathetic nervous system and reduces anxiety faster than many verbal interventions.",
  },
  {
    icon: "ri-user-smile-line",
    label: "Adolescents and young adults",
    desc: "Younger clients often have existing deep personal connections to music. Music therapy leverages those connections as a therapeutic resource, making engagement more natural and less clinical-feeling.",
  },
  {
    icon: "ri-emotion-sad-line",
    label: "Clients with depression",
    desc: "Music activates the reward pathways — the same neural circuits that addiction hijacks — in a healthy, non-chemical way. For clients whose depression has flattened their capacity for pleasure, music can be one of the first reliable sources of positive affect.",
  },
];

const INSURERS = [
  "Aetna",
  "Anthem Blue Cross",
  "Blue Cross Blue Shield",
  "Cigna",
  "Beacon Health",
  "Carelon",
  "GEHA",
  "Cox Health",
];

const FAQS = [
  {
    q: "Do I need musical ability for music therapy?",
    a: "Absolutely not. Music therapy does not require any prior musical training, skill, or interest. The therapeutic value of music therapy comes from emotional and psychological engagement with music — not from performing well. Many of the most powerful music therapy moments happen when clients who have never played an instrument pick up a drum or improvise on a keyboard for the first time. The music therapist adapts every session to the individual client's comfort level and creates a non-judgmental environment where there is no right or wrong way to engage.",
  },
  {
    q: "What is music therapy used for in addiction treatment?",
    a: "Music therapy in addiction treatment serves multiple clinical purposes: accessing and processing emotions that are difficult to reach through verbal therapy; reducing anxiety, depression, and stress through active musical engagement; building peer connection and social cohesion in group settings; working with identity and self-concept through lyric analysis and songwriting; and activating the brain's reward circuits in a healthy, chemical-free way. It is particularly valuable in early recovery, when emotional regulation capacity is limited and the need for healthy pleasure is most acute.",
  },
  {
    q: "How is music therapy different from just listening to music?",
    a: "Music therapy is a clinically directed therapeutic process delivered by a credentialed music therapist (MT-BC) with specific treatment goals, assessment, and evaluation. While listening to music has well-documented benefits for mood and stress, music therapy goes much further — using structured musical engagement to work toward specific clinical objectives that are coordinated with the rest of the treatment plan. Sessions are designed, adapted, and evaluated by a professional who understands the therapeutic mechanisms of music and how to deploy them toward recovery goals.",
  },
  {
    q: "Who leads music therapy sessions at MBH?",
    a: "Music therapy sessions at Missouri Behavioral Health are led by credentialed music therapists holding the MT-BC (Music Therapist-Board Certified) credential — the nationally recognized professional certification for music therapists in the United States. MT-BC therapists have completed an approved undergraduate or graduate music therapy program, a supervised clinical internship, and passed the national board examination. They are full members of the clinical team and coordinate music therapy goals with your therapist and treatment plan.",
  },
  {
    q: "Does insurance cover music therapy?",
    a: "Music therapy at MBH is integrated into the PHP and IOP programs and covered as part of your overall level-of-care benefits — not billed separately as an ancillary service. This means your insurance coverage for PHP or IOP includes music therapy without additional out-of-pocket cost. We verify your specific benefits before treatment begins at no cost to you.",
  },
];

export default function MusicTherapyPage() {
  return (
    <TherapyPageLayout
      therapyName="Music Therapy"
      abbr="Music"
      currentPath="/music-therapy-springfield"
      tagline="Access emotions, process experiences, and build connection through music."
      heroBody="Music therapy at Missouri Behavioral Health is delivered by trained clinicians who use musical engagement — listening, songwriting, instrument play, and lyric analysis — to reach emotional content that is difficult to access through verbal therapy alone. It is especially effective in early recovery, when emotions are raw and verbal processing is limited."
      heroImage={`${SUPABASE}/mbh_therapy_music_hero01.jpg`}
      heroImageAlt="Music therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-music-line", label: "Format", value: "Individual + group sessions" },
        { icon: "ri-award-line", label: "Led by", value: "Credentialed music therapist" },
        { icon: "ri-hospital-line", label: "Used in", value: "PHP · IOP" },
        { icon: "ri-radio-line", label: "Approach", value: "Active + receptive music engagement" },
      ]}
    >
      {/* ── Active vs receptive music therapy ────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Session Format
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What happens in a music therapy session.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Music therapy sessions draw on two distinct modalities — active engagement and
              receptive engagement — each with different therapeutic applications and mechanisms.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Active */}
            <div className="flex flex-col gap-5 rounded-3xl border border-mbh-forest/8 bg-cream p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className="ri-piano-line text-2xl text-mbh-green" aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-green">
                    Modality 01
                  </p>
                  <p className="font-display text-xl font-semibold text-mbh-forest">
                    Active music engagement
                  </p>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed text-mbh-body">
                Active music therapy involves making music — playing instruments, songwriting,
                vocal improvisation, or rhythmic activities. No musical skill is required. The
                therapeutic value comes from the act of creation and expression, not from the
                quality of the output.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    label: "Instrument play",
                    desc: "Percussion, keyboards, guitar — adapted to each client's comfort level and used to express and process emotional states that are difficult to verbalize.",
                  },
                  {
                    label: "Songwriting",
                    desc: "Creating original lyrics and melodies to express personal experience — particularly powerful for processing grief, trauma, or the narrative of addiction and recovery.",
                  },
                  {
                    label: "Group improvisation",
                    desc: "Unstructured musical creation with peers that builds trust, communication, and playfulness — qualities that addiction erodes and recovery requires.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/10">
                      <i className="ri-check-line text-xs text-mbh-green" aria-hidden />
                    </span>
                    <div>
                      <span className="font-body text-sm font-semibold text-mbh-forest">
                        {item.label}:&nbsp;
                      </span>
                      <span className="font-body text-sm text-mbh-body">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Receptive */}
            <div className="flex flex-col gap-5 rounded-3xl border border-mbh-forest/8 bg-cream p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className="ri-headphone-line text-2xl text-mbh-green" aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-green">
                    Modality 02
                  </p>
                  <p className="font-display text-xl font-semibold text-mbh-forest">
                    Receptive music engagement
                  </p>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed text-mbh-body">
                Receptive music therapy involves listening to music in a structured, clinically
                directed way — with therapeutic discussion, guided imagery, or reflective processing
                afterward. The therapist selects music based on clinical goals and the client's
                emotional state.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    label: "Guided music listening",
                    desc: "Therapist-curated music selections paired with specific therapeutic intentions — opening emotional space, processing grief, or activating particular memories and associations.",
                  },
                  {
                    label: "Lyric analysis",
                    desc: "Examining the words and emotional themes of meaningful songs as a projective tool — often revealing emotional content the client finds difficult to express directly.",
                  },
                  {
                    label: "Music and imagery",
                    desc: "Structured technique where clients relax, listen to specially selected music, and allow spontaneous mental imagery to emerge — which is then processed therapeutically.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/10">
                      <i className="ri-check-line text-xs text-mbh-green" aria-hidden />
                    </span>
                    <div>
                      <span className="font-body text-sm font-semibold text-mbh-forest">
                        {item.label}:&nbsp;
                      </span>
                      <span className="font-body text-sm text-mbh-body">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why music reaches where words don't ───────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Neuroscience
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Why music reaches where words don't.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Music is processed in the limbic system — the brain's emotional center — before it
                reaches the prefrontal cortex where verbal language lives. This means music
                activates emotional memory and affective experience directly, bypassing the cognitive
                defense mechanisms that often block verbal emotional processing in therapy.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                For clients who have been told their whole lives to "just talk about it," music
                therapy can be revelatory — providing the first reliable access to emotional
                content they have been unable to reach through years of conventional therapy.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Music also activates the brain's reward circuits — the dopaminergic pathways that
                addiction co-opts — through a natural, chemical-free mechanism. For clients in early
                recovery who are experiencing anhedonia (inability to feel pleasure), music therapy
                can be one of the first consistent sources of positive affect before other rewards
                return to normal function.
              </p>

              <blockquote className="mt-8 border-l-4 border-mbh-green bg-mbh-green/5 rounded-r-2xl px-6 py-5">
                <p className="font-display text-base font-medium italic text-mbh-forest">
                  &ldquo;Music can reach places in the human psyche that words alone simply
                  cannot — it speaks directly to where trauma and addiction live in the nervous
                  system.&rdquo;
                </p>
                <cite className="mt-3 block font-body text-xs text-mbh-body/55 not-italic">
                  — Missouri Behavioral Health Music Therapy Program
                </cite>
              </blockquote>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "ri-brain-line",
                  label: "Limbic system activation",
                  desc: "Music activates the amygdala and hippocampus directly — structures involved in emotional memory and affect — before engaging the cortical regions where verbal processing occurs.",
                },
                {
                  icon: "ri-shield-line",
                  label: "Bypasses cognitive defenses",
                  desc: "Many clients in early recovery have well-developed cognitive defenses against emotional processing. Music circumvents these defenses, allowing authentic emotional engagement before resistance can organize.",
                },
                {
                  icon: "ri-emotion-happy-line",
                  label: "Dopamine activation",
                  desc: "Pleasurable music triggers dopamine release in the nucleus accumbens — the same reward structure hijacked by addiction — providing a natural, sustainable source of positive reward.",
                },
                {
                  icon: "ri-team-line",
                  label: "Social synchrony",
                  desc: "Group music-making produces neural synchrony and oxytocin release — the neurobiological basis of social bonding — rebuilding the human connection that addiction severs.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 rounded-2xl border border-mbh-forest/8 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 mt-0.5">
                    <i className={`${item.icon} text-lg text-mbh-green`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                      {item.label}
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who benefits ──────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Who It Helps
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Who benefits from music therapy.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Music therapy is beneficial for all clients, but especially transformative for those
              who find conventional verbal therapy limiting.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_BENEFITS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                    {item.label}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance ──────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Coverage
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Insurance covers music therapy at MBH.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Music therapy at MBH is included in the PHP and IOP programs and covered as part of
                your level-of-care benefits — not billed separately. We verify your coverage before
                treatment begins at no cost to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-sm transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-shield-check-line" aria-hidden /> Verify my coverage
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
                >
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INSURERS.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2.5 rounded-xl border border-mbh-forest/10 bg-white px-4 py-3"
                >
                  <i className="ri-check-line text-mbh-green text-sm" aria-hidden />
                  <span className="font-body text-sm text-mbh-forest/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>
    </TherapyPageLayout>
  );
}
