# Readdy export — The Family Recovery Foundation

Reference build from Readdy project `9931373` (Vite + React Router). Used as the pixel-parity source when porting to `apps/the-family-recovery-foundation` (Next.js).

**Do not commit `.env`** from Readdy (hosted Supabase keys). Platform credentials live in `apps/the-family-recovery-foundation/.env.local`.

## Routes in this export

| Readdy path | Intended live path (Squarespace) |
|-------------|----------------------------------|
| `/` | `/` |
| `/about` | `/about`, `/about-the-family-recovery-foundation` |
| `/partnerships` | `/partnerships` |
| `/testimonials` | `/about/testimonials` |
| `/impact-report` | `/2025-survey-results` (verify copy) |
| `/family-programming` | `/family-programming` |
| `/events` | `/events`, `/events-1`, `/gala` |
| `/events/nashville` | `/gala/nashville` |
| `/donate` | `/donate` |
| `/contact` | `/contact`, `/contact-menu` |

Additional Squarespace-only pages must be built from live crawl: `/3-pillars`, `/prevention`, `/education`, `/financial-aid`, `/resources`, `/get-help`, `/get-involved`, etc.
