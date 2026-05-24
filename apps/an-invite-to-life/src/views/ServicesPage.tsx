import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: "Intervention Facilitation",
      link: "/services/interventions",
      description: "Professionally facilitated interventions using proven models tailored to your family's unique situation.",
      features: [
        "Multiple intervention models (ARISE, Johnson, Family System)",
        "Pre-intervention family education and preparation",
        "Crisis intervention planning",
        "Evidence-based compassionate approach"
      ]
    },
    {
      title: "Treatment Center Research & Placement",
      description: "We research and coordinate placement in the most appropriate treatment facilities for your loved one's specific needs.",
      features: [
        "Treatment center matching based on clinical needs",
        "Insurance verification and financial planning",
        "Medical detox coordination",
        "Ongoing treatment team collaboration"
      ]
    },
    {
      title: "Secure Medical Transport",
      description: "Safe, discrete transportation from the intervention to treatment facility with trained professionals.",
      features: [
        "Sober escort services",
        "Medical monitoring during transport",
        "National and international coverage",
        "Discrete, compassionate care"
      ]
    },
    {
      title: "Customized Aftercare Programs",
      link: "/services/aftercare",
      description: "Long-term support and recovery planning for both the individual and the family system.",
      features: [
        "Personalized aftercare planning",
        "Family system healing",
        "Ongoing progress assessment",
        "Relapse prevention strategies"
      ]
    },
    {
      title: "Trauma Services",
      link: "/services/trauma",
      description: "Specialized trauma assessment, education, and treatment planning for those whose addiction stems from unresolved trauma.",
      features: [
        "Trauma-informed intervention",
        "PTSD and complex trauma assessment",
        "Childhood abuse recovery",
        "Trauma education for families"
      ]
    },
    {
      title: "Addiction Education & Workshops",
      description: "Educational programs for families to understand addiction, enabling behaviors, and healthy boundaries.",
      features: [
        "Understanding the disease of addiction",
        "Recognizing enabling vs. supporting",
        "Boundary setting workshops",
        "Co-dependency education"
      ]
    }
  ];

  return (
    <>
    <style>{`
        .page-hero {
          padding: 6rem 0 4rem 0;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .page-hero h1 {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .services-section {
          padding: 4rem 0 6rem 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
        }

        .service-card {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          border-top: 4px solid var(--accent-sage);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }

        .service-card.has-link {
          cursor: pointer;
        }

        .service-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        }

        .service-card > p {
          color: var(--text-light);
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .features-list {
          list-style: none;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line-color);
        }

        .features-list li {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          position: relative;
          font-size: 0.95rem;
          color: var(--text-light);
        }

        .features-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-sage);
          font-weight: bold;
        }

        .learn-more {
          margin-top: 1.5rem;
          color: var(--accent-clay);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        .process-section {
          background: #f7f5f0;
          padding: 6rem 0;
          margin-top: 4rem;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-top: 3rem;
        }

        .process-step {
          text-align: center;
        }

        .step-number {
          font-family: 'La Belle Aurore', cursive;
          font-size: 3rem;
          color: var(--accent-clay);
          display: block;
          margin-bottom: 1rem;
        }

        .cta-section {
          background: var(--accent-sage);
          padding: 4rem 2rem;
          border-radius: var(--radius-large);
          text-align: center;
          margin-top: 4rem;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .cta-section p {
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 900px) {
          .page-hero h1 {
            font-size: 3rem;
          }

          .services-grid, .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">What We Offer</span>
          <h1>Our Services</h1>
          <p>Comprehensive intervention and recovery services designed to help families move from crisis to healing.</p>
        </div>
      </div>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              service.link ? (
                <Link key={index} href={service.link} style={{ textDecoration: 'none' }}>
                  <div className="service-card has-link">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className="features-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <div className="learn-more">Learn More →</div>
                  </div>
                </Link>
              ) : (
                <div key={index} className="service-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="features-list">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Our Process</span>
            <h2>How We Work With Families</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>From the first call to long-term recovery, we guide you through every step.</p>
          </div>

          <div className="process-grid">
            <div className="process-step">
              <span className="step-number">01.</span>
              <h3>Initial Consultation</h3>
              <p>Free, confidential assessment of your situation. We listen, ask questions, and determine if intervention is appropriate.</p>
            </div>
            <div className="process-step">
              <span className="step-number">02.</span>
              <h3>Planning & Preparation</h3>
              <p>Family education, treatment center research, financial planning, and rehearsal before the intervention event.</p>
            </div>
            <div className="process-step">
              <span className="step-number">03.</span>
              <h3>The Intervention</h3>
              <p>A structured, compassionate meeting facilitated by professionals with immediate transport to treatment if accepted.</p>
            </div>
            <div className="process-step">
              <span className="step-number">04.</span>
              <h3>Treatment Coordination</h3>
              <p>We stay in contact with the treatment facility and keep the family informed of progress and any concerns.</p>
            </div>
            <div className="process-step">
              <span className="step-number">05.</span>
              <h3>Aftercare Planning</h3>
              <p>Before discharge, we create a detailed aftercare plan including sober living, outpatient therapy, and family support.</p>
            </div>
            <div className="process-step">
              <span className="step-number">06.</span>
              <h3>Ongoing Support</h3>
              <p>Continued family coaching, relapse prevention, and system healing for long-term recovery success.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="cta-section">
            <h2>Every Family's Situation is Unique</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              We don't believe in one-size-fits-all interventions. Let's discuss your specific needs and create a customized plan.
            </p>
            <Link href="/is-it-time" className="btn btn-light">Schedule Your Free Consultation</Link>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0 }}>Available 24/7 for crisis situations • +1 (949) 230-4575</p>
          </div>
        </div>
      </section>
    
    </>
  );
}
