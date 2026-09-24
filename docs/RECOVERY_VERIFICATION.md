# Recovery verification — September 24, 2026

## Completed

- Installed the committed dependency lockfile with `npm ci --ignore-scripts`.
- `npm run verify` passed for the original recovery snapshot. After Ron selected `/unit-1-prototype/`, the later `/unit-1/lesson-1/` route was removed; the current verifier checks only the selected prototype.
- Development `noindex,nofollow`, crawler blocking, internal links, and local lesson-media references passed.
- All original reference source and media SHA-256 values match the recovery manifest.
- The active `src/pages/unit-1-prototype.astro` is byte-identical to the recovered original file.
- All five saved MP4 files contain H.264 video and AAC audio streams, with valid durations. This is file validation, not a claim of browser playback verification.
- `git diff --check` passed.

## Publication and remaining review

The cloud browser could not open the local preview: `net::ERR_BLOCKED_BY_CLIENT`. Phone layout, browser video playback, and interactive checks therefore still need review on a reachable development deployment.

Ron approved publication, then pushed the recovered branch to the public `rwalk-chronos/HVAC_Training_Solutions` repository at `a5773ba257b8937bf76cd62b2c55c433892c030e`. GitHub Verify passed. He deployed it to his Cloudflare account as version `0d337b5f-44a6-452f-a0aa-6e86087bdd97` at `https://hvac-training-solutions.rawalker0619.workers.dev`. The live `/unit-1-prototype/` HTML matched the recovery archive byte for byte; the route, marketing pages, boiling-water MP4, and PT-chart image returned HTTP 200.

Phone layout, browser video playback, and interactive checks still need review by Ron on the live deployment. The later `/unit-1/lesson-1/` reconstruction was rejected and is removed from the current branch. No merge or production changes have been made.
