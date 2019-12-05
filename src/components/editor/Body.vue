<template>
  <div class="editor">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="Write" name="write">
        <tool-bar @insert="insertMd"></tool-bar>
        <el-input
          placeholder="标题"
          v-model="title"
          clearable
          v-if="hasTitle"
          @keyup.enter.native="$refs.md_body.focus()"
        ></el-input>
        <el-input
          ref="md_body"
          type="textarea"
          :autosize="autosize"
          placeholder="# Hello"
          v-model="md"
          @keyup.ctrl.alt.c.native="insertMd('code')"
          @keyup.ctrl.b.exact.native="insertMd('bold')"
          @keyup.ctrl.i.exact.native="insertMd('italic')"
          @keyup.ctrl.l.exact.native="insertMd('link')"
          @keyup.ctrl.q.exact.native="insertMd('quote')"
        ></el-input>
      </el-tab-pane>
      <el-tab-pane label="Preview" name="preview" ref="preview">
        <div ref="html_body" class="md" v-html="compiledMd"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ToolBar from "./ToolsBar";
import { actions } from "@/utils/markdown/editor.js";

export default {
  components: {
    ToolBar
  },
  props: {
    hasTitle: {
      type: Boolean,
      default: true
    },
    autosize: {
      type: Object,
      default() {
        return {
          minRows: 4,
          maxRows: 8
        };
      }
    }
  },
  data() {
    return {
      title: "",
      md: "",
      compiledMd: "",
      activeTab: "write"
    };
  },
  methods: {
    insertMd(action) {
      action = actions[action];
      var t = this.$refs.md_body.$refs.textarea;
      t.focus();
      let temp = t.value;
      let startPos;
      let endPos;
      try {
        startPos = t.selectionStart;
        endPos = t.selectionEnd;
      } catch (error) {
        this.$notify.error({
          title: "错误",
          message: "浏览器不支持"
        });
        return;
      }
      if (startPos === endPos) {
        t.value =
          temp.substring(0, startPos) +
          action.prefix +
          action.placeholder +
          action.suffix +
          temp.substring(endPos, temp.length);
        t.selectionStart = startPos + action.prefix.length;
        t.selectionEnd =
          startPos + (action.prefix.length + action.placeholder.length);
      } else {
        // 存在选中区域
        if (
          temp.substring(startPos - action.prefix.length, startPos) ===
            action.prefix &&
          temp.substring(endPos, endPos + action.suffix.length) ===
            action.suffix
        ) {
          // 取消
          t.value =
            temp.substring(0, startPos - action.prefix.length) +
            temp.substring(startPos, endPos) +
            temp.substring(endPos + action.suffix.length, temp.length);
          t.selectionStart = startPos - action.prefix.length;
          t.selectionEnd = endPos - action.prefix.length;
        } else {
          // 确定
          t.value =
            temp.substring(0, startPos) +
            action.prefix +
            temp.substring(startPos, endPos) +
            action.suffix +
            temp.substring(endPos, temp.length);
          t.selectionStart = startPos + action.prefix.length;
          t.selectionEnd =
            startPos + (endPos - startPos + action.prefix.length);
        }
      }
      this.md = t.value;
      t.focus();

      //   if (action) {
      //     let str = action.prefix + action.placeholder + action.suffix;
      //     this.md = this.md + str;
      //   }
    },
    save() {
      console.log("DD");
    }
  },
  watch: {
    activeTab: function(val) {
      if (val === "preview") {
        this.compiledMd = this.$md.render(this.md);
      }
    },
    compiledMd: {
      handler: function() {
        this.$nextTick(() => this.Prism.highlightAll());
      }
    }
  },
  created() {
    let this_ = this;
    document.onkeyup = function(e) {
      if (e.key == "/" && e.ctrlKey == true) {
        if (this_.activeTab === "write") {
          this_.activeTab = "preview";
        } else {
          this_.activeTab = "write";
        }
      }
      else if(e.key == "s" && e.ctrlKey == true){
          this_.$emit('save');
      }
    };
    document.onkeydown = function(e){
        if(e.key == "l" && e.ctrlKey == true){
          e.preventDefault()
      }
        else if(e.key == "s" && e.ctrlKey == true){
          e.preventDefault()
      }
    }
  }
};
</script>

<style>
div.editor .el-tabs--border-card > .el-tabs__content {
  padding-top: 0;
}
</style>

<style lang="stylus" scoped>
div.md {
    padding-top: 4px;
}
</style>