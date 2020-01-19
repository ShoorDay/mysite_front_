<template>
  <div>
    <cate-edit
      :owner="$store.state.user.user_id"
      :draggable="true"
      :editable="true"
    ></cate-edit>
  </div>
</template>

<script>
import CateEdit from "@/components/editor/CateEdit.vue";
export default {
  components: { CateEdit }
};
</script>

<style></style>
