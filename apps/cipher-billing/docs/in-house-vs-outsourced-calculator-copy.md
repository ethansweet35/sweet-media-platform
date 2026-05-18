# In-House vs. Outsourced Billing Calculator — Page Copy

_Use this file to populate CMS fields or to review/edit page text independently of the code._

---

## Hero Section

**Eyebrow:** BILLING COST CALCULATOR

**H1:** What Is In-House Billing *Actually* Costing You?

**Subhead:**
Most behavioral health facilities underestimate the true cost of in-house billing by 30–40%. They count salaries. They miss software, clearinghouse fees, the 40% of denied claims that never get collected, and the capital tied up in 55-day A/R cycles. This calculator adds it all up.

**Trust bullets:**
- Updates in real-time
- Transparent methodology
- Behavioral health benchmarks

---

## Calculator Section

### Section A — Volume & Revenue

- Monthly Claim Volume *(default: 200)*
- Average Claim Value *(default: $1,200)*
- Current Denial Rate *(slider 0–30%, default: 12%)*
- Days in A/R *(default: 55)*

### Section B — In-House Team Costs

- Number of Billing Staff *(default: 2)*
- Avg. Annual Salary / Biller *(default: $58,000)*
- Benefits & Payroll Tax Load *(slider 20–40%, default: 28%)*
- Manager / Supervisor Allocation *(toggle: % of Time or Full Salary; defaults: $80,000 salary, 25% time)*

### Section C — Technology & Overhead

- Billing / EMR Software Monthly *(default: $800)*
- Clearinghouse Fees Monthly *(default: $300)*
- Office Overhead per Biller Annual *(default: $4,800)*

### Result Card Labels

**Card 1 — In-House True Cost (Annual)**
- Salaries + benefits
- Software + clearinghouse
- Office overhead
- Unrecovered denial revenue
- A/R aging opportunity cost
- Cost / Claim
- % of Collections

**Card 2 — With Cipher — Estimated Annual Cost**
- Service fee (6.5% of collections)
- Denial impact at 4% rate
- A/R aging cost at 30-day avg
- Cost / Claim
- % of Collections

**Card 3 — Annual Delta**
- Label (positive savings): "Estimated Annual Savings"
- Label (comparable ≤5%): "Comparable Costs"
- Label (in-house advantage): "In-House Advantage"
- 3-year note (positive): "3-year projection: $X in cumulative savings"
- Comparable note: "Both approaches are within 5% of each other. Your decision may hinge on control, staff capacity, or compliance risk tolerance."

**Primary CTA button:** Schedule a Free Revenue Audit →
**Link:** `/contact-us?source=cost-calculator`

**Email report note:** Based on industry averages. Email me this report for a saved copy.

---

## Inline CTA Strip

**Heading:** These numbers are based on industry averages.
**Subtext:** Get a precise quote based on your facility's actual claim mix.
**Button:** Schedule a Free Revenue Audit →

---

## Methodology Section

**Eyebrow:** TRANSPARENCY

**H2:** How We Calculate This

**Intro:**
Every assumption is documented below. If your CFO disagrees with a benchmark, adjust the inputs — or call us and we'll walk through it together.

### Accordion Items

**1. True Cost of Denials**
Denied claims × average claim value × 40%. The 40% factor represents the industry average for behavioral health denials that are never collected — either because the appeal deadline passes, clinical documentation is insufficient, or the follow-up cost exceeds the recovery value. Source: HFMA Denial Management benchmarks for behavioral health.

**2. Cost of A/R Aging — Opportunity Cost**
A/R balance × cost of capital (8%) × (days in A/R ÷ 365). Your A/R balance represents cash that belongs to your facility but is sitting in the payer's hands. We value the delay at 8% annually — a conservative cost-of-capital assumption for behavioral health operators. Every day you reduce your A/R days is a direct cash-flow improvement.

**3. Outsourced Fee Assumption — 6.5% of Collections**
This is the industry midpoint for full-service behavioral health RCM outsourcing covering VOB, submission, denial management, appeals, and reporting. Vendor fees range from 5–9% depending on volume, specialty mix, and scope. Adjust the comparison by changing the inputs to reflect your negotiated rate.

**4. Outsourced Denial Rate — 4%**
Cipher's stated denial rate performance target for behavioral health claims. This compares to an industry in-house median of 12–18%. The gap is driven by VOB accuracy at admission, pre-submission audits, and systematic utilization review documentation that most in-house teams underinvest in.

**5. Outsourced A/R Days — 30 Days**
Cipher's average days-to-first-payment benchmark. The national in-house median for behavioral health is 45–65 days. Faster A/R cycles directly improve operating cash flow and reduce the opportunity cost of capital sitting in the payer pipeline.

**6. Benefits & Payroll Tax Load**
Applied as a percentage of base salary to estimate total employer cost per biller. Includes FICA (7.65%), health insurance, dental, vision, paid time off, and any 401(k) match. A 28% load is a conservative estimate for behavioral health billing staff in the western U.S. Adjust based on your actual benefit package.

---

## FAQ Section

**Eyebrow:** COMMON QUESTIONS

**H2:** Frequently Asked Questions

### Q1: Why is the true cost higher than just salaries?

Salaries are the visible line item. The hidden costs are what catch operators off guard. When a claim is denied and never collected — typically 40% of denied behavioral health claims — that's lost revenue that doesn't show up in payroll. When cash sits in accounts receivable for 55 days instead of 30, the cost of capital compounds quietly. Add software licenses, clearinghouse fees, manager time, training, turnover, and desk costs — and the true all-in cost of in-house billing is routinely 30–40% higher than what the P&L shows.

### Q2: What if my facility is very small?

Smaller facilities often feel the cost pressure most acutely. With a low claim volume, fixed overhead costs — software, clearinghouse, at least one full-time biller — represent a larger share of collections. Many small behavioral health practices find that outsourcing makes financial sense at as few as 50–75 monthly claims. The calculator reflects this: if your volume is low, compare the cost-per-claim outputs closely.

### Q3: Are these numbers specific to behavioral health?

Yes. The default values — denial rates, A/R days, biller salaries, clearinghouse costs — are calibrated to behavioral health billing specifically: detox, residential, PHP, IOP, outpatient mental health. General medical billing benchmarks don't apply here. Behavioral health has structurally higher denial rates, more complex utilization review requirements, and payer-specific quirks that drive up cost and stretch out A/R days.

### Q4: How accurate is this estimate?

It's a directional estimate based on industry medians, not a quote. Accuracy depends entirely on how precisely you've filled in your inputs. The methodology above is fully transparent — every assumption is documented. For a precise comparison based on your actual claim mix, payer panel, and denial history, a free revenue audit will give you real numbers specific to your facility.

---

## Bottom CTA (Lead Form)

*Reuses the `OurCompanyLeadSection` component — see `src/views/our-company/components/OurCompanyLeadSection.tsx` for current copy. Update copy there to affect this section.*

---

## Email Report Modal

**Eyebrow:** SAVE YOUR RESULTS

**Heading:** Email Me This Report

**Body:** We'll send a summary of your cost comparison. Our team may also follow up with a personalized assessment.

**Fields:** First Name, Work Email, Facility Name

**Submit button:** Send Report

**Footer note:** We respect your privacy and won't share your information.
