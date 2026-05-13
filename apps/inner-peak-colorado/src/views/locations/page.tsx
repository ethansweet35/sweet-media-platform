'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const locations = [
  {
    city: 'Colorado Springs',
    state: 'Colorado',
    type: 'Headquarters & Virtual Hub',
    address: '685 Citadel Drive East, Suite #598\nColorado Springs, CO 80909',
    phone: '719-733-8556',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc001.jpg',
    services: ['All Virtual Programs', 'In-Person Assessments', 'Administrative Hub', 'Clinical Leadership'],
    color: '#C8795A',
  },
  {
    city: 'Boulder',
    state: 'Colorado',
    type: 'Satellite Office',
    address: '2525 Arapahoe Ave, Suite 200\nBoulder, CO 80302',
    phone: '(303) 555-0847',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc002.jpg',
    services: ['In-Person Therapy', 'Group Sessions', 'Wellness Programming', 'Intake Assessments'],
    color: '#6B7D67',
  },
  {
    city: 'Colorado Springs',
    state: 'Colorado',
    type: 'Satellite Office',
    address: '102 S Tejon St, Suite 1100\nColorado Springs, CO 80903',
    phone: '(719) 555-0334',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc003.jpg',
    services: ['In-Person Therapy', 'Group Sessions', 'Intake Assessments', 'Family Sessions'],
    color: '#DDA15E',
  },
];

export default function LocationsPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/locations`,
          url: `${siteUrl}/locations`,
          name: 'Locations | Inner Peak Colorado Mental Health Treatment Centers',
          description: 'Find Inner Peak Colorado\'s treatment locations in Colorado Springs and Boulder. Virtual care available to all women across Colorado. Evidence-based mental health and addiction treatment.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: `${siteUrl}/locations` },
            ],
          },
        },
        {
          '@type': 'ItemList',
          name: 'Inner Peak Colorado Locations',
          itemListElement: locations.map((loc, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'LocalBusiness',
              name: `Inner Peak Colorado - ${loc.city}`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: loc.address.split('\n')[0],
                addressLocality: loc.city,
                addressRegion: 'CO',
                addressCountry: 'US',
              },
              telephone: loc.phone,
            },
          })),
        },
      ],
    };
    const el = document.getElementById('schema-locations');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-locations';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Locations | Inner Peak Colorado Mental Health Treatment Centers';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Find Inner Peak Colorado treatment locations in Colorado Springs and Boulder. Virtual care available across Colorado. Evidence-based mental health and addiction treatment for women.');
    return () => { const el2 = document.getElementById('schema-locations'); if (el2) el2.remove(); };
  }, []);

  return (
    <main className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative w-full pt-32 pb-24 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/lochero001.jpg"
  alt="Colorado locations"
  fill
  className="w-full h-full object-cover object-top"
  priority
/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/85 via-[#2C3B2E]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: 'Locations' }]} light />
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium block mb-6 mt-6">Our Locations</span>
            <h1 className="font-serif text-[#FAF8F5] leading-[1.15] mb-6" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
              Rooted in Colorado.<br />
              Available <em className="text-[#DDA15E]">everywhere.</em>
            </h1>
            <p className="text-[#F0ECE1]/80 font-light text-lg leading-relaxed max-w-xl">
              <AutoLinkedTextClient>{"Our virtual platform means you can access world-class care from anywhere in the country. And for those in Colorado, we have physical locations ready to welcome you."}</AutoLinkedTextClient>
            </p>
          </div>
        </div>
      </section>

      {/* Virtual Banner */}
      <section className="w-full bg-[#3A4A3C] py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#DDA15E]/20 flex-shrink-0">
              <i className="ri-global-line text-2xl text-[#DDA15E]"></i>
            </div>
            <div>
              <h3 className="font-serif text-[#FAF8F5] text-xl mb-1">Virtual Care — Colorado</h3>
              <p className="text-sm text-[#F0ECE1]/60 font-light"><AutoLinkedTextClient>{"Our virtual programs are available to women across the entire United States. No travel required."}</AutoLinkedTextClient></p>
            </div>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300 flex-shrink-0"
          >
            Get Started Virtually
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      {/* Location Cards */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Physical Locations</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Find Us in Colorado</h2>
          </div>

          <div className="flex flex-col gap-12">
            {locations.map((loc, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? '' : ''}`}
              >
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <Image
  src={loc.image}
  alt={loc.city}
  fill
  className="w-full h-full object-cover object-top"
/>
                  </div>
                </div>
                <div className={`flex flex-col gap-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full text-[#FAF8F5] mb-3 inline-block" style={{ backgroundColor: loc.color }}>
                      {loc.type}
                    </span>
                    <h3 className="font-serif text-[#2C3B2E] mt-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                      {loc.city}, <span className="text-[#6B7D67]">{loc.state}</span>
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <i className="ri-map-pin-line text-sm" style={{ color: loc.color }}></i>
                      </div>
                      <p className="text-sm text-[#3A4A3C]/70 font-light whitespace-pre-line"><AutoLinkedTextClient>{loc.address}</AutoLinkedTextClient></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <i className="ri-phone-line text-sm" style={{ color: loc.color }}></i>
                      </div>
                      <p className="text-sm text-[#3A4A3C]/70 font-light"><AutoLinkedTextClient>{loc.phone}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {loc.services.map((s, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <i className="ri-checkbox-circle-line text-xs" style={{ color: loc.color }}></i>
                        </div>
                        <span className="text-sm text-[#3A4A3C]/70 font-light">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium text-[#FAF8F5] hover:opacity-90 transition-all duration-300"
                      style={{ backgroundColor: loc.color }}
                    >
                      Get Directions
                      <i className="ri-map-pin-line"></i>
                    </a>
                    <Link
                      href="/contact"
                      className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] hover:border-[#2C3B2E] transition-all duration-300 text-[#2C3B2E] border-[#2C3B2E]"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="w-full px-8 md:px-16 pb-24">
        <div className="relative max-w-7xl mx-auto rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '400px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.1219!2d-105.0!3d39.7392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Inner Peak Colorado Locations"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
