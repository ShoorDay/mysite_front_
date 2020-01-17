<template>
  <div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="{ span: 13, offset: 3 }">
        <card shadow="hover">
          <header class="post-header">
            <div class="title">{{ post.title }}</div>
            <div class="meta">
              <span class="time">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-rili" />
                </svg>
                {{ post.created }} </span
              >|
              <span
                class="cate"
                v-for="cate in post.category_display"
                :key="cate.id"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fenlei1" /></svg
                >{{ cate.name }}/</span
              >
            </div>
          </header>
          <div class="body md" v-if="md" v-html="md"></div>
          <footer class="post-footer">
            <span class="prefix">上次编辑:</span>
            <span class="time">{{ post.updated }}</span>
          </footer>
        </card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="5">
        <user-card></user-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toc as Toc } from "@/utils/markdown/toc.js";
import UserCard from "@/components/user/Card.vue";
export default {
  components: { UserCard },
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

<style lang="stylus">
@import '~@/style/post/detail.styl';
</style>
