<template>
  <div>
    <post-item
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :excerpt="$md.render(post.excerpt)"
      :created="post.created"
      :updated="post.updated"
      :author="post.author_display"
      :tags="post.tags_display"
      :category="post.category_display[0] || null"
    ></post-item>
    <div class="load">
      <span v-if="loading">
        <i class="el-icon-loading"></i> 加载中
        <i class="el-icon-more"></i>
      </span>
      <span v-else-if="next && !loading" @click="load">
        点击加载更多
        <i class="el-icon-more"></i>
      </span>
    </div>
  </div>
</template>

<script>
import PostItem from "./Item.vue";

export default {
  components: { PostItem },
  data() {
    return {
      posts: [],
      next: "",
      previous: "",
      loading: false
    };
  },
  created() {
    let params = {};
    if (this.$route.name === "user_post") {
      console.log(this.$route);
      params.owner = this.$route.params.id;
    }
    this.$api.blog.postList({ params: { page_size: 5 } }).then(res => {
      this.posts = res.data.results;
      this.next = res.data.next;
      this.previous = res.data.previous;
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
  }
};
</script>

<style></style>
