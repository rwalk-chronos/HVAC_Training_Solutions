# Marketing launch execution gates

Status: development only, September 24, 2026. PRs #7, #8, #10, and #11 are merged into `main`; the Cloudflare Worker is a noindex review deployment. The public WordPress site and Moodle course remain live. This checklist records the evidence needed for a separate cutover decision; completing a build does not authorize DNS changes.

## Gate 1 — Current checkout survives the domain move

Ron supplied PayPal hosted button IDs `WAXSA22Y45YUU` (pay in full) and `7CXTSXX9FSYGS` (monthly). PR #10 changed the development pricing links to those independent PayPal URLs, verified on the Worker. Ron confirmed that he manually enrolls paid students in Moodle. PR #11 preserved the existing WordPress thank-you path, `/hvac-boot-camp/course-purchase/`, as a development page that explains the manual handoff. The return page is noindex and its visit does not prove payment. Confirm each PayPal button's actual offer and configured post-payment return URL; the public WordPress paths will cease to be WordPress pages when the hostname moves to the Worker.

Record the verified HTTPS URL for each plan, the PayPal notification Ron uses to identify a paid student, the manual enrollment and account-email procedure, and its backup when Ron is unavailable. The public build still requires both `BOOT_CAMP_*_CHECKOUT_URL` values explicitly after testing. Keep noindex and GA4 off in development.

| Test for each plan | Evidence to record |
| --- | --- |
| Offer | Displayed price, number and timing of installments, $479 or $97 + six $97 ($679), textbook extra, and the approved refund terms agree across marketing, checkout, and confirmation |
| Successful payment | A controlled transaction has a verified PayPal record; Ron receives notice, manually creates or matches one Moodle account and enrollment, and the student can sign in to the current 27-module course |
| Existing student / duplicate notice | Ron checks for an existing account and enrollment before acting again; a duplicate PayPal notice does not cause duplicate access work |
| Failed or abandoned payment | Ron does not enroll without a verified payment; the buyer can retry and support can identify the state |
| Return page and email | Each PayPal button's post-payment return goes to `/hvac-boot-camp/course-purchase/`; the student sees accurate manual-access instructions and receives the Moodle “New user account” email after Ron's enrollment |
| Refund / cancellation | Processor action, future installments, Moodle access, buyer email, and accounting follow the approved policy |
| Attribution | Outbound `begin_checkout` is distinct from a verified purchase; no personal or payment data enters GA4 |

Use a sandbox or agreed controlled live test with the payment owner. Preserve transaction IDs and screenshots in a restricted test record, not GitHub. Do not perform a real purchase from a development preview merely to mark this gate complete.

## Gate 2 — Approve the public offer and policies

Ron confirms the legal/operator name, monitored contact address, $479 and $679 offers, textbook, instructor help, access duration, and any career or certification claims. Approve final `/privacy/`, `/terms/`, and `/refund-policy/` wording against the actual WordPress checkout and Moodle behavior. In particular decide the start and scope of the advertised 30-day refund promise, later installments, and access after a refund. Check analytics, YouTube, Calendly, processor, and Moodle disclosures. Remove draft markers only after approval; the public build deliberately fails while they remain. See `POLICY_LAUNCH_GAPS.md`.

## Gate 3 — URL and media parity

The 154 published post paths, `/EPA.pdf`, and the thank-you path are built. The original inventory still lists 21 published WordPress page paths as unresolved; one of them is the now-built thank-you page and its return behavior remains to be tested. Classify each in `LEGACY_URL_INVENTORY_2026-09-24.csv` with a destination and test result. Other payment/enrollment paths depend on Gate 1. Preserve the three brazing lessons and thermistor page only after reviewing their original teaching content; decide the webinar, clone, and test paths individually. Do not route checkout paths to a generic sales page.

Recover missing originals from a SiteGround media backup, prioritizing images on clicked technical articles: PT chart, superheat, and Smart Valve, then remaining inline images. `LEGACY_MEDIA_GAPS.json` lists 78 missing upload paths, including 57 distinct inline images across 46 articles. Rebuild and check rendered pages, rather than silently replacing technical diagrams with unrelated stock art. Review dated and safety-sensitive technical instructions separately from URL preservation.

## Gate 4 — Measurement and cutover rehearsal

Verify the business-owned GA4 web stream measurement ID, configure it only for a reviewed public build, and check Realtime/DebugView on the actual public hostname. Confirm `begin_checkout` and contact intent are clicks, not sales or leads. A purchase event needs verified checkout evidence. Compare the current Search Console and GA4 baseline with 7-, 28-, and 90-day windows after launch.

Rehearse the public build, sitemap, canonical host, one-hop redirects, robots/indexing, all high-click article paths and PDFs, forms/links, mobile layout, checkout return paths, Search Console ownership, and a DNS rollback to SiteGround. Record expected DNS/Worker/checkout configuration and rollback owner before requesting a cutover. Keep the Worker noindex and GA4 off until a separate public launch is approved.

## Next executable step

Inspect the two supplied PayPal buttons' settings, especially the return URL and notification destination. Document Ron's manual payment verification, Moodle enrollment, and account-email steps. Then run the two-plan matrix above and record the results. No production configuration change follows from this document.
