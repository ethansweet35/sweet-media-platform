import Link from 'next/link';

export default function ServiceAreasPage() {
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

        .service-areas-section {
          padding: 4rem 0 6rem 0;
        }

        .areas-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          margin: 4rem 0;
        }

        .area-card {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-top: 4px solid var(--accent-sage);
        }

        .area-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .area-card.international {
          border-top-color: var(--accent-clay);
        }

        .area-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-soft);
        }

        .area-card.international .area-icon {
          background: linear-gradient(135deg, var(--accent-clay) 0%, #a67761 100%);
        }

        .area-card h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .area-card .btn {
          margin-top: 1.5rem;
        }

        .coverage-highlights {
          background: #f7f5f0;
          padding: 4rem 2rem;
          border-radius: var(--radius-large);
          margin-top: 4rem;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-top: 3rem;
        }

        .highlight-item {
          text-align: center;
        }

        .highlight-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          color: var(--accent-clay);
        }

        @media (max-width: 900px) {
          .page-hero h1 {
            font-size: 3rem;
          }

          .areas-grid, .highlights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Where We Serve</span>
          <h1>Service Areas</h1>
          <p>
            Based in Orange County, California with national and international reach. We bring professional
            intervention services wherever families need us.
          </p>
        </div>
      </div>

      <section className="service-areas-section">
        <div className="container">
          
          {/* Main Service Area Cards */}
          <div className="areas-grid">
            <Link href="/service-areas/national" className="area-card">
              <div className="area-icon">
                <i className="ri-map-pin-2-line text-4xl "></i>
              </div>
              <h3>National Services</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '1.05rem' }}>
                Professional intervention services across all 50 states, with deep expertise in 
                Orange County, California and nationwide.
              </p>
              <div className="btn btn-outline">Learn More</div>
            </Link>

            <Link href="/service-areas/international" className="area-card international">
              <div className="area-icon">
                <i className="ri-global-line text-2xl"></i>
              </div>
              <h3>International Services</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '1.05rem' }}>
                Worldwide intervention and repatriation services for families dealing with addiction 
                across borders.
              </p>
              <div className="btn btn-outline">Learn More</div>
            </Link>
          </div>

          {/* Coverage Highlights */}
          <div className="coverage-highlights">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>Comprehensive Coverage</h2>
              <p style={{ maxWidth: '700px', margin: '0 auto' }}>
                No matter where your loved one is located, we have the experience and resources to help.
              </p>
            </div>

            <div className="highlights-grid">
              <div className="highlight-item">
                <i className="ri-map-pin-2-line highlight-icon"></i>
                <h4>Primary Regions</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                  Based in Orange County with nationwide reach
                </p>
              </div>

              <div className="highlight-item">
                <i className="ri-flight-takeoff-line highlight-icon"></i>
                <h4>All 50 States</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                  We travel anywhere in the United States for interventions
                </p>
              </div>

              <div className="highlight-item">
                <i className="ri-global-line highlight-icon"></i>
                <h4>Global Reach</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                  International interventions and repatriation services worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Treatment Network */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-soft)', boxShadow: 'var(--shadow-card)', marginTop: '4rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Treatment Center Network</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>
              Beyond intervention services, we maintain relationships with treatment facilities nationwide, 
              ensuring we can find the right fit regardless of location.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Regional Expertise</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    Orange County treatment centers
                  </li>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    Southeast regional facilities
                  </li>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    Florida luxury treatment programs
                  </li>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    California specialized centers
                  </li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Specialty Facilities</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    Trauma-focused treatment centers
                  </li>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    Executive/professional programs
                  </li>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    LGBTQ+ affirming facilities
                  </li>
                  <li style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-sage)' }}>→</span>
                    Gender-specific treatment
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'var(--accent-sage)', color: 'white', padding: '4rem 2rem', borderRadius: 'var(--radius-large)', marginTop: '4rem', textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Distance is Not a Barrier</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              If your loved one needs help, we'll come to you. Travel fees are included in our comprehensive service packages.
            </p>
            <Link href="/is-it-time" className="btn btn-light">Start the Conversation</Link>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0, color: 'rgba(255,255,255,0.8)' }}>
              Available 24/7 for crisis situations • +1 (949) 230-4575
            </p>
          </div>
        </div>
      </section>
    
    </>
  );
}
