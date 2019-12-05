<template>
  <div>
      <div>
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
      </div>
  </div>
</template>

<script>
import PostItem from "@/components/post/Item.vue";

export default {
  name: "Home",
  components: {
    PostItem
  },
  data() {
    return {
      posts: {},
      next: "",
      previous: ""
    };
  },
  watch: {},
  created() {
    this.$api.blog.postList({ params: { page_size: 10 } }).then(res => {
      (this.posts = res.data.results),
        (this.next = res.data.next),
        (this.previous = res.data.previous);
      console.log(res.data.results);
    });
  }
  // mounted() {
  //   this.Prism.highlightAll();
  // },
  // updated() {
  //   this.Prism.highlightAll();
  // }
};
</script>
<style lang="stylus"></style>
