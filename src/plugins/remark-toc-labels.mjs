import GithubSlugger from "github-slugger";
import katex from "katex";
import { visit } from "unist-util-visit";

const escapeHtml = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Astro builds `heading.text` by concatenating every text node in the rendered
 * heading, so KaTeX output (MathML + TeX annotation + HTML) turns `$C_1$` into
 * "C1C_1C1". This records a clean HTML label per heading, in document order,
 * exposed as `remarkPluginFrontmatter.tocLabels`.
 *
 * It also sets each heading's id from the clean text (math as TeX source), so
 * anchors read `#cut-c_1-...` instead of `#cut-c1c_1c1-...`. Astro keeps an id
 * that is already set, and uses the same slugger, so plain headings are unchanged.
 */
export default function remarkTocLabels() {
    return (tree, file) => {
        const labels = [];
        const slugger = new GithubSlugger();
        visit(tree, "heading", (heading) => {
            let html = "";
            let text = "";
            visit(heading, (node) => {
                if (node.type === "text" || node.type === "inlineCode") {
                    html += escapeHtml(node.value);
                    text += node.value;
                } else if (node.type === "inlineMath") {
                    html += katex.renderToString(node.value, { throwOnError: false });
                    text += node.value;
                }
            });
            labels.push(html.trim());
            heading.data ??= {};
            heading.data.hProperties ??= {};
            heading.data.hProperties.id ??= slugger.slug(text);
        });
        file.data.astro ??= {};
        file.data.astro.frontmatter ??= {};
        file.data.astro.frontmatter.tocLabels = labels;
    };
}
