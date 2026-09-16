// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { transformerMetaHighlight } from "@shikijs/transformers";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
    site: "https://0mega28.github.io",
    integrations: [icon(), sitemap()],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            transformers: [transformerMetaHighlight()],
        },
    },
});
