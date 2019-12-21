<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :md="16">
      <el-card>
        <collection
          :title="tag.name"
          :posts="tag.posts"
          :num="tag.post_num"
        ></collection>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Collection from "@/components/post/Collection.vue";

export default {
  data() {
    return {
      tag: {}
    };
  },
  components: {
    Collection
  },
  created() {
    this.$api.blog.tagRetrieve(this.$route.params.id, {}).then(res => {
      this.tag = res.data;
    });
  }
};
</script>

<style></style>
