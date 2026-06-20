# Blog Setup TODO

## Setup

- [x] Add real LinkedIn handle in BaseLayout.astro
- [x] Add real email in BaseLayout.astro
- [x] Add resume.pdf to public/

## Features

- [x] Add Icon for linkedin/github/resume/email
- [x] Content collections setup (schema, series support)
- [x] Blog index page (/blog)
- [x] Series index page (/blog/[series])
- [x] Blog post page (/blog/[series]/[post])
- [x] RSS feed
- [x] Syntax highlighting via Shiki (with line highlight support for javap output)
- [x] Table of contents on blog posts (auto-generated from headings)
- [x] Asymmetric sidebar layout for blog posts (ToC on the side on wide screens, inline on mobile)
- [x] Reading time estimate on posts
- [x] Previous / next post navigation within a series
- [x] Copy button on code blocks
- [x] 404 page
- [x] robots.txt
- [ ] Manual dark/light mode toggle (respects OS preference, persists via localStorage)
- [x] Setup Prettier with astro plugin for consistent formatting
- [ ] Fix Icon Inconsistensy

## Performance

- [x] Verify fonts load with font-display: swap (no layout shift)
- [ ] Audit Lighthouse score before launch

## Content

- [ ] Write homepage (index.astro) (I'll share my resume and you can pick points from there)
- [ ] Write /blog index page
- [ ] Java Generics series landing page
- [ ] Java Generics series — first post (type erasure)

## Before Launch

- [x] Favicon (replace default Astro one)
- [x] SEO meta tags (og:title, og:description, og:image)
- [x] Canonical URL meta tag on every page
- [x] sitemap (@astrojs/sitemap)
- [ ] Google Search Console setup (submit sitemap)
- [ ] Test on mobile (iOS + Android)
- [ ] Test dark mode on both OS settings
- [ ] Validate RSS feed output
- [x] Check all external links open in new tab with noopener
