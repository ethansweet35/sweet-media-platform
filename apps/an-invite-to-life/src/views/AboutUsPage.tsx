const image_2fbb6e75f35136041ec417b947e1d0adfeb79371 = '/images/2fbb6e75f35136041ec417b947e1d0adfeb79371.png'
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <>
    <style>{`
        .page-hero {
          background: linear-gradient(135deg, var(--accent-sage) 0%, var(--accent-sage-dark) 100%);
          color: white;
          padding: 0;
          margin: 0;
          position: relative;
          overflow: hidden;
        }

        .page-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: center;
          min-height: 500px;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          padding: 6rem 0 6rem 2rem;
        }

        .hero-content h1 {
          font-size: 4.5rem;
          margin-bottom: 1.5rem;
          color: white;
          line-height: 1.1;
        }

        .hero-content p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: var(--radius-soft);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          color: var(--accent-gold);
          display: block;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.8);
        }

        .hero-visual {
          position: relative;
          padding: 4rem 2rem 4rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-badge {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-hover);
          transform: rotate(-3deg);
          position: relative;
          max-width: 320px;
        }

        .hero-badge::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%) rotate(3deg);
          width: 100px;
          height: 30px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .hero-badge h3 {
          font-size: 1.8rem;
          color: var(--text-main);
          margin-bottom: 1rem;
          text-align: center;
        }

        .hero-badge-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .hero-badge-list li {
          color: var(--text-light);
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--line-color);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
        }

        .hero-badge-list li:last-child {
          border-bottom: none;
        }

        .hero-badge-list li::before {
          content: '✓';
          color: var(--accent-sage);
          font-weight: 700;
          font-size: 1.2rem;
        }

        .intro-section {
          padding: 4rem 0;
          background-color: #f7f5f0;
        }

        .intro-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .team-section {
          padding: 6rem 0;
        }

        .team-member {
          margin-bottom: 4rem;
        }

        .team-header-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        .team-member:nth-child(even) .team-header-grid {
          grid-template-columns: 1.2fr 0.8fr;
        }

        .team-member:nth-child(even) .team-photo-wrapper {
          order: 2;
        }

        .team-member:nth-child(even) .team-bio-summary {
          order: 1;
        }

        .team-photo-wrapper {
          position: relative;
        }

        .team-photo {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-soft);
          filter: grayscale(15%);
        }

        .credential-badge {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: var(--accent-clay);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: var(--shadow-hover);
          font-weight: 700;
        }

        .team-bio-summary h3 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .team-title {
          color: var(--accent-clay);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          display: block;
        }

        .team-bio-full {
          background: #f7f5f0;
          padding: 3rem;
          border-radius: var(--radius-soft);
          margin-bottom: 3rem;
        }

        .specialties {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-soft);
          margin-top: 2rem;
          box-shadow: var(--shadow-card);
        }

        .specialties h4 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        }

        .specialties-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
        }

        .specialties-list li {
          background: #f7f5f0;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--text-light);
          border: 1px solid var(--line-color);
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--line-color), transparent);
          margin: 5rem 0;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-content {
            padding: 4rem 2rem;
          }

          .hero-content h1 {
            font-size: 3rem;
          }

          .hero-visual {
            padding: 2rem;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .team-header-grid, .team-member:nth-child(even) .team-header-grid {
            grid-template-columns: 1fr;
          }

          .team-member:nth-child(even) .team-photo-wrapper,
          .team-member:nth-child(even) .team-bio-summary {
            order: initial;
          }

          .team-photo {
            height: 400px;
          }
        }
      `}</style>

      <div className="page-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="section-label" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Our Story</span>
              <h1>Built on Experience, Driven by Hope</h1>
              <p>
                An Invite To Life is founded on a foundation of lived experience and professional expertise. We understand addiction from the inside out because we've walked that path.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Years of Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Interventions Completed</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-badge">
                <h3>Why Choose Us</h3>
                <ul className="hero-badge-list">
                  <li>Certified Interventionists</li>
                  <li>Trauma-Informed Care</li>
                  <li>National & International</li>
                  <li>24/7 Crisis Support</li>
                  <li>Comprehensive Aftercare</li>
                  <li>Family-Centered Approach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>Our Mission</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              An Invite To Life is committed to assisting in the world of addictions through being a gateway to a life of recovery. Led by Jennifer Miela-McDaniel, our practice specializes in trauma treatment, drug addiction, alcoholism, gambling, sex addiction, co-dependency, toxic relationships, anorexia nervosa and bulimia.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              We offer expert services in alcohol addiction treatment and recovery. Our team is experienced in conducting effective interventions to help individuals and families throughout the United States and internationally to take the first step towards healing.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              Whether you're seeking an alcohol intervention or support for alcohol abuse intervention, we're here to guide you through the process. Additionally, we provide comprehensive drug abuse intervention services to address a wide range of substance use disorders.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-label">Leadership</span>
            <h2>Led by Experience, Driven by Compassion</h2>
          </div>

          {/* Jennifer Miela-McDaniel */}
          <div className="team-member">
            <div className="team-header-grid">
              <div className="team-photo-wrapper">
                <div className="tape-top"></div>
                <Image
                  src={image_2fbb6e75f35136041ec417b947e1d0adfeb79371}
                  alt="Jennifer Miela-McDaniel"
                  width={600}
                  height={500}
                  className="team-photo"
                />
                <div className="credential-badge">20+ Years Experience</div>
              </div>
              <div className="team-bio-summary">
                <h3>Jennifer Miela-McDaniel</h3>
                <span className="team-title">Founder & Director | CADC II, BRI, CFMI, CTP, ICADC</span>
                
                <p>Jennifer Miela-McDaniel is a seasoned veteran of intervention with over 20 years of experience. Her career began in 1993 as a drug and alcohol counselor and has expanded from there. Today, she tackles the toughest of interventions.</p>
                
                <p>Jennifer was born and raised in Newport Beach and currently lives in Southern California.</p>
              </div>
            </div>

            <div className="team-bio-full">
              <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Approach & Philosophy</h4>
              <p>Jennifer has had five different models of intervention training and is a trauma specialist as well. She utilizes the intervention as an opportunity to interrupt a person's destructive life patterns. It's a starting point for a change. The goal is to heal the family system and help your loved one accept treatment.</p>
              
              <p>Through her intervention services, Jennifer offers assessment of the loved one's behavior, creating a specifically designed treatment plan, implementing the plan, providing ongoing assessments of progress, creating strategies for behavior assessment, trauma assessment, conflict resolution, crisis management, and crisis intervention.</p>
              
              <p>She also works with the loved one's treatment team to assess how your loved one is doing in their daily environment. Jennifer uses her knowledge and skills in behavior analysis and developmental psychology to create effective interventions that improve social skills, communication, and daily living skills.</p>
              
              <p>After the intervention, she'll create an aftercare plan for your loved one and you/your family. Jennifer specializes in drug, alcohol, gambling, eating disorders, generational wealth, adolescence, and geriatric interventions.</p>

              <div className="specialties">
                <h4>Areas of Expertise</h4>
                <ul className="specialties-list">
                  <li>5 Intervention Models</li>
                  <li>Trauma Specialist</li>
                  <li>Family Systems</li>
                  <li>Adolescent Interventions</li>
                  <li>Geriatric Interventions</li>
                  <li>Generational Wealth Issues</li>
                  <li>Eating Disorders</li>
                  <li>Crisis Management</li>
                  <li>Aftercare Planning</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'var(--accent-sage)', borderRadius: 'var(--radius-soft)' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Start Your Journey?</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>Our team is here to help you and your family find the path to recovery.</p>
            <Link href="/is-it-time" className="btn btn-light">Schedule a Consultation</Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
