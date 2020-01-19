<template>
  <div>
    <div class="block">
      <el-tree
        :props="props"
        lazy
        :load="lazyLoad"
        :draggable="draggable"
        :allow-drag="allowDrag"
        :allow-drop="allowDrop"
        node-key="id"
        highlight-current
        @node-drop="handleDrop"
        ref="cate_tree"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="editable && data.id != null">
            <i
              class="el-icon-circle-plus-outline"
              @click="() => append(node, data)"
            ></i>
            <i class="el-icon-delete" @click="() => remove(node, data)"></i>
            <i class="el-icon-edit" @click="() => updateCate(node, data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog :visible.sync="cate_add_visible">
      <el-input v-model="new_cate.name" placeholder="请输入内容"></el-input>
      {{ new_cate.parent || "ddd" }}
      <!-- <category-selector :owner="$store.state.user.user_id"></category-selector> -->
      <el-button @click="cate_add_visible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </el-dialog>
    <el-dialog :visible.sync="cate_update_visible">
      <el-input v-model="update_cate.name" placeholder="请输入内容"></el-input>
      {{ new_cate.parent || "ddd" }}
      <category-selector
        ref="cate_selector"
        :owner="$store.state.user.user_id"
      ></category-selector>
      <el-button @click="cate_update_visible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdate">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import CategorySelector from "@/components/editor/CategorySelector.vue";

let data_, node_;
function getLevel(node) {
  if (node.isLeaf) {
    return 0;
  } else {
    return (
      1 + Math.max(0, ...(node.childNodes.forEach(n => getLevel(n)) || []))
    );
  }
}

export default {
  components: { CategorySelector },
  props: {
    owner: {
      required: true
    },
    draggable: {
      default: false
    },
    editable: {
      default: false
    }
  },
  data() {
    return {
      new_cate: { name: null, parent: null, data: {} },
      update_cate: { name: null, parent: null, data: {} },
      cate_add_visible: false,
      cate_update_visible: false,
      props: {
        label: (data, node) => data.name,
        children: "children",
        isLeaf: (data, node) => data.is_leaf
      }
    };
  },
  methods: {
    lazyLoad(node, resolve) {
      let this_ = this;
      let params;
      if (node.level === 0) {
        resolve([{ id: null, name: "分类", parent: null, is_leaf: false }]);
        return;
      } else if (node.level === 1) {
        params = { owner: this_.owner, is_root: true };
      } else {
        params = { parent: node.data.id };
      }
      this.$api.blog.categoryList({ params: params }).then(res => {
        resolve(res.data.results);
      });
    },
    handleAdd() {
      this.$api.blog
        .categoryCreate({
          parent: this.new_cate.parent,
          name: this.new_cate.name
        })
        .then(res => {
          const new_cate = { ...res.data, children: [] };
          this.$refs.cate_tree.updateKeyChildren(node_.data.id, {
            ...node_.data,
            is_leaf: false
          });
          this.$refs.cate_tree.append(new_cate, node_);
        });
      this.cate_add_visible = false;
    },
    handleUpdate() {
      this.cate_update_visible = false;
      this.$api.blog
        .categoryUpdate(node_.data.id, {
          name: this.update_cate.name,
          parent: this.$refs.cate_selector.selected.slice(-1)[0] || null
        })
        .then(res => {
          console.log(node_, res.data);
          if (node_.data.parent == res.data.parent) {
            this.$refs.cate_tree.updateKeyChildren(node_.data.id, res.data);
          } else if (res.data.parent == null) {
            this.$refs.cate_tree.remove(node_);
            this.$refs.cate_tree.append(
              res.data,
              // 分类根节点(name:分类, id:null)
              this.$refs.cate_tree.root.childNodes[0]
            );
          } else {
            this.$refs.cate_tree.updateKeyChildren(node_.data.id, res.data);
            // node_.data.name = res.data.name;
            // node_.parent = this.$refs.cate_tree.getNode(res.data.parent);

            // this.$refs.cate_tree.$forceUpdate();
          }
        });
    },
    append(node, data) {
      this.new_cate.parent = data.id;
      data_ = data;
      node_ = node;
      this.cate_add_visible = true;
    },
    remove(node, data) {
      this.$api.blog.categoryDelete(data.id).then(res => {
        node.remove(data);
      });
    },
    updateCate(node, data) {
      console.log(node, data);
      node_ = node;
      data_ = data;
      this.cate_update_visible = true;
      this.$set(this.update_cate, "name", data.name);
      this.$nextTick(function() {
        let parent = node.parent;
        this.$refs.cate_selector.selected = [];
        while (parent != null && parent.data.id != null) {
          this.$refs.cate_selector.selected.unshift(parent.data.id);
          parent = parent.parent;
        }
      });
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.data.id);
      console.log(draggingNode, dropNode, dropType);
      let params = {};
      const this_ = this;
      if (dropType == "inner") {
        params.parent = dropNode.data.id;
      } else if (dropType == "before") {
        params.parent = dropNode.parent.data.id || null;
      }
      this.$api.blog.categoryUpdate(draggingNode.data.id, params).then(res => {
        if (dropType === "inner") {
          dropNode.isLeaf = false;
          dropNode.data.is_leaf = false;
        }
      });
    },
    allowDrag(node) {
      return node.data.id != null && getLevel(node) < 6;
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(draggingNode, dropNode, type);
      // console.log(dropNode);
      let l1_max = 0;
      let l1 = 1 + getLevel(draggingNode);
      return (
        l1 + dropNode.level < 6 &&
        (type == "inner" ||
          (draggingNode.parent != dropNode.parent && dropNode.data.id != null))
      );
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <i
              class="el-icon-circle-plus-outline"
              on-click={() => this.append(node, data)}
            ></i>

            <i
              class="el-icon-delete"
              on-click={() => this.remove(node, data)}
            ></i>

            <i
              class="el-icon-edit"
              on-click={() => this.updateCate(node, data)}
            ></i>
          </span>
        </span>
      );
    }
  }
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
