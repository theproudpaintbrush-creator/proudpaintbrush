# The Proud Paintbrush — Deployment Runbook

Status at last check: production build passes, **161 pages**, **89 redirects**, sitemap + robots live, custom 404, `metadataBase` set, **0 broken internal links**.

---

## Pre-flight (already done in code)
- [x] `next build` passes clean
- [x] `app/sitemap.ts` → `/sitemap.xml` (161 URLs) and `app/robots.ts` → `/robots.txt`
- [x] 89 × 301 redirects in `next.config.ts` (old Squarespace URLs → new, blog traffic recovery, typo fixes)
- [x] `metadataBase` set so canonical/OG URLs are absolute
- [x] Custom branded `app/not-found.tsx`

## Step 1 — Put the project in Git
The repo isn't initialized yet. From the project folder:
```
git init
git add .
git commit -m "Initial Next.js rebuild of theproudpaintbrush.com"
```
Then create an empty repo on GitHub and push:
```
git remote add origin https://github.com/<you>/proudpaintbrush.git
git branch -M main
git push -u origin main
```
> `.gitignore` already excludes `node_modules` and `.next`. Consider also ignoring `scrape/raw/` (large HTML dumps) and `*.log` build logs — see note at bottom.

## Step 2 — Deploy to a host (Vercel recommended)
Next.js is zero-config on Vercel:
1. vercel.com → **Add New → Project** → import the GitHub repo.
2. Framework auto-detected as **Next.js**; no build settings to change.
3. Deploy → you get a preview URL like `proudpaintbrush.vercel.app`.

(Netlify/Cloudflare Pages also work; Vercel is the smoothest for Next 16 + App Router.)

## Step 3 — Test on the preview URL *before* touching DNS
- Click through the nav, a few city pages, sub-services, blog posts.
- Confirm redirects fire: visit e.g. `/painting-services/interior-painting`, `/the-proud-paintbrush`, `/blog/ev5rl48r6sewhkhx3n6l9ycvlqiore`, `/brick-painting` — each should 301 to the right page.
- Check `/sitemap.xml` and `/robots.txt` load.

## Step 4 — Point the domain (the public go-live)
1. In Vercel → Project → **Settings → Domains** → add `theproudpaintbrush.com` and `www.theproudpaintbrush.com`.
2. Vercel shows the DNS records to set. At your **domain registrar** (where the domain's nameservers live — may be Squarespace or a registrar):
   - Apex `theproudpaintbrush.com` → Vercel A record (or ALIAS), and
   - `www` → CNAME to Vercel.
3. Decide canonical host. The site's metadata uses **`www.`** — set `www` as primary in Vercel and redirect apex → www (Vercel can do this automatically).
4. Leave Squarespace published until DNS fully propagates (can take up to 24–48h), then unpublish.

> Caution: this is the irreversible public step — once DNS points to Vercel, visitors hit the new site. Test thoroughly on the preview URL first.

## Step 5 — Post-launch (do these the day of cutover)
- **Google Search Console**: submit `https://www.theproudpaintbrush.com/sitemap.xml`. Use **URL Inspection → Request Indexing** on the homepage and a few top pages.
- **Verify the high-value redirects in production** (these protect your existing rankings):
  - `/blog/ev5rl48r…` → `best-exterior-paint-texas` (132 clicks)
  - `/blog/hll1sta1…` → `is-behr-paint-good`
  - `/fence-staining`, `/brick-painting`, `/our-team` → their new homes
- Watch GSC **Coverage/Pages** over the next 2–4 weeks for 404s; add any missed old URL to `next.config.ts` redirects.
- Keep an eye on Core Web Vitals — should be much better than Squarespace.

## Rollback
If something's wrong after cutover, repoint DNS back to Squarespace (it stays intact until you unpublish). Keep Squarespace active for at least a week post-launch as a safety net.

---

### Repo hygiene before committing
These are dev artifacts, safe to gitignore (add to `.gitignore`):
```
scrape/raw/        # ~hundreds of MB of scraped HTML (keep scrape/content + manifest if you want)
*.log              # build-*.log, dev-server.log
```
Keep committed: `content/` (your live site content), `migration/*.mjs` + `migration/*.json` (the generators + redirect map + plan), everything in `app/`, `components/`, `lib/`.
