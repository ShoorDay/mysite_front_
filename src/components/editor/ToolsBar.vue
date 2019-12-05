<template>
  <div class="toolbar">
    <button class="icon-bold" title="粗体(ctrl+b)" @click="clicks('bold')"></button>
    <button class="icon-italic" title="斜体(ctrl+i)" @click="clicks('italic')"></button>
    <button class="icon-superscript" @click="clicks('superscript')"></button>
    <button class="icon-subscript" @click="clicks('subscript')"></button> 
    <button class="icon-code" title="代码(ctrl+shift+`)" @click="clicks('code')"></button>
    <button class="icon-quote" title="引用(ctrl+q)" @click="clicks('quote')"></button>
    <button class="icon-link" title="链接(ctrl+l)" @click="clicks('link')"></button> | 
    <button class="icon-save" title="保存(ctrl+s)" @click="$emit('save')"></button>
  </div>
</template>

<script>
export default {
  methods: {
    clicks(action){
      this.$emit("insert", action);
    }
  }
};
</script>

<style lang="css" scoped>
  @import "~@/style/markdown/font.css";
</style>