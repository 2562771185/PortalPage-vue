<template>
  <div class="index">
    <h4 class="headtitle">项目上报信息</h4>
    <hr class="hrstyle">
    <div class="box">
      <div class="box2">
        <el-badge :value="12" class="item" >
          <el-button size="small" @click="getList(-1)">我创建的项目</el-button>
        </el-badge>
        <el-badge :value="12" class="item" >
          <el-button size="small" @click="getList(0)">待上报的项目</el-button>
        </el-badge>
        <el-badge :value="12" class="item" >
          <el-button size="small" @click="getList(1)">待审核的项目</el-button>
        </el-badge>
        <el-badge :value="12" class="item" >
          <el-button size="small" @click="getList(2)">已审核的项目</el-button>
        </el-badge>
      </div>
      <hr>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            type="index"
            label="序号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称"
            width="280">
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.instancetitle }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="创建人名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="date"
            width="220"
            label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ scope.row.createtime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import MyOverLay from "@/components/MyOverLay";
import request from "@/utils/request";

export default {
  name: 'page6',
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 100,
    }
  },
  mounted() {
  },
  created() {
    this.getList(-1)
  },
  watch: {},
  methods: {
    getList(val) {
      request.get("/process/list?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&status="+val).then(res => {
        console.log(res)
        this.tableData = res.result.list
        this.total = res.result.total
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      // console.log(`当前页: ${val}`);
      this.getList(this.pageNum, this.pageSize)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.pageNum = 1
      this.getList(this.pageNum, this.pageSize)
    },
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  font-weight: bold;
}

.item {
  margin-right: 30px;
}

.headtitle {
  margin: 5px;
  position: relative;
  left: 7px;
  color: rgba(6, 90, 244, 0.79);
}

.hrstyle {
  float: left;
  width: 100px;
  position: relative;
  left: 10px;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}

.box {
  margin-top: 35px;
  width: 1100px;
  height: auto;
  margin-bottom: 3px;
  /*border: 1px red solid;*/
}

.box2 {
  width: 600px;
  margin: 5px;
  /*border: 1px red solid;*/
}

</style>
