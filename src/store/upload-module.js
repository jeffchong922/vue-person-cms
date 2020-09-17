import { requestRejected, devLog } from '../_helpers'

const upload = (api, stateOverrides) => ({
  namespaced: true,
  state: {
    uploading: false,
    ...stateOverrides
  },
  mutations: {
    START_UPLOADING(state) {
      state.uploading = true;
    },
    UPLOADED(state) {
      state.uploading = false;
    },
    UPLOADED_FAIL(state) {
      state.uploading = false;
    }
  },
  actions: {
    post ({ commit }, data) {
      commit('START_UPLOADING')
      return api.uploadFile(data).then(
        result => {
          devLog('上传成功: ', result)
          commit('UPLOADED')
          return result
        },
        requestRejected(() => {
          commit('UPLOADED_FAIL')
        })
      )
    }
  }
})

export default upload