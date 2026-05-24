import Link from 'next/link';

export default function AftercarePage() {
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

        .components-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin: 3rem 0;
        }

        .component-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          border-top: 3px solid var(--accent-sage);
        }

        .component-card h4 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
        }

        .stat-box {
          background: #f7f5f0;
          padding: 2rem;
          border-radius: var(--radius-soft);
          text-align: center;
          margin: 3rem 0;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          color: var(--accent-clay);
          display: block;
          margin-bottom: 0.5rem;
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
          color: var(--accent-sage);
          font-weight: bold;
        }

        @media (max-width: 900px) {
          .page-hero h1 {
            font-size: 3rem;
          }

          .components-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Long-Term Support</span>
          <h1>Aftercare Planning</h1>
          <p>Treatment is just the beginning. Real recovery happens in the months and years that follow. Our aftercare programs give families the tools to maintain sobriety and heal together.</p>
          <Link href="/services" style={{ color: 'var(--accent-clay)', fontSize: '0.9rem' }}>← Back to All Services</Link>
        </div>
      </div>

      <section className="content-section">
        <div className="container">
          <h2>Why Aftercare Matters</h2>
          <p>The intervention gets your loved one into treatment. The 30, 60, or 90 days in a facility give them the foundation. But the real test comes when they return to "real life"—the same environment, the same triggers, the same relationships that contributed to the addiction in the first place.</p>
          
          <p>Without a structured aftercare plan, relapse rates skyrocket. With proper support, recovery becomes sustainable.</p>

          <div className="stat-box">
            <span className="stat-number">70%</span>
            <p style={{ marginBottom: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>
              <strong>Relapse rates drop by 70%</strong> when individuals complete a comprehensive aftercare program compared to those who don't.
            </p>
          </div>

          <h2>Our Aftercare Components</h2>
          <p>We create customized aftercare plans that address the individual's needs and the family's healing process.</p>

          <div className="components-grid">
            <div className="component-card">
              <h4>Ongoing Progress Assessment</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Weekly check-ins during the first 90 days, then monthly for the first year. We monitor compliance with the aftercare plan and adjust as needed.
              </p>
            </div>

            <div className="component-card">
              <h4>Sober Living Coordination</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                For those not ready to return home immediately, we help secure placement in reputable sober living environments with structure and accountability.
              </p>
            </div>

            <div className="component-card">
              <h4>Outpatient Therapy Placement</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Connection to individual therapists, group therapy, and 12-step or alternative support groups in the person's community.
              </p>
            </div>

            <div className="component-card">
              <h4>Family Therapy Coordination</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                The family needs healing too. We arrange family therapy sessions to rebuild trust, establish boundaries, and learn new communication patterns.
              </p>
            </div>

            <div className="component-card">
              <h4>Employment & Education Support</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Assistance with re-entry into the workforce or school, including resume building, interview preparation, and vocational counseling.
              </p>
            </div>

            <div className="component-card">
              <h4>Relapse Prevention Planning</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Identifying triggers, creating coping strategies, and establishing an emergency protocol if warning signs appear.
              </p>
            </div>

            <div className="component-card">
              <h4>Medication Management</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                For those on medication-assisted treatment (MAT) or psychiatric medications, we ensure proper prescriber follow-up.
              </p>
            </div>

            <div className="component-card">
              <h4>Legal & Financial Guidance</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Referrals to attorneys if needed for legal consequences, and financial counseling to address debt or money management issues.
              </p>
            </div>
          </div>

          <h2 style={{ marginTop: '4rem' }}>Family Aftercare: Healing the System</h2>
          <p>Recovery isn't just for the individual—the entire family needs to heal from the trauma of addiction.</p>

          <ul className="feature-list">
            <li><strong>Boundary Setting Workshops:</strong> Learning how to say no without guilt, and yes without resentment.</li>
            <li><strong>Codependency Recovery:</strong> Breaking the patterns that enabled the addiction to thrive.</li>
            <li><strong>Communication Skills:</strong> Moving from blame and shame to honest, respectful dialogue.</li>
            <li><strong>Self-Care for Caregivers:</strong> Families often neglect their own mental health. We help you rebuild yours.</li>
            <li><strong>Relapse Response Planning:</strong> If relapse occurs, the family knows exactly what to do instead of panicking or enabling.</li>
          </ul>

          <div style={{ background: 'var(--accent-sage)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-soft)', marginTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Aftercare is Not Optional</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              We don't consider an intervention successful until the person has completed at least 90 days of aftercare. 
              That's when real change becomes sustainable.
            </p>
            <Link href="/is-it-time" className="btn btn-light">Start Planning Now</Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
