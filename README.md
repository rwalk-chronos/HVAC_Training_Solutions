# HVAC Training Solutions

This repository is the canonical source for the new **HVACTrainingSolutions.net** platform.

The goal is one custom, mobile-first application that eventually replaces both the WordPress marketing site and the Moodle course experience. Marketing, PayPal payment, automatic enrollment, learning, AI assistance, progress, and analytics belong to one product and one codebase.

## Production freeze

The current production systems are not development environments:

- WordPress on SiteGround remains live and untouched.
- Moodle on DigitalOcean remains live and untouched.
- Production content may be copied or exported for migration, but changes are made only in this repository and its Cloudflare development deployments.
- A production cutover requires a separate approval and rollback plan.

## Current GitHub truth

The active implementation is this repository.

As of the consolidation cleanup:

- Astro and Cloudflare scaffolding are present.
- The first Boot Camp sales page is on `feature/boot-camp-v1`.
- Cloudflare branch previews are used for review.
- Staging remains `noindex, nofollow`.
- The complete phone-first Unit 1 learning pilot is **not yet committed to this repository**.
- PayPal, accounts, and automatic enrollment are planned but not yet implemented.
- `rwalk-chronos/hvac-lti` and `rwalk-chronos/ai-hvac-lms` are failed historical attempts and are not migration sources.

## Product shape

```text
Public experience                 Student experience
/                                 /learn/
/hvac-boot-camp/                  /learn/dashboard/
/how-it-works/                    /learn/unit-1/
/pricing/                         /learn/unit-1/<lesson>/
/try-boot-camp/                   /account/
/checkout/
```

Both sides must share one design system, navigation model, account model, billing/enrollment boundary, analytics vocabulary, and deployment pipeline.

## Near-term scope

### Acquire and convert

- public marketing and SEO pages
- clear Boot Camp offer
- pricing and enrollment path
- a real sample of the learning experience

### Learn

- phone-first lessons
- one concept at a time
- short content blocks
- quick checks and immediate feedback
- visible progress
- bounded, page-aware AI help

### Measure

- visitor to trial
- trial to enrollment
- successful payment to access grant
- lesson starts and completions
- knowledge-check results
- AI-help usage and unresolved confusion

## Required replacement-launch capabilities

- student accounts and secure sessions
- PayPal Sandbox-tested checkout
- server-verified payment state
- idempotent automatic Boot Camp enrollment
- recoverable paid-but-not-enrolled handling
- approved refund, cancellation, failed-renewal, dispute, and access rules

A browser payment-success redirect must never grant access by itself.

## Deliberate exclusions for the first vertical slice

- no WordPress or Moodle runtime dependency
- no full LMS rebuild before the Unit 1 pattern is proven
- no broad autonomous AI instructor
- no automatic course-generation system
- no elaborate gamification
- no importing code from the failed historical repositories
- no production DNS, payment, email, or student-account changes

## Technical direction

- Astro
- Cloudflare Workers / Static Assets
- GitHub-based version control and branch previews
- additional Cloudflare data services only when the vertical slice proves they are needed

## Build order

1. Consolidate repository truth and architecture.
2. Preserve and review the current Boot Camp sales-page work.
3. Bring the approved Unit 1 pilot into this repository under `/learn/`.
4. Connect one real sample lesson to the sales journey.
5. Replace scripted tutor responses with bounded live AI.
6. Test on phones with real learners.
7. Lock the lesson pattern before converting the remaining course.
8. Add the account, PayPal, and automatic-enrollment flow in Sandbox.
9. Plan production migration only after acceptance gates pass.

## Documentation

- [Development guide](docs/DEVELOPMENT.md)
- [Consolidation plan](docs/CONSOLIDATION_PLAN.md)
- [Boot Camp sales-page decisions](docs/BOOT_CAMP_V1.md)
- [Migration audit](docs/MIGRATION_AUDIT.md)
