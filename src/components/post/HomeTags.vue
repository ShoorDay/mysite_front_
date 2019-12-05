<template>
  <div class="home-tag">
    <el-card>
      <span v-for="tag in tags" :key="tag.id">
        <router-link :to="{name:'tag_detail', params:{id: tag.id}}">
          {{ tag.name }}
        </router-link>
      </span>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array
  }
};
</script>

<style>
</style>