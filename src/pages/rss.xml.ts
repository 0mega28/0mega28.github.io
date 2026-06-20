import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const posts = await getCollection("blog", (p) => (import.meta.env.DEV ? true : !p.data.draft));

    // Sort posts by date descending
    posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

    return rss({
        title: "0mega28's Blog",
        description:
            "Deep dives into Java internals, distributed systems, and systems programming.",
        site: context.site || "https://0mega28.github.io",
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
