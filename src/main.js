import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './plugins/element.js'

import ViewTitle from './components/ViewTitle.vue'

Vue.config.productionTip = false

Vue.component('view-title', ViewTitle)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
