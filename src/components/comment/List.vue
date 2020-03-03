<template>
  <div>
    <card>
      <textarea
        name="markdown"
        ref="markdown"
        v-model="reply_content"
        style="width:100%"
        :placeholder="placeholder"
      ></textarea
    ></card>
    <card shadow="never" v-for="c in root_comments" :key="c.id">
      <comment-item
        :id="c.id"
        :owner="c.owner_detail"
        :content="c.content"
        :vote_count="c.vote_count"
        :child_comment_count="c.child_comment_count"
        @view_replies="viewReplies"
        @like="like"
      ></comment-item>
    </card>
    <el-button @click="repliesVisible = true">取 消</el-button>
    <el-dialog
      :visible.sync="repliesVisible"
      width="50%"
      :before-close="handleClose"
    >
      <card shadow="never" v-for="c in child_comments" :key="c.id">
        <comment-item
          :comment="c"
          type="child"
          :id="c.id"
          :owner="c.owner_detail"
          :reply_to="c.owner_detail"
          :content="c.content"
          :vote_count.sync="c.vote_count"
          :child_comment_count="c.child_comment_counts"
          @like="like"
        ></comment-item>
      </card>
    </el-dialog>
  </div>
</template>

<script>
import CommentItem from "./Item.vue";
export default {
  components: { CommentItem },
  props: {
    next: {
      default: null,
      required: true
    },
    previous: {
      default: null,
      required: true
    },
    root_comments: {
      required: true
    }
  },
  data() {
    return {
      repliesVisible: false,
      child_comments: [],
      reply_content: "",
      placeholder: "评论文章",
      reply_to: []
    };
  },
  methods: {
    viewReplies(root_comment_id) {
      this.$api.comment.postRootCommentChildren(root_comment_id).then(res => {
        console.log(res.data);
        this.child_comments = res.data.results;
        this.repliesVisible = true;
      });
    },
    handleClose() {
      this.child_comments = [];
      console.log("55555", this.repliesVisible);
      this.repliesVisible = false;
    },
    like(type, id) {
      type += "_comments";
      console.log(type, id);
      const idx = this[type].findIndex(c => c.id == id);
      if (idx == -1) return;
      this.$set(this[type][idx], "vote_count", 100);
      this.$set(this[type][idx], "voted", 100);
    }
  }
};
</script>

<style></style>
