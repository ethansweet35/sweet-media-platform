import type { ProgramPageData } from "@/types/programPage";
import ProgramPageHero from "./ProgramPageHero";
import ProgramTrustStrip from "./ProgramTrustStrip";
import ProgramStorySplit from "./ProgramStorySplit";
import ProgramStatsBand from "./ProgramStatsBand";
import ProgramDifferentiators from "./ProgramDifferentiators";
import ProgramProcess from "./ProgramProcess";
import ProgramClinical from "./ProgramClinical";
import ProgramBenefits from "./ProgramBenefits";
import ProgramAmenities from "./ProgramAmenities";
import ProgramGallery from "./ProgramGallery";
import ProgramSubstances from "./ProgramSubstances";
import ProgramLocation from "./ProgramLocation";
import ProgramRelated from "./ProgramRelated";
import ProgramFaq from "./ProgramFaq";
import ProgramPageCta from "./ProgramPageCta";

type Props = {
  data: ProgramPageData;
};

export default function ProgramPageView({ data }: Props) {
  return (
    <>
      <ProgramPageHero breadcrumb={data.breadcrumb} hero={data.hero} />
      <ProgramTrustStrip items={data.trust} />
      <ProgramStorySplit {...data.story} />
      {data.stats ? <ProgramStatsBand items={data.stats} /> : null}
      <ProgramDifferentiators {...data.differentiators} />
      <ProgramProcess {...data.process} />
      {data.clinical ? <ProgramClinical {...data.clinical} /> : null}
      <ProgramBenefits {...data.benefits} />
      {data.amenities ? <ProgramAmenities {...data.amenities} /> : null}
      {data.gallery ? <ProgramGallery {...data.gallery} /> : null}
      {data.substances ? <ProgramSubstances {...data.substances} /> : null}
      {data.location ? <ProgramLocation {...data.location} /> : null}
      <ProgramRelated {...data.relatedPrograms} />
      {data.faqs && data.faqs.length > 0 ? <ProgramFaq items={data.faqs} /> : null}
      <ProgramPageCta {...data.cta} />
    </>
  );
}
