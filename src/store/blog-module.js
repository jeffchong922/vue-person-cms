import { devLog, requestRejected } from '../_helpers';
import makeCommonStateMutations from './common-state-mutations'

const blog = (api, stateOverrides) => (Object.assign(
  {},
  makeCommonStateMutations(
    {
      ...stateOverrides
    },
    {}
  ),
  {
    actions: {
      create({ commit }, blog) {
        commit("START_CREATING");
        return api.createBlog(blog).then(
          result => {
            devLog('blog created: ', result)
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
        return api.deleteBlog(deleteId).then(() => {
          devLog('blog deleted')
          commit("DELETED", deleteId);
        }, requestRejected());
      },

      update({ commit }, blogData) {
        commit("START_PATCHING")
        return api.patchBlog(blogData).then(result => {
          devLog('blog updated: ', result)
          const { patched } = result
          commit("PATCHED", patched);
          return result;
        }, requestRejected(() => {
          commit('PATCHED_FAIL')
        }));
      },

      load({ state, commit }) {
        if (state.list.length > 0) {
          return Promise.resolve();
        }
  
        commit("START_FETCHING");
        return api.fetchBlogs().then(
          result => {
            devLog('blog loaded: ', result)
            commit("FETCHED", result);
            return result;
          },
          requestRejected(() => {
            commit("FETCHED_FAIL");
          })
        );
      },

      fetch(context, fetchId) {
        return api.fetchBlogs(fetchId).then(result => {
          devLog('blog fetch ' + fetchId + ' : ', result)
          return result;
        }, requestRejected());
      }
    },
    getters: {
      tags(state) {
        const { list } = state;
        const tagsSet = new Set();
        list.forEach(({ tags }) => {
          tags.forEach(tag => tagsSet.add(tag));
        });
        return [...tagsSet];
      }
    }
  },
))

export default blog