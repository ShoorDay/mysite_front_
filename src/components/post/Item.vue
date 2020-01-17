<template>
  <div class="post-item">
    <card>
      <router-link
        v-if="image"
        :to="{ name: 'post_detail', params: { id: id } }"
      >
        <img :src="image" />
      </router-link>
      <div>
        <div class="header">
          <div>
            <router-link :to="{ name: 'post_detail', params: { id: id } }">
              <div class="title">{{ title }}</div>
            </router-link>
            <div class="meta">
              <span class="author iconfont icon-people">
                {{ author.username }}
              </span>
              <span
                class="time iconfont icon-calendar"
                :title="`创建于${created} | 修改于${updated}`"
                >{{ created.slice(0, 10) }}</span
              >
              <router-link
                :to="{ name: 'category_detail', params: { id: category.id } }"
                v-if="category"
              >
                <span class="iconfont icon-wenjian" v-if="category.name">{{
                  category.name
                }}</span>
              </router-link>
            </div>
          </div>
          <show-for-owner :owner_id="author.id">
            <div class="edit-btn">
              <router-link :to="{ name: 'post_update', params: { id: id } }">
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </router-link>
            </div>
          </show-for-owner>
        </div>

        <div class="excerpt" ref="md" v-html="excerpt"></div>
        <div class="tag-area" v-if="tags">
          <router-link
            v-for="tag in tags"
            :key="tag.id"
            :to="{ name: 'tag_detail', params: { id: tag.id } }"
            class="tag"
            >{{ tag.name }}</router-link
          >
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import ShowForOwner from "@/components/share/ShowForOwner.vue";

export default {
  components: { ShowForOwner },
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
    author: Object,
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
  },
  computed: {}
};
</script>

<style lang="stylus" scoped>
@import '~@/style/post/item.styl';
</style>
