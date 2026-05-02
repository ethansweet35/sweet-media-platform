export default function SocialMediaServicesDivider() {
  return (
    <section className="w-full bg-white py-12 md:py-16 border-t border-black/8">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-3">Our Social Services</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Full-Funnel Social
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Built for Trust.</em>
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md md:text-right">
            From content creation to crisis response — we cover every touchpoint of your social presence so families and patients see a brand they can trust.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {[
            { label: "Content Strategy", href: "#social-content" },
            { label: "Community Mgmt", href: "#social-community" },
            { label: "Reputation", href: "#social-reputation" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[10px] tracking-[0.2em] uppercase font-semibold px-5 py-2 rounded-full border border-black/12 text-black/50 hover:bg-black hover:text-white hover:border-black transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}