<template>
  <div class="cd">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="广告名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置:">
        <el-input placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="开始时间:" prop="startTimeFormatString">
        <el-date-picker
          type="datetime"
          :value="form.startTimeFormatString"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:" prop="endTimeFormatString">
        <el-date-picker
          type="datetime"
          :value="form.endTimeFormatString"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线:">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">下线</el-radio>
          <el-radio :label="0">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片:" prop="img" class="upload">
        <img :src="form.img" width="150" height="100" />
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="广告链接:" prop="resource">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="广告备注:" prop="desc">
        <el-input type="textarea" v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')">提交</el-button>
        <el-button @click="resetForm('form')" v-if="isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdbyid, createAd } from "@/services/advert";
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
        spaceId: 0,
        keyword: "",
        htmlContent: "",
        text: "",
        img: "",
        link: "",
        startTime: "",
        endTime: "",
        createTime: "",
        updateTime: "",
        status: 0,
        priority: 0,
        startTimeFormatString: "",
        endTimeFormatString: "",
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
      const { data } = await createAd(this.form);
      if (data.state == "1") {
        this.$message.success("提交成功");
        this.$router.push({
          name: "advert",
        });
      }
    },
    async loadAdInfo () {
      // 检测是否存在路由参数 id, 并进行对应处理
      const id = this.$route.params.id || -1;
      // 请求菜单数据（上级菜单数据）

      const { data } = await getAdbyid(id);

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
