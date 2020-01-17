<template>
  <div class="home-tag">
    <card>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqian" />
        </svg>
        标签
      </div>
      <div class="tag-area">
        <router-link
          v-for="tag in tags"
          :key="tag.id"
          class="tag"
          :to="{ name: 'tag_detail', params: { id: tag.id } }"
          >{{ tag.name }}</router-link
        >
      </div>
    </card>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array
  }
};
</script>

<style></style>
