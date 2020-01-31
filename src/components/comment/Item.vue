<template>
  <div class="comment">
    <div class="comment-meta">
      <el-avatar
        class="avatar"
        shape="circle"
        :size="24"
        :src="
          owner.avatar ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        "
        style="margin-right: 8px"
      ></el-avatar>
      <span>{{ owner.username }}</span>
      <span v-if="showReplyTo" style="color: #aaa; margin: 0 0.1rem">回复</span>
      <span v-if="showReplyTo">{{ parent_owner.username }}</span>
    </div>
    <div class="comment-content">{{ content }}</div>
    <div class="comment-footer">
      <i class="iconfont icon-like-fill">{{ likes }}</i>
      <span v-if="child_comment_count">查看回复</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    owner: {
      required: true
    },
    content: {
      required: true
    },
    parent_owner: {
      default: () => ({})
    },
    likes: {
      required: true
    },
    child_comment_count: {
      default: 0
    }
  },
  data() {
    return {
      showChildren: false
    };
  },
  computed: {
    showReplyTo() {
      return this.parent_owner == {};
    }
  }
};
</script>

<style lang="stylus">
@import '~@/style/config.styl';

.comment-meta {
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
}

.comment-content, .comment-footer {
  margin: 0 0 4px 33px;
}
</style>
