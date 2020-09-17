import { devLog, requestRejected } from '../_helpers';
import makeCommonStateMutations from './common-state-mutations'

const category = (api, stateOverrides) => (Object.assign(
  {},
  makeCommonStateMutations(
    {
      parents: [],
      ...stateOverrides
    },
    {
      CREATED(state, category) {
        state.submitting = false;
        if (!category.parent) {
          state.parents = [...state.parents, category];
          if (state.list.length > 0) {
            state.list = [...state.list, category];
          }
        } else {
          const list = [...state.list];
          const parents = state.parents;
          const parentIdx = parents.findIndex(
            parent => parent.id === category.parent
          );
          const listIdx = list.findIndex(cat => cat.id === category.parent);
          if (~parentIdx && ~listIdx) {
            const copy = Object.assign({}, category, {
              parentName: parents[parentIdx].name
            });
            list.splice(listIdx + 1, 0, copy);
            state.list = list;
          }
        }
      },
      
      FETCHED_PARENTS(state, parents) {
        state.parents = parents;
      },
      FETCHED(state, categories) {
        state.loading = false;
  
        let list = [];
        const parents = categories.filter(({ parent }) => !parent);
        const childList = categories.filter(({ parent }) => parent);
  
        parents.forEach(parent => {
          list.push(parent);
          const child = childList.filter(
            ({ parent: parentId }) => parentId === parent.id
          );
          if (child.length > 0) {
            child.forEach(update => (update.parentName = parent.name));
            list = [...list, ...child];
          }
        });
  
        state.list = list;
        state.parents = parents;
      },

      PATCHED(state, updatedCategory) {
        state.submitting = false;
  
        // root list
        const parents = [...state.parents];
        // 存在
        const parentIdx = parents.findIndex(_ => _.id === updatedCategory.id);
        if (~parentIdx) {
          // 是否更新为子分类
          if (updatedCategory.parent) {
            parents.splice(parentIdx, 1);
          } else {
            parents.splice(parentIdx, 1, updatedCategory);
          }
        } else if (!updatedCategory.parent) {
          // 成为新的 root type
          parents.push(updatedCategory);
        }
        state.parents = parents;
  
        // all list
        let list = [...state.list];
        const categoryIdx = list.findIndex(_ => _.id === updatedCategory.id);
        if (~categoryIdx) {
          list.splice(categoryIdx, 1, updatedCategory);
          // root type
          if (~parentIdx && !updatedCategory.parent) {
            list = list.map(category => {
              if (category.parent === updatedCategory.id) {
                category.parentName = updatedCategory.name;
              }
              return category;
            });
          } else {
            // child type
            const updatedParentIdx = parents.findIndex(
              _ => _.id === updatedCategory.parent
            );
            if (~updatedParentIdx) {
              updatedCategory.parentName = parents[updatedParentIdx].name;
            }
          }
          state.list = list;
        }
      },

      DELETED(state, deleteId) {
        const isRoot = state.parents.some(_ => _.id === deleteId);
        state.list = state.list.filter(({ id, parent }) => {
          let isNot = true;
          if (id === deleteId) {
            isNot = false;
          }
          if (isRoot && deleteId === parent) {
            isNot = false;
          }
          return isNot;
        });
        state.parents = isRoot
          ? state.parents.filter(_ => _.id !== deleteId)
          : state.parents;
      },
    }
  ),
  {
    actions: {
      create({ commit }, category) {
        commit("START_CREATING");
        return api.createCategory(category).then(
          result => {
            devLog('category created: ', result)
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
        return api.deleteCategory(deleteId).then(() => {
          devLog('category deleted')
          commit("DELETED", deleteId);
        }, requestRejected());
      },

      update({ commit }, categoryData) {
        commit("START_PATCHING")
        return api.patchCategory(categoryData).then(result => {
          devLog('category updated: ', result)
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
        return api.fetchCategories().then(
          result => {
            devLog('category loaded: ', result)
            commit("FETCHED", result);
            return result;
          },
          requestRejected(() => {
            commit("FETCHED_FAIL");
          })
        );
      },

      loadParent({ state, commit }) {
        const parents = state.parents;
        if (parents.length > 0) {
          return Promise.resolve(parents);
        }
  
        return api.fetchCategoryParents().then(result => {
          devLog('category loadParent: ', result)
          commit("FETCHED_PARENTS", result);
          return result;
        }, requestRejected());
      },

      fetch({ state }, fetchId) {
        const list = state.list;
        const [exist] = list.filter(({ id }) => fetchId === id);
        if (exist) {
          return Promise.resolve(exist);
        }
  
        return api.fetchCategories(fetchId).then(result => {
          devLog('category fetch ' + fetchId + ' : ', result)
          return result;
        }, requestRejected());
      }
    },
    getters: {
      children (state) {
        return state.list.filter(({ parent }) => parent)
      }
    }
  }
))

export default category