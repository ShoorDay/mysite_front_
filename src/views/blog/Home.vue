<template>
  <div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="{ span: 13, offset: 3 }">
        <post-list></post-list>
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
<style lang="stylus" scoped></style>
