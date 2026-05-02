# Blog Setup TODO

## Setup
- [x] Add real LinkedIn handle in BaseLayout.astro
- [x] Add real email in BaseLayout.astro
- [x] Add resume.pdf to public/

## Features
- [x] Add Icon for linkedin/github/resume/email
- [ ] Content collections setup (schema, series support)
- [ ] Blog index page (/blog)
- [ ] Series index page (/blog/[series])
- [ ] Blog post page (/blog/[series]/[post])
- [ ] RSS feed
- [ ] Syntax highlighting via Shiki (with line highlight support for javap output)
- [ ] Table of contents on blog posts (auto-generated from headings)
- [ ] Asymmetric sidebar layout for blog posts (ToC on the side on wide screens, inline on mobile)
- [ ] Reading time estimate on posts
- [ ] Previous / next post navigation within a series
- [ ] Copy button on code blocks
- [ ] 404 page
- [ ] robots.txt
- [ ] Manual dark/light mode toggle (respects OS preference, persists via localStorage)
- [ ] Setup Prettier with astro plugin for consistent formatting
- [ ] Fix Icon Inconsistensy

## Performance
- [ ] Verify fonts load with font-display: swap (no layout shift)
- [ ] Audit Lighthouse score before launch

## Content
- [ ] Write homepage (index.astro) (I'll share my resume and you can pick points from there)
- [ ] Write /blog index page
- [ ] Java Generics series landing page
- [ ] Java Generics series — first post (type erasure)

## Before Launch
- [ ] Favicon (replace default Astro one)
- [ ] SEO meta tags (og:title, og:description, og:image)
- [ ] Canonical URL meta tag on every page
- [ ] sitemap (@astrojs/sitemap)
- [ ] Google Search Console setup (submit sitemap)
- [ ] Test on mobile (iOS + Android)
- [ ] Test dark mode on both OS settings
- [ ] Validate RSS feed output
- [ ] Check all external links open in new tab with noopener
