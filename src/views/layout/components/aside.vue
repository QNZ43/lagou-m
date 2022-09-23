<template>
  <div class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      router
      unique-opened
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/role">
            <i class="el-icon-documnet"></i>
            <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="/menu">
            <i class="el-icon-documnet"></i>
            <span>菜单列表</span></el-menu-item
          >
          <el-menu-item index="/resource">
            <i class="el-icon-documnet"></i>
            <span>资源列表</span></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert">
            <i class="el-icon-documnet"></i>
            <span>广告列表</span>
          </el-menu-item>
          <el-menu-item index="/advert-space">
            <i class="el-icon-documnet"></i>
            <span>广告位列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.aside {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  bottom: -35px;
  right: 18px;
  .el-menu {
    border-right: transparent;
    width: 200px;
  }
}
</style>
