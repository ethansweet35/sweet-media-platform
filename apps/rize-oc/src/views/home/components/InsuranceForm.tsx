"use client";

const fieldClass = "w-full border border-warm bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none transition-colors";
const labelClass = "block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1.5";

const insurers = [
  "Anthem", "Aetna", "Blue Cross Blue Shield", "Cigna", "Humana",
  "Kaiser", "Magellan", "MHN", "Optum", "United Healthcare",
  "Beacon Health", "Cenpatico", "Beacon", "Other",
];

export default function InsuranceForm({ showNotesField }: { showNotesField?: boolean }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className={labelClass}>Full Name*</label>
        <input type="text" placeholder="Full Name" required className={fieldClass} />
      </div>

      <div>
        <label className={labelClass}>Phone Number*</label>
        <input type="tel" placeholder="Phone Number" required className={fieldClass} />
      </div>

      {showNotesField && (
        <div>
          <label className={labelClass}>What Are You Struggling With?</label>
          <textarea placeholder="Notes" rows={3} className={`${fieldClass} resize-none`} />
        </div>
      )}

      <div>
        <label className={labelClass}>Insurance Provider*</label>
        <select required defaultValue="Anthem" className={fieldClass} style={{ colorScheme: "light" }}>
          {insurers.map((ins) => (
            <option key={ins} value={ins}>{ins}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Policy Number*</label>
        <input type="text" placeholder="Policy Number" required className={fieldClass} />
      </div>

      <button
        type="submit"
        className="mt-1 w-full bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white hover:bg-ink/80 transition-colors flex items-center justify-center gap-2"
      >
        Verify Coverage <i className="ri-arrow-right-line" />
      </button>
    </form>
  );
}
