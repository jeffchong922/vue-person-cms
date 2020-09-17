import { getTokenHeaders } from '../_helpers'
import makeRequestClient from './request-client'

const url = process.env.VUE_APP_HEROES_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const heroAPI = Object.freeze({
  createHero(data) {
    return client
      .post("/heroes", data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  deleteHero(id) {
    return client
      .delete(`/heroes/${id}`, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  patchHero({ id, ...data }) {
    return client
      .patch(`/heroes/${id}`, data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  fetchHeroes(id = "") {
    return client.get(`/heroes/${id}`).then(response => response.data);
  }
})