# Gate 1 checkout and manual enrollment evidence — September 25, 2026

Scope: first marketing release for the **existing 27-module Moodle Boot Camp**. This is a read-only investigation and an operational runbook to verify with Ron. No PayPal, Moodle, WordPress, DNS, or Worker configuration was changed. Do not use this record as cutover approval.

## Revision and deployment evidence

- GitHub `main` at investigation start: `19cbd9d4c921c2f06c5eb3ce9f609f8238523746` (September 25 handoff merge, documentation only). GitHub's Verify action succeeded for this SHA.
- `recovery/money-pages-unit1` points to `31d5b6db95534694dcedaf453c465e7f33fd9577`, the prior `main` commit. Its Verify action succeeded on September 24.
- The repository's only GitHub Actions workflow builds/verifies; it does **not** deploy. `wrangler.jsonc` names `hvac-training-solutions`, and `npm run deploy` is a manual build plus `wrangler deploy`. These facts do not establish which revision Cloudflare is serving.
- **Worker deployed SHA and Cloudflare source branch: unverified.** Check the Worker's Cloudflare deployment/version history for the active version, deployment timestamp, source branch and commit, and compare a content fingerprint from that exact revision. A working URL or a successful GitHub Verify run is not deployment proof.

## Buttons and offer evidence

| Plan | Link in development source and current WordPress checkout page | Public page claim | PayPal observation | Still required in merchant account |
| --- | --- | --- | --- | --- |
| Pay in full | [Hosted button WAXSA22Y45YUU](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WAXSA22Y45YUU) | [WordPress pay-in-full page](https://www.hvactrainingsolutions.net/hvac-boot-camp/pay-in-full/) says $479, textbook separate, 30-day refund promise | Following the WordPress checkout link reached PayPal and showed **$479.00 USD** before sign-in. This does not verify item identity, tax, final charge or seller account. | Button configuration, merchant/recipient, currency, item description, shipping/tax, refund text, notification, successful return and cancel URL |
| Monthly | [Hosted button 7CXTSXX9FSYGS](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7CXTSXX9FSYGS) | [WordPress monthly page](https://www.hvactrainingsolutions.net/hvac-boot-camp/monthly-plan/) says $97 to start and six monthly $97 payments, $679 total, textbook separate, 30-day refund promise | Following the WordPress checkout link reached PayPal, but its read-only HTML only asked for JavaScript and cookies. **The PayPal recurrence and amount were not verified.** | Initial $97, six subsequent $97 charges, first renewal date/interval, subscription end, merchant/recipient, currency, item and disclosure, notification, successful return and cancel URL |

Both development links are in `src/lib/checkout.ts`. The development return page is `/hvac-boot-camp/course-purchase/` and is noindex. Neither link itself encodes a return URL. The **configured return URL for each button remains unverified**, including whether it uses the same path on the public hostname and whether automatic return is enabled. The return page is informational; a visit is never proof of payment. Do not record a `purchase` event from a click or return visit.

## Manual payment-to-Moodle procedure to confirm with Ron

Ron has confirmed only that he verifies payment and manually enrolls students. The following is the proposed repeatable sequence, **not a claim that these are his present clicks, notification source, or timing**:

1. Check the monitored PayPal merchant account directly. Find a completed/captured payment for the intended hosted button and amount, or the first successful subscription payment. Match its payer email/name and PayPal transaction or subscription ID. A notification email, screenshot, pending authorization, or thank-you visit alone is insufficient. Record the ID and decision in a restricted operational record outside GitHub.
2. Check whether that transaction/subscription ID was already processed. Search the current Moodle site at [hvactraining.academy](https://hvactraining.academy/) for the buyer's email and any existing account. If the buyer used a different PayPal email, confirm the requested student email through the buyer before attaching access. Do not create duplicate users or enroll twice on a repeated notice.
3. If no matching Moodle account exists, create one with the confirmed student email and let Moodle issue its account setup message. If an account exists, use it and send the appropriate existing-user access instructions; a “New user account” email may **not** be sent for an existing student. Never send passwords in a manual email or store them in this record.
4. Enroll that one account in the **current 27-module Boot Camp**, then check enrollment and role. Verify the student can reach the course and that the account/setup email was delivered or a reset path works. Record completion time and the support contact route in the restricted record.
5. For pending, failed, canceled or abandoned payments, hold enrollment and explain the retry/support path. For refund or subscription cancellation, follow the approved refund/access policy; confirm future installment handling, Moodle access, and the buyer message before acting.
6. If Ron is unavailable, a named authorized backup needs read access to the PayPal payment status and Moodle enrollment controls, plus an agreed response window. The backup person, access method and escalation are **not yet established**.

The current thank-you copy says to watch for “HVAC Training Solutions: New user account,” includes Moodle login details, and asks buyers to allow up to 30 minutes. **The 30-minute service target and message delivery have not been measured.** Confirm a realistic window and a support fallback before retaining that promise at launch. Keep payment records and student identifiers out of GitHub and GA4.

## Controlled rehearsal and gate decision

For **each** button, record a restricted test case with date, button ID, displayed checkout terms, recipient, configured return/cancel URL, PayPal status/notice, Moodle account/enrollment, message delivery, login result and elapsed time. Cover successful payment, an existing student, a duplicate notice, failed/abandoned checkout and refund/cancellation. A sandbox button can differ from the live hosted button; verify the live button settings as well. Use an agreed controlled live transaction only with the payment owner.

**Gate 1 remains blocked.** The full-pay amount was visible, and the current WordPress page claims match the development offer. The monthly PayPal terms, both return URLs, notification destination, exact enrollment operations, backup coverage, realistic timing and end-to-end tests remain open. Gates 2–4 in [MARKETING_LAUNCH_GATES.md](MARKETING_LAUNCH_GATES.md) also remain open.
