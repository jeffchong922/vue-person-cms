import makeRequestClient from './request-client'

const url = process.env.VUE_APP_AUTH_BASE_URL ||
  'http://localhost:8848'

const client = makeRequestClient(url)

export const authAPI = Object.freeze({
  signIn (userInfo) {
    return client.post('/sign-in', userInfo)
      .then(res => res.data)
  }
})