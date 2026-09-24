# Recovery state — original Unit 1 demo found

Updated: 2026-09-24. This supersedes earlier statements that the prototype source is missing or must be rebuilt.

## Recovery target

Ron had reviewed a working Unit 1 demo before the session stopped while saving it permanently. He identified the old `/unit-1-prototype/` route as the likely last good version. On September 24 he asked to recover that demo and finish saving it, preserving the agreed topics and uploaded videos.

## Source recovered

The original September 22 workspace survived at `/workspace/scratch/1757a8796067/site-repo`.

It contains an untracked `src/pages/unit-1-prototype.astro`, append-only changes to `src/styles/global.css`, the prototype's media, and matching generated HTML. Its local base commit is `f306a78ffa3737dfa21bfe5f4ac5129031e55e77`.

The earlier workspace's generated page matches the five-lesson source and contains the distinctive boiling-water interaction and PT-chart bridge. This establishes recovery of surviving original workspace code. Byte-for-byte identity with a particular expired Cloudflare deployment cannot be established without its deployment record.

## Routes — keep these versions distinct

| Route | Origin | Status |
| --- | --- | --- |
| `/unit-1-prototype/` | Original September 22 workspace | Recovered unchanged source; primary restoration review target |
| `/unit-1/lesson-1/` | Later September 23 local commit `6ed9ef85944d89074bea508ee9659502b0620f4c` | Preserved reconstruction; not the original demo |
| `/try-boot-camp/` | Recovered marketing branch | Short scripted sales sample; not full Unit 1 |

The original prototype contains five sections: cooling, temperature/thermal energy, refrigerant state changes, sensible/latent heat, and pressure. Recovery preserves that sequence. It does not reinterpret the earlier six-topic planning document or substitute the rejected eight-page pilot or PR #5.

The recovered demo includes three embedded video players, an additional preserved intro clip, the PT-chart image and exact bridge sentence, five checks, review buttons, and a four-step 74°F → 175°F → 212°F boiling demonstration. It explicitly does not save student progress and contains no live AI tutor. Those limitations remain unchanged.

## Durable evidence and media

- `recovery/2026-09-22-unit-1-prototype/` retains original source/layout/style/configuration copies, the earlier built page and CSS, and SHA-256 provenance.
- `public/media/unit-1/` contains recovered video/image bytes plus the later Lesson 1 heat-flow clip.
- `docs/UNIT_1_MEDIA_INVENTORY.md` records all 13 original uploads and distinguishes them from the selected demo clips. Do not assign all 13 as required viewing merely because they exist.
- Marketing remains based on `ee8cea08adcfeda4e29c05cfb9478f8976c4e88d` and remote recovery baseline `723a5deee91e292a131a310f51b6c06ea7af0341`.

## Working rules

1. Work on PR #6, branch `recovery/money-pages-unit1`.
2. Preserve the recovered prototype and compare it with Ron before changing lesson design or topic order.
3. Keep the money pages, original prototype, and later Lesson 1 route distinct.
4. Verify build output, media, feedback, heat interaction, and playback.
5. Push source, selected media, and the handoff together. Confirm remote HEAD; a local commit alone is not completion.
6. Record a preview's actual deployed commit and ownership. An expired temporary URL is not source storage.

No production WordPress, Moodle, DNS, payment, account, or enrollment changes are part of this recovery. PR #6 stays draft; no merge or production cutover is authorized here.
