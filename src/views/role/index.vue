<template>
  <div class="role">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
      <el-form-item label="输入搜索" prop="keywords">
        <el-input
          type="text"
          v-model="ruleForm.keywords"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="addrole">
      <el-button @click="handleAdd">添加角色</el-button>
      <el-dialog :visible.sync="dialogVisible" width="40%">
        <!-- 将添加与编辑功能单独封装到组件中 -->
        <create-or-edit
          :is-edit="isEdit"
          :role-id="roleId"
          @success="handleSuccess"
          @cancel="handleCancel"
        ></create-or-edit>
      </el-dialog>
    </div>
    <div class="list">
      <el-table :data="roles" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdTime" label="添加时间" />
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="
                  $router.push({
                    name: 'alloc-menu',
                    params: {
                      roleId: scope.row.id,
                    },
                  })
                "
                >分配菜单</el-button
              >
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CreateOrEdit from "./components/CreateOrEdit";
import { getRoles, deleteRole, getRoleById } from "@/services/role";
export default {
  name: "role",
  components: {
    CreateOrEdit,
  },
  created () {
    this.loadRoles();
  },
  data () {
    return {
      ruleForm: {
        keywords: "",
      },
      dialogVisible: false,
      // 控制对话框的功能状态
      isEdit: false,
      // 存储正在编辑的角色 ID
      roleId: "",
      roles: [],
    };
  },
  methods: {
    submitForm () {
      this.roles.forEach(async (item) => {
        if (item.name == this.ruleForm.keywords) {
          this.isLoading = true;
          this.roles = [];
          const { data: res } = await getRoleById(item.id);
          this.roles.push(res.data);
          this.isLoading = false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    handleAdd () {
      this.dialogVisible = true;
      this.isEdit = false;
    },
    // 监听子组件取消状态
    handleCancel () {
      this.dialogVisible = false;
    },
    // 监听子组件的添加状态，成功时触发
    handleSuccess () {
      // 隐藏对话框
      this.dialogVisible = false;
      // 刷新列表
      this.loadRoles();
    },
    handleEdit (role) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.roleId = role.id;
      console.log(role.id);
    },
    // 删除角色
    handleDelete (role) {
      this.$confirm(`确认删除角色：${role.name}？`, "删除提示")
        .then(async () => {
          await deleteRole(role.id);
          this.$message.success("删除成功");
          this.loadRoles();
        })
        .catch((err) => {
          if (err && err.response) {
            this.$message.error("删除失败，请重试");
          } else {
            this.$message.info("取消删除");
          }
        });
    },
    async loadRoles () {
      this.isLoading = true;
      const { data } = await getRoles(this.ruleForm);
      this.roles = data.data.records;
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.role {
  .el-form {
    width: 300px;
    margin-top: 30px;
    .btn {
      position: absolute;
      top: 90px;
      right: 80px;
    }
  }
  .addrole {
    position: absolute;
    top: 135px;
    right: 100px;
  }
  .list {
    position: relative;
    top: 50px;
  }
}
</style>
