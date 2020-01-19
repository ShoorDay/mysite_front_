<template>
  <div>
    <el-tree
      lazy
      ref="cate_tree"
      :load="lazyLoad"
      :props="props"
      node-key="id"
      :expand-on-click-node="false"
    >
      <router-link
        :to="{
          name: data.type == 'post' ? 'post_detail' : 'cate_detail',
          params: { id: data.id }
        }"
        slot-scope="{ node, data }"
      >
        <span :class="[data.type, node.level == 1 ? 'first' : 'others']">
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="
                `#icon-${data.type == 'post' ? 'dingdan' : 'fenlei'}`
              "
            />
          </svg>
          {{ node.label }}
        </span>
      </router-link>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    init_data: Array
  },
  data() {
    return {
      props: {
        label: (data, node) => data.name || data.title,
        children: "children",
        isLeaf: (data, node) => data.is_leaf
      },
      category: {},
      resolve: false
    };
  },
  methods: {
    format(raw_data) {
      for (const el of raw_data) {
        if (el.is_leaf == null) {
          el.is_leaf = true;
          el.type = "post";
        } else {
          el.type = "cate";
        }
      }
      return raw_data;
    },
    lazyLoad(node, resolve) {
      let this_ = this;
      let id;
      if (node.level === 0) {
        this.resolve = this.resolve || resolve;
        resolve(this.init_data);
      } else {
        id = node.data.id;
        this.$api.blog.categoryDisplay(id).then(res => {
          resolve(this.format(res.data));
        });
      }
    },
    spanClass(node, data) {
      let level = node.level == 1 ? "first" : "others";
      let type = data.title ? "post" : "cate";
      return `${type} ${level}`;
    }
  },
  watch: {
    init_data: function(new_data, old) {
      this.$refs.cate_tree.root.childNodes = [];
      this.lazyLoad(this.$refs.cate_tree.root, this.resolve);
    }
  }
};
</script>

<style></style>
