import { getTokenHeaders } from '../_helpers'
import makeRequestClient from './request-client'

const url = process.env.VUE_APP_ARTICLES_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const articleAPI = Object.freeze({
  createArticle(data) {
    return client
      .post("/articles", data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  deleteArticle(id) {
    return client
      .delete(`/articles/${id}`, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  patchArticle({ id, ...data }) {
    return client
      .patch(`/articles/${id}`, data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  fetchArticles(id = "") {
    return client.get(`/articles/${id}`).then(response => response.data);
  }
})