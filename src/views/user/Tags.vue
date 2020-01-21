<template>
  <div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-biaoqian" />
      </svg>
      标签
    </div>
    <div class="tag-area" v-if="tags">
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        class="tag"
        :to="{ name: 'tag_detail', params: { id: tag.id } }"
        >{{ tag.name }}({{ tag.post_count }})</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    };
  },
  created() {
    this.$api.blog
      .tagList({ params: { owner: this.$route.params.id } })
      .then(res => {
        this.tags = res.data.results;
      });
  }
};
</script>

<style></style>
