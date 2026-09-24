# Marketing site rebuild and article migration plan

Updated: 2026-09-24. Ron chose the marketing site first because traffic has declined and there are no conversions. The recovered Unit 1 demo remains saved at `/unit-1-prototype/`; course expansion follows this marketing work.

## Development build status

The `feature/marketing-face` branch now implements a first reviewable marketing face: homepage, Boot Camp course page, how-it-works, pricing, selected Unit 1 preview entry, Ron bio, resource hub, and contact. The copy separates the existing 27-module Moodle/textbook/video/quiz course from the five-part lesson redesign. Pricing discloses $479 in full or $97 now plus six $97 payments ($679 total) and a separate textbook. The resource hub currently links back to original production article and PDF URLs while preserving their search entry points.

This is a **noindex development build**. It does not yet replace the WordPress site or its existing checkout. The new marketing pages do not implement new enrollment, student accounts, email automation, or production analytics. The unresolved policy and checkout decisions are in [POLICY_LAUNCH_GAPS.md](POLICY_LAUNCH_GAPS.md); URL/media migration remains in [MIGRATION_AUDIT.md](MIGRATION_AUDIT.md). Do not route the public domain here until both are complete and verified.

## Goals and boundary

- Preserve useful organic traffic from working technicians while building a separate acquisition path for beginners who may buy Boot Camp. Ranking gains are an outcome to measure, not a promise.
- Preserve useful technical articles and existing URL paths when possible.
- Keep live WordPress and Moodle running while Cloudflare remains a noindex development site.
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

Ron selected the recovered `/unit-1-prototype/` as the public development sample. The marketing CTAs now go there; `/try-boot-camp/` is an explanatory entry page that also opens the selected prototype. Review contrast, navigation, speed, and form/CTA behavior on phones. Track beginner-journey sample starts, inquiries, checkout starts, and confirmed purchases separately from technician-article engagement and any voluntary course clicks. Do not send personal or payment data to analytics.

## 4. Reuse articles for the right audience

Ron's live observations are that many visitors are working HVAC technicians looking up a specific repair. The first five days in the September 24 Search Console export are consistent with strong technical and EPA-study demand, but they do not establish historical trends or prove who purchased. Treat audience intent as a hypothesis to validate with page/query data and GA4 engagement.

| Visitor intent | Page job | Appropriate next action | Primary measure |
| --- | --- | --- | --- |
| Technician diagnosing or repairing equipment | Solve the technical problem accurately and quickly | Related guides, Ron's relevant videos, optional training that truly fits the topic | Search clicks, engagement, return use |
| Beginner considering an HVAC career | Explain the path, course scope, and support | Free sample, Boot Camp details, pricing, inquiry or enrollment | Qualified leads and purchases |
| EPA 608 study seeker | Supply the requested study resource and current context | Preserve the PDF URL; offer relevant study/help options only when verified | PDF clicks, resource engagement |
| Employer evaluating training | Explain outcomes and supervised OJT support | Employer inquiry when this offer is defined | Qualified employer inquiries |

Migrate a representative high-value repair article at its original URL. Correct technical claims, images, byline/contact details, old course references, and template contamination. Give the reader the answer first, related technical reading second, and a course link only where it genuinely fits. Approve this article pattern before repeating it.

Build a separate beginner search-content path around career entry, learning HVAC from zero, training options, cost, and the difference between online fundamentals and supervised field work. Connect these pages directly to the Boot Camp money pages. Use actual queries to prioritize and avoid bulk thin location pages. Do not count every technician article visit as a failed Boot Camp conversion.

## 5. Solve checkout and student handoff

The development pricing page currently links to WordPress checkout paths on the same public domain. Once that domain serves Cloudflare, those paths will no longer automatically reach WordPress. Before cutover, select and test a retained checkout hostname or an approved replacement payment path. Verify confirmation, failure recovery, attribution, student access handoff, contact form, email delivery, and support. The course rewrite can wait; the marketing site's purchase or inquiry path cannot.

## 6. QA, cutover, and observation

Before any public-domain change, verify all inventory URLs, redirects, canonical tags, sitemap, metadata, robots/noindex removal at launch only, mobile pages, accessibility, forms, checkout, GA4 events, Search Console ownership, privacy/terms/refund pages, and WordPress/routing rollback. Ron reviews the cutover plan.

After launch, compare 7-, 28-, and 90-day Search Console and GA4 windows by audience intent: technical-resource reach and engagement; beginner landing-page visits, sample starts, qualified leads, checkout starts, and purchases; and broken URLs. Diagnose traffic and conversion separately.

## First build milestone

Deliver the URL/analytics inventory with audience intent, one approved Boot Camp page pattern for beginners, one migrated repair article at its existing URL, and a tested checkout/contact handoff. Then expand the money pages and priority article batch. This milestone makes the migration concrete without waiting for a full course rewrite.
