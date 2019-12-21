<template>
  <div>{{ profile }}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({ profile: "user" })
  }
};
</script>

<style></style>
