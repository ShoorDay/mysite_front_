<template>
  <div>
    <el-card>
      <collection
        :title="category.name"
        :posts="category.posts"
        :num="category.post_num"
      ></collection>
    </el-card>
  </div>
</template>

<script>
import Collection from "@/components/post/Collection.vue";

export default {
  data() {
    return {
      category: {}
    };
  },
  components: {
    Collection
  },
  created() {
    this.$api.blog.categoryRetrieve(this.$route.params.id, {}).then(res => {
      this.category = res.data;
    });
  }
};
</script>

<style></style>
