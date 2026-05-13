'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#8FA489';

const perinatalTypes = [
  {
    icon: 'ri-cloud-line',
    name: 'Postpartum Depression (PPD)',
    tag: 'Mood Disorder',
    tagColor: '#C8795A',
    desc: 'More than the "baby blues," PPD is a persistent low mood that can begin any time in the first year after birth. It may show up as numbness, tearfulness, disconnection from your baby, or a deep sense that something is deeply wrong with you. It is a medical condition — not a personal failure.',
  },
  {
    icon: 'ri-heart-pulse-line',
    name: 'Postpartum Anxiety (PPA)',
    tag: 'Anxiety Disorder',
    tagColor: '#DDA15E',
    desc: 'PPA affects more new mothers than PPD and is often overlooked. It can look like relentless worry about your baby\'s safety, intrusive fears, inability to sleep even when your baby does, or physical symptoms like chest tightness and racing thoughts that never quiet down.',
  },
  {
    icon: 'ri-loop-left-line',
    name: 'Perinatal OCD',
    tag: 'Intrusive Thoughts',
    tagColor: ACCENT,
    desc: 'Intrusive, unwanted thoughts about harming your baby are a hallmark of perinatal OCD — and they are not a sign that you will act on them. These thoughts cause deep distress precisely because you love your child. With proper diagnosis and ERP therapy, they respond very well to treatment.',
  },
  {
    icon: 'ri-flashlight-line',
    name: 'Birth Trauma & PTSD',
    tag: 'Trauma Response',
    tagColor: '#6B7D67',
    desc: 'Difficult or frightening birth experiences — emergency interventions, medical complications, feeling unheard or dismissed — can leave lasting trauma responses. Flashbacks, avoidance, and hypervigilance are common signs that birth trauma needs clinical attention.',
  },
];

const emotionalSigns = [
  'Persistent sadness, emptiness, or hopelessness',
  'Feeling detached from your baby or unable to bond',
  'Constant worry or catastrophic thinking about your child',
  'Irritability, rage, or anger that feels out of proportion',
  'Intrusive thoughts or fears you cannot control',
  'Feeling like a bad mother or that your baby deserves better',
  'Loss of interest in activities you used to enjoy',
  'Difficulty making decisions or concentrating',
];

const physicalSigns = [
  'Unable to sleep even when your baby sleeps',
  'Exhaustion that sleep does not relieve',
  'Racing heart, chest tightness, or panic attacks',
  'Appetite changes — eating too little or too much',
  'Headaches, stomach upset, or muscle tension',
  'Feeling physically numb or disconnected from your body',
  'Crying frequently or feeling unable to cry at all',
  'Physical hypervigilance — always on alert for danger',
];

const carePillars = [
  {
    icon: 'ri-parent-line',
    title: 'Perinatal Specialization',
    desc: 'Our clinicians have specialized training in perinatal mental health — understanding the hormonal, biological, and identity shifts unique to the postpartum period. This is not general therapy applied to new mothers.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Non-Judgmental Approach',
    desc: 'We know how much shame surrounds postpartum struggles. Our entire environment is built to be a judgment-free space where you can be honest about what you\'re experiencing — including thoughts you\'ve been afraid to voice.',
  },
  {
    icon: 'ri-brain-line',
    title: 'Evidence-Based Treatment',
    desc: 'We use CBT, EMDR, DBT, and perinatal-specific interventions proven to reduce symptoms of PPD and PPA, build self-compassion, and strengthen mother-infant bonding — all adapted for your current capacity.',
  },
  {
    icon: 'ri-links-line',
    title: 'Integrated Dual Diagnosis',
    desc: 'Postpartum conditions frequently co-occur with anxiety, trauma, previous depression, or OCD. We treat everything together so your care addresses root causes and gives you the strongest possible foundation for long-term wellness.',
  },
];

