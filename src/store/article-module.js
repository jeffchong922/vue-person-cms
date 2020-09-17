import { devLog, requestRejected } from '../_helpers';
import makeCommonStateMutations from './common-state-mutations'

const article = (api, stateOverrides) => (Object.assign(
  {},
  makeCommonStateMutations(
    {
      ...stateOverrides
    },
    {}
  ),
  {
    actions: {
      create({ commit }, article) {
        commit("START_CREATING");
        return api.createArticle(article).then(
          result => {
            devLog('article created: ', result)
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
        return api.deleteArticle(deleteId).then(() => {
          devLog('article deleted')
          commit("DELETED", deleteId);
        }, requestRejected());
      },

      update({ commit }, articleData) {
        commit("START_PATCHING")
        return api.patchArticle(articleData).then(result => {
          devLog('article updated: ', result)
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
        return api.fetchArticles().then(
          result => {
            devLog('article loaded: ', result)
            commit("FETCHED", result);
            return result;
          },
          requestRejected(() => {
            commit("FETCHED_FAIL");
          })
        );
      },

      fetch(context, fetchId) {
        return api.fetchArticles(fetchId).then(result => {
          devLog('article fetch ' + fetchId + ' : ', result)
          return result;
        }, requestRejected());
      }
    }
  },
))

export default article