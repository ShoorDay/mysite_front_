<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :md="16">
        <editor @save="save" ref="body" :autoHeight="true">
          <template v-slot:header>
            <my-title ref="title"></my-title>
            <el-collapse>
              <el-collapse-item title="标签 分类 公开 评论">
                <el-checkbox v-model="form.is_public">公开</el-checkbox>
                <el-checkbox v-model="form.allow_comments"
                  >允许评论</el-checkbox
                >
                <category-selector
                  :owner="$store.state.user.user_id"
                  ref="category"
                ></category-selector>
                <tag-selector ref="tags"></tag-selector>
              </el-collapse-item>
            </el-collapse>
          </template>
        </editor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from "@/components/editor/Body.vue";
import MyTitle from "@/components/editor/Title.vue";
import TagSelector from "@/components/editor/TagSelector.vue";
import CategorySelector from "@/components/editor/CategorySelector.vue";

export default {
  components: {
    Editor,
    MyTitle,
    TagSelector,
    CategorySelector
  },
  data() {
    return {
      form: {
        is_public: true,
        allow_comments: true
      },
      uploadVisible: false,
      linkVisible: false,
      mode: "create",
      post_id: 0
    };
  },
  methods: {
    save() {
      let api;
      const data = {
        title: this.$refs.title.title,
        ...this.form,
        tags: this.$refs.tags.selected,
        category: this.$refs.category.selected.slice(-1)[0] || null,
        content: this.$refs.body.md
      };
      if (this.mode === "create") {
        api = this.$api.blog.postCreate(data, {}).then(
          res => {
            console.log(res);
            this.post_id = res.data.id;
            this.mode = "update";
          },
          err => {}
        );
      } else if (this.mode === "update") {
        api = this.$api.blog.postUpdate(this.post_id, data, {}).then(
          res => {},
          err => {}
        );
      }
    }
  },
  created() {
    if (this.$route.name === "post_update") {
      this.mode = "update";
      this.post_id = this.$route.params.id;
      this.$api.blog.postRetrieve(this.$route.params.id, {}).then(res => {
        console.log(res);
        if (res.data.author_display.id != this.$store.state.user.user_id) {
          this.$router.replace({ name: "sign_in" });
        }
        this.$refs.title.title = res.data.title;
        this.form.is_public = res.data.is_public;
        this.form.allow_comments = res.data.allow_comments;
        this.$refs.tags.selected = res.data.tags_display.map(tag => tag.id);
        this.$refs.category.selected = res.data.category_display.map(
          cate => cate.id
        );
        this.$refs.body.md = res.data.content;
        console.log(this.$store.state.user);
      });
    }
  }
};
</script>

<style></style>
