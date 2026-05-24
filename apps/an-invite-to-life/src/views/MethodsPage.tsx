import Link from 'next/link';

export default function MethodsPage() {
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

        .model-specific-section {
          padding: 5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.03);
        }

        .model-specific-section:last-of-type {
          border-bottom: none;
        }

        .model-specific-section:nth-child(even) {
          background-color: #fcfbf9;
        }

        .equal-height-grid {
          display: flex;
          flex-direction: row;
          gap: 4rem;
          align-items: stretch;
        }

        .equal-height-grid.reverse {
          flex-direction: row-reverse;
        }

        .model-content-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .model-card-col {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .model-detail-card {
          background: #fff;
          padding: 3rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-soft);
          flex-grow: 1;
          position: relative;
          border: 1px solid rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card-arise { border-top: 4px solid var(--accent-sage); }
        .card-johnson { border-top: 4px solid var(--accent-clay); }
        .card-family { border-top: 4px solid var(--accent-gold); }

        .model-list-styled {
          list-style: none;
          margin-top: 1.5rem;
        }

        .model-list-styled li {
          margin-bottom: 1rem;
          padding-left: 2rem;
          position: relative;
          font-size: 1rem;
          color: var(--text-light);
        }

        .model-list-styled li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-clay);
          font-weight: bold;
        }

        .model-sticker {
          position: absolute;
          top: -15px;
          right: -10px;
          background: var(--text-main);
          color: #fff;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transform: rotate(3deg);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          z-index: 2;
        }

        @media (max-width: 900px) {
          .page-hero h1 {
            font-size: 3rem;
          }

          .equal-height-grid, .equal-height-grid.reverse {
            flex-direction: column;
          }

          .model-content-col { order: 1; }
          .model-card-col { order: 2; }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Our Methodologies</span>
          <h1>Intervention Methods</h1>
          <p>No two families are the same. Based on the clinical assessment of your loved one, we select the specific model that offers the highest probability of success.</p>
        </div>
      </div>

      {/* MODEL 1: ARISE */}
      <section className="model-specific-section">
        <div className="container">
          <div className="equal-height-grid">
            <div className="model-content-col">
              <h3 style={{ color: 'var(--accent-sage-dark)', fontSize: '2.5rem' }}>The Invitational (ARISE) Model</h3>
              <p>This is a transparent, non-confrontational approach. Unlike traditional methods where the loved one is surprised, the ARISE model invites the "Person of Concern" to join the process from the very beginning.</p>
              <p>We work together as a respectful family committee. There are no secrets, no coercion, and no ambushes. This model preserves trust and is highly effective for individuals who are resistant to authority but value their family relationships.</p>
              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                "The best interventions are the ones that don't feel like interventions."
              </p>
            </div>
            <div className="model-card-col">
              <div className="model-detail-card card-arise">
                <div className="model-sticker">Best For Trust</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem' }}>The 3 Phases of Invitation</h4>
                <ul className="model-list-styled">
                  <li><strong>Phase 1:</strong> The First Call. A specialist coaches a family member to call the loved one and invite them to a meeting.</li>
                  <li><strong>Phase 2:</strong> The Network Meetings. The family meets to discuss the issues openly, often with the loved one present.</li>
                  <li><strong>Phase 3:</strong> The Intervention. If resistance persists, we escalate to a formal intervention with established boundaries.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL 2: JOHNSON */}
      <section className="model-specific-section">
        <div className="container">
          <div className="equal-height-grid reverse">
            <div className="model-content-col">
              <h3 style={{ color: 'var(--accent-clay)', fontSize: '2.5rem' }}>The Johnson Model</h3>
              <p>This is the "traditional" model often seen in media, but utilized with deep compassion. It involves the family meeting secretly to prepare, followed by a surprise intervention where the loved one is presented with a clear choice: Treatment or Boundaries.</p>
              <p>While more directive, it is sometimes the only safe option. We utilize this when the individual lacks the insight to understand their danger, or when transparency might lead to flight or violence.</p>
              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                "Sometimes love has to be tough to be real."
              </p>
            </div>
            <div className="model-card-col">
              <div className="model-detail-card card-johnson">
                <div className="model-sticker" style={{ background: 'var(--accent-clay)' }}>Clinical Necessity</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem' }}>When We Use This</h4>
                <ul className="model-list-styled">
                  <li>When the individual is in <strong>imminent danger</strong> of overdose or death.</li>
                  <li>If there is a history of violence or fleeing when confronted.</li>
                  <li>When the addiction has caused a complete break from reality (psychosis or severe denial).</li>
                  <li>If previous "soft" attempts have been manipulated.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL 3: FAMILY SYSTEM */}
      <section className="model-specific-section">
        <div className="container">
          <div className="equal-height-grid">
            <div className="model-content-col">
              <h3 style={{ color: 'var(--accent-gold)', fontSize: '2.5rem' }}>Family System Model</h3>
              <p>Addiction is a family disease. The "Identified Patient" is often just the symptom of a larger dysfunction within the family unit. This model shifts the focus from "fixing them" to "healing us."</p>
              <p>We work to identify codependency, enabling behaviors, and communication breakdowns. By changing how the family operates, we change the environment, making it impossible for the addiction to thrive as it once did.</p>
              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                "You can't change them, but you can change how you respond to them."
              </p>
            </div>
            <div className="model-card-col">
              <div className="model-detail-card card-family">
                <div className="model-sticker" style={{ background: 'var(--accent-gold)', color: 'var(--text-main)' }}>Long Term</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem' }}>The Shift in Focus</h4>
                <ul className="model-list-styled">
                  <li><strong>From Enabling:</strong> "I'm helping them survive."</li>
                  <li><strong>To Empowering:</strong> "I'm allowing them to experience consequences."</li>
                  <li><strong>From Secrecy:</strong> Hiding the addiction from neighbors/work.</li>
                  <li><strong>To Transparency:</strong> Openly discussing the issue to remove shame.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ background: 'var(--accent-sage)', color: 'white', padding: '4rem 2rem', borderRadius: 'var(--radius-large)', textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Which Model is Right for Your Family?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              During your free consultation, we'll assess your situation and recommend the approach most likely to succeed. 
              Sometimes we use a combination of models, adapting in real-time to what your loved one responds to best.
            </p>
            <Link href="/is-it-time" className="btn btn-light">Schedule Your Consultation</Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
