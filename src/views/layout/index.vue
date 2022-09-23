<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Director></Director>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./components/aside.vue";
import Director from "./components/director.vue";
export default {
  components: {
    Aside,
    Director,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.layout {
  height: 577px;
  width: 1280px;
  margin: -8px;

  .el-container {
    width: 100%;
    height: 100%;

    .el-header {
      background-color: #a2b6d1;
      color: #333;
      text-align: center;
      line-height: 60px;
      padding-top: 20px;
      padding-left: 10px;
    }

    .el-aside {
      background-color: #1f4979;
      color: #333;
      text-align: center;
      line-height: 200px;
      height: 100%;
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 60px;
      height: 100%;
    }
  }
}
</style>
