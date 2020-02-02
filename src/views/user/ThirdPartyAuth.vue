<template>
  <div>
    登陆中
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
import jwt from "@/utils/jwt.js";

export default {
  created() {
    console.log(this.$route);
    let { code, state } = this.$route.query;
    let this_ = this;
    this.$api.user.tpAuth(code, state).then(
      res => {
        console.log(res);
        const payload = jwt.decode(res.data.access);
        window.localStorage.setItem("user_id", payload.user_id);
        window.localStorage.setItem("access", res.data.access);
        window.localStorage.setItem("refresh", res.data.refresh);
        // this.$router.replace(state.split(".")[1]);
      },
      err => {
        console.log(err);
        this_.$message.error("错误\n" + err.data);
      }
    );
    // this.$router.replace("/");
  }
};
</script>

<style></style>
