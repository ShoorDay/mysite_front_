const SignIn = () => import("@/views/user/SignIn.vue");

export default [
  {
    path: "/sign_in",
    name: "sign_in",
    component: SignIn,
    meta: {
      title: "登录"
    }
  }
];
