import { getTokenHeaders } from '../_helpers'
import makeRequestClient from './request-client'

const url = process.env.VUE_APP_BLOGS_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const blogAPI = Object.freeze({
  createBlog(data) {
    return client
      .post("/blogs", data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  deleteBlog(id) {
    return client
      .delete(`/blogs/${id}`, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  patchBlog({ id, ...data }) {
    return client
      .patch(`/blogs/${id}`, data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  },

  fetchBlogs(id = "") {
    return client.get(`/blogs/${id}`).then(response => response.data);
  }
})