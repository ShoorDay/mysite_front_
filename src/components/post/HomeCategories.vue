<template>
  <div class="home-category">
    <el-card>
      <span v-for="category in categories" :key="category.id">
        <router-link :to="{name: 'category_detail', params: {id: category.id}}">{{ category.name }}</router-link>
      </span>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array
  }
};
</script>

<style>
</style>