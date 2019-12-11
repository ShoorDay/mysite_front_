<template>
  <el-select v-model="selected" multiple placeholder="添加标签">
    <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: []
    };
  }
};
</script>

<style>
</style>