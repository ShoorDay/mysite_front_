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
      <i
        class="btn vote-btn iconfont icon-like-fill"
        :class="{ 'is-active': voted }"
        @click.once="like"
        >{{ vote_count }}</i
      >
      <span v-if="child_comment_count" @click="$emit('view_replies', id)"
        >查看回复</span
      >
      <i class="btn iconfont icon-reply hover-btn" @click="show_editor = true"
        >回复</i
      >
    </div>
    <div>
      <el-input
        autosize
        :placeholder="placeholder"
        v-model="reply_content"
        v-if="show_editor"
      >
        <i class="iconfont icon-send" slot="append"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // comment: { required: true },
    type: {
      default: "root"
    },
    has_dialog: {
      default: false
    },
    id: {
      required: true
    },
    owner: {
      required: true
    },
    content: {
      required: true
    },
    reply_to: {
      default: () => ({})
    },
    vote_count: {
      required: true
    },
    child_comment_count: {
      default: 0
    },
    voted: {
      default: false
    }
  },
  data() {
    return {
      reply_content: "",
      show_editor: false,
      placeholder: "请输入内容"
    };
  },
  computed: {
    showReplyTo() {
      return this.reply_to == {};
    }
  },
  methods: {
    like($event) {
      console.log($event);
      // this.is_voted = true;
      // $event.toElement.style.color = "#ff7242";
      this.$emit("like", this.type, this.id);
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

.hover-btn {
  opacity: 0;

  &:hover {
    opacity: 1;
  }
}
</style>
