<template>
  <div id="sign" style="margin-top: 25px">
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="16" :md="8" :lg="6" :xl="6">
        <card>
          <sign-in-form @sign_in="redirectTo"></sign-in-form>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SignInForm from "@/components/user/SignInForm.vue";

export default {
  components: { SignInForm },
  methods: {
    redirectTo() {
      this.$router.replace(this.$route.query.redirect || "/");
    }
  }
};
</script>

<style lang="stylus" scoped></style>
