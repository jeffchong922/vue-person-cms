const isDev = process.env.VUE_APP_OPEN_LOG === 'true'

export function devLog (...message) {
  isDev && console.log(...message)
}