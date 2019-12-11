export default {
  namespaced: true,
  state: {
    is_authenticated: false,
    user_id: 0,
    username: "",
    nickname: "",
    isAdmin: false,
    email: "",
    email_is_active: false
  },
  mutations: {
    authenticate(state, payload) {
      console.log(payload);
      state.is_authenticated = true;
      state.user_id = payload.user_id || "";
      state.username = payload.username || "";
      state.nickname = payload.nickname || "无昵称";
      state.email = payload.email || "";
      state.email_is_active = payload.email_is_active || "";
    },
    signOUt(state) {
      state.is_authenticated = false;
      state.user_id = "";
      state.username = "";
      state.username = "";
      state.email = "";
      state.email_is_active = "";
      state.token.access = "";
      state.token.refresh = "";
    }
  },
  actions: {},
  modules: {}
};
