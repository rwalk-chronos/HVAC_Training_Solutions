# HVACTrainingSolutions.net Migration Audit

Status: **In progress — marketing-first priority, September 24, 2026**

The implementation sequence and data requirements are in [MARKETING_REBUILD_PLAN.md](MARKETING_REBUILD_PLAN.md). The versioned [URL inventory](LEGACY_URL_INVENTORY_2026-09-24.csv) compares every published URL in the September 24 WordPress export, the Search Console Pages export, and the built Astro routes.

## Preserved archive implemented in development

- The WXR contains **154 published posts and 34 published pages**. All 154 post records are imported to `src/data/legacy-articles.json` and retain their original paths. One of them, `/how-to-learn-hvac/`, is rebuilt as a dedicated beginner page; the other 153 use the archive article route. The archive is browsable at `/blog/` and selected guides appear at `/resources/`.
- `/EPA.pdf` has been copied byte-for-byte from the WordPress site. Its PDF metadata dates its creation to 2011, so the new EPA study landing page labels it historical and links to current EPA certification requirements. The indexed spark-ignition flowchart PDF and the legacy one-page resource guide PDF were copied too.
- `/nate/` and the original misspelled `/commrecial-refrigeration-hvac-technicians/` each have a dedicated information page. They describe the existing courses without recycling unverified old prices, salary claims, exam guarantees, or checkout forms.
- `/hvac-tech-course/` described a separate 20-module offer. The development build retains that URL as a noindex course-status page so visitors are not silently redirected into the distinct 27-module Boot Camp. Confirm whether the older course is still sold before public cutover.
- Search Console's export filter says **Last 3 months** and its Pages sheet totals 474 clicks / 34,218 impressions. `/EPA.pdf` received 260 clicks; the recovery article 41; PT-chart article 29; superheat article 19. This is a limited snapshot, not a long-term baseline.
- The original refrigerant recovery article is kept for URL continuity, with a prominent article-specific historical warning. Its procedure has **not** been approved as current field instruction. The warning links to EPA's current [service practices](https://www.epa.gov/section608/stationary-refrigeration-service-practice-requirements) and [recovery equipment requirements](https://www.epa.gov/section608/refrigerant-recovery-and-recycling-equipment-certification).
- The import allows only safe article markup and selected source links; old WordPress forms/scripts and unrelated outbound promotional links are removed. Legacy in-article links to retired enrollment and course paths now target corresponding current informational pages. The original article prose remains largely unedited and needs technical and editorial review.

## Remaining URL and media work

- The current inventory has **21 unresolved published page paths**, including seven checkout/payment/enrollment blockers, old webinar and signup flows, three brazing lesson pages, a thermistor page, and clone/test pages. Its `next_action` column distinguishes payment blockers from technical content and retirement review. These are explicit migration decisions, not a public-cutover-ready URL map. Do not redirect the existing WordPress checkout paths until a working payment destination is verified.
- Two clicked Search Console variants are mapped in `public/_redirects`: `/steps-to-measuring-superheat-hvac-training-solutions` and `/checking-the-refrigerant-charge-in-the-colder-months/`. Close informational aliases including `/find-out-more/`, `/self-paced-instructor-guided/`, `/faq/`, and `/hvac-boot-camp-2/` map in one hop to current pages. The 47 unresolved Search Console-only paths in the current inventory have no clicks in this export; many are old media paths.
- Article HTML references **129 distinct same-site upload paths**. 51 were copied from the live site; 78 returned HTTP 404 or are otherwise absent. Of those, 57 distinct missing image paths are used as inline images across 46 articles; the development pages show visible missing-image markers. The exact list is in [LEGACY_MEDIA_GAPS.json](LEGACY_MEDIA_GAPS.json). Recover those originals from SiteGround media/backup where possible, especially the PT-chart and Smart Valve illustrations.
- Historical article content ranges from useful technical guides to thin webinar reminders and dated marketing copy. The initial narrow `indexable=false` review set contains **20 URLs**, all with zero clicks in the supplied Search Console export. Fourteen are extremely short or missing their original video context: `/refrigeration-cycle-part-1-video/`, `/hvac-training-video-condenser/`, `/3-phase-voltage-unbalance/`, `/hvac-simulator-hvac-training/`, `/hvac-training-video-lesson-compressor/`, `/txv-operation-video/`, `/module-review-posted/`, `/free-hvac-training-testing-a-dual-capacitor/`, `/hvac-training-survey/`, `/hvac-schematics-contactors/`, `/online-classroom-tour/`, `/hvac-training-video-basic-pipe-preparation/`, `/video-intro-to-oxyacetylene-torches/`, `/free-hvac-training-schematic-diagrams/`. Six are old announcements/promotions: `/commercial-refrigeration-classes/`, `/awesome-day-hvac-training/`, `/dont-forget-our-google-hangout-tonight-800-pm-est/`, `/attn-contractors-need-help/`, `/coming-soon-hvactraining-tv/`, `/new-hvac-boot-camp/`. They keep exact URLs but are left out of the public sitemap pending review. All other substantive technical posts remain eligible for indexing regardless of low short-window GSC traffic. Continue per-URL KEEP/UPDATE/MERGE/REDIRECT review, preserving ranked article addresses and revising carefully without inventing technical claims.

Regenerate the archive with `python scripts/import-wordpress-articles.py <WordPress-WXR.xml> --gsc <Search-Console-export.zip> --fetch-media`; rebuild and regenerate the route inventory with `python scripts/audit-legacy-urls.py <WordPress-WXR.xml> --gsc <Search-Console-export.zip>`. The two uploaded source exports are not stored in Git.

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

## Remaining migration sequence

1. Finish classifying the 21 unresolved published pages; keep the current WordPress checkout and enrollment paths live until there is a tested payment and Moodle handoff.
2. Restore or replace priority missing media and review the leading technical articles, especially those with safety, regulatory, or equipment-specific steps. Keep all 154 original post addresses during review.
3. Approve the final Boot Camp sales copy, legal policies, contact details, and GA4 measurement configuration. Verify that confirmed purchases, not only outbound checkout clicks, can be measured.
4. Test one-hop redirects, PDFs, all ranked article routes, canonical URLs, sitemap, mobile layout, checkout, and rollback before any public DNS change.
5. Monitor Search Console and GA4 by page intent after an approved launch. The replacement course delivery is a later release.

## Staging SEO safety

The new site is currently configured as **noindex/nofollow** and its
`robots.txt` blocks crawlers. Those controls must be intentionally changed at
production cutover.
