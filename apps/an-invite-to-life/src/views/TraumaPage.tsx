import Link from 'next/link';

export default function TraumaPage() {
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

        .quote-box {
          background: #f7f5f0;
          padding: 3rem;
          border-left: 6px solid var(--accent-clay);
          margin: 3rem 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-style: italic;
          line-height: 1.6;
        }

        .trauma-types-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin: 3rem 0;
        }

        .trauma-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
        }

        .trauma-card h4 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: var(--text-main);
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

        .approach-section {
          background: var(--accent-sage);
          color: white;
          padding: 4rem 2rem;
          border-radius: var(--radius-large);
          margin: 4rem 0;
        }

        .approach-section h3 {
          color: white;
          margin-bottom: 1.5rem;
        }

        .approach-section p {
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 900px) {
          .page-hero h1 {
            font-size: 3rem;
          }

          .trauma-types-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Trauma-Informed Care</span>
          <h1>Trauma Services</h1>
          <p>Most addiction is a symptom of unresolved trauma. We don't just treat the substance—we address the wound underneath.</p>
          <Link href="/services" style={{ color: 'var(--accent-clay)', fontSize: '0.9rem' }}>← Back to All Services</Link>
        </div>
      </div>

      <section className="content-section">
        <div className="container">
          <h2>The Trauma-Addiction Connection</h2>
          <p>At An Invite To Life, we understand that addiction often stems from "numbing out" past experiences with trauma and abuse. This personal insight has shaped our entire approach to intervention.</p>
          
          <p>The research is clear: trauma and addiction are deeply intertwined. People don't use drugs or alcohol because they feel good—they use them because they feel bad, and they need relief.</p>

          <div className="quote-box">
            "The question is not 'Why the addiction?' but 'Why the pain?'"
            <div style={{ marginTop: '1rem', fontSize: '1rem', fontStyle: 'normal' }}>— Dr. Gabor Maté</div>
          </div>

          <h2>Types of Trauma We Address</h2>
          <div className="trauma-types-grid">
            <div className="trauma-card">
              <h4>Childhood Abuse & Neglect</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Physical, emotional, or sexual abuse in childhood creates lasting wounds. Many people don't even recognize the connection between their past and their present addiction.
              </p>
            </div>

            <div className="trauma-card">
              <h4>Complex PTSD</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Repeated, chronic trauma (domestic violence, war, long-term abuse) creates a different kind of PTSD that requires specialized treatment.
              </p>
            </div>

            <div className="trauma-card">
              <h4>Sexual Trauma</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Rape, molestation, or sexual assault often leads to shame-based addiction as a coping mechanism. We create safe spaces for disclosure and healing.
              </p>
            </div>

            <div className="trauma-card">
              <h4>Combat-Related PTSD</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Veterans face unique trauma that requires understanding of military culture and combat experiences. We connect with veteran-specific treatment programs.
              </p>
            </div>

            <div className="trauma-card">
              <h4>Medical Trauma</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Life-threatening illness, painful procedures, or chronic pain can lead to prescription drug dependence and PTSD around medical settings.
              </p>
            </div>

            <div className="trauma-card">
              <h4>Attachment Trauma</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Abandonment, adoption, foster care, or unstable caregiving creates deep wounds around trust and connection that fuel addictive behaviors.
              </p>
            </div>
          </div>

          <h2 style={{ marginTop: '4rem' }}>Our Trauma-Informed Approach</h2>
          <p>When trauma is at the root of addiction, traditional intervention methods can actually cause harm. A confrontational approach can trigger fight-or-flight responses and re-traumatize the person.</p>

          <p>Instead, we use trauma-informed principles:</p>

          <ul className="feature-list">
            <li><strong>Safety First:</strong> Creating a physically and emotionally safe environment for the intervention.</li>
            <li><strong>Trustworthiness:</strong> Being transparent about the process and honoring commitments.</li>
            <li><strong>Peer Support:</strong> When appropriate, connecting the person with others who have healed from similar trauma.</li>
            <li><strong>Collaboration:</strong> Working with the person, not doing things to them or for them.</li>
            <li><strong>Empowerment:</strong> Helping them reclaim control rather than reinforcing helplessness.</li>
            <li><strong>Cultural Sensitivity:</strong> Understanding how gender, race, and culture affect trauma and healing.</li>
          </ul>

          <div className="approach-section">
            <h3>Trauma Assessment & Treatment Planning</h3>
            <p>Before we recommend a treatment facility, we conduct a trauma assessment to understand:</p>
            <ul className="feature-list">
              <li>What traumatic events have occurred in the person's life</li>
              <li>How these events are connected to their addiction</li>
              <li>What triggers are present in their current environment</li>
              <li>What level of trauma-specific treatment is needed (trauma-focused therapy, EMDR, somatic experiencing, etc.)</li>
              <li>Whether the treatment facility has staff trained in trauma care</li>
            </ul>
            <p style={{ marginTop: '2rem' }}>We only refer to facilities that can address both the addiction and the underlying trauma simultaneously. Treating one without the other is a recipe for relapse.</p>
          </div>

          <h2>Trauma Education for Families</h2>
          <p>Families often don't understand why their loved one "can't just stop" or why they keep using despite devastating consequences. Trauma education helps families:</p>

          <ul className="feature-list">
            <li>Understand that addiction is a symptom, not the core problem</li>
            <li>Recognize how their own responses may be triggering</li>
            <li>Learn to provide support without enabling</li>
            <li>Begin their own healing from secondary trauma (the trauma of loving someone with addiction)</li>
            <li>Rebuild trust through trauma-informed communication</li>
          </ul>

          <div style={{ background: '#f7f5f0', padding: '3rem', borderRadius: 'var(--radius-soft)', marginTop: '4rem', textAlign: 'center' }}>
            <h3>Workshops Available</h3>
            <p>We offer trauma education workshops for families and organizations. Topics include:</p>
            <ul className="feature-list" style={{ textAlign: 'left', maxWidth: '600px', margin: '2rem auto' }}>
              <li>Understanding the Trauma-Addiction Connection</li>
              <li>How Childhood Trauma Affects Adult Behavior</li>
              <li>PTSD and Substance Abuse in Veterans</li>
              <li>Supporting a Trauma Survivor Without Enabling</li>
              <li>Secondary Trauma: When Caregivers Need Care</li>
            </ul>
            <Link href="/is-it-time" className="btn">Learn More About Our Workshops</Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
