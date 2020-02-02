<template>
  <div id="sign" style="margin-top: 25px">
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="16" :md="8" :lg="6" :xl="6">
        <card>
          <sign-in-form @sign_in="redirectTo"></sign-in-form>
          <a
            :href="getTpAuthUrl('gh', '/')"
            class="iconfont icon-github-fill"
          ></a>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SignInForm from "@/components/user/SignInForm.vue";
import { getTpAuthUrl } from "@/api/user.js";

export default {
  components: { SignInForm },
  methods: {
    redirectTo() {
      this.$router.replace(this.$route.query.redirect || "/");
    },
    getTpAuthUrl
  },
  computed: {
    // tpAuthUrl(type) {
    //   return getTpAuthUrl(type, "/");
    // }
  }
};
</script>

<style lang="stylus" scoped></style>
