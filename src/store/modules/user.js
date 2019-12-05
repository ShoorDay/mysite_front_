


export default {
  namespaced: true,
  state: {
    is_authenticated: false,
    id: "",
    username: "",
    nickname: "",
    isAdmin: false,
    email: "",
    email_is_active: false,
    token: {
      access: "",
      refresh: ""
    }
  },
  mutations: {
    authenticate(state, payload) {
      console.log(payload);
      state.is_authenticated = true;
      state.id = payload.id || "";
      state.username = payload.username || "";
      state.username = payload.nickname || "无昵称";
      state.email = payload.email || "";
      state.email_is_active = payload.email_is_active || "";
      state.token.access = payload.access || "";
      state.token.refresh = payload.refresh || "";
    }
  },
  actions: {},
  modules: {}
};
