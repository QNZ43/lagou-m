<template>
  <div class="director">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in breadList"
        :key="index"
        >{{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <el-avatar
          :size="size"
          :src="
            userInfo.portrait ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar
        ><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from "@/services/user";
export default {
  name: "director",
  created () {
    // 加载用户信息
    this.loadUserInfo();
    // 下面是为了进行功能测试演示
    // this.loadUserInfo();
    this.getBreadcrumb();
  },
  data () {
    return {
      userInfo: {},
      breadList: [],
    };
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb () {
      console.log(this.$route.matched); // 可以获取上下文路由 也就是可以获取父亲和孩子路由组成的数组
      if (Object.keys(this.$route.matched[0].meta).length > 0) {
        this.breadList = this.$route.matched;
      } else {
        this.breadList = [];
      }
    },
    // 加载用户信息功能
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.content;
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log(err);
      }
    },
    // 退出功能
    handleLogout () {
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 1. 清除 store 中的用户的信息
          this.$store.commit("setUser", null);
          // 2. 跳转登录页
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.director {
  .el-dropdown {
    position: absolute;
    top: -1px;
    right: 40px;
    .el-avatar {
      position: relative;
      top: 10px;
    }
  }
}
</style>
