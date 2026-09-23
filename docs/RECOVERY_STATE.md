# Recovery state — money pages and Unit 1

## Verified source

This branch starts at `feature/site-money-pages` commit `ee8cea08adcfeda4e29c05cfb9478f8976c4e88d`. It preserves the Boot Camp, pricing, how-it-works, and try-boot-camp pages and the development documentation. The production WordPress and Moodle sites are outside this repository.

The Unit 1 learning requirements are in `docs/UNIT_1_LEARNING_EXPERIENCE.md`. The one-concept sales preview is `src/pages/try-boot-camp.astro`; its help responses are scripted examples, not a live AI tutor.

## Missing source to recover

Ron identified `https://hvac-training-solutions.lowly-range.workers.dev/unit-1-prototype/` as likely the last good Unit 1. Its source has not been found in any branch of this repository. The URL was unavailable to the recovery environment on 2026-09-23. Do not substitute the eight-page Library phone preview or `feature/unit-1-mobile-lesson` for it.

The separate Library Site `HVAC Boot Camp — Unit 1 Pilot` is an older eight-page pilot. Draft PR #5 is a later six-lesson attempt that Ron rejected. Neither is approved as the recovered Unit 1.

## Recovery sequence

1. Obtain the exact source or a complete capture of the `unit-1-prototype` route, including scripts, styles, assets, video behavior, and AI help behavior. Check the Cloudflare deployment source or the original local checkout before reconstructing from screenshots.
2. Commit that prototype to this branch under its own review route. Preserve source and assets in GitHub so the preview is reproducible.
3. Compare the recovered lesson against `docs/UNIT_1_LEARNING_EXPERIENCE.md` and Ron's revised Unit 1 content. List any differences for review before changing content.
4. Run `npm ci` and `npm run verify`; test the lesson on a phone, including checks, help, navigation, and media.
5. Deploy only a development preview. Ron reviews the money pages and recovered Unit 1 together. Do not merge or cut over production as part of recovery.

## Status

Money-page source is preserved on this branch. The exact `unit-1-prototype` source remains missing. No claim of Unit 1 parity or completion is made.
