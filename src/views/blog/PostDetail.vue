<template>
  <div class="md" v-if="md" v-html="md"></div>
</template>

<script>
export default {
  name: "PostDetial",
  data() {
    return {
      post: {},
      md: ""
    };
  },
  created() {
    this.$api.blog.postRetrieve(this.$route.params.id, {}).then(res => {
      this.post = res.data;
      this.md = this.$md.render(this.post.content);
    });
  },
  updated() {
    this.Prism.highlightAll();
  }
};
</script>

<style>
</style>