export default {
  namespaced: true,
  state: {
    username: "",
    id: "",
    token: {
      access: "",
      refresh: ""
    }
  },
  mutations: {
    init(state, payload) {
      state.username = payload.username || state.username;
      state.id = payload.id || state.id;
      state.token.access = payload.access || state.token.access;
      state.token.refresh = payload.refresh || state.token.refresh;
    }
  },
  actions: {},
  modules: {}
};
