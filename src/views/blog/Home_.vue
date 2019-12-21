<template>
  <div class="infinite-list-wrapper">
    <ul class="list" ref="list">
      <li
        v-for="i in posts"
        class="list-item"
        :ref="i.id"
        :key="i.id"
        style="height: 512px;"
      >
        {{ i.title }}
      </li>
    </ul>
    <el-button @click="load">加载</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: false
    };
  },
  methods: {
    load() {
      this.loading = true;
      let this_ = this;
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
  computed: {
    noMore() {
      return this.posts > 100;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  }
};
</script>
<style lang="stylus" scoped>
ul.post-list {
  list-style: none;
}
</style>
