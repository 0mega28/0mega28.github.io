# Project Rules

## Writing Tone

- **No LLM-isms.** Avoid: "masterclass", "genius", "beautiful", "elegant", "crucial", "delve", "landscape", "superpower", "revolutionary". Let the technical argument carry its own weight.
- **Don't over-bold.** Bold a term on first introduction only. Don't bold full sentences for emphasis.
- **Vary sentence structure.** Don't open multiple sections with rhetorical questions. Mix declarative and interrogative.
- **Keep conclusions flat.** No blockquoted aphorisms with bold openers. Write takeaways as regular prose.
- **Be direct, not grand.** Prefer "this mattered" over "this was revolutionary." Prefer "what's interesting is" over "the genius lies in."
- **Don't overuse emdashes (—)**
- **No "X is one of those" openings.** Avoid framing like "X is one of those concepts that every developer hears about." It reads as filler.
- **Lead with the topic, not the reader.** Open by stating what the thing _is_ or what question it answers, not how the audience relates to it.

## Review Workflow

- When reviewing content, present suggested changes as **concrete diffs** (current → proposed), not vague advice.
- Group changes by category (accuracy, tone, structure, nits).
- **Always wait for explicit approval** before applying review changes.

## Blog Formatting

- Use `##` for main sections, `###` for subsections.
- Use `---` horizontal rules between major sections.
- **Diagrams:** Prefer native Mermaid fenced code blocks (` ```mermaid `) over ASCII art for architectures, timelines, and state flows.
- **Collapsible deep dives:** Use `<details><summary>Title</summary>...</details>` blocks for advanced derivations, edge cases, or side algorithms so they don't interrupt the primary narrative.
- **Math & KaTeX:** Use `$math$` for inline math and `$$math$$` for block math. Escape literal dollar signs in prose (`\$`) to prevent accidental math rendering.
- Use markdown tables where tabular data fits naturally (e.g., interface properties).
- Use inline code for API methods, function names, and error types.
- Bold key terms on first mention only. Use italics for paper titles and light emphasis.

## Series & Frontmatter

- When adding a post to a series, both `series: "<series-slug>"` and `order: <number>` are mandatory.
- Use `YYYY-MM-DD` for `publishDate`.

## References & Citations

- **Internal blog posts:** Link internal posts directly inline using standard markdown links (e.g., `[Why Distributed Systems Can't Trust the Clock](/blog/distributed-system-classics/01-time-clocks-ordering)`).
- **External sources & papers:** Use **numbered footnote-style** references that link to the References section.
- **Inline citations** for external sources must be superscript anchor links: `<sup><a href="#ref-1">[1]</a></sup>`.
- **Do not** use inline hyperlinks for external sources in blog body text.
- Add a `## References` section at the bottom with full citations, URLs, and matching anchor IDs.
- Each reference entry should start with: `<span id="ref-1">[1]</span>`

## Git Commits

- Use conventional commit style: `type: short description` (e.g., `blog: add Spark paper deep-dive post`).
- Include a body with bullet points summarizing what changed when the commit is non-trivial.
