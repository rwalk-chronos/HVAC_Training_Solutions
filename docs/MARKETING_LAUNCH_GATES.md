# Marketing launch execution gates

Status: development only, September 24, 2026. PRs #7 and #8 are merged into `main`; the Cloudflare Worker is a noindex review deployment. The public WordPress site and Moodle course remain live. This checklist records the evidence needed for a separate cutover decision; completing a build does not authorize DNS changes.

## Gate 1 — Current checkout survives the domain move

Ron supplied PayPal hosted button IDs `WAXSA22Y45YUU` (pay in full) and `7CXTSXX9FSYGS` (monthly). PR #10 changed the development pricing links to those independent PayPal URLs. The formerly linked WordPress checkout paths on `www.hvactrainingsolutions.net` will cease to be WordPress pages if the whole hostname moves to the Worker. Confirm the hosted buttons' actual offer, processor return paths, emails, and Moodle enrollment. A PayPal button alone does not prove the Moodle handoff.

Record the verified HTTPS URL for each plan, the payment-to-enrollment integration, and its rollback path. The public build still requires both `BOOT_CAMP_*_CHECKOUT_URL` values explicitly after testing. Keep noindex and GA4 off in development.

| Test for each plan | Evidence to record |
| --- | --- |
| Offer | Displayed price, number and timing of installments, $479 or $97 + six $97 ($679), textbook extra, and the approved refund terms agree across marketing, checkout, and confirmation |
| Successful payment | A controlled transaction has a verified processor record; one Moodle account and one enrollment are produced; student can sign in and open the current 27-module course |
| Returning student / duplicate callback | Existing account is handled correctly and repeated processor notification does not create duplicate enrollment or charge |
| Failed or abandoned payment | No course access is granted; the buyer can retry and support can identify the state |
| Email | Confirmation and login instructions arrive; the support inbox receives or can locate the order |
| Refund / cancellation | Processor action, future installments, Moodle access, buyer email, and accounting follow the approved policy |
| Attribution | Outbound `begin_checkout` is distinct from a verified purchase; no personal or payment data enters GA4 |

Use a sandbox or agreed controlled live test with the payment owner. Preserve transaction IDs and screenshots in a restricted test record, not GitHub. Do not perform a real purchase from a development preview merely to mark this gate complete.

## Gate 2 — Approve the public offer and policies

Ron confirms the legal/operator name, monitored contact address, $479 and $679 offers, textbook, instructor help, access duration, and any career or certification claims. Approve final `/privacy/`, `/terms/`, and `/refund-policy/` wording against the actual WordPress checkout and Moodle behavior. In particular decide the start and scope of the advertised 30-day refund promise, later installments, and access after a refund. Check analytics, YouTube, Calendly, processor, and Moodle disclosures. Remove draft markers only after approval; the public build deliberately fails while they remain. See `POLICY_LAUNCH_GAPS.md`.

## Gate 3 — URL and media parity

The 154 published post paths and `/EPA.pdf` are built, but 21 published WordPress page paths remain unresolved. Classify each in `LEGACY_URL_INVENTORY_2026-09-24.csv` with a destination and test result. Seven are payment/enrollment paths and depend on Gate 1. Preserve the three brazing lessons and thermistor page only after reviewing their original teaching content; decide the webinar, clone, and test paths individually. Do not route checkout paths to a generic sales page.

Recover missing originals from a SiteGround media backup, prioritizing images on clicked technical articles: PT chart, superheat, and Smart Valve, then remaining inline images. `LEGACY_MEDIA_GAPS.json` lists 78 missing upload paths, including 57 distinct inline images across 46 articles. Rebuild and check rendered pages, rather than silently replacing technical diagrams with unrelated stock art. Review dated and safety-sensitive technical instructions separately from URL preservation.

## Gate 4 — Measurement and cutover rehearsal

Verify the business-owned GA4 web stream measurement ID, configure it only for a reviewed public build, and check Realtime/DebugView on the actual public hostname. Confirm `begin_checkout` and contact intent are clicks, not sales or leads. A purchase event needs verified checkout evidence. Compare the current Search Console and GA4 baseline with 7-, 28-, and 90-day windows after launch.

Rehearse the public build, sitemap, canonical host, one-hop redirects, robots/indexing, all high-click article paths and PDFs, forms/links, mobile layout, checkout return paths, Search Console ownership, and a DNS rollback to SiteGround. Record expected DNS/Worker/checkout configuration and rollback owner before requesting a cutover. Keep the Worker noindex and GA4 off until a separate public launch is approved.

## Next executable step

Inspect the two supplied PayPal buttons and obtain a read-only description of the current payment-to-Moodle enrollment path. Then run the two-plan matrix above and record the results. If those buttons bypass the existing enrollment integration, design and test that handoff before public cutover. No production configuration change follows from this document.
