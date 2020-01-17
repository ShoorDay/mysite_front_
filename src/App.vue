<template>
  <div>
    <nav-bar></nav-bar>
    <div id="main" style="margin: 10px auto;">
      <router-view />
    </div>
    <my-footer></my-footer>
    <back-top></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/basic/NavBar.vue";
import MyFooter from "@/components/basic/Footer.vue";
import BackTop from "@/components/basic/BackTop.vue";

export default {
  name: "App",
  components: { NavBar, BackTop, MyFooter },
  beforeCreate() {
    let auth = this.$auth.authenticate(this);
  }
};
</script>

<style lang="stylus">
@import '~@/style/index.styl';
@import '~@/style/markdown/markdown.styl';
</style>
