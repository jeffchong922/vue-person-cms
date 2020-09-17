import { getTokenHeaders } from '../_helpers'
import makeRequestClient from './request-client'

const url = process.env.VUE_APP_CATEGORIES_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const categoryAPI = Object.freeze({
  createCategory(data) {
    return client
      .post("/categories", data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  deleteCategory(id) {
    return client
      .delete(`/categories/${id}`, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  patchCategory({ id, ...data }) {
    return client
      .patch(`/categories/${id}`, data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  fetchCategories(id = "") {
    return client.get(`/categories/${id}`).then(response => response.data);
  },

  fetchCategoryParents() {
    return client
      .get("/categories", {
        params: {
          parent: 1
        }
      })
      .then(response => response.data);
  }
})