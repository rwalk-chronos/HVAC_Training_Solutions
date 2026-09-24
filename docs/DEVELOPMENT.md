# Development Guide

## Purpose

This guide defines how to develop the consolidated HVAC Training Solutions platform without affecting the current WordPress or Moodle production systems.

The product charter and sequencing decisions live in [CONSOLIDATION_PLAN.md](CONSOLIDATION_PLAN.md). The current sales-page decisions live in [BOOT_CAMP_V1.md](BOOT_CAMP_V1.md). Student accounts, payment, enrollment, progress, knowledge checks, and email requirements live in [STUDENT_PLATFORM_REQUIREMENTS.md](STUDENT_PLATFORM_REQUIREMENTS.md). The current learning priority is defined in [UNIT_1_LEARNING_EXPERIENCE.md](UNIT_1_LEARNING_EXPERIENCE.md), and the approved employment bridge is defined in [CAREER_AND_OJT_PATH.md](CAREER_AND_OJT_PATH.md).

## Current development focus

Public-site development is paused. The sole implementation focus is the structure and delivery of Unit 1. Planning for accounts, payments, email, enrollment, career preparation, and OJT may continue, but those features must not displace the Unit 1 learning-experience proof.

Do not convert the remaining course or resume public-platform implementation until the Unit 1 acceptance gate is satisfied.

## Repository and environment rules

- `rwalk-chronos/HVAC_Training_Solutions` is the only active implementation repository.
- The SiteGround WordPress site is frozen production.
- The DigitalOcean Moodle site is frozen production.
- Cloudflare branch deployments are development and review environments.
- No development environment may send production email, collect live payments, enroll production students, or modify production data.
- A production cutover requires explicit approval, a tested migration, and a rollback plan.

## Current stack

- Astro 7
- Cloudflare Workers / Static Assets
- Wrangler 4
- GitHub branches and pull requests

The current repository is a small static application. Authentication, persistent student data, payment processing, automatic enrollment, and live AI are planned capabilities; they are not yet implemented.

## Local development

From a clean checkout:

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run build
npm run verify
npm run preview
```

Do not run `npm run deploy` merely to verify a change. Use the local build first and the GitHub-connected Cloudflare branch preview for review.

The repository contains a committed npm lockfile, a local build verifier, and a GitHub Actions workflow. `npm run verify` builds the site, checks the expected routes, and confirms that development crawler protection remains active. Add focused automated tests as application logic grows.

## Branch workflow

1. Start from the current approved development branch.
2. Use one narrowly named feature or cleanup branch.
3. Open a draft pull request early.
4. Verify `npm ci` and `npm run verify`.
5. Review the Cloudflare branch preview on desktop and phone.
6. Record any environment, route, data, or migration impact in the pull request.
7. Do not merge or change production routing without approval.

The current draft PR #6 is based on `feature/site-money-pages`. Continue on `recovery/money-pages-unit1`. The original September 22 `/unit-1-prototype/` source was recovered on September 24; see [RECOVERY_STATE.md](RECOVERY_STATE.md). Preserve it separately from the later `/unit-1/lesson-1/` reconstruction. Commit and push each reviewed milestone and record the remote HEAD SHA, route, verified preview URL when available, media sources, and Ron's decision in the handoff.

## Code boundaries

The target application should keep responsibilities understandable:

```text
src/
  components/       shared UI components
  content/          approved marketing and course content
  layouts/          public and learning shells
  pages/
    public routes
    learn/           authenticated learning routes
  styles/            shared design tokens and global styles

server-side modules, when introduced:
  auth/              account and session boundary
  billing/           PayPal order/subscription and webhook handling
  enrollment/        course access and enrollment rules
  learning/          progress and knowledge-check persistence
  ai/                bounded page-aware tutor
  analytics/         first-party product events
