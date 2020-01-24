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
                {{ post.created }}
              </span>
              <router-link
                v-if="post.category_display"
                class="cate"
                :to="{
                  name: 'cate_detail',
                  params: { id: post.category_display.id }
                }"
              >
                |
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fenlei1" />
                </svg>
                {{ post.category_display.name }}
              </router-link>
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
        <user-card :id="post.author"></user-card>
        <card v-if="similar">
          <router-link
            v-for="post in similar"
            :key="post.id"
            :to="{ name: 'post_detail', params: { id: post.id } }"
            >{{ post.title }}</router-link
          >
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toc as Toc } from "@/utils/markdown/toc.js";
import UserCard from "@/components/user/Card.vue";
const CONFIG = require("@/config/config.js");

export default {
  components: { UserCard },
  name: "PostDetial",
  data() {
    return {
      post: {},
      md: "",
      toc: "",
      similar: [],
      author: ""
    };
  },
  methods: {
    setData(id) {
      this.$api.blog.postRetrieve(id).then(res => {
        this.post = res.data;
        this.author = res.data.author;
        this.md = this.$md.render(this.post.content);
      });
    }
  },
  created() {
    this.setData(this.$route.params.id);
  },
  updated() {
    this.Prism.highlightAll();
    // toc(document.getElementsByClassName("el-aside")[0], document);
  },
  watch: {
    // md: function(val) {
    //   this.$nextTick(() => {
    //     this.toc = Toc(document.getElementsByClassName("header-anchor"));
    //   });
    // },
    post: function(new_post, old_post) {
      this.$api.blog.postSimilar(new_post.id).then(res => {
        this.similar = res.data;
      });
    }
  },
  computed: {
    showToc() {
      return /<a class="header-anchor" /.test(this.md);
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    if (to.name == from.name && to.params.id != from.params.id) {
      this.setData(to.params.id);
    }
    next();
  }
};
</script>

<style lang="stylus">
@import '~@/style/post/detail.styl';
</style>
