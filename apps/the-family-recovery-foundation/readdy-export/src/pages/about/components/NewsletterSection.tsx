import { useState, useEffect, useRef, FormEvent } from "react";

export default function NewsletterSection() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch("https://readdy.ai/api/form/d82majmk6npfa23qg3qg", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      className="bg-soft-white py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div
          className="max-w-2xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Sign Up
          </p>
          <h2 className="text-[clamp(24px,2.8vw,36px)] font-display text-deep-navy leading-[1.15] mb-4 md:mb-6">
            Join The Family Recovery Foundation Newsletter
          </h2>
          <p className="text-body-m font-body text-slate leading-relaxed mb-8 md:mb-10">
            Stay connected with{" "}
            <span className="text-tfrf-blue font-semibold">
              The Family Recovery Foundation
            </span>
            . Sign up with your email to receive the latest news &amp;
            information.
          </p>

          <form
            onSubmit={handleSubmit}
            data-readdy-form
            className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="flex-1">
                <label
                  htmlFor="fname"
                  className="block text-caption font-body font-semibold text-deep-navy mb-1.5 text-left"
                >
                  First Name
                </label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  placeholder="First Name"
                  maxLength={30}
                  className="w-full px-4 py-3 rounded-md border border-mist bg-pure-white text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-200"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lname"
                  className="block text-caption font-body font-semibold text-deep-navy mb-1.5 text-left"
                >
                  Last Name
                </label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  required
                  placeholder="Last Name"
                  maxLength={30}
                  className="w-full px-4 py-3 rounded-md border border-mist bg-pure-white text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-200"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-caption font-body font-semibold text-deep-navy mb-1.5 text-left"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-md border border-mist bg-pure-white text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-200"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-tfrf-blue text-pure-white px-6 py-3 rounded-md text-body-s font-body font-semibold hover:bg-deep-navy transition-colors duration-200 whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              {status === "submitting" ? (
                <span>Submitting...</span>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-body-s font-body text-tfrf-blue font-semibold">
              Thank you for signing up!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-body-s font-body text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}