import { setToken, clearToken, requestRejected, devLog } from '../_helpers'

const auth = (api, stateOverrides) => ({
  namespaced: true,
  state: {
    submitting: false,
    ...stateOverrides
  },
  mutations: {
    START_LOGIN (state) {
      state.submitting = true
    },
    AFTER_LOGIN (state) {
      state.submitting = false
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      commit('START_LOGIN')
      return api.signIn(userInfo).then(
        ({ token }) => {
          devLog('请求成功: ', token)
          commit('AFTER_LOGIN')
          setToken(token)
        },
        requestRejected(() => {
          commit('AFTER_LOGIN')
        })
      )
    },
    logout () {
      clearToken()
    }
  }
})

export default auth