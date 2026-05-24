import Link from 'next/link';

export default function IsItTimePage() {
  return (
    <>
    <style>{`
        .page-hero {
          padding: 6rem 0 4rem 0;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .page-hero h1 {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .checklist-section {
          padding: 4rem 0 6rem 0;
          background-color: #f4f1ea;
        }

        .checklist-section::before {
          content: "";
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background-color: #f4f1ea;
          clip-path: polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%);
        }

        .checklist-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .checklist-card {
          background: #fff;
          padding: 3rem;
          border-radius: 2px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          background-image: linear-gradient(#e5e5e5 1px, transparent 1px);
          background-size: 100% 2rem;
          line-height: 2rem;
        }

        .checklist-card h3 {
          margin-bottom: 2rem;
          background: #fff;
          display: inline-block;
          padding-right: 1rem;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .check-box {
          min-width: 20px;
          height: 20px;
          border: 1px solid var(--accent-clay);
          margin-right: 15px;
          margin-top: 6px;
          position: relative;
        }

        .check-box::after {
          content: '✓';
          position: absolute;
          color: var(--accent-clay);
          font-size: 1.2rem;
          top: -10px;
          left: 2px;
        }

        .content-section {
          padding: 4rem 0;
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-box {
          background: var(--accent-sage);
          color: white;
          padding: 3rem;
          border-radius: var(--radius-soft);
          text-align: center;
          margin-top: 4rem;
        }

        .cta-box h3 {
          color: white;
          margin-bottom: 1rem;
        }

        .cta-box p {
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 900px) {
          .checklist-grid {
            grid-template-columns: 1fr;
          }
          
          .page-hero h1 {
            font-size: 3rem;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Assessment</span>
          <h1>Is It Time for an Intervention?</h1>
          <p>Families often wait until "rock bottom" to act, but the disease of addiction progresses faster than hope does. If you recognize these patterns, professional guidance is your next step.</p>
        </div>
      </div>

      <section className="checklist-section" style={{ position: 'relative' }}>
        <div className="container">
          <div className="checklist-grid">
            <div className="checklist-card">
              <h3>Warning Signs: Substance Abuse</h3>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Failed promises to quit or cut down</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Disappearing for days or unexplained absences</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Financial instability or theft from family</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Extreme defensiveness when topic is raised</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Physical signs: weight loss, track marks, dilated pupils</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Job loss or academic failure</p>
              </div>
            </div>

            <div className="checklist-card">
              <h3>Warning Signs: Mental Health</h3>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Severe mood swings or depression</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Isolation from friends and family</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Expressions of hopelessness or suicidal thoughts</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Inability to maintain daily responsibilities</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Paranoia or break from reality</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Refusing help despite obvious decline</p>
              </div>
            </div>

            <div className="checklist-card">
              <h3>Family System Indicators</h3>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Walking on eggshells to avoid confrontation</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Making excuses for their behavior</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Providing money or shelter despite promises</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Family members arguing about how to help</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Keeping the addiction secret from others</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Your own mental health is suffering</p>
              </div>
            </div>

            <div className="checklist-card">
              <h3>Crisis Indicators - Act Now</h3>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Recent overdose or medical emergency</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Threats of violence to self or others</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Legal consequences pending (DUI, arrest)</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Psychotic episode or manic behavior</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Involvement in dangerous situations</p>
              </div>
              <div className="checklist-item">
                <div className="check-box"></div>
                <p style={{ margin: 0 }}>Complete loss of contact or whereabouts unknown</p>
              </div>
            </div>
          </div>

          <div className="handwritten" style={{ fontSize: '2rem', textAlign: 'center', margin: '3rem 0' }}>
            You are not overreacting. You are being responsible.
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Why Professional Help Matters</h2>
          <p>You may have tried to talk to your loved one before. Perhaps multiple times. The disease of addiction creates a powerful defense mechanism that makes it nearly impossible for the person to see their own situation clearly.</p>
          
          <p>A professional interventionist brings:</p>
          <ul style={{ listStyle: 'none', marginTop: '2rem' }}>
            <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-clay)', fontWeight: 'bold' }}>→</span>
              <strong>Objectivity:</strong> We're not emotionally entangled, so we can guide the conversation without blame or shame.
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-clay)', fontWeight: 'bold' }}>→</span>
              <strong>Structure:</strong> We create a safe environment where your loved one can hear the truth.
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-clay)', fontWeight: 'bold' }}>→</span>
              <strong>Immediate Action:</strong> We have treatment centers ready and transport arranged.
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-clay)', fontWeight: 'bold' }}>→</span>
              <strong>Family Healing:</strong> We help the entire family system recover, not just the individual.
            </li>
          </ul>

          <div className="cta-box">
            <h3>Ready to Take the First Step?</h3>
            <p>We offer a free, confidential consultation to assess your situation and create a plan.</p>
            <a href="mailto:jenat10@yahoo.com" className="btn btn-light" style={{ marginTop: '1.5rem' }}>Schedule Your Consultation</a>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0 }}>Available 24/7 for crisis situations • +1 (949) 230-4575</p>
          </div>
        </div>
      </section>
    
    </>
  );
}
