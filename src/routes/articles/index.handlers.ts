import type { AppRouteHandler } from "@/lib/types";
import { ArticleRoutes } from "./index.routes";
import prisma from "@/db/prisma";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { HTTPException } from "hono/http-exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



// GET /articles
const getArticles: AppRouteHandler<ArticleRoutes['getArticles']> = async (c) => {
    try {
        const articles = await prisma.article.findMany();
        return c.json(articles, HttpStatusCodes.OK);
    } catch (error) {
        throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Failed to fetch articles'
        });
    }
}

// GET /articles/:id
const getArticleById: AppRouteHandler<ArticleRoutes['getArticleById']> = async (c) => {
    try {
        const { id } = c.req.valid("param");
        const article = await prisma.article.findUnique({ where: { id } });
        if (!article) {
            throw new HTTPException(HttpStatusCodes.NOT_FOUND, { message: 'Article not found' });
        }
        return c.json(article, HttpStatusCodes.OK);
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Failed to fetch article'
        });
    }
}

// POST /articles
const createArticle: AppRouteHandler<ArticleRoutes['createArticle']> = async (c) => {
    try {
        const { title, description, content, tags, isDraft } = c.req.valid("json");
        const article = await prisma.article.create({
            data: {
                title,
                description,
                content,
                tags,
                isDraft,
                publishedAt: isDraft ? null : new Date()
            }
        });
        return c.json(article, HttpStatusCodes.CREATED);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new HTTPException(HttpStatusCodes.CONFLICT, {
                    message: 'Article with this title already exists'
                });
            }
        }
        throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Failed to create article'
        });
    }
}

// PUT /articles/:id
const updateArticle: AppRouteHandler<ArticleRoutes['updateArticle']> = async (c) => {
    try {
        const { id } = c.req.valid("param");
        const { title, description, content, tags, isDraft } = c.req.valid("json");
        const article = await prisma.article.update({
            where: { id },
            data: {
                title,
                description,
                content,
                tags,
                isDraft,
                publishedAt: isDraft ? null : new Date()
            }
        });
        return c.json(article, HttpStatusCodes.OK);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
                    message: 'Article not found'
                });
            }
            if (error.code === 'P2002') {
                throw new HTTPException(HttpStatusCodes.CONFLICT, {
                    message: 'Article with this title already exists'
                });
            }
        }
        throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Failed to update article'
        });
    }
}

// DELETE /articles/:id
const deleteArticle: AppRouteHandler<ArticleRoutes['deleteArticle']> = async (c) => {
    try {
        const { id } = c.req.valid("param");
        await prisma.article.delete({ where: { id } });
        return c.json({ message: 'Article deleted successfully' });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
                    message: 'Article not found'
                });
            }
        }
        throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Failed to delete article'
        });
    }
}

const handlers = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}

export { handlers }
