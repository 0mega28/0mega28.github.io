# Project Rules

## Writing Tone

- **No LLM-isms.** Avoid: "masterclass", "genius", "beautiful", "elegant", "crucial", "delve", "landscape", "superpower", "revolutionary". Let the technical argument carry its own weight.
- **Don't over-bold.** Bold a term on first introduction only. Don't bold full sentences for emphasis.
- **Vary sentence structure.** Don't open multiple sections with rhetorical questions. Mix declarative and interrogative.
- **Keep conclusions flat.** No blockquoted aphorisms with bold openers. Write takeaways as regular prose.
- **Be direct, not grand.** Prefer "this mattered" over "this was revolutionary." Prefer "what's interesting is" over "the genius lies in."

## Review Workflow

- When reviewing content, present suggested changes as **concrete diffs** (current → proposed), not vague advice.
- Group changes by category (accuracy, tone, structure, nits).
- **Always wait for explicit approval** before applying review changes.

## Blog Formatting

- Use `##` for main sections, `###` for subsections.
- Use `---` horizontal rules between major sections.
- Use fenced code blocks for diagrams and code.
- Use markdown tables where tabular data fits naturally (e.g., interface properties).
- Use inline code for API methods, function names, and error types.
- Bold key terms on first mention only. Use italics for paper titles and light emphasis.

## References & Citations

- Use **numbered footnote-style** references: `[1]`, `[2]`, etc. inline.
- **Do not** use inline hyperlinks in blog body text.
- Add a `## References` section at the bottom with full citations and URLs.

## Git Commits

- Use conventional commit style: `type: short description` (e.g., `blog: add Spark paper deep-dive post`).
- Include a body with bullet points summarizing what changed when the commit is non-trivial.
