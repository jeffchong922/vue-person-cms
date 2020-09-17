import { devLog, requestRejected } from '../_helpers';
import makeCommonStateMutations from './common-state-mutations'

const item = (api, stateOverrides) => (Object.assign(
  {},
  makeCommonStateMutations(
    {
      ...stateOverrides
    },
    {}
  ),
  {
    actions: {
      create({ commit }, item) {
        commit("START_CREATING");
        return api.createItem(item).then(
          result => {
            devLog('item created: ', result)
            const { posted } = result;
            commit("CREATED", posted);
            return posted;
          },
          requestRejected(() => {
            commit("CREATED_FAIL");
          })
        );
      },

      delete({ commit }, deleteId) {
        return api.deleteItem(deleteId).then(() => {
          devLog('item deleted')
          commit("DELETED", deleteId);
        }, requestRejected());
      },

      update({ commit }, itemData) {
        commit("START_PATCHING")
        return api.patchItem(itemData).then(result => {
          devLog('item updated: ', result)
          const { patched } = result
          commit("PATCHED", patched);
          return result;
        }, requestRejected(() => {
          commit("PATCHED_FAIL")
        }));
      },

      load({ state, commit }) {
        if (state.list.length > 0) {
          return Promise.resolve();
        }
  
        commit("START_FETCHING");
        return api.fetchItems().then(
          result => {
            devLog('item loaded: ', result)
            commit("FETCHED", result);
            return result;
          },
          requestRejected(() => {
            commit("FETCHED_FAIL");
          })
        );
      },

      fetch({ state }, fetchId) {
        const list = state.list;
        const [exist] = list.filter(({ id }) => fetchId === id);
        if (exist) {
          return Promise.resolve(exist);
        }

        return api.fetchItems(fetchId).then(result => {
          devLog('item fetch ' + fetchId + ' : ', result)
          return result;
        }, requestRejected());
      }
    }
  },
))

export default item