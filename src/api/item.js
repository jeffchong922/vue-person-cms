import { getTokenHeaders } from '../_helpers'
import makeRequestClient from './request-client'

const url = process.env.VUE_APP_ITEMS_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const itemAPI = Object.freeze({
  createItem(data) {
    return client
      .post("/items", data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  deleteItem(id) {
    return client
      .delete(`/items/${id}`, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  patchItem({ id, ...data }) {
    return client
      .patch(`/items/${id}`, data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  fetchItems(id = "") {
    return client.get(`/items/${id}`).then(response => response.data);
  }
})