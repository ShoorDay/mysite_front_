<template>
  <div class="post-item">
    <el-card shadow="hover">
      <router-link v-if="image" :to="{name:'post_detail', params:{id: id}}">
        <img :src="image" />
      </router-link>
      <div>
        <router-link :to="{name:'post_detail', params:{id: id}}">
          <div class="title">{{ title }}</div>
        </router-link>
        <div class="meta">
          <span class="author icon-people">{{ author }}</span>
          <span
            class="time icon-calendar"
            :title="`创建于${created} | 修改于${updated}`"
          >{{ created.slice(0, 10) }}</span>
          <router-link :to="{name: 'category_detail', params: {id: category.id}}">
            <span class="icon-folder" v-if="category.name">{{ category.name }}</span>
          </router-link>
        </div>
        <div class="excerpt" ref="md" v-html="excerpt"></div>
        <div class="tags">
          <span v-for="tag in tags" :key="tag.id">
            <router-link :to="{name:'tag_detail', params:{id: tag.id}}">{{ tag.name }}</router-link>
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    image: {
      type: String
    },
    title: {
      type: String,
      default: "无标题"
    },
    author: String,
    excerpt: {
      type: String,
      required: true
    },
    created: {
      type: String
    },
    updated: {
      type: String
    },
    tags: Array,
    category: Object
  },
  created() {
    this.$nextTick(this.Prism.highlightAll());
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/style/post/item.styl';
</style>