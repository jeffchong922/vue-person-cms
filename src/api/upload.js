import { getTokenHeaders } from '../_helpers'
import makeRequestClient from './request-client'

const url = process.env.VUE_APP_UPLOAD_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const uploadAPI = Object.freeze({
  uploadFile(data) {
    return client
      .post("/file", data, {
        headers: getTokenHeaders()
      })
      .then(response => response.data);
  }
})