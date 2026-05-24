import Link from 'next/link';

export default function NationalPage() {
  return (
    <>
    <style>{`
        .hero-section-area {
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          color: white;
          padding: 6rem 0 4rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .hero-content-area {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          margin-bottom: 1.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .content-section {
          padding: 5rem 0;
          position: relative;
        }

        .scrapbook-card {
          background: white;
          border-radius: var(--radius-soft);
          padding: 2.5rem;
          box-shadow: var(--shadow-soft);
          position: relative;
          margin-bottom: 2rem;
        }

        .scrapbook-card::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 25px;
          background: rgba(210, 180, 140, 0.3);
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        }

        .scrapbook-card::after {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%);
          box-shadow: 
            20px 0 0 rgba(0,0,0,0.2),
            -20px 0 0 rgba(0,0,0,0.2);
        }

        .region-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          margin-top: 3rem;
        }

        .region-card {
          background: white;
          border-radius: var(--radius-soft);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: all 0.3s ease;
          transform: rotate(-0.5deg);
        }

        .region-card:nth-child(even) {
          transform: rotate(0.5deg);
        }

        .region-card:hover {
          transform: rotate(0deg) translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .region-header {
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .region-header h3 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .region-body {
          padding: 2rem;
        }

        .city-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .city-tag {
          background: linear-gradient(135deg, #f7f5f0 0%, #e8e5df 100%);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          border: 1px solid var(--line-color);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }

        .feature-item {
          text-align: center;
          padding: 2rem 1rem;
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
          color: white;
          box-shadow: var(--shadow-soft);
        }

        .coverage-banner {
          background: linear-gradient(135deg, #f7f5f0 0%, white 100%);
          border-radius: var(--radius-large);
          padding: 3rem;
          text-align: center;
          border: 2px dashed var(--accent-sage);
          margin: 4rem 0;
          position: relative;
        }

        .coverage-banner::before {
          content: '📍';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          background: white;
          padding: 0 1rem;
        }

        @media (max-width: 768px) {
          .hero-section-area {
            padding: 5rem 0 3rem 0;
          }

          .region-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .region-card {
            transform: rotate(0deg);
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <div className="hero-section-area">
        <div className="container hero-content-area">
          <div className="hero-badge">🇺🇸 Nationwide Services</div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>
            Professional Intervention Services Across America
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            From coast to coast, we're here to help families find hope and healing
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="tel:+19492304575" className="btn btn-light" style={{ fontSize: '1.1rem' }}>
              <i className="ri-phone-line text-xl" style={{ marginRight: "0.5rem" }}></i>
              +1 (949) 230-4575
            </a>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="content-section">
        <div className="container">
          
          {/* INTRO */}
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem auto' }}>
            <h2>We Come to You</h2>
            <p style={{ fontSize: '1.1rem' }}>
              No matter where you are in the United States, An Invite To Life brings decades
              of experience and compassionate expertise directly to your family.
            </p>
          </div>

          {/* FEATURES */}
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="ri-map-pin-2-line text-3xl "></i>
              </div>
              <h4>All 50 States</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Complete coverage nationwide
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="ri-time-line text-3xl "></i>
              </div>
              <h4>24/7 Response</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Crisis support anytime
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="ri-group-line text-2xl"></i>
              </div>
              <h4>Local Resources</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                Treatment partnerships everywhere
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="ri-award-line text-2xl"></i>
              </div>
              <h4>Proven Results</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                1000+ successful interventions
              </p>
            </div>
          </div>

          {/* PRIMARY REGIONS */}
          <div style={{ marginTop: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">PRIMARY SERVICE AREAS</span>
              <h2>Where We Have the Deepest Roots</h2>
            </div>

            <div className="region-grid">
              {/* ORANGE COUNTY */}
              <div className="region-card">
                <div className="region-header">
                  <i className="ri-map-pin-2-line text-4xl"></i>
                  <h3>Orange County</h3>
                  <p style={{ marginBottom: 0, opacity: 0.9 }}>Our Home Base</p>
                </div>
                <div className="region-body">
                  <div className="city-list">
                    <span className="city-tag">Irvine</span>
                    <span className="city-tag">Newport Beach</span>
                    <span className="city-tag">Costa Mesa</span>
                    <span className="city-tag">Anaheim</span>
                    <span className="city-tag">Huntington Beach</span>
                    <span className="city-tag">Laguna Beach</span>
                  </div>
                  <p style={{ marginBottom: 0 }}>
                    Local knowledge and immediate response throughout Orange County and Southern California.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NATIONWIDE COVERAGE */}
          <div className="coverage-banner">
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-clay)' }}>
              Beyond Orange County
            </h3>
            <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              While Orange County is our home base, we provide full intervention 
              services anywhere in the United States. We'll travel to you, bringing the same professional 
              care and established treatment connections nationwide.
            </p>
          </div>

          {/* WHAT YOU GET */}
          <div className="scrapbook-card" style={{ marginTop: '4rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>What National Coverage Means for You</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--accent-sage)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-heart-line text-2xl"></i>
                  Personalized Care
                </h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  Every intervention is tailored to your family's unique situation and location
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent-sage)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-map-pin-2-line text-xl "></i>
                  Regional Expertise
                </h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  Knowledge of quality treatment centers and resources in your area
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent-sage)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-group-line text-2xl"></i>
                  Travel Coordination
                </h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  We handle all logistics to bring professional help to your doorstep
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ 
        padding: '5rem 0',
        background: 'linear-gradient(135deg, var(--text-main) 0%, #3d3a36 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2.5rem' }}>
            Ready to Take the First Step?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
            Distance is never a barrier when it comes to saving a life. Let's talk about how we can help your family.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+19492304575" className="btn btn-light" style={{ fontSize: '1.1rem' }}>
              Call Now: +1 (949) 230-4575
            </a>
            <Link href="/is-it-time" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', fontSize: '1.1rem' }}>
              Is It Time for an Intervention?
            </Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
