import { notFound } from "next/navigation";

/** Hidden — in-person IOP is not offered; see /telehealth-iop-services/ for virtual IOP. */
export default function Page() {
  notFound();
}
