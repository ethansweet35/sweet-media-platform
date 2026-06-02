import { CONTAINER } from "@/data/site";

/** Matches live WP disclosure on FB and PPC landing pages. */
export default function MedicaidMedicareNotice() {
  return (
    <div className="border-b border-amber-200/80 bg-amber-50">
      <div className={`${CONTAINER} py-3`}>
        <p className="flex items-start gap-2 font-body text-sm text-amber-950">
          <i className="ri-information-line mt-0.5 shrink-0 text-base text-amber-700" aria-hidden />
          <span>
            <strong className="font-semibold">We do not accept Medicaid or Medicare.</strong> Missouri
            Behavioral Health accepts private health insurance and private pay options. Contact our team
            to confirm your coverage.
          </span>
        </p>
      </div>
    </div>
  );
}
