<template>
  <div>
    <el-container>
      <el-aside width="200px" v-if="false" v-html="toc"></el-aside>
      <el-main>
        <el-card shadow="hover">
          <div class="title">{{ post.title }}</div>
          <div class="md" v-if="md" v-html="md"></div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { toc as Toc } from "@/utils/markdown/toc.js";
export default {
  name: "PostDetial",
  data() {
    return {
      post: {},
      md: "",
      toc: "r"
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
    // toc(document.getElementsByClassName("el-aside")[0], document);
  },
  watch: {
    md: function(val) {
      this.$nextTick(() => {
        this.toc = Toc(document.getElementsByClassName("header-anchor"));
      });
    }
  },
  computed: {
    showToc() {
      return /<a class="header-anchor" /.test(this.md);
    }
  }
};
</script>

<style></style>
