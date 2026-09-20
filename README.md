# HVAC Training Solutions

Rebuild of **HVACTrainingSolutions.net**.

## Purpose

Create a modern, fast, SEO-focused public marketing site while preserving the search value, URLs, training content, and authority accumulated by the existing WordPress site.

## Source of truth

This repository is the canonical source for the rebuilt public website.

The existing SiteGround / WordPress site remains live and unchanged until the replacement site has passed migration, SEO, conversion, and rollback checks.

## Planned stack

- Astro
- Cloudflare Workers / Static Assets
- GitHub-based version control and deployment
- Existing HVAC Training Academy retained as the student learning platform
- Existing checkout/payment flow retained initially unless a later migration is explicitly approved

## Migration principles

1. Do not mass-delete or rename existing indexed URLs.
2. Inventory old URLs before migration.
3. Classify each existing page as KEEP, UPDATE, MERGE, REDIRECT, or DELETE.
4. Preserve strong URLs wherever practical.
5. Use permanent 301 redirects for retired URLs.
6. Preserve or improve titles, canonical tags, structured data, internal links, images, and metadata.
7. Verify sitemap.xml, robots.txt, analytics, Search Console, forms, checkout, and student-login links before cutover.
8. Keep the existing WordPress site available as rollback protection during launch.

## Initial product focus

The first page to rebuild and review will be:

`/hvac-boot-camp/`

Once its design, copy, mobile layout, calls-to-action, testimonials, pricing, and SEO structure are approved, its design language can guide the rest of the site without forcing every page into an identical template.

## Public-site role

HVACTrainingSolutions.net will be the marketing, SEO, lead-generation, and sales site.

The existing HVAC Training Academy will remain the authenticated student-learning environment.

## Status

Repository initialized September 20, 2026.
