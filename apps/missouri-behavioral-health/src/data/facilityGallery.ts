/**
 * Real facility photography synced from the live WordPress "Tour Our Facility" gallery.
 * Run `node scripts/sync-mbh-facility-images.mjs` to refresh from WP.
 *
 * Do NOT use: mbh_about_hero01.jpg (AI landscape), mbh_about_therapy_group.png (program stock),
 * or mbh_gallery_02.jpg (staff portrait).
 */
const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

export type FacilityGallerySlide = {
  src: string;
  alt: string;
  caption: string;
};

const BRAND = "Missouri Behavioral Health";

function facilitySrc(id: string) {
  return `${SUPABASE}/mbh_facility_${id}.jpg`;
}

/** Homepage tour gallery — order matches live WP site, then additional facility shots. */
export const FACILITY_GALLERY_SLIDES: FacilityGallerySlide[] = [
  {
    src: facilitySrc("IMG_7788"),
    alt: `${BRAND} treatment center interior in Springfield, Missouri`,
    caption: "Treatment center interior",
  },
  {
    src: facilitySrc("IMG_6016"),
    alt: `${BRAND} common area with comfortable seating`,
    caption: "Common area",
  },
  {
    src: facilitySrc("IMG_6017"),
    alt: `${BRAND} clinical therapy space in Springfield, MO`,
    caption: "Clinical space",
  },
  {
    src: facilitySrc("IMG_6013"),
    alt: `${BRAND} reception area at the Springfield campus`,
    caption: "Reception area",
  },
  {
    src: facilitySrc("IMG_7789"),
    alt: `${BRAND} facility room used for client care`,
    caption: "Facility room",
  },
  {
    src: facilitySrc("IMG_6021"),
    alt: `${BRAND} treatment space in Springfield, Missouri`,
    caption: "Treatment space",
  },
  {
    src: facilitySrc("IMG_7804"),
    alt: `${BRAND} interior common area with natural light`,
    caption: "Interior common area",
  },
  {
    src: facilitySrc("IMG_6413"),
    alt: `${BRAND} facility interior in Springfield, MO`,
    caption: "Facility interior",
  },
  {
    src: facilitySrc("IMG_6414"),
    alt: `${BRAND} facility interior hallway or lounge`,
    caption: "Facility interior",
  },
  {
    src: facilitySrc("IMG_6415"),
    alt: `${BRAND} on-site facility space for outpatient care`,
    caption: "Facility interior",
  },
  {
    src: facilitySrc("IMG_6416"),
    alt: `${BRAND} treatment facility interior in Missouri`,
    caption: "Facility interior",
  },
  {
    src: facilitySrc("IMG_7829"),
    alt: `${BRAND} Springfield treatment center facility space`,
    caption: "Facility space",
  },
  {
    src: facilitySrc("IMG_7830"),
    alt: `${BRAND} comfortable recovery environment in Springfield, MO`,
    caption: "Facility space",
  },
];

/** Primary facility still for cards, posters, and OG-style use. */
export const FACILITY_PRIMARY_IMAGE = facilitySrc("IMG_7788");
