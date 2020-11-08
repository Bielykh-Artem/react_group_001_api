import { ParameterizedContext } from "koa";
import { fetchArticles, fetchArticle, addArticle, updateArticle, removeArticle } from "../services";

export const fetchAllArticles = async (ctx: ParameterizedContext) => {
  const articles = await fetchArticles();
  ctx.ok(articles);
};

export const fetchArticleById = async (ctx: ParameterizedContext) => {
  const {
    params: { id },
  } = ctx.request;
  const article = await fetchArticle(JSON.parse(id));
  ctx.ok(article);
};

export const addNewArticle = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;
  const article = await addArticle(body);
  ctx.ok(article);
};

export const updateArticleById = async (ctx: ParameterizedContext) => {
  const {
    body,
    params: { id },
  } = ctx.request;
  const article = await updateArticle(JSON.parse(id), body);
  ctx.ok(article);
};

export const removeArticleById = async (ctx: ParameterizedContext) => {
  const {
    params: { id },
  } = ctx.request;
  const result = await removeArticle(JSON.parse(id));

  ctx.ok(result);
};
