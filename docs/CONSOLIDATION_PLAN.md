# Consolidation Plan

## Frozen decision

HVAC Training Solutions will become one custom application. It will replace the public WordPress experience and the Moodle student experience after the replacement is proven.

The live WordPress and Moodle systems remain untouched during development.

## Repository authority

| Repository | Status | Allowed use |
|---|---|---|
| `rwalk-chronos/HVAC_Training_Solutions` | Active | Canonical product repository |
| `rwalk-chronos/hvac-lti` | Failed historical attempt | Reference only when Ron explicitly requests it; do not import |
| `rwalk-chronos/ai-hvac-lms` | Failed historical attempt | Reference only when Ron explicitly requests it; do not import |

## Current committed state

The active repository currently contains:

- Astro/Cloudflare application scaffolding
- a public home placeholder
- a rebuilt `/hvac-boot-camp/` sales page
- a sample lesson section inside that sales page
- migration, development, and sales-page notes
- staging crawler protection

It does not currently contain the complete eight-page Unit 1 phone-first pilot described in the HVAC Boot Camp project conversations.

That missing implementation must be located from its actual current artifact or recreated from the approved project material. It must not be silently substituted with code from a failed repository.

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

## First vertical slice

The first proof is one complete learning and conversion journey:

1. Visitor understands Boot Camp.
2. Visitor opens a real sample lesson.
3. The lesson teaches one concept at a time.
4. The learner can request bounded AI help.
5. The learner completes a quick check.
6. Progress is recorded.
7. The experience returns to a clear enrollment action.

The reference learning content is Unit 1, beginning with Matter: Solids, Liquids, and Gases.

PayPal does not need to block the initial lesson-experience test. It is required before the consolidated platform can replace the current production sales and enrollment flow.

## AI boundary for the slice

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

- identify the authoritative Unit 1 pilot artifact
- inventory its eight pages, assets, quick checks, progress behavior, and tutor behavior
- import it on a dedicated feature branch under `/learn/`
- extract shared design tokens without visually regressing the current sales page
- add automated build and route checks
- verify a Cloudflare branch preview
- connect the sales page to the real sample lesson
- define the account, billing, enrollment, and entitlement data contract
- prototype the PayPal flow in Sandbox only

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

- the offer is understandable within the first screen
- the sample lesson is the real learning experience
- calls to action are measurable
- production checkout links remain unchanged until replacement enrollment is approved

### Payment and enrollment gate

- products, prices, currency, payment-plan terms, and refund language match the approved public offer
- server-side transaction verification passes
- webhook verification and replay/idempotency tests pass
- one successful payment produces exactly one enrollment and entitlement
- duplicate redirects and webhook deliveries do not duplicate access
- paid-but-not-enrolled failures are visible and recoverable
- cancellation/refund/dispute/access rules are approved
- PayPal Sandbox and production configuration are demonstrably separated

### Cutover gate

- content and URL migration are verified
- authentication, PayPal, automatic enrollment, email, analytics, and rollback are tested
- production change receives explicit approval
