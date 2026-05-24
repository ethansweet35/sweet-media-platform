import Link from 'next/link';

export default function InterventionsPage() {
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

        .content-section {
          padding: 4rem 0;
          max-width: 900px;
          margin: 0 auto;
        }

        .models-section {
          padding: 6rem 0;
          background: #f7f5f0;
        }

        .model-card {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          margin-bottom: 3rem;
          border-left: 6px solid var(--accent-clay);
        }

        .model-card h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .model-card .label {
          display: inline-block;
          background: var(--accent-clay);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .best-for {
          background: #f7f5f0;
          padding: 1.5rem;
          border-radius: var(--radius-soft);
          margin-top: 1.5rem;
        }

        .best-for h4 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }

        ul.feature-list {
          list-style: none;
          margin-top: 1rem;
        }

        ul.feature-list li {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          position: relative;
          color: var(--text-light);
        }

        ul.feature-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-clay);
          font-weight: bold;
        }

        @media (max-width: 900px) {
          .page-hero h1 {
            font-size: 3rem;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Professional Facilitation</span>
          <h1>Intervention Services</h1>
          <p>A professionally facilitated intervention is a structured conversation designed to help your loved one see their situation clearly and accept help immediately.</p>
          <Link href="/services" style={{ color: 'var(--accent-clay)', fontSize: '0.9rem' }}>← Back to All Services</Link>
        </div>
      </div>

      <section className="content-section">
        <div className="container">
          <h2>Why Professional Intervention Matters</h2>
          <p>You may have already tried to talk to your loved one. Perhaps many times. The disease of addiction creates powerful defense mechanisms—denial, minimization, blame-shifting—that make it nearly impossible for the person to see their situation objectively.</p>
          
          <p>A professional interventionist brings:</p>
          <ul className="feature-list">
            <li><strong>Objectivity:</strong> We're not emotionally entangled in the family system, allowing us to guide the conversation without triggering defensive reactions.</li>
            <li><strong>Structure:</strong> A clear process that keeps the intervention on track and prevents it from devolving into argument or chaos.</li>
            <li><strong>Safety:</strong> We assess risk factors and create a safe environment for difficult truths to be spoken.</li>
            <li><strong>Immediate Action:</strong> Treatment centers are researched, beds are secured, and transport is arranged before the intervention even begins.</li>
            <li><strong>Family Preparation:</strong> We educate and rehearse with the family so everyone understands their role.</li>
          </ul>

          <div style={{ background: 'var(--accent-sage)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-soft)', marginTop: '3rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Success Rates</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 0 }}>
              Professionally facilitated interventions have a success rate of over 85%. Even when the loved one initially refuses, most accept help within 48-72 hours once they realize the family is united and boundaries are being enforced.
            </p>
          </div>
        </div>
      </section>

      <section className="models-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-label">Our Approaches</span>
            <h2>Intervention Models We Use</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>We tailor our approach based on your loved one's specific situation, personality, and risk factors.</p>
          </div>

          <div className="model-card">
            <div className="label">Invitational Approach</div>
            <h3>The ARISE Model</h3>
            <p>The ARISE model is a transparent, non-confrontational approach. Unlike traditional interventions where the loved one is surprised, ARISE invites the "Person of Concern" to join the process from the very beginning.</p>
            <p>We work together as a respectful family committee. There are no secrets, no coercion, and no ambushes. This model preserves trust and is highly effective for individuals who are resistant to authority but value their family relationships.</p>
            
            <div className="best-for">
              <h4>Best For:</h4>
              <ul className="feature-list">
                <li>Individuals who respond well to transparency and collaboration</li>
                <li>Families where trust hasn't been completely broken</li>
                <li>Those resistant to traditional "surprise" interventions</li>
                <li>Situations where the person has some insight into their problem</li>
              </ul>
            </div>
          </div>

          <div className="model-card" style={{ borderLeftColor: 'var(--accent-sage)' }}>
            <div className="label" style={{ background: 'var(--accent-sage)' }}>Traditional Model</div>
            <h3>The Johnson Model</h3>
            <p>This is the "traditional" intervention model often seen in media, but utilized with deep compassion and clinical expertise. The family meets secretly to prepare, followed by a structured intervention where the loved one is presented with a clear choice: Treatment or Consequences.</p>
            <p>While more directive than ARISE, it is sometimes the only safe and effective option when the person lacks insight, poses a danger to themselves or others, or when transparency might lead to flight or escalation.</p>
            
            <div className="best-for">
              <h4>When We Use This:</h4>
              <ul className="feature-list">
                <li>Imminent danger of overdose, suicide, or medical crisis</li>
                <li>History of fleeing when confronted about substance use</li>
                <li>Severe denial or psychosis preventing rational conversation</li>
                <li>Previous "soft" attempts have been manipulated</li>
                <li>Legal consequences are pending (arrest, DUI, custody loss)</li>
              </ul>
            </div>
          </div>

          <div className="model-card" style={{ borderLeftColor: 'var(--accent-gold)' }}>
            <div className="label" style={{ background: 'var(--accent-gold)', color: 'var(--text-main)' }}>Systemic Approach</div>
            <h3>Family System Model</h3>
            <p>Addiction is a family disease. The "Identified Patient" is often just the symptom of a larger dysfunction within the family unit. This model shifts the focus from "fixing them" to "healing us."</p>
            <p>We work to identify codependency, enabling behaviors, and communication breakdowns. By changing how the family operates, we change the environment, making it impossible for the addiction to thrive as it once did.</p>
            
            <div className="best-for">
              <h4>Best For:</h4>
              <ul className="feature-list">
                <li>Long-standing patterns of enabling and codependency</li>
                <li>Multiple family members struggling with addiction or mental health</li>
                <li>Generational trauma or dysfunction</li>
                <li>Families where boundaries have never been established</li>
                <li>Situations requiring long-term family system healing</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'white', borderRadius: 'var(--radius-soft)', boxShadow: 'var(--shadow-card)' }}>
            <h3>Not Sure Which Model is Right?</h3>
            <p>During your free consultation, we'll assess your situation and recommend the most effective approach for your family.</p>
            <Link href="/is-it-time" className="btn" style={{ marginTop: '1rem' }}>Schedule Your Consultation</Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
