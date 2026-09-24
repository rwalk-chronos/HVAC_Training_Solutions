# Recovery verification — September 24, 2026

## Completed

- Installed the committed dependency lockfile with `npm ci --ignore-scripts`.
- `npm run verify` passed, generating eight routes, including `/unit-1-prototype/` and the separate `/unit-1/lesson-1/`.
- Development `noindex,nofollow`, crawler blocking, internal links, and local lesson-media references passed.
- All original reference source and media SHA-256 values match the recovery manifest.
- The active `src/pages/unit-1-prototype.astro` is byte-identical to the recovered original file.
- All five saved MP4 files contain H.264 video and AAC audio streams, with valid durations. This is file validation, not a claim of browser playback verification.
- `git diff --check` passed.

## Remaining verification and publication

The cloud browser could not open the local preview: `net::ERR_BLOCKED_BY_CLIENT`. Phone layout, browser video playback, and interactive checks therefore still need review on a reachable development deployment.

Automatic approval review blocked the push to the public `rwalk-chronos/HVAC_Training_Solutions` repository because the recovery payload includes source code, videos, the PT-chart image, and recovery records. It requires explicit approval for that public disclosure. No alternative publishing route was used to bypass the block.

The recovered work is committed locally, and a private recovery ZIP is being prepared with a self-contained Git bundle and the built review site. That archive preserves the work while GitHub publication awaits approval. No merge or production changes have been made.
