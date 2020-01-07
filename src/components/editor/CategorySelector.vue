<template>
  <div>
    <el-cascader v-model="selected" :props="props" clearable></el-cascader>
  </div>
</template>

<script>
import $api from "@/api";

export default {
  props: {
    owner: {
      required: true
    }
  },
  data() {
    let this_ = this;
    return {
      selected: [],
      categories: [],
      props: {
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true,
        lazy: true,
        leaf: "is_leaf",
        lazyLoad(node, resolve) {
          let params;
          if (node.level === 0) {
            params = { owner: this_.owner, is_root: true };
          } else {
            params = { parent: node.data.id };
          }
          $api.blog.categoryList({ params: params }).then(res => {
            resolve(res.data.results);
          });
        }
      }
    };
  },
  methods: {},
  created() {}
};
</script>

<style></style>
