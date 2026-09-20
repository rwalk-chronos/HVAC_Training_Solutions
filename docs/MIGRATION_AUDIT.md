# HVACTrainingSolutions.net Migration Audit

Status: **In progress**

## Non-negotiable launch rule

The existing WordPress production site remains live until the replacement has
passed URL, content, conversion, analytics, Search Console, form, checkout,
student-login, mobile, performance, redirect, and rollback verification.

## Public audit findings captured so far

### Preserve and modernize

The existing domain has a long-lived technical HVAC content library. Old
educational URLs should not be mass-deleted. Each URL must be classified before
migration as:

- KEEP
- UPDATE
- MERGE
- REDIRECT
- DELETE

### High-priority cleanup items identified

- Broken/implausible displayed dates on legacy posts.
- Photography/template contamination on brazing lesson pages.
- Conflicting course/payment language.
- Conflicting public identity/location/phone information across properties.
- Fragmentation across HVACTrainingSolutions.net, HVACTrainingPortal.com,
  HVACTechHangout.com, and HVACTraining.Academy.
- Dead or broken outbound navigation.
- Old spelling/grammar errors and stale claims.
- Weak visibility of instructor support, job-search help, interview preparation,
  OJT/apprenticeship support, and troubleshooting practice.
- Old lead magnet is weaker than a free lesson or skills/career assessment.
- Modern A2L / R-454B / R-32 content presents a strong refresh opportunity.

## Initial migration strategy

1. Inventory every currently discoverable/indexed URL.
2. Pull Search Console query/page history before destructive decisions.
3. Preserve high-value existing URLs.
4. Create explicit 301 mappings for retired URLs.
5. Rebuild one money page first: `/hvac-boot-camp/`.
6. Lock the design language after that page is approved.
7. Rebuild homepage and remaining money pages.
8. Rehabilitate the strongest technical articles and add modern topic clusters.
9. Verify migration gates before DNS cutover.

## Staging SEO safety

The new site is currently configured as **noindex/nofollow** and its
`robots.txt` blocks crawlers. Those controls must be intentionally changed at
production cutover.
