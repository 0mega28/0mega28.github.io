// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { transformerMetaHighlight } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
    site: "https://0mega28.github.io",
    integrations: [icon(), sitemap()],
    markdown: {
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            transformers: [transformerMetaHighlight()],
        },
    },
});
