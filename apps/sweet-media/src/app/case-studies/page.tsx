import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-black mb-6">Case Studies</h1>
        <div className="space-y-3">
          <Link className="block text-[#0A1F44] hover:underline" href="/case-studies/california-prime-recovery">
            California Prime Recovery
          </Link>
          <Link className="block text-[#0A1F44] hover:underline" href="/case-studies/rize-oc">
            Rize OC
          </Link>
        </div>
      </div>
    </main>
  );
}
