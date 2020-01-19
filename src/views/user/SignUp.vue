<template>
  <div id="sign" style="margin-top: 25px">
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="10" :md="8" :lg="6" :xl="6">
        <card>
          <sign-up-form></sign-up-form>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SignUpForm from "@/components/user/SignUpForm.vue";

export default {
  components: { SignUpForm }
};
</script>

<style lang="stylus" scoped></style>
