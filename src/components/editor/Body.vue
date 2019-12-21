<template>
  <div class="editor">
    <slot name="header"></slot>
    <tool-bar @insert="insertMd" @save="save" @shift="shift" @upload_image="imageLink($event.url)"></tool-bar>
    <div class="preview" ref="preview" v-html="compiledMd" v-if="preview"></div>
    <div class="markdown" v-else>
      <textarea
        name="markdown"
        ref="markdown"
        v-model="md"
        :placeholder="placeholder"
        @keyup.ctrl.alt.c.native="insertMd('code')"
        @keyup.ctrl.b.exact.native="insertMd('bold')"
        @keyup.ctrl.i.exact.native="insertMd('italic')"
        @keyup.ctrl.l.exact.native="insertMd('link')"
        @keyup.ctrl.q.exact.native="insertMd('quote')"
      ></textarea>
    </div>
    <div class="bottom-tool-bar">
      <span @click="shift">预览</span>
    </div>
  </div>
</template>

<script>
import ToolBar from "./ToolsBar";
import { actions } from "@/utils/markdown/editor.js";
import { timingSafeEqual } from "crypto";

export default {
  components: {
    ToolBar
  },
  props: {
    placeholder: {
      type: String,
      default: "# Hello"
    },
    auto_height: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      title: "",
      md: "",
      compiledMd: "",
      preview: false,
      rows: 8
    };
  },
  methods: {
    shift() {
      this.preview = !this.preview;
    },
    insertMd(action) {
      action = actions[action];
      var t = this.$refs.markdown;
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
    },
    imageLink(url) {
      let action = actions["imageLink"];
      var t = this.$refs.markdown;
      t.focus();
      let temp = t.value;
      let startPos;
      try {
        startPos = t.selectionStart;
      } catch (error) {
        this.$notify.error({
          title: "错误",
          message: "浏览器不支持"
        });
        return;
      }
      t.value =
        temp.substring(0, startPos) +
        action.prefix +
        url +
        action.suffix +
        temp.substring(startPos, temp.length);
      t.selectionStart = startPos + 2;
      t.selectionEnd = t.selectionStart;
      this.md = t.value;
      t.focus();
    },
    save() {
      this.$emit("save");
    },
    autoHeight() {
      this.$refs.markdown.style.height =
        this.$refs.markdown.scrollHeight + "px";
    }
  },
  watch: {
    md: function(val) {
      if (this.auto_height) {
        this.autoHeight();
      }
    },
    preview: function(val) {
      if (val) {
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
    if (this.autoHeight) {
      this.$nextTick(() => this.autoHeight());
    }
    document.onkeyup = function(e) {
      if (e.key == "/" && e.ctrlKey == true) {
        this_.preview = !this_.preview;
      } else if (e.key == "s" && e.ctrlKey == true) {
        this_.$emit("save");
      }
    };
    document.onkeydown = function(e) {
      if (e.key == "l" && e.ctrlKey == true) {
        e.preventDefault();
      } else if (e.key == "s" && e.ctrlKey == true) {
        e.preventDefault();
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/style/editor/body.styl';
</style>