```

Directories should be introduced only when real code needs them. Do not scaffold a large empty architecture.

## Content rules

- Preserve approved course meaning when changing presentation.
- Keep lessons phone-first and focused on one concept at a time.
- Store approved lesson context separately from generated AI responses.
- Do not silently pull content or code from `hvac-lti` or `ai-hvac-lms`.
- Do not mass-import Moodle material until the Unit 1 lesson pattern is accepted.

## Secrets and sensitive data

- Never commit PayPal credentials, AI keys, Cloudflare tokens, production exports, student records, or payment data.
- Local secrets belong in ignored environment files.
- Deployed secrets belong in the environment's secret store.
- Sandbox and production credentials must be separate.
- Logs must not contain access tokens, full webhook payload secrets, or unnecessary student/payment information.

## PayPal payment and automatic enrollment

PayPal is a required launch integration. Payment and enrollment are one controlled workflow, but separate records.

### Required flow

```text
Choose plan
  -> server creates PayPal order or subscription
  -> student approves in PayPal
  -> server verifies completed capture or active subscription
  -> verified payment event is stored
  -> enrollment operation runs idempotently
  -> student account is created or matched
  -> Boot Camp access is granted
  -> confirmation page and email are sent
```

The client-side success redirect is not proof of payment and must never grant course access by itself.

### Server responsibilities

- create PayPal orders or subscriptions using server-held credentials
- validate product, plan, amount, and currency on the server
- capture or verify the transaction on the server
- verify PayPal webhook authenticity
- store PayPal order, capture, subscription, and event identifiers
- process webhook events idempotently
- prevent duplicate accounts and duplicate enrollments
- maintain an audit trail from payment to access grant
- provide a recoverable/manual-review state when payment succeeds but enrollment fails

### Enrollment rules

- one verified purchase grants the configured course entitlement once
- repeated redirects or webhook deliveries must not create repeated enrollments
- an existing student account should be matched safely rather than duplicated
- payment state and course-access state must remain separately inspectable
- refund, dispute, cancellation, failed renewal, and expiration policies must be explicitly approved before automation removes access
- administrators need a bounded way to reconcile a paid-but-not-enrolled student

### Minimum records

The eventual data model needs clear equivalents of:

- user/account
- product and price/plan
- PayPal customer/payer reference where permitted
- order or subscription
- capture/payment
- immutable payment event
- enrollment
- access entitlement
- enrollment attempt/audit event

Exact storage technology is still a design decision. Do not choose it solely to make the first page prototype work.

### Development safety

- use PayPal Sandbox only during development and automated tests
- use sandbox buyer and merchant accounts
- make webhook replay safe
- test duplicate, delayed, and out-of-order webhook delivery
- test payment success with enrollment failure and successful recovery
- test one-time payment and the approved monthly-plan behavior separately
- keep production PayPal application credentials out of branch previews

### Payment acceptance gate

Before live payment cutover:

- approved products, prices, taxes, refund language, and payment-plan terms match the public offer
- server-side amount and currency validation pass
- webhook verification and idempotency tests pass
- successful payment produces exactly one enrollment
- enrollment failure is visible and recoverable
- refund/cancellation/access policy is documented
- sandbox and production configuration are demonstrably separated
- analytics do not expose sensitive payment data
- rollback and support procedures are documented

## AI development boundary

The tutor is a page-aware learning aid, not an unrestricted course chatbot.

For the first vertical slice, it may:

- explain the current concept more simply
- give an approved HVAC example
- explain why the concept matters
- ask a bounded knowledge-check question
- answer a question using the approved current-page context

It must fail safely when the AI service is unavailable and must not reveal secrets or internal prompt material.

## Minimum verification for every change

- clean build succeeds
- intended routes load
- crawler protection remains active in development
- desktop and phone layouts are reviewed
- links do not accidentally target development-only or production-only actions
- no secret or production data is introduced
- production systems remain untouched

Additional automated tests become mandatory as authentication, billing, enrollment, progress, and AI endpoints are added.
