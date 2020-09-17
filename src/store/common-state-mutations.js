const commonStateAndMutations = (stateOverrides, mutationsOverrides) => ({
  namespaced: true,
  state: {
    list: [],
    loading: false,
    submitting: false,
    ...stateOverrides
  },
  mutations: {
    START_CREATING(state) {
      state.submitting = true;
    },
    CREATED(state, data) {
      state.submitting = false
      if (state.list.length) {
        state.list = [...state.list, data]
      }
    },
    CREATED_FAIL(state) {
      state.submitting = false;
    },

    START_FETCHING(state) {
      state.loading = true;
    },
    FETCHED(state, data) {
      state.loading = false;
      state.list = data
    },
    FETCHED_FAIL(state) {
      state.loading = false;
    },

    START_PATCHING(state) {
      state.submitting = true;
    },
    PATCHED_FAIL(state) {
      state.submitting = false;
    },
    PATCHED(state, updated) {
      state.submitting = false
      const list = [...state.list]
      const itemIdx = list.findIndex(_ => _.id === updated.id)
      if (~itemIdx) {
        list.splice(itemIdx, 1, updated)
        state.list = list
      }
    },

    DELETED(state, id) {
      state.list = state.list.filter(_ => _.id !== id)
    },

    ...mutationsOverrides
  }
})

export default commonStateAndMutations