# HVAC Training Solutions

**Unit 1 direction, September 24:** Ron selected the recovered five-section `/unit-1-prototype/` as the lesson to develop. The later `/unit-1/lesson-1/` reconstruction was rejected and removed. Read [the current recovery handoff](docs/RECOVERY_STATE.md) before continuing.

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
- The recovered Unit 1 prototype is committed, but its learning pattern, media selection, progress, and phone experience still need review and development.
- PayPal, accounts, and automatic enrollment are planned but not yet implemented.
- `rwalk-chronos/hvac-lti` and `rwalk-chronos/ai-hvac-lms` are failed historical attempts and are not migration sources.

## Current priority

Marketing site first. Ron reported declining traffic and no conversions and on September 24, 2026 chose to rebuild the public site before continuing course implementation. See [Marketing rebuild plan](docs/MARKETING_REBUILD_PLAN.md).

The recovered five-section `/unit-1-prototype/` remains saved as the selected course baseline. Course expansion resumes after the marketing site has a working, measurable visitor-to-enrollment path.

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

1. Capture Search Console and GA4 baselines and inventory WordPress URLs and conversion paths.
2. Classify URLs, preserving high-value article paths and mapping necessary redirects.
3. Refine homepage, Boot Camp, pricing, how-it-works, proof, and free sample on the development Worker.
4. Migrate and improve priority articles with relevant internal links and measured CTAs.
5. Verify contact, checkout continuity, policies, analytics, SEO, mobile quality, and rollback before a public-domain change.
6. Resume the saved Unit 1 prototype and broader course platform after the marketing foundation works.

## Documentation

- [Development guide](docs/DEVELOPMENT.md)
- [Student platform requirements](docs/STUDENT_PLATFORM_REQUIREMENTS.md)
- [Unit 1 learning experience](docs/UNIT_1_LEARNING_EXPERIENCE.md)
- [Career and OJT path](docs/CAREER_AND_OJT_PATH.md)
- [Consolidation plan](docs/CONSOLIDATION_PLAN.md)
- [Boot Camp sales-page decisions](docs/BOOT_CAMP_V1.md)
- [Migration audit](docs/MIGRATION_AUDIT.md)
- [Marketing rebuild plan](docs/MARKETING_REBUILD_PLAN.md)
