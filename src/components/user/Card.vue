<template>
  <card shadow="hover" :headerStyle="{ 'font-weight': 'bold' }">
    <template v-slot:header>关于作者</template>
    <div style="display: flex">
      <div class="avatar" style="padding-right:16px;">
        <el-avatar shape="square" size="small" :src="avatar"></el-avatar>
      </div>
      <div class="profile">
        <div class="username" style="font-weight:bold">
          <span>{{ name }}</span>
        </div>
        <div class="sign">{{ sign }}</div>
      </div>
    </div>
    <div class="links" style="margin:1rem 0 0">
      <a :href="`${BACK_URL}rss/u/${id}/blog/`" rel="alternate">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-rss" />
        </svg>
      </a>
    </div>
  </card>
</template>

<script>
const CONFIG = require("@/config/config.js");

export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      BACK_URL: CONFIG.back_url,
      username: "",
      nickname: "",
      avatar:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sign: "Just go go!!!"
    };
  },
  methods: {
    setData(id) {
      this.$api.user.userRetrieve(id).then(res => {
        this.username = res.data.username;
        this.nickname = res.data.nickname;
        this.avatar = res.data.avatar || this.avatar;
        this.sign = res.data.sign || this.sign;
      });
    }
  },
  watch: {
    id: function(new_id, old_id) {
      console.log(new_id, old_id, "变了");

      if (new_id && new_id != old_id) {
        this.setData(new_id);
      }
    }
  },
  computed: {
    name() {
      return this.nickname || this.username;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
