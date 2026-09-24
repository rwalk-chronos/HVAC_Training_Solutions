# Consolidation Plan

## Frozen decision

HVAC Training Solutions will become one custom application. It will replace the public WordPress experience and the Moodle student experience after the replacement is proven.

The live WordPress and Moodle systems remain untouched during development.

## Current development focus

Marketing site first. Ron reported diminished traffic and no conversions and chose to build the public site before returning to course delivery. The immediate work is a measured URL/article inventory, clearer money pages, a verified conversion path, and safe migration. See [MARKETING_REBUILD_PLAN.md](MARKETING_REBUILD_PLAN.md).

The recovered `/unit-1-prototype/` remains saved as the selected learning baseline. Course expansion follows the marketing foundation.

## Repository authority

| Repository | Status | Allowed use |
|---|---|---|
| `rwalk-chronos/HVAC_Training_Solutions` | Active | Canonical product repository |
| `rwalk-chronos/hvac-lti` | Failed historical attempt | Reference only when Ron explicitly requests it; do not import |
| `rwalk-chronos/ai-hvac-lms` | Failed historical attempt | Reference only when Ron explicitly requests it; do not import |

## Current committed state

The active repository now contains:

- Astro/Cloudflare application scaffolding and development-only public home, Boot Camp, how-it-works, pricing, and trial routes
- the recovered September 22 five-section Unit 1 demo at `/unit-1-prototype/`, with selected media, PT-chart image, checks, and heat interaction
- recovery provenance and a media inventory; see [RECOVERY_STATE.md](RECOVERY_STATE.md)
- migration, development, and sales-page notes, plus development crawler protection

Ron selected `/unit-1-prototype/` as the Unit 1 baseline to build upon. The later `/unit-1/lesson-1/` reconstruction was rejected and removed. Do not replace the selected prototype with the older eight-page pilot or treat the old “missing source” assessment as current.

On September 24, 2026, GitHub access for the Cloudflare Workers and Pages app was repaired. Cloudflare's development Worker is connected to `recovery/money-pages-unit1`; Ron reported a successful automatic build after commit `62f063cee244878a1f3f5d7176abfe5a7f3a5b06`. The build result confirms the connection; phone playback and interaction review remain to be done. The live WordPress and Moodle sites were not changed. See [DEVELOPMENT.md](DEVELOPMENT.md) for the current workflow.

## Target product boundaries

### Public routes

The public side acquires and converts the right student.

- `/`
- `/hvac-boot-camp/`
- `/how-it-works/`
- `/pricing/`
- `/try-boot-camp/`
- `/checkout/`
- `/enrollment/success/`
- `/login/`

### Learning routes

The student side delivers the course.

- `/learn/`
- `/learn/dashboard/`
- `/learn/unit-1/`
- `/learn/unit-1/<lesson>/`
- `/account/`

Routes are a target map, not permission to scaffold empty pages.

## Shared foundations

Public and learning experiences will share:

- visual tokens and components
- mobile navigation
- content tone and terminology
- user/account model
- PayPal billing and automatic-enrollment boundary
- event names and analytics
- deployment and environment rules

Marketing code and learning code may remain internally separated, but they must ship as one coherent product.

## First marketing slice

1. Capture search and conversion baselines, including the short available Search Console snapshot.
2. Map technician repair queries to technical articles and beginner training queries to the Boot Camp pages.
3. Preserve one high-value repair article at its existing URL and improve its usefulness without forcing a beginner sales CTA.
4. Refine the Boot Camp, pricing, and free-sample path for prospective beginners.
5. Verify contact and checkout handoff on a phone and measure each audience separately.

The saved Unit 1 demo may be linked as a learning sample once reviewed; course expansion does not block marketing development.

## Future learning AI boundary

Allowed learner actions:

- Explain this more simply.
- Give me an HVAC example.
- Why do I need to know this?
- Quiz me.
- Ask a question about the current page.

The model receives only the current course, unit, lesson, page, approved lesson material, approved instructor notes, relevant HVAC examples, and the minimum recent interaction context.

It must not answer from an unrestricted course-wide chat context.

## Payment and enrollment requirement

The replacement platform will use PayPal for approved Boot Camp payment options and will automatically enroll a student only after the server verifies a completed payment or valid subscription state.

The browser return page is never sufficient proof of payment.

The implementation must:

- create and verify PayPal transactions server-side
- support the approved pay-in-full and monthly-plan behavior
- verify webhook authenticity
- process duplicate and out-of-order events idempotently
- create or safely match the student account
- grant the configured course entitlement exactly once
- preserve separate payment, enrollment, and access states
- expose paid-but-not-enrolled failures for safe recovery
- keep Sandbox and production credentials/configuration separate
- define refund, dispute, cancellation, failed-renewal, and expiration behavior before automatic access removal

Detailed development and acceptance rules are in [DEVELOPMENT.md](DEVELOPMENT.md).

## Cleanup sequence

### Completed by this cleanup

- establish `HVAC_Training_Solutions` as the sole active repository
- remove README language that keeps Moodle as the future student platform
- document the production freeze
- record failed-repository exclusions
- define one public-plus-learning route map
- add developer workflow and production-safety guidance
- record PayPal and automatic enrollment as launch requirements

### Next

- inventory WordPress URLs and obtain Search Console and GA4 page/query baselines
- preserve valuable article paths and segment working-technician, beginner, EPA-study, and employer intent
- refine the homepage, Boot Camp, pricing, how-it-works, instructor proof, and sample CTAs
- prove contact and checkout routes will work after the public domain moves away from WordPress
- migrate priority articles with relevant internal links and measurable CTAs
- verify policies, SEO, redirects, analytics, mobile quality, and rollback before cutover
- return to the selected Unit 1 prototype and course platform after the marketing foundation works

## Acceptance gates

### Repository gate

- one authoritative repository
- no secrets, database dumps, WordPress core, Moodle core, or production uploads
- build is reproducible from a clean checkout
- branch preview succeeds

### Learning gate

- all approved Unit 1 pilot pages work on a phone
- navigation and progress survive refresh
- quick checks provide correct feedback
- AI remains page-aware and bounded
- fallback behavior works when AI is unavailable

### Marketing gate

- the beginner offer is understandable within the first screen
- technical repair pages answer the task and preserve useful URLs without forcing a Boot Camp pitch
- the free sample is accurately labeled and links work
- calls to action and audience-specific outcomes are measurable
- contact and checkout handoff remain functional when the main domain moves away from WordPress

### Payment and enrollment gate

- products, prices, currency, payment-plan terms, and refund language match the approved public offer
- server-side transaction verification passes
- webhook verification and replay/idempotency tests pass
- one successful payment produces exactly one enrollment and entitlement
- duplicate redirects and webhook deliveries do not duplicate access
- paid-but-not-enrolled failures are visible and recoverable
- cancellation/refund/dispute/access rules are approved
- PayPal Sandbox and production configuration are demonstrably separated

### Public marketing cutover gate

- content and URL migration, technical assets, redirects, and noindex removal are verified
- contact, checkout, student-login handoff, email, analytics, and rollback are tested
- production routing change receives explicit approval

### Full platform cutover gate

- replacement authentication, PayPal, enrollment, email, progress, and course experience pass their own acceptance tests
- Moodle retirement and production data migration receive separate approval

