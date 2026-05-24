import Link from 'next/link';

export default function ConditionsPage() {
  const conditions = [
    {
      title: "Drug Addiction",
      description: "Comprehensive intervention planning for opioid dependence, stimulant addiction, prescription drug abuse, and polysubstance use disorders.",
      details: [
        "Opioid addiction (heroin, fentanyl, prescription painkillers)",
        "Stimulant abuse (cocaine, methamphetamine, Adderall)",
        "Benzodiazepine dependence",
        "Prescription drug misuse",
        "Polysubstance abuse"
      ]
    },
    {
      title: "Alcoholism",
      description: "Expert services in alcohol addiction treatment and effective alcoholic interventions for individuals and families throughout Orange County, California.",
      details: [
        "Alcohol Use Disorder (AUD)",
        "Binge drinking patterns",
        "High-functioning alcoholism",
        "Medical detox coordination",
        "Family education on enabling vs. support"
      ]
    },
    {
      title: "Trauma & PTSD",
      description: "Specialized trauma assessment and treatment planning with a focus on childhood abuse, complex PTSD, and trauma-informed intervention.",
      details: [
        "Childhood abuse and neglect",
        "Complex PTSD",
        "Sexual trauma",
        "Combat-related PTSD",
        "Trauma as root cause of addiction"
      ]
    },
    {
      title: "Sex Addiction & Compulsivity",
      description: "Discrete, compassionate intervention for sexual addiction, sexual compulsivity, and exploitative relationships.",
      details: [
        "Compulsive sexual behavior",
        "Pornography addiction",
        "Infidelity patterns",
        "Exploitative relationships",
        "Sexual trauma recovery"
      ]
    },
    {
      title: "Co-Dependency & Toxic Relationships",
      description: "Breaking patterns of co-dependency and helping families establish healthy boundaries and communication.",
      details: [
        "Codependent relationship patterns",
        "Enabling behaviors",
        "Toxic family dynamics",
        "Boundary setting",
        "Healing family systems"
      ]
    },
    {
      title: "Eating Disorders",
      description: "Specialized intervention for anorexia nervosa and bulimia with medical stabilization coordination and compassionate care.",
      details: [
        "Anorexia nervosa",
        "Bulimia nervosa",
        "Binge eating disorder",
        "Medical monitoring coordination",
        "Body dysmorphia"
      ]
    },
    {
      title: "Gambling Addiction",
      description: "Intervention for compulsive gambling that addresses financial devastation, family impact, and underlying behavioral patterns.",
      details: [
        "Compulsive gambling",
        "Online gambling addiction",
        "Financial crisis management",
        "Family debt counseling",
        "Relapse prevention planning"
      ]
    },
    {
      title: "Process Addictions",
      description: "Behavioral addictions beyond substances that destroy lives: gaming, shopping, internet, and other compulsive behaviors.",
      details: [
        "Gaming addiction",
        "Internet and social media addiction",
        "Compulsive shopping",
        "Work addiction",
        "Exercise addiction"
      ]
    },
    {
      title: "Dual Diagnosis",
      description: "When addiction is paired with mental health disorders. We only refer to facilities clinically equipped to treat both simultaneously.",
      details: [
        "Addiction + Depression",
        "Addiction + Bipolar Disorder",
        "Addiction + Anxiety Disorders",
        "Addiction + Schizophrenia",
        "Concurrent disorder treatment"
      ]
    },
    {
      title: "Adolescent & Teen Issues",
      description: "Age-appropriate intervention for teenagers struggling with substance abuse, mental health, or behavioral issues.",
      details: [
        "Teen substance abuse",
        "School refusal",
        "Self-harm behaviors",
        "Oppositional defiant disorder",
        "Parent-child communication breakdown"
      ]
    },
    {
      title: "Geriatric Addiction",
      description: "Specialized intervention for older adults facing late-onset addiction or long-term substance dependence.",
      details: [
        "Prescription medication misuse",
        "Late-onset alcoholism",
        "Isolation and depression",
        "Age-appropriate treatment placement",
        "Family caregiver support"
      ]
    },
    {
      title: "Generational Wealth Issues",
      description: "Addressing unique challenges when addiction intersects with significant family wealth and enabling resources.",
      details: [
        "Trust fund enabling",
        "Access to unlimited resources",
        "Family business complications",
        "Financial boundaries",
        "Discrete, executive-level care"
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

        .conditions-section {
          padding: 4rem 0 6rem 0;
        }

        .conditions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
        }

        .condition-card {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          border-top: 4px solid var(--accent-clay);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .condition-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }

        .condition-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        }

        .condition-card > p {
          color: var(--text-light);
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .details-list {
          list-style: none;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line-color);
        }

        .details-list li {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          position: relative;
          font-size: 0.95rem;
          color: var(--text-light);
        }

        .details-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-clay);
          font-weight: bold;
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

          .conditions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">What We Treat</span>
          <h1>Conditions & Specializations</h1>
          <p>Addiction is rarely just about the substance. We treat the whole person, addressing the underlying trauma, mental health conditions, and behavioral patterns that fuel the cycle.</p>
        </div>
      </div>

      <section className="conditions-section">
        <div className="container">
          <div className="conditions-grid">
            {conditions.map((condition, index) => (
              <div key={index} className="condition-card">
                <h3>{condition.title}</h3>
                <p>{condition.description}</p>
                <ul className="details-list">
                  {condition.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2>Not Sure What You're Dealing With?</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              Many families struggle to identify the exact nature of their loved one's issues. That's where we come in. 
              During your free consultation, we'll help you understand what you're facing and create a clear path forward.
            </p>
            <Link href="/is-it-time" className="btn btn-light">Schedule Your Free Consultation</Link>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0 }}>Available 24/7 • +1 (949) 230-4575</p>
          </div>
        </div>
      </section>
    
    </>
  );
}
