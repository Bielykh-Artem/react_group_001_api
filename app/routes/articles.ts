import * as Router from "koa-joi-router";

import {
  fetchAllArticles,
  fetchArticleById,
  addNewArticle,
  updateArticleById,
  removeArticleById,
} from "../controllers/article.controller";

const articles = Router();
articles.prefix("/articles");

articles.route({
  method: "get",
  path: "/",
  meta: {},
  validate: {},
  handler: fetchAllArticles,
});

articles.route({
  method: "get",
  path: "/:id",
  meta: {},
  validate: {},
  handler: fetchArticleById,
});

articles.route({
  method: "post",
  path: "/",
  meta: {},
  validate: {},
  handler: addNewArticle,
});

articles.route({
  method: "put",
  path: "/:id",
  meta: {},
  validate: {},
  handler: updateArticleById,
});

articles.route({
  method: "delete",
  path: "/:id",
  meta: {},
  validate: {},
  handler: removeArticleById,
});

export default () => articles;
