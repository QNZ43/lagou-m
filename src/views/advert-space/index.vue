<template>
  <div class="advert">
    <el-card class="box-card">
      <div class="clearfix">
        <el-button style="float: left; margin-bottom: 10px" @click="handleAdd()"
          >添加广告位</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="spacekey" width="150">
        </el-table-column>
        <el-table-column prop="name" label="广告位名称" width="180">
        </el-table-column>
        <el-table-column label="创建时间" width="280" prop="createTime">
        </el-table-column>
        <el-table-column label="更新时间" width="280" prop="updateTime">
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
import { getAllAdp } from "@/services/advert";
export default {
  name: "adp",
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
        name: "adp-edit",
        params: {
          id: rowData.id,
        },
      });
    },
    handleAdd (rowData) {
      // 设置跳转
      this.$router.push({
        name: "adp-create",
      });
    },
    // 获取所有菜单信息
    async loadAllAd () {
      const { data } = await getAllAdp();
      if (data.state == 1) {
        this.tableData = data.content;
      }
    },
  },
};
</script>

<style></style>
