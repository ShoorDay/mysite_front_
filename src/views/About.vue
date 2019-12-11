<template>
  <div class="about">
    <h1>This is an about page</h1>
    <category-selector :owner="3"></category-selector>
  </div>
</template>

<script>
import CategorySelector from "@/components/editor/CategorySelector";
export default {
  components: {
    CategorySelector
  }
};
</script>

<style>
</style>
