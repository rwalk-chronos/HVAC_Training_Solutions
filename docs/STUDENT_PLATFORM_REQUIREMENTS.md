# Student Platform Requirements

## Status

Planning draft. The project is 100% development. This document records requirements and decisions; it does not authorize production payment, email, account, enrollment, course, DNS, or data changes.

## Agreed direction

The replacement platform will eventually provide:

- PayPal checkout and automatic enrollment
- student account creation or safe matching to an existing account
- enrollment and account notification by email
- secure login and lost-password recovery
- persistent lesson, module, and course progress
- phone-first lessons with knowledge checks
- completion gates without letter grades or percentage grades
- later, bounded inactivity reminders for students who stop participating

The public site, actual Unit 1 content, original images and presentations, and learning experience will remain separate review tracks until they are approved and intentionally combined.

## Enrollment lifecycle

The required successful path is:

```text
Collect student name and email
  -> create a pending internal order
  -> create PayPal order or subscription in Sandbox
  -> buyer approves payment
  -> server verifies the PayPal event
  -> mark payment complete
  -> match or create the student account
  -> grant the Boot Camp entitlement exactly once
  -> send the account/enrollment email
  -> show the student dashboard and Continue action
```

The browser return or success page is never proof of payment and must not grant access. Payment state, enrollment state, and course-access state must remain separately inspectable.

### Identity rules

- Collect the intended student's name and email before PayPal because the purchaser and student may differ.
- If the student email already belongs to an account, add the entitlement rather than create a duplicate account.
- Do not use a PayPal email address as the sole account-matching rule.
- A repeated redirect, API retry, or webhook must not create a duplicate account, order, or enrollment.
- A successful payment with a failed enrollment must enter a visible, recoverable state.

## Payment and access requirements

The system must support the approved pay-in-full and monthly-plan offers in PayPal Sandbox before any live payment work.

Required payment states include:

- pending
- completed
- denied or failed
- refunded
- reversed or disputed
- subscription active
- subscription payment failed
- subscription suspended
- subscription canceled or expired

The integration must verify webhook authenticity, preserve PayPal identifiers, process events idempotently, tolerate duplicate or out-of-order delivery, and provide reconciliation tools.

### Payment policy decisions still required

- Whether the monthly plan grants the complete course immediately or releases content over time
- Grace period after a failed monthly payment
- When access is suspended and restored
- What cancellation means for an installment-style plan
- Refund window and effect on course access
- Chargeback and dispute handling
- Tax, receipt, and invoice requirements
- Whether a student may purchase access for another person

No automated access removal should be implemented until these policies are approved.

## Account and authentication requirements

The minimum account lifecycle includes:

- one-time set-password link after enrollment
- email verification where required
- login and logout
- lost-password request and reset
- password-change notification
- change of email address with verification
- duplicate-account recovery or administrator-assisted merge
- rate limiting for login and reset attempts
- secure session creation, rotation, expiration, and revocation
- support recovery when the student has lost access to the registered email
- account data export and deletion process

Passwords must never be emailed. Password setup and reset tokens must be random, securely stored, single-use, and time-limited. Account-recovery responses must not reveal whether an email address exists.

## Student experience

The authenticated experience needs:

- a dashboard showing course status and the next action
- one prominent **Continue where you left off** action
- phone-first lesson pages
- visible module and course progress
- cross-device resume
- access to instructor and technical support
- clear completion status
- accessible forms, navigation, images, presentations, and videos
- captions or transcripts for instructional video where required

## Progress records

The data model needs stable equivalents of:

- account
- course and course version
- module and lesson
- enrollment and entitlement
- lesson status: not started, in progress, completed
- last lesson and last meaningful position
- knowledge-check attempt and outcome
- module completion
- course completion
- first activity, last activity, and completion timestamps
- administrator override with reason and audit record

Progress must survive logout, device changes, ordinary content edits, and temporary service failures. A content-versioning and migration rule is required so publishing a revised lesson does not silently erase or falsely award progress.

## Knowledge checks and completion gates

The first approved model is **soft gating without hard grading**:

