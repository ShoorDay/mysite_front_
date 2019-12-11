<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :md="16">
        <editor @save="save" ref="body">
          <template v-slot:header>
            <my-title ref="title"></my-title>
            <el-collapse>
              <el-collapse-item title="标签 分类 公开 评论">
                <el-checkbox v-model="form.is_public">公开</el-checkbox>
                <el-checkbox v-model="form.allow_comments">允许评论</el-checkbox>
                <category-selector :owner="$store.state.user.user_id" ref="category"></category-selector>
                <tag-selector :tags="tags" ref="tags"></tag-selector>
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
import CategorySelector from "@/components/editor/CategorySelector";

export default {
  components: {
    Editor,
    MyTitle,
    TagSelector,
    CategorySelector
  },
  data() {
    return {
      tags: [],
      form: {
        is_public: true,
        allow_comments: true
      }
    };
  },
  methods: {
    save() {
      this.$api.blog
        .postCreate(
          {
            title: this.$refs.title.title,
            ...this.form,
            tags: this.$refs.tags.selected,
            category: this.$refs.category.selected.slice(-1)[0] || null,
            content: this.$refs.body.md
          },
          {}
        )
        .then(
          res => {},
          err => {}
        );
    }
  },
  created() {
    let this_ = this;
    this.$api.blog
      .tagList()
      .then(res => {
        this_.tags = res.data.results;
      });
  }
};
</script>

<style>
</style>