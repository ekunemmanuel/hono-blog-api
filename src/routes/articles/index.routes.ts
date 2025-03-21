import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { ArticleCreateSchema, ArticleErrorSchema, ArticleListSchema, ArticleParamsSchema, ArticleSchema, ArticleUpdateSchema } from "./index.schema";

const tags = ["articles"]

// GET ALL ARTICLES
const getArticles = createRoute({
    path: "/",
    method: "get",
    description: "Get all articles",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            ArticleListSchema,
            "Articles fetched successfully"
        ),
    },
})


// GET ARTICLE BY ID
const getArticleById = createRoute({
    path: "/:id",
    method: "get",
    description: "Get article by id",
    request: {
        params: ArticleParamsSchema
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            ArticleSchema,
            "Article fetched successfully"
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            createErrorSchema(ArticleErrorSchema),
            "Article not found"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(ArticleParamsSchema),
            "Invalid article ID"
        ),
    },
})

// CREATE ARTICLE
const createArticle = createRoute({
    path: "/",
    method: "post",
    description: "Create article",
    tags,
    request: {
        body: jsonContentRequired(ArticleCreateSchema, "Article creation request body")
    },
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(
            ArticleSchema,
            "Article created successfully"
        ),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(
            createErrorSchema(ArticleCreateSchema),
            "Invalid article creation request body"
        ),
    },
})

// UPDATE ARTICLE
const updateArticle = createRoute({
    path: "/:id",
    method: "put",
    description: "Update article",
    tags,
    request: {
        params: ArticleParamsSchema,
        body: jsonContent(ArticleUpdateSchema, "Article update request body")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            ArticleSchema,
            "Article updated successfully"
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            createErrorSchema(ArticleErrorSchema),
            "Article not found"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(ArticleParamsSchema),
            "Invalid article ID"
        ),
    },
})

// DELETE ARTICLE
const deleteArticle = createRoute({
    path: "/:id",
    method: "delete",
    description: "Delete article",
    tags,
    request: {
        params: ArticleParamsSchema
    },
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: "Article deleted successfully"
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            createErrorSchema(ArticleErrorSchema),
            "Article not found"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(ArticleParamsSchema),
            "Invalid article ID"
        ),
    }
})


interface ArticleRoutes {
    getArticles: typeof getArticles
    getArticleById: typeof getArticleById
    createArticle: typeof createArticle
    updateArticle: typeof updateArticle
    deleteArticle: typeof deleteArticle
}

const routes = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}

export { ArticleRoutes, routes }

