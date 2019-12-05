const SignIn = () => import("@/views/user/SignIn.vue");
const SignUp = () => import("@/views/user/SignUp.vue");

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
  }
];
