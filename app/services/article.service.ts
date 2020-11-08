import Article from "./../models/Article";

export const fetchArticles = async (): Promise<any> => {
  return await Article.query().modify("defaultSelects").where({ is_active: true });
};

export const fetchArticle = async (id: number): Promise<any> => {
  return await Article.query().modify("defaultSelects").where({ id }).first();
};

export const addArticle = async (article: any): Promise<any> => {
  const body = { ...article, created_by: "artem" };

  console.log('body', body)

  return await Article.query().insertAndFetch(body);
};
export const updateArticle = async (id: number, article: any): Promise<any> => {
  const body = { ...article, updated_at: new Date(), updated_by: "artem" };

  return await Article.query().updateAndFetchById(id, body);
};
export const removeArticle = async (id: number): Promise<any> => {
  return await Article.query().updateAndFetchById(id, {
    is_active: false,
    updated_at: new Date(),
    updated_by: "artem",
  });
};
