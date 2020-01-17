<template>
  <div>
    <slot v-if="ShowForOwner"></slot>
    <slot name="for_others" v-else></slot>
  </div>
</template>

<script>
export default {
  name: "ShowForOwner",
  props: {
    owner_id: {
      required: true
    }
  },
  computed: {
    ShowForOwner() {
      if (
        this.$store.state.user.is_authenticated &&
        this.owner_id == this.$store.state.user.user_id
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style></style>