const healingPath = [
  {
    step: '01',
    label: 'Confidential Perinatal Assessment',
    desc: 'A licensed perinatal mental health clinician listens to your full experience — what began during pregnancy or after birth, how you\'re feeling right now, and what matters most to you. No judgment, no rush.',
  },
  {
    step: '02',
    label: 'Stabilization & Symptom Relief',
    desc: 'We begin with immediate skills for reducing anxiety spirals, managing intrusive thoughts, and building small pockets of calm — so you can show up more fully for yourself and your baby while deeper work unfolds.',
  },
  {
    step: '03',
    label: 'Therapy for Root Causes',
    desc: 'Using CBT, EMDR, and ACT, we address the underlying patterns driving your symptoms — including birth trauma, identity shifts, relationship strain, and the grief that often accompanies early motherhood.',
  },
  {
    step: '04',
    label: 'Bonding & Identity Support',
    desc: 'Postpartum conditions can make bonding feel impossible. We work specifically on the mother-infant relationship, rebuilding connection and helping you find your own version of motherhood — not the one you feared you\'d lost.',
  },
  {
    step: '05',
    label: 'Ongoing Recovery & Step-Down',
    desc: 'As symptoms improve, we develop a continuing support plan that accounts for ongoing postpartum hormonal shifts, relationship needs, and the transition back to daily life with confidence.',
  },
];

const therapies = [
  { name: 'Cognitive Behavioral Therapy (CBT)', icon: 'ri-brain-line' },
  { name: 'EMDR for Birth Trauma', icon: 'ri-eye-line' },
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'Exposure & Response Prevention (ERP)', icon: 'ri-loop-left-line' },
  { name: 'Acceptance & Commitment Therapy', icon: 'ri-heart-line' },
  { name: 'Somatic Experiencing', icon: 'ri-body-scan-line' },
  { name: 'Mindfulness-Based Interventions', icon: 'ri-focus-3-line' },
  { name: 'Group Therapy', icon: 'ri-group-line' },
  { name: 'Family & Partner Support Sessions', icon: 'ri-home-heart-line' },
];

const faqs = [
  {
    q: 'How do I know if what I\'m feeling is postpartum depression versus normal new-mother exhaustion?',
    a: 'Baby blues — sadness, tearfulness, and mood swings in the first two weeks — are normal and typically resolve on their own. PPD is more persistent, more intense, and interferes with daily functioning. If your symptoms have lasted more than two weeks, are worsening, or are significantly affecting your ability to care for yourself or your baby, professional support is warranted. You don\'t have to wait until it becomes a crisis.',
  },
  {
    q: 'I\'m having scary thoughts about my baby. Does that mean I\'m dangerous?',
    a: 'Almost certainly not. Intrusive, unwanted thoughts about harming your baby are one of the most distressing — and most common — features of perinatal OCD and postpartum anxiety. The very fact that these thoughts horrify you is a strong sign that they do not reflect your desires. They are a symptom, not a prediction. Our clinicians are trained to distinguish between intrusive thoughts and genuine risk, and to treat them compassionately and effectively.',
  },
  {
    q: 'Can virtual treatment work for postpartum depression and anxiety?',
    a: 'Yes. Research supports virtual IOP and outpatient treatment as effective for perinatal mental health conditions. For many new mothers in Colorado, access to care from home — without arranging childcare or commuting — actually reduces barriers to showing up consistently and getting better faster.',
  },
  {
    q: 'My partner thinks I just need more sleep. How do I help them understand?',
    a: 'Postpartum depression and anxiety are clinical conditions caused by hormonal shifts, neurological changes, and psychological factors that rest alone cannot fix. We offer family and partner education sessions to help loved ones understand what you\'re experiencing, communicate more effectively, and provide support that actually helps.',
  },
  {
    q: 'How quickly can I start treatment?',
    a: 'Most women are able to begin care within 24 to 72 hours of their initial assessment. We work to minimize barriers so that getting help is as fast and simple as possible.',
  },
];

export default function PostpartumDepressionAndAnxietyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">
      {/* HERO */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ppd_hero01.jpg"
            alt="Postpartum depression and anxiety treatment for new mothers at Inner Peak Colorado"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/90 via-[#2C3B2E]/65 to-[#2C3B2E]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/75 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pb-20 pt-40">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'What We Treat', path: '/what-we-treat' },
                { label: 'Postpartum Depression & Anxiety' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  Postpartum Mental Health
                </span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Motherhood is hard.<br />
                  Struggling doesn&apos;t<br />
                  <em style={{ color: '#DDA15E' }}>make you a bad mom.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"Postpartum depression and anxiety are not signs of weakness or failure — they are medical conditions that affect one in five new mothers. At Inner Peak Colorado, we provide specialized, judgment-free perinatal mental health care for women across Colorado."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
                  >
                    Get a Free Assessment
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                  <a
                    href="tel:+17197338556"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
                  >
                    <i className="ri-phone-line"></i>
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONDITION OVERVIEW */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Understanding Postpartum Mental Health
            </span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              You imagined joy.<br />
              What you feel instead<br />
              <em className="text-[#C8795A]">deserves real care.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Postpartum depression and anxiety are not character flaws or signs that you don&apos;t love your baby. They are driven by dramatic hormonal shifts, sleep deprivation, identity disruption, and the enormous weight of new responsibility. For women with a prior history of depression, anxiety, or trauma, the risk is even higher — and the need for specialized support even more urgent."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"In Colorado, access to perinatal mental health specialists remains limited. Our virtual IOP and outpatient programs give new mothers across the state access to evidence-based care — without leaving home, without arranging childcare, and without putting their recovery on hold."}</AutoLinkedTextClient>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                Perinatal-specialized care, virtually delivered
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ppd_overview01.jpg"
                alt="Woman finding calm and clarity during postpartum recovery"
                fill
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: ACCENT }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                <AutoLinkedTextClient>{"&quot;I kept telling myself I just needed more sleep. It took months to realize what I was experiencing was real and treatable — and that I didn&apos;t have to suffer through it alone.&quot;"}</AutoLinkedTextClient>
              </p>
              <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#DDA15E' }}>
                — Program Graduate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TYPES WE TREAT */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Perinatal Conditions
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Every form of postpartum<br />
              <em className="text-[#C8795A]">struggle is real and treatable.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"Postpartum mental health conditions span a wide spectrum. We treat all presentations with the same clinical depth and compassion."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {perinatalTypes.map((type, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: `${type.tagColor}15` }}>
                    <i className={`${type.icon} text-lg`} style={{ color: type.tagColor }}></i>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${type.tagColor}15`, color: type.tagColor }}
                  >
                    {type.tag}
                  </span>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-xl">{type.name}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]"><AutoLinkedTextClient>{type.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C8795A' }}>
              Recognition
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Signs that this is more<br />
              <em className="text-[#C8795A]">than the baby blues.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-2xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"You don&apos;t have to meet every criterion. If these patterns feel familiar and have lasted more than two weeks, support can help."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}20` }}>
                  <i className="ri-mental-health-line text-sm" style={{ color: ACCENT }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Emotional & Behavioral Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {emotionalSigns.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-blank-circle-line text-xs" style={{ color: ACCENT }}></i>
                    </div>
                    <span className="text-sm text-[#3A4A3C]/70 font-light leading-snug">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0ECE1] rounded-[0.75rem_2rem_0.75rem_2rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: '#C8795A20' }}>
                  <i className="ri-heart-pulse-line text-sm text-[#C8795A]"></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Physical & Somatic Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {physicalSigns.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-blank-circle-line text-xs text-[#C8795A]"></i>
                    </div>
                    <span className="text-sm text-[#3A4A3C]/70 font-light leading-snug">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#2C3B2E] rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[#F0ECE1]/80 font-light text-base leading-relaxed max-w-2xl">
              <AutoLinkedTextClient>{"Postpartum conditions are highly treatable. The sooner you reach out, the sooner relief becomes possible — for you and for the people who depend on you."}</AutoLinkedTextClient>
            </p>
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
            >
              Speak with Our Team
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="w-full bg-[#2C3B2E] py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          <div className="relative h-72 lg:h-auto overflow-hidden">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ppd_approach01.jpg"
              alt="Compassionate perinatal mental health therapy at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/60 hidden lg:block" />
          </div>

          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Our Approach
            </span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Perinatal-informed care<br />
              that meets you exactly<br />
              <em style={{ color: ACCENT }}>where motherhood left you.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {carePillars.map((pillar, i) => (
                <div key={i} className="bg-[#FAF8F5]/5 hover:bg-[#FAF8F5]/10 transition-colors duration-300 rounded-xl p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}25` }}>
                    <i className={`${pillar.icon} text-sm`} style={{ color: ACCENT }}></i>
                  </div>
                  <h3 className="font-serif text-[#FAF8F5] text-sm">{pillar.title}</h3>
                  <p className="text-[#F0ECE1]/55 font-light text-xs leading-[1.8]"><AutoLinkedTextClient>{pillar.desc}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HEALING JOURNEY */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Your Healing Path
              </span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                What postpartum treatment<br />
                <em className="text-[#C8795A]">can look like.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"Recovery is not about becoming the mother you imagined. It&apos;s about finding yourself again — with support that honors how exhausted and overwhelmed you already are."}</AutoLinkedTextClient>
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  <AutoLinkedTextClient>{"Most women begin within"}</AutoLinkedTextClient>
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24–72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"From first call to first session. We know you can&apos;t wait — and neither can your recovery."}</AutoLinkedTextClient>
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {healingPath.map((item, i) => (
                <div key={i} className="group flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center gap-0 flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm text-[#FAF8F5] transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {item.step}
                    </div>
                    {i < healingPath.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${ACCENT}30`, minHeight: '40px' }}></div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pb-4">
                    <h3 className="font-serif text-[#2C3B2E] text-base group-hover:text-[#C8795A] transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]"><AutoLinkedTextClient>{item.desc}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THERAPIES */}
      <section className="w-full bg-[#F0ECE1] py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col gap-5 lg:col-span-1">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Modalities
              </span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
                Therapies used in<br />
                <em className="text-[#C8795A]">perinatal care.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                <AutoLinkedTextClient>{"We select modalities based on clinical evidence for perinatal mental health and adapt them to where you are in your postpartum journey."}</AutoLinkedTextClient>
              </p>
              <Link
                href="/therapy"
                className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2C3B2E]/30 text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
              >
                Explore All Therapies
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="lg:col-span-2 flex flex-wrap gap-3">
              {therapies.map((therapy, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-[#FAF8F5] rounded-full px-5 py-3 hover:bg-[#2C3B2E] group transition-all duration-300 cursor-default"
                >
                  <i className={`${therapy.icon} text-sm transition-colors duration-300`} style={{ color: ACCENT }}></i>
                  <span className="text-xs font-medium text-[#2C3B2E] group-hover:text-[#FAF8F5] transition-colors duration-300 whitespace-nowrap">
                    {therapy.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C8795A' }}>
              Common Questions
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Questions about postpartum depression and anxiety treatment
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-[#2C3B2E]' : 'bg-[#F0ECE1]'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full cursor-pointer flex items-center justify-between p-6 text-left">
                  <span className={`font-serif text-base pr-4 ${openFaq === i ? 'text-[#FAF8F5]' : 'text-[#2C3B2E]'}`}>{faq.q}</span>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className={`text-sm ${openFaq === i ? 'ri-subtract-line text-[#DDA15E]' : 'ri-add-line text-[#3A4A3C]/40'}`}></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[#F0ECE1]/70 font-light text-sm leading-[1.9]"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ppd_cta01.jpg"
              alt="Mother and infant representing postpartum recovery and healing at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div className="bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Start Healing Today
            </span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              You deserve to feel like<br />
              yourself again —<br />
              <em style={{ color: ACCENT }}>even in this season.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"A free, confidential assessment is the first step. Our perinatal-trained clinical team will listen without judgment and help you understand what support is right for where you are right now."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Free Consultation
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+17197338556"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
              >
                <i className="ri-phone-line"></i>
                Call Us Now
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              {['Perinatal-specialized licensed clinicians', 'Virtual care available across Colorado', 'Insurance verification before you begin'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-line text-sm" style={{ color: ACCENT }}></i>
                  <span className="text-[#F0ECE1]/65 text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
