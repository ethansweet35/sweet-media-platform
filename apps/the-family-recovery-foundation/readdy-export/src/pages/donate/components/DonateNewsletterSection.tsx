import { useState, FormEvent } from "react";

export default function DonateNewsletterSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, String(value));
    });

    try {
      const response = await fetch("https://readdy.ai/api/form/d834uhvp40588l3v60jg", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (response.ok) {
        setStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-pure-white py-16 md:py-20">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-tfrf-blue mb-3">
            Sign Up
          </p>
          <h2 className="text-display-s font-display text-deep-navy mb-4">
            Join The Family Recovery Foundation Newsletter
          </h2>
          <p className="text-body-s font-body text-slate mb-8">
            Stay connected with <span className="text-tfrf-blue font-medium">The Family Recovery Foundation</span>. Sign up with your email to receive the latest news & information.
          </p>

          {status === "success" ? (
            <div className="bg-soft-white border border-mist rounded-lg p-6">
              <p className="text-body-m font-body text-deep-navy font-medium">
                Thank you for signing up!
              </p>
            </div>
          ) : (
            <form
              id="newsletter-form-donate"
              data-readdy-form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <div className="flex-1">
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  maxLength={30}
                  className="w-full px-4 py-3 border border-mist rounded-md text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  maxLength={30}
                  className="w-full px-4 py-3 border border-mist rounded-md text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150"
                />
              </div>
              <div className="flex-[1.5]">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-mist rounded-md text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-6 py-3 bg-tfrf-blue hover:bg-deep-navy text-pure-white text-body-s font-body font-semibold rounded-md transition-colors duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-body-s font-body text-red-500 mt-3">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}