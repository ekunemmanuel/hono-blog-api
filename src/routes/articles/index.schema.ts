import { z } from "zod";

const ArticleSchema = z.object({
    id: z.string().uuid(),
    title: z.string({ required_error: "Title is required" }).min(3),
    description: z.string({ required_error: "Description is required" }).min(10).nullish(),
    content: z.string({ required_error: "Content is required" }).min(3),
    publishedAt: z.date().nullish(),
    tags: z.array(z.string({ required_error: "Tags are required" }).min(3)).optional(),
    isDraft: z.boolean().default(false),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
})

const ArticleListSchema = z.array(ArticleSchema)

const ArticleParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid article ID" }),
})

const ArticleErrorSchema = z.object({
    message: z.string(),
    code: z.string().optional(),
})

const ArticleCreateSchema = ArticleSchema.omit({ id: true, createdAt: true, updatedAt: true, publishedAt: true })

const ArticleUpdateSchema = ArticleCreateSchema.partial()


export { ArticleSchema, ArticleListSchema, ArticleParamsSchema, ArticleCreateSchema, ArticleUpdateSchema, ArticleErrorSchema }