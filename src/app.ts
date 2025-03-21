import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import articles from "@/routes/articles/index";
const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  articles,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
