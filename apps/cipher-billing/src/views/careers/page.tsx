import Image from "next/image";
import Link from "next/link";

/** Hero + openings imagery from Elementor post-229 */
const IMG_HERO =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T102429.826.png";
const IMG_CULTURE =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-15T204741.066.png";

const contactPhoneDisplay = "714-867-1331";
const contactPhoneHref = "tel:+17148671331";

const linkedInCompanyUrl = "https://www.linkedin.com/company/cipher-billing";

const pillars = [
  {
    icon: "ri-focus-3-line",
    title: "Impact-Driven Work",
    body: "Your work directly improves revenue outcomes for behavioral health practices across the country.",
  },
  {
    icon: "ri-line-chart-line",
    title: "Growth & Development",
    body: "We invest in training, mentorship, and career advancement opportunities for every team member.",
  },
  {
    icon: "ri-team-line",
    title: "Collaborative Culture",
    body: "Join a team that values communication, accountability, and continuous improvement.",
  },
  {
    icon: "ri-medal-line",
    title: "Industry Leadership",
    body: "Work with cutting-edge RCM technology and methodologies in the behavioral health space.",
  },
] as const;

const benefitItems = [
  "Medical, Dental, & Vision Insurance",
  "EAP",
  "HSA",
  "401(k)",
  "Profit share",
  "Paid Maternity Leave",
  "Paid Paternity Leave",
  "Paid Time Off (PTO)",
  "CFA Consulting",
] as const;

const jobDuties = [
  "If needed, maximize productivity while performing timely claim follow-up via phone and portals, resolving denials, statusing claims, and drafting appeals.",
  "Monitor and support BPO agents handling claim statusing and denial resolution, providing daily guidance, productivity monitoring, and alignment with departmental standards.",
  "Handles high-level escalations for BPO agents.",
  "Audit BPO claim work for accuracy, completeness, and compliance, identifying training gaps or errors for corrective action.",
  "Provide training for new hires and lead refresher sessions as needed, supporting BPO development through material and coaching.",
  "Track BPO KPIs and report underperformance to the Director and Lead to assist in action plans.",
  "Ensure documentation of all claim-related actions in Jira and CollaborateMD, including updates, payer responses, reimbursement, and escalation notes.",
  "Maintain up-to-date knowledge of payer requirements, authorization rules, and communication standards to ensure accurate claims processing.",
  "Engage in team and interdepartmental meetings to troubleshoot issues, identify denial trends, and recommend process improvements.",
  "Communicate department needs and performance concerns to the Director and lead while supporting accountability and development.",
  "Participate in the department's L10 meetings, identify and bring issues, and develop and execute To-Dos and quarterly rocks to drive alignment and improvements toward Cipher VTO.",
  "Performs other related duties as assigned.",
] as const;

