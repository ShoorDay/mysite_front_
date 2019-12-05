<template>
  <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="auto">
    <el-form-item prop="username" label="用户名">
      <el-input v-model="form.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input placeholder="邮箱" v-model="form.email" clearable></el-input>
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
      <el-button type="success" round @click="onSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        nickname: "",
        logo: "",
        phone: "",
        test: this.$store.state.user
      },
      rules: {
        username: [
          { required: true, message: "用户名", trigger: "blur" },
          { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱", trigger: "blur" }],
        password: [{ required: true, message: "密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      const this_ = this;
      console.log(this.form);
      this.nickname = this.nickname || this.username;
      this.$api.user.signUp(this.form).then(
        res => {
          this_.$store.commit("user/authenticate", res.data);
        },
        err => {
          console.log(err);
          if(err.status == 201)
          this_.$store.commit("user/authenticate", err.data);
        }
      );
    }
  }
};
</script>

<style>
</style>