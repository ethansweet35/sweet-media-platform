import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-8">
      <div className="max-w-lg text-center flex flex-col items-center gap-8">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Page Not Found</span>
        <h1 className="font-serif text-[#1F2937] leading-[1.1]" style={{ fontSize: 'clamp(60px, 10vw, 120px)' }}>
          404
        </h1>
        <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.9]">
          We couldn&apos;t find the page you were looking for. It may have moved or no longer exists.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1F2937] text-[#F8FAFC] text-xs uppercase tracking-widest font-medium hover:bg-[#2563EB] transition-all duration-300"
          >
            <i className="ri-home-line"></i>
            Return Home
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#1F2937] text-[#1F2937] text-xs uppercase tracking-widest font-medium hover:bg-[#1F2937] hover:text-[#F8FAFC] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
