# Recovery state — money pages and Unit 1

## Verified source

This branch starts at `feature/site-money-pages` commit `ee8cea08adcfeda4e29c05cfb9478f8976c4e88d`. It preserves the Boot Camp, pricing, how-it-works, and try-boot-camp pages and the development documentation. The production WordPress and Moodle sites are outside this repository.

The Unit 1 learning requirements are in `docs/UNIT_1_LEARNING_EXPERIENCE.md`. The one-concept sales preview is `src/pages/try-boot-camp.astro`; its help responses are scripted examples, not a live AI tutor.

## Unit 1 source decision

Ron identified `https://hvac-training-solutions.lowly-range.workers.dev/unit-1-prototype/` as likely the last good Unit 1. Its source has not been found in this repository, and the URL was unavailable on 2026-09-23. Recovery of that exact deployment is no longer a prerequisite. Rebuild the approved learning experience in this branch from the current [student-facing Drive draft](https://docs.google.com/document/d/1Ei8vYLgxcckZS9kDFMLwwbguQfH5eOtfNIfg64JlSHg/edit), one lesson at a time.

The separate Library Site `HVAC Boot Camp — Unit 1 Pilot` is an older eight-page pilot and a UX reference only. Draft PR #5 is a later six-lesson attempt that Ron rejected. Neither supplies the current curriculum. The `src/pages/try-boot-camp.astro` route is a short sales preview, not the full Lesson 1.

The project Library's `/HVAC Boot Camp` folder contains original MP4s, including `10 Heat Flow.mp4` and `2   Heat.mp4`. The Google Drive `GPT - Boot Camp` folder contains the lesson draft and inventory but not these MP4 bytes. Review and commit selected source media to GitHub with the lesson; chat attachments and Cloudflare deployments are not asset storage.

## Development sequence

1. Keep PR #6 and the recovered money pages as the baseline. Fix bugs there, but do not redesign them while building Unit 1.
2. Build Lesson 1 in a separate review route using the Drive draft for content and `docs/UNIT_1_LEARNING_EXPERIENCE.md` for behavior. Use the older Library pilot for interaction cues only.
3. Review the actual video candidates, select the relevant clip, and store it durably with attribution and any needed transcript or text equivalent.
4. Run `npm ci` and `npm run verify`; inspect the lesson on a phone, including checks, help, navigation, and media. Commit the completed Lesson 1 milestone to this branch.
5. Provide a development preview for Ron's review. Record his approval or revision notes before beginning Lesson 2. Keep the PR draft; do not merge or cut over production in this step.

## Status

Money-page source is preserved on this branch. The exact old prototype source remains missing; reconstructed lessons must not be described as byte-for-byte restoration. GitHub commits and this handoff define the durable state; Cloudflare previews are disposable deployment targets.
