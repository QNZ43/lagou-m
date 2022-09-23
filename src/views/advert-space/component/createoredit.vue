<template>
  <div class="cd">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="广告位名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdpbyid, createAdp } from "@/services/advert";
export default {
  name: "cd",
  // 通过 props 接收父组件传值，判断当前是哪种功能（添加或编辑）
  props: {
    isEdit: {
      type: Boolean,
      // 默认为添加功能
      default: false,
    },
  },
  data () {
    return {
      // 表单数据
      form: {
        id: 0,
        name: "",
      },
      // 存储上级菜单数据
      parentMenuList: [],
    };
  },
  created () {
    // 加载上级菜单信息
    this.loadAdInfo();
  },
  methods: {
    async submit () {
      // 1. 表单验证
      // 2. 发送请求
      const { data } = await createAdp(this.form);
      if (data.state == "1") {
        this.$message.success("提交成功");
        this.$router.push({
          name: "advert-space",
        });
      }
    },
    async loadAdInfo () {
      // 检测是否存在路由参数 id, 并进行对应处理
      const id = this.$route.params.id || -1;
      // 请求菜单数据（上级菜单数据）

      const { data } = await getAdpbyid(id);

      if (data.state == 1) {
        // 将上级菜单数据保存，进行数据绑定
        // this.parentMenuList = data.data.parentMenuList;
        // 检测是否存在菜单数据 menuInfo，如果存在，更新给 form 即可
        if (data.content) {
          this.form = data.content;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 60%;
  height: 400px;
  margin: 100px 150px;
  .upload {
    display: flex;
    .el-load {
      width: 150px;
      height: 100px;
    }
  }
}
</style>
