'use client';

const image_62ac083475cf065354b63ce4cb18d2499553f06b = '/images/62ac083475cf065354b63ce4cb18d2499553f06b.png'
const image_b444155e1a0a8e5f3cf1bb5c7e8fb7c9c672319d = '/images/b444155e1a0a8e5f3cf1bb5c7e8fb7c9c672319d.png'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
    <style>{`
        .hero {
          position: relative;
          padding: 8rem 0 6rem 0;
          background: linear-gradient(135deg, #e8f4f0 0%, #f0ebe4 100%);
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 1;
        }

        .hero-content-centered {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-handwritten-note {
          font-family: 'La Belle Aurore', cursive;
          font-size: 1.8rem;
          color: var(--accent-sage);
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: 5rem;
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.3rem;
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta-wrapper {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .hero-cta-wrapper .btn {
          font-size: 1.1rem;
          padding: 1.2rem 3rem;
        }

        .hero-cta-wrapper .btn-outline {
          font-size: 1.1rem;
          padding: 1.2rem 3rem;
        }

        .hero-meta {
          font-size: 0.95rem;
          color: var(--text-light);
          margin-top: 1rem;
        }

        .hero-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-top: 5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-feature {
          text-align: center;
          padding: 2.5rem 2rem;
          background: white;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          position: relative;
        }

        .hero-feature:nth-child(1) {
          transform: rotate(-1deg);
        }

        .hero-feature:nth-child(2) {
          transform: rotate(1deg);
        }

        .hero-feature:nth-child(3) {
          transform: rotate(-0.5deg);
        }

        .hero-feature:hover {
          transform: rotate(0deg) translateY(-4px);
          box-shadow: var(--shadow-hover);
          transition: all 0.3s ease;
        }

        .hero-feature-icon {
          font-size: 3rem;
          color: var(--accent-sage);
          margin-bottom: 1rem;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
        }

        .hero-feature-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-feature-text {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.5;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 3rem;
        }

        .hero-content {
          background: var(--bg-paper);
          padding-right: 2rem;
          z-index: 2;
          position: relative;
        }

        .hero-note {
          position: absolute;
          top: -2rem;
          right: 0;
          font-size: 1.4rem;
        }

        .hero-image-wrapper {
          position: relative;
          z-index: 1;
        }

        .hero-image {
          width: 100%;
          height: 650px;
          object-fit: cover;
          border-radius: var(--radius-large);
          transform: rotate(2deg);
          box-shadow: var(--shadow-soft);
          filter: sepia(15%) contrast(95%);
        }

        .hero-stamp {
          position: absolute;
          bottom: -20px;
          left: -20px;
          width: 120px;
          height: 120px;
          border: 1px solid var(--accent-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: var(--bg-paper);
          z-index: 5;
          color: var(--accent-clay);
          transform: rotate(-15deg);
        }

        .checklist-section {
          padding: 6rem 0;
          background-color: #f4f1ea;
          position: relative;
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
          gap: 4rem;
          align-items: center;
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

        .bio-section {
          padding: 8rem 0;
        }

        .bio-wrapper {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .bio-img-stack {
          position: relative;
        }

        .bio-photo-main {
          width: 90%;
          height: 500px;
          object-fit: cover;
          border-radius: var(--radius-soft);
          filter: grayscale(20%);
          box-shadow: var(--shadow-soft);
        }

        .bio-photo-accent {
          position: absolute;
          bottom: -30px;
          right: 0;
          width: 180px;
          height: 180px;
          object-fit: cover;
          border: 8px solid var(--bg-paper);
          border-radius: 50%;
          box-shadow: var(--shadow-hover);
        }

        .bio-content {
          padding-left: 2rem;
        }

        .signature {
          font-family: 'La Belle Aurore', cursive;
          font-size: 2.5rem;
          color: var(--text-main);
          margin-top: 2rem;
        }

        .issues-section {
          padding: 8rem 0;
          background-color: #f7f5f0;
          position: relative;
        }

        .issues-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 5rem auto;
        }

        .issues-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .issue-card {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 2px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04);
          position: relative;
          transform: rotate(0deg);
          transition: transform 0.3s ease;
        }

        .issue-card:nth-child(odd) { transform: rotate(1deg); }
        .issue-card:nth-child(even) { transform: rotate(-1deg); }
        .issue-card:hover { transform: rotate(0deg) scale(1.02); z-index: 10; }

        .issue-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          border-bottom: 1px solid var(--accent-gold);
          padding-bottom: 0.5rem;
          display: inline-block;
        }

        .issue-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-top: 1rem;
          color: var(--text-light);
        }

        .services {
          padding: 8rem 0;
          border-bottom: 1px dashed var(--line-color);
        }

        .services-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 5rem auto;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .service-card {
          background: var(--bg-card);
          padding: 3rem 2rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          transition: transform 0.4s ease;
          position: relative;
          border-top: 4px solid var(--accent-sage);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .card-number {
          font-family: 'La Belle Aurore', cursive;
          font-size: 1.5rem;
          color: var(--accent-clay);
          margin-bottom: 1rem;
          display: block;
        }

        .service-list {
          list-style: none;
          margin-top: 1.5rem;
          font-size: 0.95rem;
        }

        .service-list li {
          margin-bottom: 0.5rem;
          padding-left: 1.2rem;
          position: relative;
          color: var(--text-light);
        }

        .service-list li::before {
          content: '•';
          color: var(--accent-sage);
          position: absolute;
          left: 0;
        }

        @media (max-width: 900px) {
          .hero {
            padding: 5rem 0 4rem 0;
          }

          .hero-title {
            font-size: 3rem !important;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .hero-features {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .hero-cta-wrapper {
            flex-direction: column;
          }

          .hero-grid, .checklist-grid, .bio-wrapper, .issues-grid {
            display: flex;
            flex-direction: column;
            gap: 3rem;
          }
          
          .hero-content { padding-right: 0; order: 2; }
          .hero-image-wrapper { order: 1; }
          .hero-image { height: 400px; transform: rotate(0); }
          .hero-stamp { display: none; }
          
          .checklist-section::before { clip-path: none; height: 0; }
          
          .bio-photo-main { width: 100%; height: auto; }
          .bio-photo-accent { width: 120px; height: 120px; right: -10px; }
          .bio-content { padding-left: 0; }
          
          .cards-grid { display: grid; grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content-centered">
            <div className="hero-handwritten-note">Hope is a plan.</div>
            <span className="section-label">Professional Intervention Services</span>
            <h1 className="hero-title">A gateway to a life of recovery.</h1>
            <p className="hero-description">An Invite To Life is committed to assisting in the world of addictions through compassionate, expert intervention services. With over two decades of experience, we help families move from chaos to healing.</p>
            <div className="hero-cta-wrapper">
              <Link href="/is-it-time" className="btn">Get Immediate Help</Link>
              <Link href="/about-us" className="btn btn-outline">Meet Our Team</Link>
            </div>
            <p className="hero-meta">Free consultation • Confidential • Available 24/7</p>
            <div className="hero-features">
              <div className="hero-feature">
                <div className="hero-feature-icon">1000+</div>
                <div className="hero-feature-title">Interventions</div>
                <div className="hero-feature-text">Successfully completed interventions using proven models.</div>
              </div>
              <div className="hero-feature">
                <div className="hero-feature-icon">20+</div>
                <div className="hero-feature-title">Years Experience</div>
                <div className="hero-feature-text">Two decades of experience in addiction intervention.</div>
              </div>
              <div className="hero-feature">
                <div className="hero-feature-icon">24/7</div>
                <div className="hero-feature-title">Available</div>
                <div className="hero-feature-text">Crisis support available around the clock when you need it.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION */}
      <section className="bio-section">
        <div className="container">
          <div className="bio-wrapper">
            <div className="bio-img-stack">
              <div className="tape-top" style={{ transform: 'rotate(-2deg)', left: '40%' }}></div>
              <Image
                src={image_62ac083475cf065354b63ce4cb18d2499553f06b}
                alt="Professional counseling and support"
                width={800}
                height={500}
                className="bio-photo-main"
              />
              <div className="bio-photo-accent" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--accent-sage)',
                color: 'white',
                textAlign: 'center',
                padding: '1.5rem',
                fontSize: '0.7rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.3'
              }}>
                <div style={{ fontSize: '1.8rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: '700', marginBottom: '0.25rem' }}>1000+</div>
                <div>Interventions Completed</div>
              </div>
            </div>
            <div className="bio-content">
              <span className="section-label">Our Foundation</span>
              <h2>Built on recovery, driven by compassion.</h2>
              <p>An Invite To Life is led by Jennifer Miela-McDaniel, a seasoned veteran of intervention with over 20 years of experience. Our practice specializes in trauma treatment, drug addiction, alcoholism, and complex behavioral disorders.</p>
              <p>We understand the pain because we've lived it. Now we're here to guide you and your loved one toward healing.</p>
              <Link href="/about-us" className="btn btn-outline" style={{ marginTop: '1rem' }}>Meet Our Team</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS PREVIEW */}
      <section id="conditions" className="issues-section">
        <div className="container">
          <div className="issues-header">
            <span className="section-label">Specializations</span>
            <h2>What We Treat</h2>
            <p>Addiction is rarely just about the substance. We treat the whole person, addressing the underlying trauma and behavioral patterns.</p>
          </div>
          
          <div className="issues-grid">
            <div className="issue-card">
              <div className="pin"></div>
              <div className="issue-title">Drug Addiction</div>
              <p className="issue-desc">Comprehensive intervention planning for opioid dependence, stimulant addiction, and prescription drug abuse.</p>
            </div>
            <div className="issue-card">
              <div className="pin"></div>
              <div className="issue-title">Alcoholism</div>
              <p className="issue-desc">Expert services in alcohol addiction treatment and effective alcoholic interventions for individuals and families.</p>
            </div>
            <div className="issue-card">
              <div className="pin"></div>
              <div className="issue-title">Trauma & PTSD</div>
              <p className="issue-desc">Specialized trauma assessment and treatment planning with a focus on childhood abuse and complex PTSD.</p>
            </div>
            <div className="issue-card">
              <div className="pin"></div>
              <div className="issue-title">Sex Addiction</div>
              <p className="issue-desc">Discrete intervention for sexual addiction, sexual compulsivity, and exploitative relationships.</p>
            </div>
            <div className="issue-card">
              <div className="pin"></div>
              <div className="issue-title">Eating Disorders</div>
              <p className="issue-desc">Specialized intervention for anorexia nervosa and bulimia with medical stabilization coordination.</p>
            </div>
            <div className="issue-card">
              <div className="pin"></div>
              <div className="issue-title">Gambling & Process Addictions</div>
              <p className="issue-desc">Behavioral addictions that destroy lives: gambling, gaming, and compulsive behaviors.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/conditions" className="btn btn-outline">View All Conditions</Link>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="services" className="services">
        <div className="container">
          <div className="services-header">
            <span className="section-label">Comprehensive Care</span>
            <h2>From Crisis to Recovery</h2>
            <p>An intervention is not a single event. It is a managed process involving planning, execution, and long-term family support.</p>
          </div>

          <div className="cards-grid">
            <div className="service-card">
              <span className="card-number">Step 01.</span>
              <h3>Intervention Facilitation</h3>
              <p>Professionally facilitated interventions using proven models tailored to your family's needs.</p>
              <ul className="service-list">
                <li>Pre-intervention family education</li>
                <li>Treatment center research</li>
                <li>Crisis intervention planning</li>
                <li>Multiple intervention models</li>
              </ul>
            </div>
            <div className="service-card">
              <span className="card-number">Step 02.</span>
              <h3>Treatment Placement</h3>
              <p>We research and coordinate placement in the most appropriate treatment facilities.</p>
              <ul className="service-list">
                <li>Medical detox coordination</li>
                <li>Secure medical transport</li>
                <li>Insurance verification</li>
                <li>Treatment team collaboration</li>
              </ul>
            </div>
            <div className="service-card">
              <span className="card-number">Step 03.</span>
              <h3>Aftercare Planning</h3>
              <p>Customized aftercare programs and family support for long-term recovery.</p>
              <ul className="service-list">
                <li>Ongoing progress assessment</li>
                <li>Family system healing</li>
                <li>Relapse prevention</li>
                <li>Reintegration support</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn">Explore Our Services</Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
