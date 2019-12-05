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
      posts: {},
      next: "",
      previous: "",
      categories: [],
      tags: []
    };
  },
  watch: {},
  created() {
    this.$api.blog.postList({ params: { page_size: 10 } }).then(res => {
      this.posts = res.data.results;
      this.next = res.data.next;
      this.previous = res.data.previous;
    });
    this.$api.blog.tagList({}).then(res => {
      this.tags = res.data.results;
    });
    this.$api.blog.categoryList({}).then(res => {
      this.categories = res.data.results
    })
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
