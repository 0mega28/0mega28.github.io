import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z
        .object({
            title: z.string(),
            description: z.string(),
            publishDate: z.date(),
            updatedDate: z.date().optional(),
            tags: z.array(z.string()).default([]),
            draft: z.boolean().default(false),
            series: z.string().optional(),
            order: z.number().optional(),
        })
        .superRefine((data, ctx) => {
            // TODO Make Extendable
            if (data.series && data.order === undefined) {
                ctx.addIssue({
                    code: "custom",
                    message: "order is required when series is set",
                    path: ["order"],
                });
            }
            if (data.order !== undefined && !data.series) {
                ctx.addIssue({
                    code: "custom",
                    message: "series is required when order is set",
                    path: ["series"],
                });
            }
        }),
});

const series = defineCollection({
    loader: glob({
        pattern: "*/_series.json",
        base: "./src/content/blog",
        generateId: ({ entry }) => entry.split("/")[0],
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
    }),
});

export const collections = { blog, series };
