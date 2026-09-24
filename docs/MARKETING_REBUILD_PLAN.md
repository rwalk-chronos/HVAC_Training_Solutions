# Marketing site rebuild and article migration plan

Updated: 2026-09-24. Ron chose to launch the new marketing format for the **existing HVAC Boot Camp** while the replacement course delivery is built separately. The recovered Unit 1 demo remains saved at `/unit-1-prototype/` for development review. After the complete new course and its enrollment flow are verified, the marketing site can switch to the new delivery without another site migration.

## Development build status

The marketing build is merged to `main` and deployed on the Cloudflare development Worker through PRs #7 and #8, with PayPal buttons in PR #10 and the same-path thank-you page in PR #11. It includes a reviewable homepage, Boot Camp course page, how-it-works, pricing, a sample of Ron's current teaching, Ron bio, resource hub, contact, and a dedicated `/how-to-learn-hvac/` beginner guide. Sales copy describes the existing 27-module Moodle/textbook/video/quiz course. Pricing discloses $479 in full or $97 now plus six $97 payments ($679 total) and a separate textbook.

The development build now serves **all 154 published WordPress post paths**, including the dedicated beginner guide, from the original URLs. The archive index is `/blog/`; the resource hub links directly to the preserved local articles. `/EPA.pdf` is copied at the original path. Twenty clearly thin or obsolete posts remain accessible but have `indexable=false` for a future public build. This is URL continuity and an editorial starting point, **not a completed technical review** of 154 articles. See the [versioned URL inventory](LEGACY_URL_INVENTORY_2026-09-24.csv) and [migration audit](MIGRATION_AUDIT.md).

This is a **noindex development build**. It does not yet replace the WordPress site. Its pricing buttons point to Ron's existing PayPal hosted buttons, and `/hvac-boot-camp/course-purchase/` matches the current thank-you path. GA4 event loading is gated to a configured, approved public launch; the development preview does not send GA4 events. Ron manually verifies payment and enrolls students in Moodle; the marketing site does not implement enrollment, student accounts, or email automation. The original URL inventory lists **21 unresolved published WordPress page paths**, including the now-built thank-you path whose PayPal return still needs testing. There are 78 missing legacy media paths and policy and payment decisions to resolve before cutover. See [POLICY_LAUNCH_GAPS.md](POLICY_LAUNCH_GAPS.md), [MARKETING_LAUNCH_ANALYTICS.md](MARKETING_LAUNCH_ANALYTICS.md), and [MIGRATION_AUDIT.md](MIGRATION_AUDIT.md). Do not route the public domain here until those gates are complete and verified.

## Goals and boundary

- Preserve useful organic traffic from working technicians while building a separate acquisition path for beginners who may buy Boot Camp. Ranking gains are an outcome to measure, not a promise.
- Preserve useful technical articles and existing URL paths when possible.
- Keep live WordPress marketing and checkout on SiteGround, and Moodle delivery, while Cloudflare remains a noindex development site. Cloudflare is entirely development until the public-domain cutover.
- At marketing launch, Cloudflare serves the public marketing and preserved article URLs. The existing Moodle course remains the paid delivery. The later course swap changes the delivery and enrollment path, not the marketing URLs.
- Do not change public DNS until the complete marketing and checkout path passes review.

## 1. Capture baseline and inventory

Export Search Console page and query performance for the last 16 months, comparing recent three-month and earlier periods. Record clicks, impressions, CTR, position, device, and high-intent queries near page one. Export GA4 landing sessions, source, engagement, and current lead, checkout, and purchase events. Verify whether “no conversions” reflects actual outcomes, missing tracking, or both.

Gather WordPress XML export, published URLs, sitemaps, navigation, media, current forms, and checkout destinations. Include indexed URLs absent from the sitemap. The versioned URL inventory needs: old URL, title, type, likely audience and intent, status, query/traffic evidence, engagement, links if known, action, destination URL, next relevant action, owner, and QA result. El can compare read-only GA4 and Search Console reports once the property and date ranges are verified.

## 2. Decide every URL

| Action | Rule |
| --- | --- |
| Keep | Rebuild useful pages at the existing path |
| Update | Preserve the path; fix stale facts, broken media, unclear copy, and weak CTA |
| Merge | Select the best matching page and permanently redirect duplicates |
| Redirect | Use a one-hop 301/308 to a close replacement |
| Retire | Review traffic and links first; use an appropriate 404/410 if there is no replacement |

Do not mass-delete articles or send unrelated old URLs to the homepage. Preserve topic intent, author evidence, relevant media, canonical host, and internal links. Google recommends an old-to-new URL map, tested redirects, and monitoring for site moves.

Prioritize article work using actual clicks, relevant impressions, query intent, links, and content quality. Do not score a technician repair article as a Boot Camp sales page simply because it attracts visits. Public search results show long-lived technical articles, but they cannot establish which pages drive today's traffic. The existing audit flags wrong dates, unrelated photography template text on brazing pages, stale contact/offer details, and broken navigation.

