# Marketing launch: search and GA4 controls

The ordinary `npm run build` is a development build: every HTML page has `noindex,nofollow`, `robots.txt` disallows crawling, Cloudflare's `_headers` sets `X-Robots-Tag: noindex, nofollow` on assets, and no GA4 script loads. It does not create a public sitemap. The current WordPress site and GA4 property remain the source of public traffic until the cutover.

## Public build configuration

After the public marketing and preserved article URLs, checkout handoff, policy copy, and GA4 web stream have been verified, set these build environment variables in the production build configuration (not in a committed file):

| Variable | Value |
| --- | --- |
| `PUBLIC_GA4_MEASUREMENT_ID` | Verified measurement ID for the **business-owned** `hvactrainingsolutions.net` GA4 web stream, e.g. `G-...` |
| `BOOT_CAMP_FULL_CHECKOUT_URL` | Verified, stable full-payment checkout URL that remains live when the public domain moves off WordPress |
| `BOOT_CAMP_MONTHLY_CHECKOUT_URL` | Verified, stable monthly-payment checkout URL with the same property |
| `MARKETING_PUBLIC_LAUNCH` | `1` only for the public-domain build; `npm run build:public` sets this flag |

Use `npm run build:public` for the reviewed public release and `npm run build` for Worker and branch previews. A public build fails if the GA4 ID is absent or malformed, if checkout URLs are missing or loop to the marketing domain, or if the privacy, terms, or refund page still contains development approval markers. A successful public build is **not** by itself cutover approval; verify DNS routing, old article/PDF parity, policies, checkout, and ownership before routing the domain.

The public build renders marketing HTML with `index,follow`, produces `/sitemap.xml` from generated indexable HTML pages, and publishes a `robots.txt` with the sitemap address. `/unit-1-prototype/` and the 404 page remain `noindex,nofollow` and are excluded from the sitemap. The `_headers` rules keep the Cloudflare `workers.dev` preview host and prototype response noindex even if public build assets are viewed there. A generated sitemap is only a discovery signal; submit and monitor it in Search Console at launch.

## Events and QA

The analytics loader is absent from development, prototype, and 404 pages. On public marketing pages it checks the browser host against `www.hvactrainingsolutions.net` before requesting Google code or sending events, so Workers preview traffic is not counted even if it receives a public build. The site uses the verified GA4 web stream instead of creating another property. The starter events are:

| Event | Trigger | Meaning |
| --- | --- | --- |
| automatic GA4 `page_view` | Public-domain page load | A marketing page visit |
| `teaching_sample_page_view` | `/try-boot-camp/` load | Sample page opened; **not** verified video play |
| `teaching_sample_video_open` | Click on the public YouTube lesson link | Visitor chose to open Ron's video on YouTube |
| `contact_intent` | Email or scheduler link click | Contact intent; **not** a submitted lead |
| `begin_checkout` | Click on one of the two tagged pricing checkout links | Checkout intent; **not** a confirmed payment |

The site emits **no** `generate_lead` or `purchase` event: there is no confirmed form submission or transaction callback on this marketing site. Configure those only after the actual checkout/account system reports a verified outcome, and prevent duplicates. Do not put email, phone, student details, or payment data into analytics parameters.

At launch, inspect built HTML/headers/robots/sitemap; test each pricing link on mobile and desktop; confirm GA4 Realtime and DebugView events on the **public hostname**, then compare Search Console and GA4 by landing page, source, and device. Confirm the privacy notice accurately describes Google Analytics, YouTube, scheduling, and payment handoffs before GA4 is enabled. Ron and El should use read-only GA4/Search Console access for ongoing 7-, 28-, and 90-day comparisons.
