"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-chat-3-line", label: "24/7 DM & Comment Response", text: "Every message, comment, and mention gets a thoughtful, HIPAA-aware response within 2 hours — even at 2 AM when families are searching for help." },
  { icon: "ri-shield-user-line", label: "Crisis Escalation Protocol", text: "Built-in escalation paths for crisis-related inquiries. We know when to respond, when to redirect, and when to escalate to your clinical team immediately." },
  { icon: "ri-user-add-line", label: "Community Growth", text: "Strategic follower growth through organic engagement, hashtag research, and cross-platform promotion — building a real community, not vanity numbers." },
  { icon: "ri-notification-3-line", label: "Real-Time Monitoring", text: "Continuous monitoring of brand mentions, competitor activity, and industry conversations — so nothing slips through the cracks." },
];

/* ─── Animated: Community Inbox Visual ──────────────────────────── */
const MESSAGES = [
  { name: "Sarah M.", msg: "Hi, my brother needs help. Do you accept insurance?", time: "2m ago", platform: "Instagram", urgent: true },
  { name: "David K.", msg: "Thank you for the response. Can I schedule a tour?", time: "15m ago", platform: "Facebook", urgent: false },
  { name: "Jennifer L.", msg: "What programs do you offer for dual diagnosis?", time: "32m ago", platform: "LinkedIn", urgent: false },
  { name: "Robert T.", msg: "I saw your post about alumni events. How do I join?", time: "1h ago", platform: "Instagram", urgent: false },
  { name: "Amanda P.", msg: "Can you send me more info about your PHP program?", time: "2h ago", platform: "Facebook", urgent: false },
];

function CommunityInboxVisual() {
  const [revealed, setRevealed] = useState(0);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    MESSAGES.forEach((_, i) => {
      setTimeout(() => setRevealed((n) => n + 1), 150 + i * 160);
    });
    let count = 0;
    const target = 847;
    const interval = setInterval(() => {
      count += 18;
      if (count >= target) { setResponseCount(target); clearInterval(interval); }
      else setResponseCount(count);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Community Inbox</div>
          <div className="text-[9px] text-gray-400 mt-0.5">Live — All Platforms</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-green-600 font-semibold">Active</span>
        </div>
      </div>

      {/* Messages list */}
      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {MESSAGES.map((m, i) => (
            <div
              key={m.name}
              className={`flex items-start gap-3 px-4 py-3 transition-all duration-500 ${revealed > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-black/5 flex items-center justify-center text-xs font-bold text-black/60">
                {m.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-gray-800">{m.name}</span>
                  {m.urgent && (
                    <span className="text-[8px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full font-semibold">URGENT</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed truncate">{m.msg}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-[9px] text-gray-400">{m.time}</div>
                <div className="text-[9px] text-gray-400 mt-0.5">{m.platform}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Response stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            {responseCount.toLocaleString()}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Responses This Month</div>
        </div>
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            &lt;2 hr
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Avg. Response Time</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SocialCommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="social-community" className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row-reverse gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-black/8 p-6 h-[520px] flex flex-col">
              {visible ? <CommunityInboxVisual /> : null}
            </div>
          </div>

          {/* Left — content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Community Management</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Every Message,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Answered with Care.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
              Families in crisis reach out through social before they call. We ensure every DM, comment, and mention gets a compassionate, HIPAA-aware response — building trust at the exact moment it matters most.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "<2 hr", label: "Avg. Response" },
                { val: "847", label: "Responses/Month" },
                { val: "99.2%", label: "Response Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 group cursor-default">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/5 group-hover:bg-[#0A1F44] transition-colors duration-200 mt-0.5">
                    <i className={`${f.icon} text-sm text-black/50 group-hover:text-white transition-colors duration-200`}></i>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black mb-0.5 leading-snug">{f.label}</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}