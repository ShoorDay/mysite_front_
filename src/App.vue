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
  </div>
</template>

<script>
import NavBar from "@/components/basic/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  beforeCreate() {
    let auth = this.$auth.authenticate(this);
  }
};
</script>


<style lang="stylus">
@import '~@/style/index.styl';
@import '~@/style/markdown/markdown.styl';
</style>