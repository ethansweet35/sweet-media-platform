# Sullivan Recovery — legacy URL mapping

WordPress URLs that are **not** rebuilt at the same path. The Next app serves native pages under `/programs/*`, `/insurance/*`, etc., and permanent redirects in `src/lib/site-redirects.ts` plus blog rewrites in `src/lib/wp-blog-rewrites.ts` preserve SEO.

## Intake / contact (→ `/insurance/`)

| Legacy path | Replacement |
|-------------|-------------|
| `/contact/` | `/insurance/` |
| `/contact-us/` | `/insurance/` |
| `/admissions/` | `/insurance/` |
| `/admissions-process/` | `/insurance/` |

## Site sections

| Legacy path | Replacement |
|-------------|-------------|
| `/about/` | `/our-approach/` |
| `/services/` | `/programs/` |
| `/resources/` | `/blog/` |
| `/blogs/*` | `/blog/*` |

## Native landing pages (same URL as WordPress)

| Path | Notes |
|------|--------|
| `/general-detox/` | PPC landing page — conversion hero + homepage-style sections |

## Standalone detox slugs

| Legacy path | Replacement |
|-------------|-------------|
| `/detox-alcohol-near-me/` | `/programs/detox/alcohol/` |
| `/detox-in-orange-county/` | `/programs/detox/orange-county/` |
| `/drug-and-alcohol-detox-mission-viejo/` | `/programs/detox/drugs/` |
| `/opioid-detox-orange-county/` | `/programs/detox/opioids/` |
| `/fentanyl-detox-near-me/` | `/programs/detox/fentanyl/` |
| `/meth-detox-mission-viejo/` | `/programs/detox/meth/` |
| `/cocaine-detox-center-california/` | `/programs/detox/cocaine/` |
| `/benzo-detox-orange-county/` | `/programs/detox/benzodiazepines/` |
| `/suboxone-detox-centers-near-me/` | `/programs/detox/suboxone/` |
| `/stimulants-detox/` | `/programs/detox/stimulants/` |
| `/detox-facility-orange-county/` | `/programs/detox/orange-county/` |

## Programs (nested under `/addiction-aftercare-program/`)

| Legacy path | Replacement |
|-------------|-------------|
| `/addiction-aftercare-program/` | `/programs/detox/` |
| `.../opioid-detox-orange-county/` | `/programs/detox/opioids/` |
| `.../fentanyl-detox-near-me/` | `/programs/detox/fentanyl/` |
| `.../meth-detox-mission-viejo/` | `/programs/detox/meth/` |
| `.../cocaine-detox-center-california/` | `/programs/detox/cocaine/` |
| `.../benzo-detox-orange-county/` | `/programs/detox/benzodiazepines/` |
| `.../suboxone-detox-centers-near-me/` | `/programs/detox/suboxone/` |
| `.../stimulants-detox/` | `/programs/detox/stimulants/` |
| `.../detox-facility-orange-county/` | `/programs/detox/orange-county/` |
| `.../drug-and-alcohol-detox-mission-viejo/` | `/programs/detox/drugs/` |
| `.../iop-treatment-mission-viejo/` | `/programs/residential-treatment/` |
| `.../aftercare-programs/` | `/programs/aftercare/` |
| `.../wellbriety-program/` | `/programs/wellbriety/` |
| `.../addiction-therapies/` | `/programs/therapies/` |
| `.../personalized-care-drugs/` | `/programs/personalized-care/` |
| `.../addiction-aftercare-programs-near-me/` | `/programs/` |
| `.../aetna-insurance-coverage-for-rehab/` | `/insurance/aetna/` |
| `.../anthem-blue-cross-rehab-insurance/` | `/insurance/anthem/` |
| `.../cigna-rehab-coverage/` | `/insurance/cigna/` |
| `.../beacon-health-insurance-rehab-coverage/` | `/insurance/beacon/` |

## Service areas

| Legacy path | Replacement |
|-------------|-------------|
| `/service-area/` | `/programs/detox/orange-county/` |
| `/service-area/detox-center-huntington-beach/` | `/programs/detox/orange-county/` |
| `/service-area/drug-detox-lake-forest/` | `/programs/detox/orange-county/` |
| `/service-area/laguna-beach-detox/` | `/programs/detox/orange-county/` |
| `/service-area/newport-beach-detox/` | `/programs/detox/orange-county/` |
| `/service-area/orange-county-medical-detox/` | `/programs/detox/orange-county/` |

## Flat program slugs (defensive redirects)

| Legacy path | Replacement |
|-------------|-------------|
| `/iop-treatment-mission-viejo/` | `/programs/residential-treatment/` |
| `/aftercare-programs/` | `/programs/aftercare/` |
| `/wellbriety-program/` | `/programs/wellbriety/` |
| `/addiction-therapies/` | `/programs/therapies/` |
| `/personalized-care-drugs/` | `/programs/personalized-care/` |
| `/addiction-aftercare-programs-near-me/` | `/programs/` |

## Blog posts

Root-level post URLs (e.g. `/how-long-fentanyl-stays-in-your-system/`) rewrite to `/blog/<slug>/` via `wp-blog-rewrites.ts` (~139 paths).

## Native pages (no redirect — built in Next)

Home, `/our-approach/`, `/our-approach/our-team/`, `/programs/**`, `/insurance/**`, `/daily-schedule/`, `/privacy-policy/`, `/blog/`, `/blog/[slug]/`.
