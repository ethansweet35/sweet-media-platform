# In-House vs. Outsourced Billing Calculator — README

## Route

`/resources/in-house-vs-outsourced-calculator`

---

## File Map

```
src/app/resources/in-house-vs-outsourced-calculator/page.tsx
  → App Router entry point (generateMetadata + resolveTrackedPageMetadata)

src/views/resources/in-house-vs-outsourced-calculator/page.tsx
  → Server component: hero, Calculator import, methodology accordion, FAQ, bottom CTA

src/views/resources/in-house-vs-outsourced-calculator/components/Calculator.tsx
  → "use client" — all interactive state, math engine, inputs/results panels, mobile sticky bar

src/views/resources/in-house-vs-outsourced-calculator/components/EmailReportModal.tsx
  → "use client" — email capture modal, posts to /api/contact with calculator snapshot

docs/in-house-vs-outsourced-calculator-copy.md
  → All page copy for CMS editing
```

---

## Deploying / Embedding

The page is a standard Next.js route. No extra dependencies are needed — it uses React state only, no external chart/calculator libraries.

**To deploy:** merge to main; Vercel will pick up the new route automatically on the next build.

**To add to a sitemap:** the `sync-tracked-pages` post-build script will automatically discover and upsert `/resources/in-house-vs-outsourced-calculator` into the `tracked_pages` table on the next build.

---

## Lead Capture Endpoint

The "Email me this report" modal currently posts to `/api/contact` (the standard contact API). This sends a plain-text email to `CONTACT_TO_EMAIL` with the calculator snapshot included in the `message` field.

### For a dedicated calculator endpoint (recommended)

Create `src/app/api/calculator-report/route.ts` that accepts the following JSON body:

```json
{
  "firstName": "string",
  "email": "string (required)",
  "service": "string — facility name",
  "source": "in-house-vs-outsourced-calculator",

  "calculator_monthly_claims": "string — e.g. '200'",
  "calculator_avg_claim_value": "string — e.g. '1200'",
  "calculator_denial_rate": "string — e.g. '12'",
  "calculator_days_in_ar": "string — e.g. '55'",
  "calculator_num_billers": "string — e.g. '2'",
  "calculator_avg_salary": "string — e.g. '58000'",
  "calculator_in_house_total": "string — rounded integer, e.g. '183240'",
  "calculator_outsourced_total": "string — rounded integer, e.g. '114960'",
  "calculator_annual_savings": "string — rounded integer, may be negative"
}
```

The endpoint should:
1. Send a formatted HTML email to the user at `email` with a full breakdown table
2. Send a CRM notification to the Cipher team
3. Optionally push a lead to HubSpot / Salesforce if integrated

**To switch the modal to use this endpoint:** change the `fetch` URL in `EmailReportModal.tsx` from `/api/contact` to `/api/calculator-report`.

---

## Adjusting Cipher's Fee Rate or Denial Assumptions

All Cipher-specific performance assumptions are constants in `Calculator.tsx`:

```typescript
const cipherFeeRate = 0.065;       // 6.5% of collections
const cipherDenialRate = 0.04;     // 4% denial rate
const cipherARDays = 30;           // 30 average days in A/R
```

Change any of these values if Cipher's actual rates or performance benchmarks differ.

The unrecovered denial fraction (40%) is also a constant:
```typescript
// In both in-house and Cipher denial impact lines:
* 0.4  // 40% of denied dollars are never recovered
```

---

## Math Reference

```typescript
// Core inputs
annualClaims = monthlyClaimVolume * 12
annualRevenue = annualClaims * avgClaimValue

// In-house costs
fullyLoadedSalaryPerBiller = avgSalary * (1 + benefitsLoad / 100)
managerCost = managerSalary * (1 + benefitsLoad / 100) * (fullTime ? 1 : managerPercent / 100)
totalSalaryCost = fullyLoadedSalaryPerBiller * numBillers + managerCost
annualSoftware = (billingSoftwareMonthly + clearinghouseFeesMonthly) * 12
annualOverhead = overheadPerBiller * numBillers
denialDollarImpact = annualClaims * (currentDenialRate / 100) * avgClaimValue * 0.40
arOpportunityCost = (annualRevenue * (daysInAR / 365)) * 0.08
inHouseTotalCost = totalSalaryCost + annualSoftware + annualOverhead + denialDollarImpact + arOpportunityCost

// Outsourced (Cipher)
cipherServiceFee = annualRevenue * 0.065
cipherDenialImpact = annualClaims * 0.04 * avgClaimValue * 0.40
cipherAROpportunityCost = (annualRevenue * (30 / 365)) * 0.08
outsourcedTotalCost = cipherServiceFee + cipherDenialImpact + cipherAROpportunityCost

// Delta
annualSavings = inHouseTotalCost - outsourcedTotalCost   // positive = in-house is more expensive
threeYearSavings = annualSavings * 3
isComparable = Math.abs(annualSavings) / inHouseTotalCost < 0.05
```

---

## UTM / Attribution

The primary CTA button appends `?source=cost-calculator` to the `/contact-us` URL. The email modal includes `source: "in-house-vs-outsourced-calculator"` in the POST payload. Both can be used to filter leads in your CRM.
