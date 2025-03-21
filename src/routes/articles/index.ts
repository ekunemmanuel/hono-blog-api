import { createRouter } from "@/lib/create-app";
import { handlers } from "./index.handlers";
import { routes } from "./index.routes";


const router = createRouter().basePath('/articles')
    .openapi(routes.getArticles, handlers.getArticles)
    .openapi(routes.getArticleById, handlers.getArticleById)
    .openapi(routes.createArticle, handlers.createArticle)
    .openapi(routes.updateArticle, handlers.updateArticle)
    .openapi(routes.deleteArticle, handlers.deleteArticle)




export default router;