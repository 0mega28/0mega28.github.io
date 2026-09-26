// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import mermaid from "astro-mermaid";
import { transformerMetaHighlight } from "@shikijs/transformers";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkTocLabels from "./src/plugins/remark-toc-labels.mjs";

// https://astro.build/config
export default defineConfig({
    site: "https://0mega28.github.io",
    integrations: [mermaid(), icon(), sitemap()],
    // Self-hosted and preloaded, with metric-matched fallbacks. display: "optional" means the
    // browser never swaps fonts mid-render, so text can't reflow (the flash) on a cold cache.
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Lora",
            cssVariable: "--font-body",
            weights: [400, 600],
            styles: ["normal", "italic"],
            subsets: ["latin"],
            fallbacks: ["Georgia", "serif"],
            display: "optional",
        },
        {
            provider: fontProviders.google(),
            name: "Outfit",
            cssVariable: "--font-heading",
            weights: [400, 500, 600, 700],
            styles: ["normal"],
            subsets: ["latin"],
            fallbacks: ["system-ui", "sans-serif"],
            display: "optional",
        },
        {
            provider: fontProviders.google(),
            name: "JetBrains Mono",
            cssVariable: "--font-mono",
            weights: [400, 500],
            styles: ["normal"],
            subsets: ["latin"],
            fallbacks: ["monospace"],
            display: "optional",
        },
    ],
    markdown: {
        remarkPlugins: [remarkMath, remarkTocLabels],
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
