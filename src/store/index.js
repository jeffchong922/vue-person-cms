import Vue from 'vue'
import Vuex from 'vuex'

import authModule from "./auth-module";
import itemModule from "./item-module";
import heroModule from "./hero-module";
import blogModule from "./blog-module";
import uploadModule from "./upload-module";
import articleModule from "./article-module";
import categoryModule from "./category-module";

import {
  authAPI,
  blogAPI,
  heroAPI,
  itemAPI,
  uploadAPI,
  articleAPI,
  categoryAPI,
} from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule(authAPI),
    items: itemModule(itemAPI),
    blogs: blogModule(blogAPI),
    heroes: heroModule(heroAPI),
    upload: uploadModule(uploadAPI),
    articles: articleModule(articleAPI),
    categories: categoryModule(categoryAPI)
  }
})
