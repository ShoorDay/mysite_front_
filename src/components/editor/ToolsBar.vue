<template>
  <div class="toolbar">
    <el-tooltip class="item" effect="dark" content="粗体(ctrl+b)" placement="bottom-start">
      <button class="icon-bold" @click="clicks('bold')"></button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="斜体(ctrl+i)" placement="bottom-start">
      <button class="icon-italic" @click="clicks('italic')"></button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="上标" placement="bottom-start">
      <button class="icon-superscript" @click="clicks('superscript')"></button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="下标" placement="bottom-start">
      <button class="icon-subscript" @click="clicks('subscript')"></button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="代码(ctrl+shift+`)" placement="bottom-start">
      <button class="icon-code" @click="clicks('code')"></button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="引用(ctrl+q)" placement="bottom-start">
      <button class="icon-quote" @click="clicks('quote')"></button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="链接(ctrl+l)" placement="bottom-start">
      <button class="icon-link" @click="clicks('link')"></button>
    </el-tooltip>|
    <a href="https://segmentfault.com/markdown" target="_blank">
      <el-tooltip class="item" effect="dark" content="了解Markdown" placement="bottom-start">
        <button class="icon-markdown"></button>
      </el-tooltip>
    </a>
    <el-tooltip class="item" effect="dark" content="预览(ctrl+/)" placement="bottom-start">
      <button class="icon-eye" @click="$emit('shift')"></button>
    </el-tooltip>

    <el-tooltip class="item" effect="dark" content="保存(ctrl+s)" placement="bottom-start">
      <button class="icon-save" @click="$emit('save')"></button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  methods: {
    clicks(action) {
      this.$emit("insert", action);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/style/editor/button.styl";
.toolbar {
  border-bottom-style: dashed;
  border-block-end-color: inherit;
}
</style>