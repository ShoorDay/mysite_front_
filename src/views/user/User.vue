<template>
  <div class="profile">
    <div class="profile-header"></div>
    <div class="profile-main">
      <div class="profile-main-header">
        <ul class="router-tab-list">
          <li class="router-tab-item" @click="activeTab = 'post'">
            <router-link :to="{ name: 'user_post' }">文章</router-link>
          </li>
          <li class="router-tab-item">
            <router-link :to="{ name: 'home' }">文章</router-link>
          </li>
          <li class="router-tab-item">
            <router-link :to="{ name: 'home' }">文章</router-link>
          </li>
        </ul>
      </div>
      <div>
        <router-view name="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/post/PostList.vue";
export default {
  data() {
    return {
      activeTab: "post"
    };
  },
  computed: {
    profile() {
      return this.$store.state.user;
    },
    is_owner() {
      return this.profile.user_id == this.$route.params.id;
    }
  }
};
</script>

<style>
.profile {
  background-color: aliceblue;
}
</style>
