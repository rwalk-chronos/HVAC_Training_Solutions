# Development Guide

## Purpose

This guide defines how to develop the consolidated HVAC Training Solutions platform without affecting the current WordPress or Moodle production systems.

The product charter and sequencing decisions live in [CONSOLIDATION_PLAN.md](CONSOLIDATION_PLAN.md). The current sales-page decisions live in [BOOT_CAMP_V1.md](BOOT_CAMP_V1.md). Student accounts, payment, enrollment, progress, knowledge checks, and email requirements live in [STUDENT_PLATFORM_REQUIREMENTS.md](STUDENT_PLATFORM_REQUIREMENTS.md). The current learning priority is defined in [UNIT_1_LEARNING_EXPERIENCE.md](UNIT_1_LEARNING_EXPERIENCE.md), and the approved employment bridge is defined in [CAREER_AND_OJT_PATH.md](CAREER_AND_OJT_PATH.md).

## Current development focus

Marketing site first. Ron chose to launch the new marketing format for the existing 27-module Boot Camp, measure that public site with the verified GA4 property, then replace course delivery after the new course is complete. [MARKETING_REBUILD_PLAN.md](MARKETING_REBUILD_PLAN.md) governs article reuse, sales pages, conversion measurement, and migration. The recovered `/unit-1-prototype/` remains the selected new-course baseline and must not be marketed as the course sold today.

Course account, PayPal, enrollment, and email planning may continue for the later release. Production checkout continuity must be solved before public-domain cutover. The existing Moodle course continues to serve students after the marketing cutover.

## Repository and environment rules

- `rwalk-chronos/HVAC_Training_Solutions` is the only active implementation repository.
- The SiteGround WordPress site is frozen production.
- The DigitalOcean Moodle site is frozen production.
- Cloudflare branch deployments are development and review environments.
- No development environment may send production email, collect live payments, enroll production students, or modify production data. Outbound links to the existing live checkout are for review; do not submit test purchases there.
- A production cutover requires explicit approval, a tested migration, and a rollback plan.

## Current GitHub to Cloudflare workflow

The development Worker is `hvac-training-solutions` at `https://hvac-training-solutions.rawalker0619.workers.dev`. Its Git repository is `rwalk-chronos/HVAC_Training_Solutions`. PR #7 merged the marketing build into the recovery branch; PR #8 then merged that reviewed branch into `main` and deployed the development Worker. Check the current Cloudflare Workers Builds branch setting and recent build commit before relying on an automatic deployment. The Worker's branch is a development deployment setting, not the public-domain cutover.

The **Cloudflare Workers and Pages** GitHub App needs access to this repository. If a disconnected-account warning returns, inspect GitHub **Settings > Applications > Installed GitHub Apps > Cloudflare Workers and Pages > Repository access** before changing Worker build settings.

Build settings previously used repository root `/`, build command `npm run build`, and deploy command `npx wrangler deploy`. Verify these against the current Worker configuration. Record the Git commit SHA, build result, and actual Worker route after each deployment. Do not connect the public domain, enable indexing, or enable GA4 as part of routine development.

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

Do not run `npm run deploy` merely to verify a change. Use the local build first, then review the GitHub-connected development Worker or an isolated branch preview once configured.

The repository contains a committed npm lockfile, a local build verifier, and a GitHub Actions workflow. `npm run verify` builds the site, checks the expected routes, and confirms that development crawler protection remains active. Add focused automated tests as application logic grows.

## Branch workflow

1. Start from the current `main` branch and use one narrowly named feature or cleanup branch.
2. Open a draft pull request for work needing review.
3. Verify `npm ci` and `npm run verify` for code changes.
4. Review the Cloudflare development Worker or an isolated branch preview on desktop and phone; record its actual deployed commit.
5. Record environment, route, data, and migration impact in the pull request.
6. Do not merge a change that would activate public indexing, analytics, payment, enrollment, or production routing without its specific launch review.

PRs #7 and #8 already merged the marketing build to `main`; their earlier branch instructions are historical. Ron selected the recovered September 22 `/unit-1-prototype/` as the sole new-course Unit 1 development route and rejected the later `/unit-1/lesson-1/` reconstruction; see [RECOVERY_STATE.md](RECOVERY_STATE.md). The immediate marketing gates are in [MARKETING_LAUNCH_GATES.md](MARKETING_LAUNCH_GATES.md). Commit and push reviewed milestones and record remote HEAD, route, deployed preview URL, media sources, and Ron's decision in the handoff.

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

PayPal is required for the **later course-platform replacement release**. The first public marketing release keeps the existing course and payment operation, with its checkout moved to a stable destination or verified proxy before DNS cutover. In the replacement system, payment and enrollment are one controlled workflow, but separate records.

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
