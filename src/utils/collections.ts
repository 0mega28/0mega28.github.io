import type { CollectionEntry } from "astro:content";

/**
 * Filter predicate for blog posts.
 * In dev mode, includes drafts; in production, excludes them.
 */
export function draftFilter(post: CollectionEntry<"blog">): boolean {
    return import.meta.env.DEV || !post.data.draft;
}

/**
 * Sort comparator: orders posts by their `order` field (ascending).
 * Posts without an order default to 0.
 */
export function bySeriesOrder(
    a: CollectionEntry<"blog">,
    b: CollectionEntry<"blog">,
): number {
    return (a.data.order ?? 0) - (b.data.order ?? 0);
}

/**
 * Formats a Date as a short, human-readable string.
 * Example: "Jan 1, 2026"
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
