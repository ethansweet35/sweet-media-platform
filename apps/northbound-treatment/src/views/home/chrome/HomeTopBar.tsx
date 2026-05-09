/**
 * Fixed thin navy bar above the main navigation. Social icons left,
 * "Start Online Intake" CTA right. Per Figma TopBar.tsx.
 */
export default function HomeTopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-navy text-sand-light py-3">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-sand-light/70 transition-colors duration-300 hover:text-terracotta"
          >
            <i className="ri-facebook-fill text-base leading-none"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-sand-light/70 transition-colors duration-300 hover:text-terracotta"
          >
            <i className="ri-instagram-line text-base leading-none"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-sand-light/70 transition-colors duration-300 hover:text-terracotta"
          >
            <i className="ri-linkedin-fill text-base leading-none"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-sand-light/70 transition-colors duration-300 hover:text-terracotta"
          >
            <i className="ri-twitter-x-line text-base leading-none"></i>
          </a>
        </div>

        <a
          href="/admissions"
          className="flex items-center gap-2 text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-sand-light transition-colors duration-300 hover:text-terracotta"
        >
          Start Online Intake
          <i className="ri-arrow-right-s-line text-sm leading-none"></i>
        </a>
      </div>
    </div>
  );
}
