<template>
  <el-form ref="form" :model="form" :rules="rules" label-position="left">
    <el-form-item prop="username" label="用户名">
      <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="form.username" clearable></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        placeholder="密码"
        prefix-icon="el-icon-user"
        v-model="form.password"
        clearable
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="form.storageToken">十天内免登录</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="success" round @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import jwt from "@/utils/jwt.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        storageToken: true
      },
      rules: {
        username: [{ required: true, message: "用户名", trigger: "blur" }],
        password: [{ required: true, message: "密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      const this_ = this;
      this.$api.user.authenticate(
        { username: this.form.username, password: this.form.password }, {}
      ).then(
        res => {
          const payload = jwt.decode(res.data.access);
          window.localStorage.setItem("user_id", payload.user_id);
          window.localStorage.setItem("access", res.data.access);
          if (this_.form.storageToken) {
            window.localStorage.setItem("refresh", res.data.refresh);
          };
          this_.$emit("sign_in")
        },
        err => {
          this_.$message.error("用户名或者密码错误, 请仔细检查\n" + err.data);
        }
      );
    }
  }
};
</script>

<style>
</style>