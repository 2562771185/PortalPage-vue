<template>
  <div class="index">
    <h4 class="headtitle">项目上报信息</h4>
    <hr class="hrstyle">
    <div class="box">
      <div class="box2">
        <el-badge :value="this.total0" :max="99" class="item">
          <el-button size="small" @click="getList(1,10,-1)">我创建的项目</el-button>
        </el-badge>
        <el-badge :value="this.total1" :max="99" class="item">
          <el-button size="small" :max="99" @click="getList(1,10,0)">待上报的项目</el-button>
        </el-badge>
        <el-badge :value="this.total2" :max="99" class="item">
          <el-button size="small" @click="getList(1,10,1)">待审核的项目</el-button>
        </el-badge>
        <el-badge :value="this.total3" :max="99" class="item">
          <el-button size="small" @click="getList(1,10,2)">已审核的项目</el-button>
        </el-badge>
        <el-badge :value="this.total4" :max="99" class="item">
          <el-button size="small" @click="goUnread()">未读公告</el-button>
        </el-badge>
        <el-badge :value="this.total5" :max="99" class="item">
          <el-button size="small" @click="goRead()">已读公告</el-button>
        </el-badge>
        <el-badge :value="this.total6" :max="99" class="item">
          <el-button size="small" @click="goCancel()">取消发布公告</el-button>
        </el-badge>
      </div>
      <hr>
      <el-table
          :data="tableData"
          style="width: 100%;min-height: 450px"
          max-height="450"
      >
        <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="流程名称"
        >
          <template slot-scope="scope">
            <el-link type="primary"
                     @click="getDetail(scope.row.businessid,scope.row.processid,scope.row.instanceid,scope.row.instancetitle)">
              {{ scope.row.instancetitle }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="创建人"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="date"
            align="center"
            label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ scope.row.createtime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="状态">
          <template slot-scope="scope">
            <el-tag :type="statusStyle(scope.row.runstatus)">{{ scope.row.runstatus }}</el-tag>
          </template>
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
import request from "@/utils/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page6',
  data() {
    return {
      tableData: [],
      current: -1,
      pageNum: 1,
      pageSize: 10,
      total: 100,
      total0: 100,
      total1: 100,
      total2: 100,
      total3: 100,
      total4: 100,
      total5: 100,
      total6: 100,
    }
  },
  mounted() {
  },
  created() {
    this.getList(1, 10, -1)
    this.getCounts()
  },
  watch: {},
  methods: {
    goUnread() {
      let id = '3fd61d120be975f1fd4168a07a798f02'
      let url = '/yc/formDesign/index.html#/listView/' + id;
      window.parent.tabAddAndShow(url, "未读公告", id, false, '', 1);
    },
    goRead() {
      let id = '36d06918b7a7860d9a9b8f5c77a9cde4'
      let url = '/yc/formDesign/index.html#/listView/' + id;
      window.parent.tabAddAndShow(url, "已读公告", id, false, '', 1);
    },
    goCancel() {
      let id = 'c8b41fd87bcf9fb500031b9229707705'
      let url = '/yc/formDesign/index.html#/listView/' + id;
      window.parent.tabAddAndShow(url, "取消发布公告", id, false, '', 1);
    },
    getDetail(bid, pid, insid, name) {
      let url = `/yc/workFlow/runtime/workFlowPage.do?processId=${pid}&businessId=${bid}&formType=3&showType=faqi&formId=${insid}`;
      window.parent.tabAddAndShow(url, name, bid, false, '', 1);
    },
    statusStyle(val) {
      switch (val) {
        case '待上报':
          return ''
        case '待审核':
          return 'warning'
        case '已审核入库':
          return 'success'
      }
      return '';
    },
    getList(pageNum, pageSize, val) {
      // this.total = 0
      this.current = val
      this.pageNum = pageNum
      this.pageSize = pageSize
      request.get("/process/list?pageNum=" + pageNum + "&pageSize=" + pageSize + "&status=" + this.current).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    getCounts() {
      request.get("/process/counts").then(res => {
        this.total0 = res.result.count1
        this.total1 = res.result.count2
        this.total2 = res.result.count3
        this.total3 = res.result.count4
      })
      request.get("/notice/counts").then(res => {
        this.total4 = res.result.count1
        this.total5 = res.result.count2
        this.total6 = res.result.count3
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      console.log(`当前页: ${val}`);
      this.getList(this.pageNum, this.pageSize, this.current)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.pageNum = 1
      this.getList(this.pageNum, this.pageSize, this.current)
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
  top: 10px;
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
  width: 100%;
  height: auto;
  margin-bottom: 3px;
  /*overflow: auto;*/
  /*border: 1px red solid;*/
}

.box2 {
  width: 100%;
  margin: 5px;
  /*border: 1px red solid;*/
}

.page {
  text-align: center;
}

</style>
