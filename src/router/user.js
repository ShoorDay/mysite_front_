const SignIn = () => import("@/views/user/SignIn.vue");
const SignUp = () => import("@/views/user/SignUp.vue");
const Center = () => import("@/views/user/Center.vue");
const User = () => import("@/views/user/User.vue");
const PostList = () => import("@/components/post/PostList.vue");

export default [
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
      { path: "post", name: "user_post", components: { main: PostList } }
      // {path: "category", name: "user_cate", components: {main: }}
    ]
  }
];
