<template>
  <div
    class="card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow'"
  >
    <div
      class="card-header"
      v-if="$slots.header || header"
      :style="headerStyle"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="card-body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    header: {},
    bodyStyle: {},
    headerStyle: {},
    shadow: {
      type: String
    }
  }
};
</script>
