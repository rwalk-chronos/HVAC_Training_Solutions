# Recovery state — original Unit 1 demo found

Updated: 2026-09-24. This supersedes earlier statements that the prototype source is missing or must be rebuilt.

## Recovery target

Ron had reviewed a working Unit 1 demo before the session stopped while saving it permanently. He identified the old `/unit-1-prototype/` route as the likely last good version. On September 24 he asked to recover that demo and finish saving it, preserving the agreed topics and uploaded videos.

## Source recovered

The original September 22 workspace survived at `/workspace/scratch/1757a8796067/site-repo`.

It contains an untracked `src/pages/unit-1-prototype.astro`, append-only changes to `src/styles/global.css`, the prototype's media, and matching generated HTML. Its local base commit is `f306a78ffa3737dfa21bfe5f4ac5129031e55e77`.

The earlier workspace's generated page matches the five-lesson source and contains the distinctive boiling-water interaction and PT-chart bridge. This establishes recovery of surviving original workspace code. Byte-for-byte identity with a particular expired Cloudflare deployment cannot be established without its deployment record.

## Selected development route

| Route | Origin | Status |
| --- | --- | --- |
| `/unit-1-prototype/` | Original September 22 workspace | Ron's selected Unit 1 development baseline |
| `/try-boot-camp/` | Recovered marketing branch | Short scripted sales sample; not full Unit 1 |

Ron rejected the later `/unit-1/lesson-1/` reconstruction on September 24. Its route and dedicated review document were removed. Git history retains its provenance; it is not a parallel lesson to develop.

The original prototype contains five sections: cooling, temperature/thermal energy, refrigerant state changes, sensible/latent heat, and pressure. Recovery preserves that sequence. It does not reinterpret the earlier six-topic planning document or substitute the rejected eight-page pilot or PR #5.

The recovered demo includes three embedded video players, an additional preserved intro clip, the PT-chart image and exact bridge sentence, five checks, review buttons, and a four-step 74°F → 175°F → 212°F boiling demonstration. It explicitly does not save student progress and contains no live AI tutor. Those limitations remain unchanged.

## Durable evidence and media

- `recovery/2026-09-22-unit-1-prototype/` retains original source/layout/style/configuration copies, the earlier built page and CSS, and SHA-256 provenance.
- `public/media/unit-1/` contains recovered video/image bytes and the original uploaded heat-flow clip. The latter is retained as source media but is not assigned to the selected prototype.
- `docs/UNIT_1_MEDIA_INVENTORY.md` records all 13 original uploads and distinguishes them from the selected demo clips. Do not assign all 13 as required viewing merely because they exist.
- Marketing remains based on `ee8cea08adcfeda4e29c05cfb9478f8976c4e88d` and remote recovery baseline `723a5deee91e292a131a310f51b6c06ea7af0341`.

## Working rules

1. Work on PR #6, branch `recovery/money-pages-unit1`.
2. Preserve the recovered prototype and compare it with Ron before changing lesson design or topic order.
3. Develop Unit 1 from `/unit-1-prototype/` only. Keep the shorter `/try-boot-camp/` marketing sample distinct.
4. Verify build output, media, feedback, heat interaction, and playback.
5. Push source, selected media, and the handoff together. Confirm remote HEAD; a local commit alone is not completion.
6. Record a preview's actual deployed commit and ownership. An expired temporary URL is not source storage.

The recovered commit `a5773ba257b8937bf76cd62b2c55c433892c030e` was pushed to PR #6 and deployed to `https://hvac-training-solutions.rawalker0619.workers.dev` (Cloudflare version `0d337b5f-44a6-452f-a0aa-6e86087bdd97`). The live prototype HTML matched the saved recovery archive. No production WordPress, Moodle, DNS, payment, account, or enrollment changes are part of this recovery. PR #6 stays draft; no merge or production cutover is authorized here.
