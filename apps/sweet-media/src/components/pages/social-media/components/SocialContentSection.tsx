"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-calendar-schedule-line", label: "Monthly Content Calendars", text: "Strategic content calendars built around your census goals, awareness campaigns, and seasonal trends — never generic filler posts." },
  { icon: "ri-image-line", label: "Custom Graphics & Video", text: "In-house designers and editors produce scroll-stopping visuals, Reels, and short-form video tailored to behavioral health audiences." },
  { icon: "ri-hashtag", label: "Platform-Specific Strategy", text: "Different content for Instagram, Facebook, LinkedIn, and YouTube — each optimized for the platform's algorithm and your audience." },
  { icon: "ri-bar-chart-2-line", label: "Performance Analytics", text: "Weekly engagement reports showing what content drives the most inquiries, calls, and website visits — so we double down on what works." },
];

/* ─── Animated: Content Feed Visual ──────────────────────────── */
const POSTS = [
  { platform: "Instagram", type: "Reel", title: "Day in the Life at Sunrise", likes: "2.4K", comments: "187", shares: "342", color: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500" },
  { platform: "Facebook", type: "Post", title: "5 Signs It's Time to Seek Help", likes: "1.8K", comments: "124", shares: "891", color: "bg-blue-600" },
  { platform: "LinkedIn", type: "Article", title: "The State of BH Marketing in 2026", likes: "456", comments: "67", shares: "203", color: "bg-blue-700" },
  { platform: "YouTube", type: "Short", title: "Patient Success Story — 1 Year Sober", likes: "5.1K", comments: "412", shares: "1.2K", color: "bg-red-600" },
];

const ENGAGEMENT_TARGET = 12400;

function ContentFeedVisual() {
  const [revealed, setRevealed] = useState(0);
  const [engagementCount, setEngagementCount] = useState(0);

  useEffect(() => {
    POSTS.forEach((_, i) => {
      setTimeout(() => setRevealed((n) => n + 1), 200 + i * 180);
    });
    let count = 0;
    const interval = setInterval(() => {
      count += 280;
      if (count >= ENGAGEMENT_TARGET) { setEngagementCount(ENGAGEMENT_TARGET); clearInterval(interval); }
      else setEngagementCount(count);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const engagementBarWidth = `${Math.min((engagementCount / ENGAGEMENT_TARGET) * 78, 78)}%`;

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Content Performance</div>
          <div className="text-[9px] text-gray-400 mt-0.5">This Month — All Platforms</div>
        </div>
        <div className="flex items-center gap-1.5 bg-black text-white rounded-full px-3 py-1.5">
          <i className="ri-arrow-up-line text-xs text-green-400"></i>
          <span className="text-[10px] font-semibold">+34%</span>
        </div>
      </div>

      {/* Posts list */}
      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {POSTS.map((post, i) => (
            <div
              key={post.title}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-500 ${revealed > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center ${post.color}`}>
                <i className={`${post.platform === "Instagram" ? "ri-instagram-line" : post.platform === "Facebook" ? "ri-facebook-fill" : post.platform === "LinkedIn" ? "ri-linkedin-fill" : "ri-youtube-fill"} text-white text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800 truncate">{post.title}</div>
                <div className="text-[9px] text-gray-400">{post.platform} · {post.type}</div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 text-[10px] text-gray-500">
                <span className="flex items-center gap-0.5"><i className="ri-heart-line text-xs"></i> {post.likes}</span>
                <span className="flex items-center gap-0.5"><i className="ri-share-forward-line text-xs"></i> {post.shares}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement counter */}
      <div className="bg-white rounded-2xl border border-black/8 px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">Total Monthly Engagement</span>
          <span className="text-sm font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            {engagementCount.toLocaleString()}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: engagementBarWidth }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SocialContentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="social-content" className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Content Strategy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Content That Builds
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Trust and Census.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
              We create, schedule, and publish content that positions your facility as the trusted choice — educational posts, patient stories, facility tours, and crisis-awareness content that drives real inquiries.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "8.7%", label: "Engagement Rate" },
                { val: "34%", label: "MoM Growth" },
                { val: "12K+", label: "Monthly Engagements" },
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

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-1 lg:order-2">
            <div className="bg-[#f7f6f4] rounded-3xl p-6 h-[480px] flex flex-col">
              {visible ? <ContentFeedVisual /> : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}