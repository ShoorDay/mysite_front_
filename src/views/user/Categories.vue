<template>
  <card>
    <cate-detail ref="cate_detail" :init_data="init_data"></cate-detail>
  </card>
</template>

<script>
import CateDetail from "@/components/post/CateDetail.vue";

export default {
  components: { CateDetail },
  data() {
    return {
      header: {},
      init_data: []
    };
  },
  methods: {
    setData(id) {
      this.$api.blog
        .categoryList({ params: { owner: id, is_root: true } })
        .then(res => {
          this.init_data = this.$refs.cate_detail.format(res.data.results);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    if (to.name == from.name && to != from) {
      this.setData(to.params.id);
    }
    next();
  },
  created() {
    this.setData(this.$route.params.id);
  }
};
</script>

<style></style>
