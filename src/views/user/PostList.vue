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
      :category="post.category_display"
    ></post-item>
  </div>
</template>

<script>
import PostItem from "@/components/post/Item.vue";
export default {
  components: {
    PostItem
  },
  data() {
    return {
      posts: [],
      next: null
    };
  },
  created() {
    this.$api.blog
      .postList({ params: { author: this.$route.params.id } })
      .then(res => {
        this.posts = res.data.results;
      });
  }
};
</script>

<style></style>
