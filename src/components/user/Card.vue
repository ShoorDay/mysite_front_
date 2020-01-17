<template>
  <card
    shadow="hover"
    :bodyStyle="{
      display: 'flex'
    }"
    :headerStyle="{ 'font-weight': 'bold' }"
  >
    <template v-slot:header>关于作者</template>
    <div class="avatar" style="padding-right:16px;">
      <el-avatar shape="square" size="small" :src="avatar"></el-avatar>
    </div>
    <div class="profile">
      <div class="username" style="font-weight:bold">
        <span>{{ nickname || username }}</span>
      </div>
      <div class="sign">{{ sign }}</div>
    </div>
  </card>
</template>

<script>
export default {
  props: {
    id: {
      default: 3
    },
    username: {
      default: "sure"
    },
    nickname: {
      default: ""
    },
    avatar: {
      default:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    },
    sign: {
      default: "Just go go!!!"
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped></style>
