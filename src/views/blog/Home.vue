<template>
  <div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="{ span: 13, offset: 3 }">
        <post-list></post-list>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="5" style="position: sticky; top:0">
        <el-card v-if="true">
          <el-row type="flex" justify="space-between">
            <el-col class="nav-icon">
              <router-link :to="{ name: 'write' }">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gangbi" />
                </svg>
                <div>写文章</div>
              </router-link>
            </el-col>
            <el-col class="nav-icon">
              <router-link
                :to="{
                  name: 'user',
                  params: { id: $store.state.user.user_id }
                }"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wode" />
                </svg>
                <div>个人中心</div>
              </router-link>
            </el-col>
          </el-row>
        </el-card>
        <home-tags :tags="tags"></home-tags>
        <home-categories :categories="categories"></home-categories>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostItem from "@/components/post/Item.vue";
import HomeTags from "@/components/post/HomeTags.vue";
import HomeCategories from "@/components/post/HomeCategories.vue";
import PostList from "@/components/post/PostList.vue";

export default {
  name: "Home",
  components: {
    HomeTags,
    HomeCategories,
    PostList
  },
  data() {
    return {
      categories: [],
      tags: [],
      loading: false
    };
  },
  created() {
    this.$api.blog.tagList({}).then(res => {
      this.tags = res.data.results;
    });
    this.$api.blog.categoryList({}).then(res => {
      this.categories = res.data.results;
    });
  },
  methods: {
    load() {
      this.loading = true;
      const this_ = this;
      this.$api.http({ baseURL: this.next }).then(
        res => {
          this_.posts.push.apply(this_.posts, res.data.results);
          this.next = res.data.next;
          this.previous = res.data.previous;
        },
        err => {}
      );
      this.loading = false;
    }
  },
  computed: {}
};
</script>
<style lang="stylus" scoped>
.nav-icon {
  text-align: center;

  & a {
    color: #222831;
  }

  & svg {
    font-size: 35px;
  }
}
</style>
