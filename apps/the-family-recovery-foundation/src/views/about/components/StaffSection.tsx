'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { staffMembers } from "@/mocks/team";

interface StaffMemberData {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string[];
  category: string;
}

function StaffCard({
  member,
  isOpen,
  onToggle,
}: {
  member: StaffMemberData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full max-w-[240px] aspect-square rounded-full overflow-hidden bg-deep-navy/5 mb-5">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          className="object-cover object-top"
          sizes="240px"
        />
      </div>
      <h3 className="text-lg font-display text-deep-navy">{member.name}</h3>
      <p className="text-body-s font-body italic text-slate mt-1">
        {member.title}
      </p>
      {member.category === "advisory" && (
        <span className="inline-block mt-2 bg-tfrf-blue/10 text-tfrf-blue text-caption font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
          Advisory Board
        </span>
      )}
      <button
        onClick={onToggle}
        className="mt-4 flex items-center gap-2 text-body-s font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{isOpen ? "Close Bio" : "Read Bio"}</span>
        <i
          className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out w-full"
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-4 space-y-3 text-left">
          {member.bio.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-body-s font-body text-slate leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StaffSection() {
  const [openBioId, setOpenBioId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const toggleBio = (id: string) => {
    setOpenBioId((prev) => (prev === id ? null : id));
  };

  const row1 = staffMembers.slice(0, 3);
  const row2 = staffMembers.slice(3, 6);
  const row3 = staffMembers.slice(6);

  return (
    <section
      ref={ref}
      id="staff"
      className="bg-pure-white py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div
          className="mb-14 md:mb-20 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Team
          </p>
          <h2 className="text-[clamp(26px,3vw,40px)] font-display text-deep-navy leading-[1.15]">
            Staff
          </h2>
        </div>

        {/* Row 1 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-10 lg:mb-12 transition-all duration-700 delay-100"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {row1.map((member) => (
            <StaffCard
              key={member.id}
              member={member}
              isOpen={openBioId === member.id}
              onToggle={() => toggleBio(member.id)}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-10 lg:mb-12 transition-all duration-700 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {row2.map((member) => (
            <StaffCard
              key={member.id}
              member={member}
              isOpen={openBioId === member.id}
              onToggle={() => toggleBio(member.id)}
            />
          ))}
        </div>

        {/* Row 3: centered single item */}
        {row3.length > 0 && (
          <div
            className="max-w-xs mx-auto transition-all duration-700 delay-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <StaffCard
              member={row3[0]}
              isOpen={openBioId === row3[0].id}
              onToggle={() => toggleBio(row3[0].id)}
            />
          </div>
        )}
      </div>
    </section>
  );
}