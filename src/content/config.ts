import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }).and(
    z.union([
      z.object({ series: z.string(), order: z.number() }),
      z.object({ series: z.undefined(), order: z.undefined() }),
    ])
  ),
});

export const collections = { blog };
