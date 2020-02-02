const SignIn = () => import("@/views/user/SignIn.vue");
const SignUp = () => import("@/views/user/SignUp.vue");
const Center = () => import("@/views/user/Center.vue");
const User = () => import("@/views/user/User.vue");
const PostList = () => import("@/views/user/PostList.vue");
const Categories = () => import("@/views/user/Categories.vue");
const Tags = () => import("@/views/user/Tags.vue");
const ThirdPartyAuth = () => import("@/views/user/ThirdPartyAuth.vue");

export default [
  {
    path: "/third_party_auth",
    name: "third_party_auth",
    component: ThirdPartyAuth,
    beforeEnter(to, from, next) {
      if (to.query.code && to.query.state) {
        next();
      } else
        next({
          name: "sign_in"
        });
    }
  },
  {
    path: "/sign_in",
    name: "sign_in",
    component: SignIn,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/sign_up",
    name: "sign_up",
    component: SignUp,
    meta: {
      title: "注册"
    }
  },
  {
    path: "/user/:id",
    name: "user",
    component: User,
    meta: {
      title: "个人中心"
    },
    children: [
      {
        path: "posts",
        name: "user_posts",
        components: {
          main: PostList
        }
      },
      {
        path: "categories",
        name: "user_categories",
        components: {
          main: Categories
        }
      },
      {
        path: "tags",
        name: "user_tags",
        components: {
          main: Tags
        }
      }
    ]
  }
];
