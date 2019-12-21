<template>
  <div id="app">
    <div id="nav">
      <el-row>
        <el-col :span="24">
          <nav-bar></nav-bar>
        </el-col>
      </el-row>
    </div>
    <div class="main">
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
