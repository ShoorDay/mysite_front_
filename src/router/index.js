import Vue from "vue";
import VueRouter from "vue-router";
import $auth from "@/utils/localAuth";

import Home from "@/views/Home.vue";

import blog from "./blog.js";
import user from "./user.js";

Vue.use(VueRouter);

const routes = [
  ...blog,
  ...user,
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "关于"
    }
  },
  {
    path: "*",
    redirect: "/",
    name: "redirect"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const meta = to.matched[0].meta;
  document.title = meta.title;
  if (to.meta.requireAuth) {
    const auth = $auth.check();
    console.log(auth);

    if (auth[0]) {
      console.log(!to.meta.use_id);
      if (
        (to.meta.use_id && to.params[to.meta.use_id] == auth.use_id) ||
        !to.meta.use_id
      ) {
        next();
      }
    } else {
      next({
        name: "sign_in",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
