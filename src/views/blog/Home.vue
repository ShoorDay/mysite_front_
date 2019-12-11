<template>
  <div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="{span: 13, offset:3}">
        <post-item
          v-for="post in posts" :key="post.id"
          :id="post.id"
          :title="post.title"
          :excerpt="$md.render(post.excerpt)"
          :created="post.created"
          :updated="post.updated"
          :author="post.author_display.username"
          :tags="post.tags_display"
          :category="post.category_display"
        ></post-item>
        <div class="load">
          <span v-if="loading"><i class="el-icon-loading"></i> 加载中<i class="el-icon-more"></i></span>
          <span v-else-if="next && !loading" @click="load">点击加载更多 <i class="el-icon-more"></i></span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="5">
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

export default {
  name: "Home",
  components: {
    PostItem,
    HomeTags,
    HomeCategories
  },
  data() {
    return {
      posts: [],
      next: "",
      previous: "",
      categories: [],
      tags: [],
      loading: false
    };
  },
  created() {
    this.$api.blog.postList({ params: { page_size: 2 } }).then(res => {
      this.posts = res.data.results;
      this.next = res.data.next;
      this.previous = res.data.previous;
    });
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
</style>
