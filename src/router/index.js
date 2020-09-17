import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from "../_helpers"

Vue.use(VueRouter)

const routes = [
  { path: '/auth', component: () => import(/* webpackChunkName: "auth" */'../views/Auth.vue') },
  {
    path: '/', component: () => import(/* webpackChunkName: "home" */'../views/Home.vue'),
    children: [
      { path: '/', component: () => import(/* webpackChunkName: "home" */'../views/Welcome.vue') },


      {
        path: "blog/edit",
        component: () =>
          import(/* webpackChunkName: "blog" */ "../views/Blog/edit.vue")
      },
      {
        path: "blog/edit/:id",
        props: true,
        component: () =>
          import(/* webpackChunkName: "blog" */ "../views/Blog/edit.vue")
      },
      {
        path: "blog/list",
        component: () =>
          import(/* webpackChunkName: "blog" */ "../views/Blog/list.vue")
      },


      {
        path: "category/edit",
        component: () =>
          import(
            /* webpackChunkName: "category" */ "../views/Category/edit.vue"
          )
      },
      {
        path: "category/edit/:id",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "category" */ "../views/Category/edit.vue"
          )
      },
      {
        path: "category/list",
        component: () =>
          import(
            /* webpackChunkName: "category" */ "../views/Category/list.vue"
          )
      },


      {
        path: "article/edit",
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/Article/edit.vue")
      },
      {
        path: "article/edit/:id",
        props: true,
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/Article/edit.vue")
      },
      {
        path: "article/list",
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/Article/list.vue")
      },


      {
        path: "item/edit",
        component: () =>
          import(/* webpackChunkName: "item" */ "../views/Item/edit.vue")
      },
      {
        path: "item/edit/:id",
        props: true,
        component: () =>
          import(/* webpackChunkName: "item" */ "../views/Item/edit.vue")
      },
      {
        path: "item/list",
        component: () =>
          import(/* webpackChunkName: "item" */ "../views/Item/list.vue")
      },


      {
        path: "hero/edit",
        component: () =>
          import(/* webpackChunkName: "hero" */ "../views/Hero/edit.vue")
      },
      {
        path: "hero/edit/:id",
        props: true,
        component: () =>
          import(/* webpackChunkName: "hero" */ "../views/Hero/edit.vue")
      },
      {
        path: "hero/list",
        component: () =>
          import(/* webpackChunkName: "hero" */ "../views/Hero/list.vue")
      },
    ]
  },
  { path: '*', redirect: '/auth' }
]

const router = new VueRouter({
  mode: 'history',
  fallback: true,
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (token) {
    if (to.path === "/auth") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path === "/auth") {
      next();
    } else {
      next("/auth");
    }
  }
})

export default router
