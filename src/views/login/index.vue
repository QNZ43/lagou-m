<template>
  <div class="login">
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/user";
export default {
  data () {
    return {
      form: {
        phone: "18201288771",
        password: "111111",
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
      },
      // 用于保存加载状态
      isLoginLoading: false,
    };
  },
  methods: {
    async submitForm () {
      try {
        await this.$refs.form.validate();
        this.isLoginLoading = true;
        const { data } = await login(this.form);
        console.log(data);
        this.isLoginLoading = false;
        if (data.state === 1) {
          this.$message.success("登录成功");
          // 将用户信息存储到 Vuex 中
          this.$store.commit("setUser", data.content);
          // 根据可能存储的 redirect 数据进行跳转设置
          this.$router.push(this.$route.query.redirect || "/");
        } else {
          this.$message.error("登录失败");
        }
        // let routeUrl = this.$router.resolve({
        //   path: "/",
        // });
        // window.open(routeUrl.href, "_blank");
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log("没有通过校验");
      }
    },
    resetForm (form) {
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 1280px;
  height: 100vh;
  background-color: rgb(182, 210, 249);
  margin: -8px;
  .form {
    width: 350px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    top: 30vh;
    background-color: rgb(201, 220, 240);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 35px;
  }
}
</style>
