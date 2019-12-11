const SignIn = () => import("@/views/user/SignIn.vue");
const SignUp = () => import("@/views/user/SignUp.vue");
const Center = () => import("@/views/user/Center.vue");

export default [{
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
    path: "/user/center",
    name: "user_center",
    component: Center,
    meta: {
      title: "个人中心",
      requireAuth: true
    }
  }
];