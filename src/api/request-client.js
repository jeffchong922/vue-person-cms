import axios from 'axios'

import { devLog } from '../_helpers'

const requestClient =  {}
function makeRequestClient (baseUrl) {
  if (!requestClient[baseUrl]) {
    devLog(`创建新的请求客户端: ${baseUrl}`)
    requestClient[baseUrl] = axios.create({
      baseURL: baseUrl
    })
  }
  return requestClient[baseUrl]
}

export default makeRequestClient