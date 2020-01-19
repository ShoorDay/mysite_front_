module.exports = {
  configureWebpack: {
    externals: {
      // jquery: "window.$",
      Prism: "window.Prism",
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      qs: "Qs",
      "element-ui": "ELEMENT"
    }
  }
};
