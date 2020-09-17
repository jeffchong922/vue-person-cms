import { devLog, requestRejected } from '../_helpers';
import makeCommonStateMutations from './common-state-mutations'

const hero = (api, stateOverrides) => (Object.assign(
  {},
  makeCommonStateMutations(
    {
      ...stateOverrides
    },
    {}
  ),
  {
    actions: {
      create({ commit }, hero) {
        commit("START_CREATING");
        return api.createHero(hero).then(
          result => {
            devLog('hero created: ', result)
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
        return api.deleteHero(deleteId).then(() => {
          devLog('hero deleted')
          commit("DELETED", deleteId);
        }, requestRejected());
      },

      update({ commit }, heroData) {
        commit("START_PATCHING")
        return api.patchHero(heroData).then(result => {
          devLog('hero updated: ', result)
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
        return api.fetchHeroes().then(
          result => {
            devLog('hero loaded: ', result)
            commit("FETCHED", result);
            return result;
          },
          requestRejected(() => {
            commit("FETCHED_FAIL");
          })
        );
      },

      fetch(context, fetchId) {
        return api.fetchHeroes(fetchId).then(result => {
          devLog('hero fetch ' + fetchId + ' : ', result)
          return result;
        }, requestRejected());
      }
    }
  },
))

export default hero