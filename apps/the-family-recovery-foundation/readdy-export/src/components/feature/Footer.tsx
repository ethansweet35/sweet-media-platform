const linkColumns = [
  {
    title: "About Us",
    links: [
      { label: "About", href: "/about" },
      { label: "Get Help", href: "/contact" },
      { label: "Donate", href: "/donate" },
      { label: "Get Involved", href: "/get-involved" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learn More",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Events", href: "/events" },
    ],
  },
];

const socialLinks = [
  { icon: "ri-youtube-fill", href: "https://youtube.com", label: "YouTube", color: "text-pure-white/70 hover:text-pure-white" },
  { icon: "ri-tiktok-fill", href: "https://tiktok.com", label: "TikTok", color: "text-pure-white/70 hover:text-pure-white" },
  { icon: "ri-instagram-line", href: "https://instagram.com", label: "Instagram", color: "text-pure-white/70 hover:text-pure-white" },
  { icon: "ri-facebook-fill", href: "https://facebook.com", label: "Facebook", color: "text-pure-white/70 hover:text-pure-white" },
];

const locations = [
  {
    city: "Newport Beach, CA",
    address: "4701 Teller Ave Suite 150E",
    zip: "92660",
  },
  {
    city: "Seattle, WA",
    address: "2120 1st Ave. N #313",
    zip: "98109",
  },
  {
    city: "Phoenix, AZ",
    address: "3838 N Central Ave. Ste 956",
    zip: "85012",
  },
  {
    city: "Goldsby, OK",
    address: "266 Industrial Blvd",
    zip: "73093",
  },
];

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-pure-white">
      {/* Main footer content */}
      <div className="max-w-content mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo area */}
          <div className="lg:col-span-4">
            <a href="/" className="inline-block mb-6">
              <img
                src="https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/ed4682bfbb9c7d1bb52388ca7365cd04.png"
                alt="The Family Recovery Foundation"
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </a>

            <p className="text-body-s font-display italic text-pure-white/70 leading-relaxed mb-6 max-w-xs">
              Connected by Recovery.<br />
              Fortified with Knowledge.<br />
              United in Faith.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-pure-white/10 hover:bg-pure-white/20 transition-colors duration-200 ${social.color}`}
                >
                  <i className={`${social.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 lg:col-start-6">
            <div className="grid grid-cols-2 gap-8">
              {linkColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-sky-blue mb-4">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-body-s font-body text-pure-white/70 hover:text-pure-white transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-sky-blue mb-4">
              Contact
            </h4>
            <a
              href="tel:888-964-8825"
              className="flex items-center gap-2 text-body-m font-body text-pure-white/80 hover:text-pure-white transition-colors duration-200 mb-2"
            >
              <i className="ri-phone-line w-4 h-4 flex items-center justify-center" />
              888-964-8825
            </a>
            <a
              href="mailto:hello@tfrfoundation.org"
              className="flex items-center gap-2 text-body-s font-body text-pure-white/60 hover:text-pure-white transition-colors duration-200 mb-6"
            >
              <i className="ri-mail-line w-4 h-4 flex items-center justify-center" />
              hello@tfrfoundation.org
            </a>

            <p className="text-body-s font-body text-pure-white/70 leading-relaxed">
              We're here every day. If you or someone you love needs help, call us.
              A real person answers.
            </p>
          </div>
        </div>

        {/* Locations strip */}
        <div className="mt-16 pt-12 border-t border-pure-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {locations.map((loc) => (
              <div key={loc.city} className="flex items-start gap-3">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-sky-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-body-s font-body font-semibold text-pure-white/90">
                    {loc.city}
                  </p>
                  <p className="text-caption font-body text-pure-white/50">
                    {loc.address}
                  </p>
                  <p className="text-caption font-body text-pure-white/50">
                    {loc.zip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-pure-white/10">
        <div className="max-w-content mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-caption font-body text-stone-blue">
            &copy; {new Date().getFullYear()} The Family Recovery Foundation. All rights reserved.
          </p>
          <p className="text-caption font-body text-pure-white/40">
            A 501(c)(3) nonprofit organization
          </p>
        </div>
      </div>
    </footer>
  );
}