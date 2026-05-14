import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SolanaBeachPage() {
  const config = LOCATION_BY_SLUG.get("ca-solana-beach")!;
  return <LocationLanding config={config} />;
}
