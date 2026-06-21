import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { draftFilter } from "../utils/collections";

export async function GET(context: APIContext) {
    const posts = await getCollection("blog", draftFilter);

    // Sort posts by date descending
    posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

    return rss({
        title: `${SITE_TITLE}'s Blog`,
        description: SITE_DESCRIPTION,
        site: context.site!,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
