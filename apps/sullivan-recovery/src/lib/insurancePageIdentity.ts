import type { InsuranceCarrier, InsuranceVerificationPlan } from "@/data/insurance";
import type { InsurancePageData } from "@/types/insurancePage";

export type InsurancePageIdentity = {
  name: string;
  shortName: string;
  href: string;
  hasLogo: boolean;
  carrier?: InsuranceCarrier;
  plan?: InsuranceVerificationPlan;
};

export function resolveInsurancePageIdentity(data: InsurancePageData): InsurancePageIdentity {
  if (data.carrier) {
    return {
      name: data.carrier.name,
      shortName: data.carrier.shortName,
      href: data.carrier.href,
      hasLogo: true,
      carrier: data.carrier,
    };
  }
  if (data.plan) {
    return {
      name: data.plan.name,
      shortName: data.plan.shortName,
      href: data.plan.href,
      hasLogo: false,
      plan: data.plan,
    };
  }
  throw new Error(`Insurance page ${data.canonical} missing carrier or plan`);
}
