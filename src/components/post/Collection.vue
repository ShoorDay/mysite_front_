<template>
  <div class="posts-collection">
    <div class="title">{{ title }}</div>
    <div class="posts">
      <div class="post" v-for="post in posts" :key="post.id">
        <span class="time">{{ post.created.slice(0, 10) }}</span>
        <router-link :to="{name: 'post_detail', params:{id: post.id}}">
          <span class="title">{{ post.title }}</span>
        </router-link>
        <span class="atuthor">{{ post.author }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Collection"
    },
    posts: Array,
    num: Number
  }
};
</script>

<style lang="stylus">
@import '~@/style/post/collection.styl';
</style>