<template>
  <div id="nav-bar">
    <el-menu
      :default-active="activeIndex2"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffffff"
      text-color="#2c3e50"
      active-text-color="#3eaf7c"
      :router="true"
    >
      <el-menu-item index="1" :route="{ name: 'home' }"
        >Shoor's Site</el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">其他</template>
        <el-menu-item index="2-1" :route="{ name: 'blog' }">Blog</el-menu-item>
        <el-menu-item
          index="2-2"
          :route="{ name: 'sign_in' }"
          v-if="!$store.state.user.is_authenticated"
          >登录</el-menu-item
        >
        <el-menu-item
          index="2-2"
          :route="{ name: 'sign_up' }"
          v-if="!$store.state.user.is_authenticated"
          >注册</el-menu-item
        >
        <el-menu-item
          index="2-2"
          :route="{ name: 'user', params: { id: $store.state.user.user_id } }"
          v-if="$store.state.user.is_authenticated"
          >用户中心</el-menu-item
        >
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="4" :route="{ name: 'about' }">关于</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
#meau {
  font-size: 0.9rem;
}
</style>
