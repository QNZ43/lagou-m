<template>
  <div class="advert">
    <el-card class="box-card">
      <div class="clearfix">
        <el-button style="float: left; margin-bottom: 10px" @click="handleAdd()"
          >添加广告</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" width="100"> </el-table-column>
        <el-table-column prop="name" label="广告名称" width="120">
        </el-table-column>
        <el-table-column prop="position" label="广告位置" width="130"
          >暂无
        </el-table-column>
        <el-table-column label="广告图片" width="230">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" width="200" height="150" />
          </template>
        </el-table-column>
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.startTimeFormatString }}</p>
            <p>{{ scope.row.endTimeFormatString }}</p>
          </template>
        </el-table-column>
        <el-table-column label="上线/下线" width="120">
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.status"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllAd } from "@/services/advert";
export default {
  name: "ad",
  data () {
    return {
      tableData: [],
    };
  },
  created () {
    this.loadAllAd();
  },
  methods: {
    handleEdit (rowData) {
      // 设置跳转
      this.$router.push({
        name: "ad-edit",
        params: {
          id: rowData.id,
        },
      });
    },
    handleAdd (rowData) {
      // 设置跳转
      this.$router.push({
        name: "ad-create",
      });
    },
    // 获取所有菜单信息
    async loadAllAd () {
      const { data } = await getAllAd();
      if (data.state == 1) {
        this.tableData = data.content;
      }
    },
  },
};
</script>

<style></style>