- short checks appear throughout a lesson
- feedback is immediate and explains the idea
- retries are unlimited and have no penalty
- no letter grade or percentage grade is shown
- an incorrect answer can lead to a hint, simpler explanation, or equivalent retry
- a module gate requires completing the approved check rather than earning an arbitrary average
- course completion requires completing the required modules, not achieving a numeric course grade
- Ron can override a gate when appropriate, with a reason recorded

Approved questions, answer choices, and answer keys control completion. AI may explain, hint, or present an approved equivalent question, but AI must not independently invent the grading rule or decide whether a student completed the course.

## Email requirements

Minimum transactional messages:

- welcome and set-password
- enrollment confirmation
- payment confirmation where the platform is responsible for it
- monthly-payment failure and recovery
- access suspended or restored
- password reset
- password changed
- refund or cancellation confirmation
- course completion
- administrator-issued support message

The email service must support authenticated sending, templates, delivery status, bounce handling, resend, and an audit trail. The sending domain must be configured for SPF, DKIM, and DMARC before production use.

### Later inactivity reminders

Reminder rules must define:

- what inactivity means
- the delay before the first reminder
- maximum reminder frequency and count
- suppression after completion, refund, cancellation, or loss of access
- email preferences and legally required opt-out handling
- separation of course reminders from promotional email

Inactivity reminders are deferred until account, progress, and email delivery records are reliable.

## Student support and administration

Students need an obvious way to request technical or learning help. A support request should preserve the current course, module, lesson, and relevant error context without exposing secrets or unnecessary private data.

Administrators need bounded tools to:

- find a student
- inspect account, payment, entitlement, and enrollment state
- view progress and last activity
- resend an account invitation or reset email
- manually enroll, suspend, restore, or remove access
- correct progress or override a gate with a recorded reason
- reconcile paid-but-not-enrolled cases
- inspect and safely replay failed payment events
- record refunds and support notes
- export an approved student/progress report
- review an audit trail of sensitive changes

## Security, privacy, and operations

Before production, the platform needs:

- privacy policy
- terms of use
- refund, cancellation, monthly-payment, and access policies
- employment and licensing disclaimers
- minimum-necessary collection of student and payment data
- an explicit retention policy for progress, support, analytics, and AI interactions
- encrypted transport and appropriate protection of stored sensitive data
- environment-specific secrets with Sandbox and production separation
- database backup and tested restoration
- error monitoring and operational alerts
- audit logs for payment, access, account, and administrator actions
- dependency and security maintenance procedures
- a support and rollback procedure

Do not store full payment credentials. Avoid storing complete AI conversations unless an approved learning or support requirement justifies them.

## V1 acceptance gate

The first complete development version is acceptable only when all of the following pass in Sandbox:

1. A new student completes pay-in-full checkout and receives exactly one account, enrollment, and email.
2. An existing account receives the course without duplication.
3. A repeated or delayed webhook remains safe.
4. A successful payment with enrollment failure is visible and recoverable.
5. The approved monthly-plan happy path and failure policy work as documented.
6. Lost-password reset works without revealing whether an account exists.
7. Progress saves, restores on another device, and survives logout.
8. Knowledge checks provide feedback and unlimited retries without a numeric grade.
9. Module completion and administrator override behave as approved.
10. Email delivery, bounce, resend, and suppression are observable.
11. Refund, cancellation, dispute, and access-state tests match approved policies.
12. Backup restoration, audit logging, and development/production separation are verified.

## Deferred until the core path is proven

- inactivity reminders
- certificates or completion documents
- advanced learning analytics
- AI-generated remediation plans
- gamification
- employer dashboards or sponsorship accounts
- multi-course catalog behavior
- production cutover

## Primary references

- [PayPal webhook integration](https://developer.paypal.com/api/rest/webhooks/rest/)
- [PayPal subscription webhooks](https://developer.paypal.com/docs/subscriptions/reference/webhooks/)
- [PayPal API idempotency](https://developer.paypal.com/api/rest/reference/idempotency/)
- [OWASP Forgot Password guidance](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
- [OWASP Authentication guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [FTC CAN-SPAM compliance guidance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
