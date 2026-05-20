import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { programsList } from "@/mocks/family-programming";

export default function FamilyProgrammingHeroSection() {
  const [openPrograms, setOpenPrograms] = useState<Set<string>>(new Set());
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const toggleProgram = (id: string) => {
    setOpenPrograms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data.append(key, value);
      }
    });

    try {
      await fetch("https://readdy.ai/api/form/d830vouk6npfa23qg92g", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("idle");
    }
  };

  return (
    <section className="bg-pure-white pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Programs
          </p>
          <h1 className="text-display-l font-display text-deep-navy mb-5">
            Family Programming
          </h1>
          <p className="text-body-l font-body text-slate max-w-2xl mx-auto leading-relaxed">
            Our programs help families heal and navigate the challenges of addiction with
            understanding and compassion. Learn more about our programs below and fill out
            the form to register now.
          </p>
        </div>

        {/* Two column layout: Programs + Register Form */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Programs list */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2">
              {programsList.map((program) => {
                const isOpen = openPrograms.has(program.id);
                return (
                  <div
                    key={program.id}
                    className="bg-soft-white rounded-xl border border-mist/50 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleProgram(program.id)}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left cursor-pointer group"
                    >
                      <i
                        className={cn(
                          "ri-arrow-down-s-line w-5 h-5 flex items-center justify-center text-lg text-tfrf-blue shrink-0 mt-0.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] md:text-[16px] font-body font-semibold text-deep-navy group-hover:text-tfrf-blue transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-[12px] md:text-[13px] font-body text-slate mt-0.5">
                          {program.schedule}
                        </p>
                      </div>
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="px-4 pb-3 pl-[48px] text-[13px] md:text-[14px] font-body text-slate leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Register Now form */}
          <div className="lg:w-[380px] xl:w-[420px] shrink-0 self-start">
            <div className="bg-tfrf-blue rounded-2xl p-6 md:p-7 text-pure-white sticky top-28">
              <h2 className="text-display-s font-display text-pure-white mb-2">
                Register Now
              </h2>
              <p className="text-[13px] md:text-[14px] font-body text-pure-white/80 mb-5 leading-relaxed">
                Your Zoom login details will be sent after registration.
              </p>

              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-pure-white/20 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line w-7 h-7 flex items-center justify-center text-2xl text-pure-white" />
                  </div>
                  <p className="text-[16px] font-body font-semibold text-pure-white">
                    Thank you for registering!
                  </p>
                  <p className="text-[13px] font-body text-pure-white/80 mt-2">
                    We will send your Zoom login details shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-5 text-[13px] font-body text-pure-white/70 hover:text-pure-white transition-colors underline cursor-pointer"
                  >
                    Register another person
                  </button>
                </div>
              ) : (
                <>
                  <form
                    id="family-programming-registration"
                    data-readdy-form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-pure-white/15 border border-pure-white/20 text-pure-white placeholder-pure-white/60 text-[14px] font-body focus:outline-none focus:border-pure-white/40 transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-pure-white/15 border border-pure-white/20 text-pure-white placeholder-pure-white/60 text-[14px] font-body focus:outline-none focus:border-pure-white/40 transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-pure-white/15 border border-pure-white/20 text-pure-white placeholder-pure-white/60 text-[14px] font-body focus:outline-none focus:border-pure-white/40 transition-colors"
                    />
                    <select
                      name="hearAbout"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg bg-pure-white/15 border border-pure-white/20 text-pure-white/60 text-[14px] font-body focus:outline-none focus:border-pure-white/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        How did you hear about us?
                      </option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Friend/Family Referral</option>
                      <option value="treatment">Treatment Center</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-pure-white/15 border border-pure-white/20 text-pure-white placeholder-pure-white/60 text-[14px] font-body focus:outline-none focus:border-pure-white/40 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-3.5 rounded-lg bg-pure-white text-tfrf-blue font-body font-semibold text-[14px] hover:bg-pure-white/90 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {formStatus === "submitting" ? "Registering..." : "Register Now"}
                    </button>
                  </form>
                  <p className="mt-4 text-center text-[12px] md:text-[13px] font-body text-pure-white/60 leading-relaxed">
                    Having trouble registering? Contact our support tech{" "}
                    <a
                      href="tel:8889648825"
                      className="text-pure-white/90 hover:text-pure-white transition-colors font-semibold"
                    >
                      888-964-8825
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}