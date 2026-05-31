export default function InternationalPage() {
  return (
    <>
    <style>{`
        .hero-section-intl {
          background: linear-gradient(135deg, var(--accent-clay) 0%, #a67761 100%);
          color: white;
          padding: 6rem 0 4rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section-intl::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .hero-content-intl {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge-intl {
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
        }

        .service-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin: 4rem 0;
        }

        .service-card-intl {
          background: white;
          border-radius: var(--radius-soft);
          padding: 2.5rem;
          box-shadow: var(--shadow-card);
          transition: all 0.3s ease;
          position: relative;
          border-top: 4px solid var(--accent-clay);
        }

        .service-card-intl:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }

        .service-icon-intl {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--accent-clay) 0%, #a67761 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-soft);
        }

        .highlight-box {
          background: linear-gradient(135deg, #f7f5f0 0%, white 100%);
          border-radius: var(--radius-large);
          padding: 3rem;
          border-left: 5px solid var(--accent-clay);
          margin: 3rem 0;
        }

        .scenario-grid {
          display: grid;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .scenario-item {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          border-left: 3px solid var(--accent-sage);
          transition: all 0.3s ease;
        }

        .scenario-item:hover {
          border-left-color: var(--accent-clay);
          transform: translateX(5px);
        }

        .scenario-item h4 {
          color: var(--accent-clay);
          margin-bottom: 0.5rem;
        }

        .feature-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin: 2rem 0;
        }

        .badge-item {
          background: white;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          color: var(--text-main);
          transition: all 0.3s ease;
        }

        .badge-item:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-hover);
        }

        .process-steps {
          display: grid;
          gap: 2rem;
          margin-top: 3rem;
          position: relative;
        }

        .process-step {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--accent-clay) 0%, #a67761 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: var(--shadow-soft);
        }

        @media (max-width: 768px) {
          .hero-section-intl {
            padding: 5rem 0 3rem 0;
          }

          .service-showcase {
            grid-template-columns: 1fr;
          }

          .process-step {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .step-number {
            margin: 0 auto;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <div className="hero-section-intl">
        <div className="container hero-content-intl">
          <div className="hero-badge-intl">🌍 Global Services</div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>
            Intervention Without Borders
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Helping families worldwide navigate the path to recovery
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
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 5rem auto' }}>
            <h2>Addiction Knows No Borders</h2>
            <p style={{ fontSize: '1.1rem' }}>
              Whether your loved one is studying abroad, working internationally, or living overseas,
              An Invite To Life extends our professional services around the globe. We bring
              decades of experience and compassionate care to families wherever they need us.
            </p>
          </div>

          {/* SERVICES SHOWCASE */}
          <div className="service-showcase">
            <div className="service-card-intl">
              <div className="service-icon-intl">
                <i className="ri-flight-takeoff-line text-2xl"></i>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>On-Site Interventions</h3>
              <p>
                We travel internationally to conduct professional interventions wherever your loved one 
                is located, bringing our expertise and compassionate approach across continents.
              </p>
            </div>

            <div className="service-card-intl">
              <div className="service-icon-intl">
                <i className="ri-global-line text-2xl"></i>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Repatriation Services</h3>
              <p>
                Coordinate safe return to the United States for treatment, including planning, 
                documentation, and sober transportation with continuity of care.
              </p>
            </div>

            <div className="service-card-intl">
              <div className="service-icon-intl">
                <i className="ri-heart-line text-2xl"></i>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Remote Support</h3>
              <p>
                Comprehensive family coaching and intervention planning via secure video conferencing 
                for families based internationally.
              </p>
            </div>
          </div>

          {/* WHAT SETS US APART */}
          <div style={{ marginTop: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">OUR GLOBAL CAPABILITIES</span>
              <h2>Why Families Trust Us Internationally</h2>
            </div>

            <div className="feature-badges">
              <div className="badge-item">
                <i className="ri-global-line text-2xl"></i>
                <span>Worldwide Network</span>
              </div>
              <div className="badge-item">
                <i className="ri-shield-check-line style={{ color: 'var(--accent-clay)' }} "></i>
                <span>Cultural Sensitivity</span>
              </div>
              <div className="badge-item">
                <i className="ri-time-line style={{ color: 'var(--accent-clay)' }} "></i>
                <span>24/7 Availability</span>
              </div>
              <div className="badge-item">
                <i className="ri-flight-takeoff-line text-2xl"></i>
                <span>Travel Expertise</span>
              </div>
            </div>

            <div className="highlight-box">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-clay)' }}>
                Experience You Can Trust
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 0 }}>
                We have extensive experience conducting interventions internationally and managing complex 
                logistics across borders. Our global network includes connections with international treatment 
                facilities, medical professionals, and transportation services. We understand the nuances of 
                working in diverse cultural contexts while maintaining the highest professional standards.
              </p>
            </div>
          </div>

          {/* COMMON SCENARIOS */}
          <div style={{ marginTop: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">WHEN YOU NEED US</span>
              <h2>Common International Situations</h2>
            </div>

            <div className="scenario-grid">
              <div className="scenario-item">
                <h4>📚 Study Abroad Crisis</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                  Your child is studying internationally and struggling with substance abuse. We can travel 
                  to conduct an intervention and coordinate their safe return to treatment.
                </p>
              </div>

              <div className="scenario-item">
                <h4>💼 Expatriate Family Member</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                  A family member living and working abroad needs help. We provide on-site intervention 
                  services and arrange treatment locally or in the US.
                </p>
              </div>

              <div className="scenario-item">
                <h4>✈️ International Business Travel</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                  Your loved one's work requires extensive international travel, and their addiction has 
                  become critical. We can meet them anywhere in the world.
                </p>
              </div>

              <div className="scenario-item">
                <h4>🌏 Living Abroad</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                  You and your family live outside the US and need intervention expertise with access 
                  to American treatment resources and standards of care.
                </p>
              </div>
            </div>
          </div>

          {/* OUR PROCESS */}
          <div style={{ marginTop: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">HOW IT WORKS</span>
              <h2>Our International Process</h2>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Assessment & Planning</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                    Comprehensive evaluation of your situation including location, circumstances, cultural 
                    considerations, and treatment options.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Logistics Coordination</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                    We handle all travel arrangements, documentation requirements, local resources, 
                    and treatment facility placement.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Professional Intervention</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                    We conduct the intervention with cultural sensitivity and professional expertise, 
                    regardless of location.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Safe Transportation</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                    Manage safe transportation to treatment, whether local or international, with 
                    medical support as needed.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">5</div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Ongoing Family Support</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-light)' }}>
                    Continued coaching and support throughout treatment, bridging any distance with 
                    regular communication and guidance.
                  </p>
                </div>
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
            No Distance Too Great
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
            No matter where in the world your loved one is struggling, we have the experience, resources, 
            and dedication to help. Reach out for a confidential consultation about your international situation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+19492304575" className="btn btn-light" style={{ fontSize: '1.1rem' }}>
              Call Now: +1 (949) 230-4575
            </a>
            <a
              href="mailto:jenat10@yahoo.com"
              className="btn btn-outline"
              style={{ borderColor: 'white', color: 'white', fontSize: '1.1rem' }}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    
    </>
  );
}