export default function CareersPage() {
  return (
    <main className="bg-[#101E3F] text-white">
      {/* Hero — two columns: copy | pillars */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(270deg, rgba(11, 26, 46, 0.61) 0%, #101E3F 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1140px] px-5 py-[100px]">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
            <div className="max-w-xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-[8%] min-w-[48px] bg-white/80" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Join Our Team</p>
              </div>
              <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl md:leading-[1.12]">
                Build Your Career at <span className="text-[#5eb5e0]">Cipher Billing</span>
              </h1>
              <p className="mt-6 text-sm leading-relaxed text-white/90 md:text-base">
                Join a team that&apos;s transforming behavioral health revenue cycle management. We&apos;re looking for
                talented individuals who are passionate about making a difference.
              </p>
              <a
                href={contactPhoneHref}
                className="mt-8 inline-flex items-center justify-center rounded border border-white/25 bg-[#050a14]/80 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm hover:bg-black/90"
              >
                {contactPhoneDisplay}
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-lg border border-white/15 bg-[#0a1428]/85 p-6 backdrop-blur-sm"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#166C96]/40 text-[#5eb5e0]"
                    aria-hidden
                  >
                    <i className={`${p.icon} text-xl`} />
                  </div>
                  <h3 className="mt-4 font-[var(--font-body)] text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/78">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture + benefits */}
      <section className="bg-white py-[100px] text-[#0D1833]">
        <div className="mx-auto grid max-w-[1140px] gap-12 px-5 md:grid-cols-2 md:items-center md:gap-14">
          <div className="max-w-xl md:justify-self-start">
            <p className="text-sm leading-relaxed text-[#3d4753] md:text-base">
              Cipher Billing is dedicated to creating an environment that is positive, encouraging, and inclusive. We
              believe that building a team that is diverse in background, ideas, and experiences will spark growth
              personally and professionally.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[#3d4753] md:text-base">
              If you are interested in joining our team, please fill out the interest form below and follow us on{" "}
              <Link href={linkedInCompanyUrl} className="font-semibold text-[#166C96] underline-offset-4 hover:underline">
                LinkedIn
              </Link>{" "}
              for updated employment opportunities.
            </p>
            <h2 className="mt-10 font-marcellus text-2xl font-medium text-[#0D1833]">Employee Benefits</h2>
            <ul className="mt-5 grid gap-2 text-sm leading-relaxed text-[#3d4753] sm:grid-cols-2">
              {benefitItems.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#166C96]" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px] md:mx-0 md:justify-self-end">
            <Image
              src={IMG_CULTURE}
              alt="Cipher Billing team collaboration and workplace culture"
              fill
              className="rounded-xl object-cover shadow-xl"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Current openings */}
      <section className="border-t border-white/10 py-[100px]">
        <div className="mx-auto max-w-[1140px] px-5">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Join Our Team</p>
            <h2 className="font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2.5rem]">Current Openings</h2>
            <p className="text-sm text-white/80 md:text-base">
              Join us in our mission to revolutionize behavioral health billing.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr] lg:items-start lg:gap-10">
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-xl border border-white/15 bg-[#0a1428] p-8 shadow-lg">
                <h3 className="font-marcellus text-xl font-medium text-white md:text-2xl">Claims Resolution Specialist</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/78">
                  Ensure timely and accurate claim follow-up, denial resolution, and appeal submission while monitoring BPO
                  agent performance through daily guidance, quality reviews, and training.
                </p>
                <dl className="mt-8 space-y-5 border-t border-white/10 pt-8 text-sm">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fa6b8]">Pay Range</dt>
                    <dd className="mt-1 font-semibold text-white">$23 – $30 hourly</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fa6b8]">
                      Employment Type
                    </dt>
                    <dd className="mt-1 font-semibold text-white">Full-Time</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fa6b8]">Location</dt>
                    <dd className="mt-1 font-semibold text-white">Remote / Hybrid Available</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fa6b8]">Department</dt>
                    <dd className="mt-1 font-semibold text-white">Revenue Cycle Management</dd>
                  </div>
                </dl>
              </div>
            </aside>

            <div className="rounded-xl border border-white/10 bg-[#F8FAFC] p-8 text-[#0D1833] shadow-inner md:p-10">
              <h4 className="font-[var(--font-body)] text-lg font-semibold text-[#0D1833]">Job Purpose</h4>
              <p className="mt-3 text-sm leading-relaxed text-[#3d4753]">
                Ensuring timely and accurate claim follow-up, denial resolution, and appeal submission while monitoring BPO
                agents performance through daily guidance, quality reviews, and training. Ensure claim activity meets payer
                requirements and contributes to overall department efficiency.
              </p>

              <h4 className="mt-10 font-[var(--font-body)] text-lg font-semibold text-[#0D1833]">
                Job Duties & Responsibilities
              </h4>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#3d4753] marker:text-[#166C96]">
                {jobDuties.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* JotForm */}
      <section className="border-t border-white/10 bg-[#F5F7FA] py-[100px] text-[#0D1833]">
        <div className="mx-auto max-w-[900px] px-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Submit Information</p>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium md:text-[2.25rem]">
            Interested in working at Cipher Billing?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#4a5565]">
            Complete the secure form below. Our hiring team reviews every submission.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-[840px] px-5">
          <div className="overflow-hidden rounded-xl border border-[#166C96]/20 bg-white shadow-md">
            <iframe
              title="Cipher Billing Careers Inquiry Submission"
              src="https://form.jotform.com/260627286727163"
              className="h-[min(720px,85vh)] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
