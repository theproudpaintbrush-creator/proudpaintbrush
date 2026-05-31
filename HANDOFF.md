# Deployment Handoff Prompt

Paste the block below into a fresh Claude Code session (or hand to anyone helping deploy).
It assumes no prior context. The detailed runbook is in `DEPLOYMENT.md`; open action items are in `ACTION-ITEMS.md`.

---

```text
You're helping me deploy a finished Next.js website to production for the first time.
I'm the business owner (The Proud Paintbrush, a painting company) — not technical, so
explain each step plainly and tell me exactly what to click.

PROJECT
- Location: C:\Users\Chris\Documents\proudpaintbrush
- Stack: Next.js 16.2.6, React 19, Tailwind v4, App Router, TypeScript
- It's a complete rebuild of my live Squarespace site (theproudpaintbrush.com).
- State: builds clean locally; git is initialized (branch "master", ~13 commits);
  NOT pushed to any remote; NOT deployed anywhere. The live domain still points to Squarespace.
- A full step-by-step runbook already exists at the repo root: DEPLOYMENT.md — read it first.

IMPORTANT WORKFLOW RULES
- Always run `npm run build` and `next dev` in the BACKGROUND (foreground builds have frozen
  past sessions). To preview: `npx next dev -H 0.0.0.0 -p 3000` (kill any PID on port 3000 first).
- Do a clean `npm run build` to confirm it still passes before deploying.

DEPLOYMENT GOAL — guide me through these stages, pausing for me at each:
1. GitHub: help me create a free account + empty repo, then push (branch is "master" — rename to
   "main" if you prefer): git remote add origin <url>; git branch -M main; git push -u origin main
2. Vercel: import the GitHub repo (Next.js auto-detected, no build config needed) -> get a preview URL.
3. Test on the preview URL: click through pages, confirm photos load, and confirm redirects fire
   (e.g. /painting-services/interior-painting and /the-proud-paintbrush should 301).
4. Domain cutover (the real go-live): add theproudpaintbrush.com + www to Vercel, then update DNS
   at my registrar to point to Vercel.

CRITICAL CAUTIONS
- Only change the WEBSITE DNS records (A / CNAME). DO NOT touch MX (email) records — my email
  info@theproudpaintbrush.com must keep working. Help me identify which records are which first.
- The site's canonical host is www. Set www as primary in Vercel and redirect the apex to it.
- Keep Squarespace published until DNS fully propagates (up to 24-48h); it's my rollback.

AFTER LAUNCH
- Submit https://www.theproudpaintbrush.com/sitemap.xml to Google Search Console and request
  indexing on the homepage + a few top pages. (The repo has 181 URLs + 89 301-redirects that
  protect existing rankings.)
- Watch Search Console for 404s the first couple weeks; add any missed old URL to the redirects
  in next.config.ts.

Start by reading DEPLOYMENT.md and running a build to confirm everything's green, then walk me
through stage 1.
```
