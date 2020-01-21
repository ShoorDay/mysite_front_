<template>
  <div class="profile">
    <div class="profile-header"></div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="12">
        <div class="profile-main">
          <div class="profile-main-header">
            <ul class="router-tab-list">
              <li class="router-tab-item" @click="activeTab = 'posts'">
                <router-link :to="{ name: 'user_posts' }">文章</router-link>
              </li>
              <li class="router-tab-item" @click="activeTab = 'categories'">
                <router-link :to="{ name: 'user_categories' }"
                  >分类</router-link
                >
              </li>
              <li class="router-tab-item" @click="activeTab = 'tags'">
                <router-link :to="{ name: 'user_tags' }">标签</router-link>
              </li>
            </ul>
          </div>
          <div>
            <router-view name="main"></router-view>
          </div>
        </div>
      </el-col>
    </el-row>
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
