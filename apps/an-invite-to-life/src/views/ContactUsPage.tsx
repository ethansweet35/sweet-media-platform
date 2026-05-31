'use client';

import { useState, FormEvent } from 'react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    urgency: 'normal',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: `Preferred: ${formData.preferredContact} | Urgency: ${formData.urgency}`,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredContact: "phone",
        urgency: "normal",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <style>{`
        .contact-hero {
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          color: white;
          padding: 6rem 0 4rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .contact-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .contact-hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-content {
          padding: 5rem 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-info-card {
          background: white;
          border-radius: var(--radius-soft);
          padding: 2.5rem;
          box-shadow: var(--shadow-card);
          position: sticky;
          top: 120px;
        }

        .info-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--line-color);
        }

        .info-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .info-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: var(--shadow-soft);
        }

        .info-content h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .info-content p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .info-content a {
          color: var(--accent-clay);
          text-decoration: none;
          font-weight: 600;
        }

        .info-content a:hover {
          text-decoration: underline;
        }

        .contact-form-card {
          background: white;
          border-radius: var(--radius-soft);
          padding: 3rem;
          box-shadow: var(--shadow-card);
          position: relative;
        }

        .contact-form-card::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 25px;
          background: rgba(210, 180, 140, 0.3);
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-main);
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--line-color);
          border-radius: var(--radius-soft);
          font-family: 'Nunito', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--accent-sage);
          box-shadow: 0 0 0 3px rgba(141, 163, 153, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-soft);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .success-message {
          background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
          color: white;
          padding: 1.5rem;
          border-radius: var(--radius-soft);
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 600;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .confidential-notice {
          background: #f7f5f0;
          padding: 2rem;
          border-radius: var(--radius-soft);
          margin-top: 2rem;
          border-left: 4px solid var(--accent-clay);
        }

        .urgent-banner {
          background: linear-gradient(135deg, var(--accent-clay) 0%, #a67761 100%);
          color: white;
          padding: 2rem;
          border-radius: var(--radius-soft);
          text-align: center;
          margin-bottom: 3rem;
        }

        .urgent-banner h3 {
          color: white;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .contact-info-card {
            position: static;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="container contact-hero-content">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.95, marginBottom: 0 }}>
            Every conversation is confidential. We're here to help you navigate this difficult time.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="contact-content">
        <div className="container">

          {/* URGENT CRISIS BANNER */}
          <div className="urgent-banner">
            <h3>Crisis Situation?</h3>
            <p style={{ marginBottom: '1rem', opacity: 0.95 }}>
              If this is an urgent matter, please call us directly at{' '}
              <a href="tel:+19492304575" style={{ color: 'white', fontWeight: '700', textDecoration: 'underline' }}>
                +1 (949) 230-4575
              </a>
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: 0, opacity: 0.85 }}>
              We're available 24/7 for crisis situations and emergencies
            </p>
          </div>

          <div className="contact-grid">
            
            {/* CONTACT INFO SIDEBAR */}
            <div>
              <div className="contact-info-card">
                <h3 style={{ marginBottom: '2rem' }}>Contact Information</h3>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="ri-phone-line "></i>
                  </div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>
                      <a href="tel:+19492304575">+1 (949) 230-4575</a>
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      Available 24/7 for emergencies
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="ri-mail-line "></i>
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:jenat10@yahoo.com">
                        jenat10@yahoo.com
                      </a>
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="ri-time-line "></i>
                  </div>
                  <div className="info-content">
                    <h4>Business Hours</h4>
                    <p style={{ fontSize: '0.95rem' }}>Monday - Friday: 8am - 8pm EST</p>
                    <p style={{ fontSize: '0.95rem' }}>Saturday - Sunday: 10am - 6pm EST</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      Crisis line available 24/7
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="ri-map-pin-2-line "></i>
                  </div>
                  <div className="info-content">
                    <h4>Service Areas</h4>
                    <p style={{ fontSize: "0.95rem" }}>Orange County, California</p>
                    <p style={{ fontSize: '0.95rem' }}>Serving all 50 states</p>
                    <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>International services available</p>
                  </div>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div>
              <div className="contact-form-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Send Us a Message</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                  Fill out the form below and we'll get back to you as soon as possible. All inquiries are kept strictly confidential.
                </p>

                {submitted && (
                  <div className="success-message">
                    ✓ Your email client will open with your message. Thank you for reaching out!
                  </div>
                )}

                {submitError && (
                  <p style={{ color: "#b91c1c", fontSize: "0.875rem", marginBottom: "1rem" }}>{submitError}</p>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredContact">Preferred Contact Method *</label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        required
                        value={formData.preferredContact}
                        onChange={handleChange}
                      >
                        <option value="phone">Phone Call</option>
                        <option value="text">Text Message</option>
                        <option value="email">Email</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="urgency">Urgency Level *</label>
                      <select
                        id="urgency"
                        name="urgency"
                        required
                        value={formData.urgency}
                        onChange={handleChange}
                      >
                        <option value="normal">General Inquiry</option>
                        <option value="soon">Need Help Soon</option>
                        <option value="urgent">Urgent - Within 24 Hours</option>
                        <option value="crisis">Crisis - Immediate</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your situation. What brings you to reach out today?"
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>

                <div className="confidential-notice">
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <i className="ri-shield-check-line style={{ color: 'var(--accent-clay)', flexShrink: 0, marginTop: '0.25rem' }} "></i>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Your Privacy Matters</h4>
                      <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                        All communications are kept strictly confidential. We understand the sensitive nature 
                        of intervention services and treat every inquiry with the utmost discretion and care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* WHAT TO EXPECT */}
          <div style={{ 
            background: 'white', 
            padding: '3rem', 
            borderRadius: 'var(--radius-soft)', 
            boxShadow: 'var(--shadow-card)',
            marginTop: '4rem'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '3rem' }}>What to Expect After You Reach Out</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 auto 1rem auto',
                  boxShadow: 'var(--shadow-soft)'
                }}>1</div>
                <h4>Initial Response</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  We'll respond within a few hours during business hours, or the next business day for after-hours inquiries.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 auto 1rem auto',
                  boxShadow: 'var(--shadow-soft)'
                }}>2</div>
                <h4>Confidential Consultation</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  Schedule a free, confidential consultation to discuss your situation and explore options.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 auto 1rem auto',
                  boxShadow: 'var(--shadow-soft)'
                }}>3</div>
                <h4>Personalized Plan</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  Together, we'll create a customized intervention strategy that addresses your unique family situation.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    
    </>
  );
}
