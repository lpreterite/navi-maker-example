<template>
  <el-card class="loginBox">
    <div slot="header">
      <el-popover
        style="float: right"
        placement="top-end"
        title="账号提示"
        width="200"
        trigger="click"
        content="账号随意，密码为八个零"
      >
        <i slot="reference" class="el-icon-info"></i>
      </el-popover>
      <div style="text-align: center">登录</div>
    </div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input type="password" v-model="formData.pwd"></el-input>
      </el-form-item>
      <div>
        <el-button
          type="primary"
          style="display: block; width: 100%"
          @click="submit()"
          >登录</el-button
        >
      </div>
    </el-form>
  </el-card>
</template>
<script>
import auth from "@/auth";
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        pwd: "",
      },
    };
  },
  methods: {
    submit(data = this.formData) {
      try {
        auth.login(data);
        this.$router.push("/");
      } catch (e) {
        this.$message.error(e.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.loginBox {
  margin: 25vh auto;
  width: 400px;
}
</style>
