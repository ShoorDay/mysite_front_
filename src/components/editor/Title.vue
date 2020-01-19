<template>
  <div class="title">
    <input v-model="title" placeholder="标题" maxlength="64" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
input {
  width: 100%;
  border: none;
  outline: none;
  font-size: large;
  padding: 5px;
}
</style>
