# HVAC Training Solutions

**Unit 1 direction, September 24:** Ron selected the recovered five-section `/unit-1-prototype/` as the lesson to develop. The later `/unit-1/lesson-1/` reconstruction was rejected and removed. Read [the current recovery handoff](docs/RECOVERY_STATE.md) before continuing.

This repository is the canonical source for the new **HVACTrainingSolutions.net** platform.

The long-term goal is one custom, mobile-first application that eventually replaces both the WordPress marketing site and the Moodle course experience. Marketing, PayPal payment, automatic enrollment, learning, AI assistance, progress, and analytics ultimately belong to one product and one codebase.

The first public release replaces **only the marketing site**. It sells the existing 27-module Boot Camp, keeps its current Moodle delivery, and preserves a working checkout handoff. The new course and its payment/account system are a later release. The saved `/unit-1-prototype/` is a development baseline for that later course, not a sample of the course sold now.

## Production freeze

The current production systems are not development environments:

- WordPress on SiteGround remains live and untouched.
- Moodle on DigitalOcean remains live and untouched.
- Production content may be copied or exported for migration, but changes are made only in this repository and its Cloudflare development deployments.
- A production cutover requires a separate approval and rollback plan.

## Current GitHub truth

The active implementation is this repository.

As of September 24, 2026:

- Astro and Cloudflare scaffolding are present.
- The current-course marketing build and 154 preserved post paths were reviewed in PR #7 and merged through PR #8 to `main`, the development Worker's configured production branch.
- The Cloudflare Worker URL is the development review site; the public domain still runs WordPress on SiteGround.
- Staging remains `noindex, nofollow`.
- The recovered Unit 1 prototype is committed, but its learning pattern, media selection, progress, and phone experience still need review and development.
- PayPal, accounts, and automatic enrollment are planned but not yet implemented.
- `rwalk-chronos/hvac-lti` and `rwalk-chronos/ai-hvac-lms` are failed historical attempts and are not migration sources.

## Current priority

Marketing site first. Ron reported declining traffic and no conversions and on September 24, 2026 chose to rebuild the public site around the existing course before continuing the new course. See [Marketing rebuild plan](docs/MARKETING_REBUILD_PLAN.md).

The recovered five-section `/unit-1-prototype/` remains saved as the selected course baseline. Course expansion resumes after the marketing site has a working, measurable visitor-to-enrollment path. The prototype stays outside the public sales journey.

## Future product shape

```text
Public experience                 Student experience
/                                 /learn/
/hvac-boot-camp/                  /learn/dashboard/
/how-it-works/                    /learn/unit-1/
/pricing/                         /learn/unit-1/<lesson>/
/try-boot-camp/                   /account/
/checkout/
```

The future student experience will share the marketing site's design, navigation, account and billing boundaries, analytics vocabulary, and deployment pipeline. The first marketing release will still hand off to existing Moodle and checkout services.

## Near-term scope

### Acquire and convert

- public marketing and SEO pages
- clear Boot Camp offer
- pricing and enrollment path
- a truthful sample of Ron's current teaching style

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

## Required capabilities for the later course-platform release

- student accounts and secure sessions
- PayPal Sandbox-tested checkout
- server-verified payment state
- idempotent automatic Boot Camp enrollment
- recoverable paid-but-not-enrolled handling
- approved refund, cancellation, failed-renewal, dispute, and access rules

A browser payment-success redirect must never grant access by itself.

## Deliberate exclusions while building the course platform

- no permanent WordPress or Moodle dependency in the completed replacement course platform
- no full LMS rebuild before the Unit 1 pattern is proven
- no broad autonomous AI instructor
- no automatic course-generation system
- no elaborate gamification
- no importing code from the failed historical repositories
- no production payment, email, or student-account changes as part of the learning prototype; the separate marketing cutover has its own reviewed DNS and checkout plan

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
5. Verify contact, existing checkout continuity, Moodle handoff, policies, GA4, SEO, mobile quality, and rollback before a public-domain change.
6. Launch the marketing site for the existing course, measure the new site on the verified GA4 property, and iterate on traffic and conversion.
7. Resume the saved Unit 1 prototype and broader course platform; swap the course delivery only after the replacement is complete and tested.

## Documentation

- [Development guide](docs/DEVELOPMENT.md)
- [Student platform requirements](docs/STUDENT_PLATFORM_REQUIREMENTS.md)
- [Unit 1 learning experience](docs/UNIT_1_LEARNING_EXPERIENCE.md)
- [Career and OJT path](docs/CAREER_AND_OJT_PATH.md)
- [Consolidation plan](docs/CONSOLIDATION_PLAN.md)
- [Boot Camp sales-page decisions](docs/BOOT_CAMP_V1.md)
- [Migration audit](docs/MIGRATION_AUDIT.md)
- [Marketing rebuild plan](docs/MARKETING_REBUILD_PLAN.md)