## 3. Build the money-page journey

Review the existing Cloudflare drafts together: home, `/hvac-boot-camp/`, `/how-it-works/`, `/pricing/`, and free sample. The offer must explain who it helps, what is included, Ron's role, limits of online learning, career/OJT support, total payment terms, textbook, and a clear next action. Add real proof and Ron's bio; use testimonials only with permission. Confirm all prices, refund terms, claims, and contact details against the current approved offer before launch.

For the interim launch, `/try-boot-camp/` shows Ron's public teaching video as a sample of his instructional style. The recovered `/unit-1-prototype/` stays available by direct development URL, outside the public sales journey, until the new course is ready. Review contrast, navigation, speed, and form/CTA behavior on phones. Track beginner-journey teaching-sample views, inquiries, checkout starts, and confirmed purchases separately from technician-article engagement and any voluntary course clicks. Do not send personal or payment data to analytics.

## 4. Reuse articles for the right audience

Ron's live observations are that many visitors are working HVAC technicians looking up a specific repair. The September 24 Search Console **Pages export is filtered to the last three months**: `/EPA.pdf` received 260 of 474 clicks, followed by technical articles. GA4 was only recently re-established and has a few days of data. Neither source establishes a long-term trend or proves who purchased. Treat audience intent as a hypothesis to validate with page/query data and GA4 engagement.

| Visitor intent | Page job | Appropriate next action | Primary measure |
| --- | --- | --- | --- |
| Technician diagnosing or repairing equipment | Solve the technical problem accurately and quickly | Related guides, Ron's relevant videos, optional training that truly fits the topic | Search clicks, engagement, return use |
| Beginner considering an HVAC career | Explain the path, course scope, and support | Free sample, Boot Camp details, pricing, inquiry or enrollment | Qualified leads and purchases |
| EPA 608 study seeker | Supply the requested study resource and current context | Preserve the PDF URL; offer relevant study/help options only when verified | PDF clicks, resource engagement |
| Employer evaluating training | Explain outcomes and supervised OJT support | Employer inquiry when this offer is defined | Qualified employer inquiries |

The WXR import already preserves 154 post URLs and filters unsafe WordPress markup and unrelated outbound links. The original prose remains largely unedited. **Next**, technically and editorially review the leading repair pages in traffic order, recover missing images from SiteGround backup where possible, fix dated details and old course references, and approve a revised article pattern. The refrigerant recovery page has an explicit historical warning and links to current EPA guidance because its old procedure has not been validated as current instruction.

The dedicated beginner guide at `/how-to-learn-hvac/` starts that search-content path. Expand only where query evidence supports career entry, training options, cost, and the difference between online fundamentals and supervised field work. Connect these pages directly to the Boot Camp money pages. Avoid bulk thin location pages. Do not count every technician article visit as a failed Boot Camp conversion.

## 5. Solve checkout and student handoff

The development pricing page links directly to Ron's PayPal hosted buttons: `WAXSA22Y45YUU` for $479 and `7CXTSXX9FSYGS` for the monthly plan. Ron verifies payment and manually enrolls the student in Moodle. The same-path thank-you page tells buyers to watch for the Moodle account email and how to request help; viewing it is not proof of payment. Before cutover, verify both buttons' actual prices and recurring terms, their configured post-payment return to `/hvac-boot-camp/course-purchase/`, PayPal notification to Ron, failed-payment behavior, the manual Moodle handoff, account email, support, and refunds. Keep existing students in Moodle until a separate migration plan is approved.

## 6. QA, cutover, and observation

Before any public-domain change, verify all inventory URLs (especially `/EPA.pdf` and high-click repair articles), their media, redirects, canonical tags, sitemap, metadata, robots/noindex removal at launch only, mobile pages, accessibility, forms, checkout, GA4 events, Search Console ownership, privacy/terms/refund pages, and WordPress/routing rollback. Ron reviews the cutover plan. Use the existing GA4 property and web stream if its ownership and measurement ID are verified; exclude development traffic. Record `begin_checkout` on outbound checkout intent, but count a purchase only from a confirmed transaction or verified return/server event.

After marketing launch, compare 7-, 28-, and 90-day Search Console and GA4 windows by audience intent: technical-resource reach and engagement; beginner landing-page visits, teaching-sample views, qualified leads, checkout starts, and confirmed purchases; and broken URLs. Use one or two controlled page experiments with canonical/redirect handling, rather than publishing many near-duplicate indexed pages. Diagnose traffic and conversion separately. The later course-delivery swap is a distinct release with account, progress, payment, and email testing.

## First build milestone

The reviewable marketing pages, beginner guide, 154 post paths, resource PDFs, PayPal buttons, same-path thank-you page, GA4 launch scaffolding, and versioned URL inventory are built in development. **Next milestone:** approve the Boot Camp page pattern and article revisions, restore priority media, settle the remaining URL decisions, approve policies, then test both PayPal plans and Ron's manual Moodle enrollment end to end. Public-domain migration remains gated on those results and a rollback plan.
