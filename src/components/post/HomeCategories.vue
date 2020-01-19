<template>
  <div class="home-category">
    <card>
      <div class="tag-area">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenlei"></use></svg
          >分类
        </div>
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="{ name: 'cate_detail', params: { id: category.id } }"
          class="tag"
          >{{ category.name }}</router-link
        >
      </div>
    </card>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array
  }
};
</script>

<style></style>
