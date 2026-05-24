import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
    <style>{`
        .not-found-section {
          padding: 8rem 0;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .not-found-section h1 {
          font-size: 6rem;
          color: var(--accent-clay);
          margin-bottom: 1rem;
        }

        .not-found-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .quick-link {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-soft);
          box-shadow: var(--shadow-card);
          text-decoration: none;
          transition: transform 0.3s ease;
          border-top: 3px solid var(--accent-sage);
        }

        .quick-link:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }

        .quick-link h3 {
          font-size: 1.3rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .quick-link p {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0;
        }

        @media (max-width: 900px) {
          .links-grid {
            grid-template-columns: 1fr;
          }

          .not-found-section h1 {
            font-size: 4rem;
          }
        }
      `}</style>

      <section className="not-found-section">
        <div className="container">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p style={{ fontSize: '1.2rem' }}>
            The page you're looking for doesn't exist. But help is always just a click away.
          </p>

          <div className="links-grid">
            <Link href="/" className="quick-link">
              <h3>Home</h3>
              <p>Return to our main page</p>
            </Link>
            <Link href="/is-it-time" className="quick-link">
              <h3>Is It Time?</h3>
              <p>Assess if intervention is needed</p>
            </Link>
            <Link href="/about-us" className="quick-link">
              <h3>About Us</h3>
              <p>Meet our team</p>
            </Link>
            <Link href="/services" className="quick-link">
              <h3>Services</h3>
              <p>See how we can help</p>
            </Link>
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--accent-sage)', borderRadius: 'var(--radius-soft)' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>In a Crisis?</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
              If you or a loved one is in immediate danger, don't wait.
            </p>
            <a href="tel:+19492304575" className="btn btn-light">Call Us Now: +1 (949) 230-4575</a>
          </div>
        </div>
      </section>
    
    </>
  );
}
