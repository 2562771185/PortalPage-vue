<template>
  <div class="index">
    <h1 style="text-align: center;margin-bottom: 40px">
      预警项目列表</h1>
    <div class="head">
      <span style="margin-left: 15px;margin-right: 10px">项目名称</span>
      <el-input v-model="searchName"
                placeholder="请输入项目名称"
                style="width: 200px;"
                :clearable="true"
      ></el-input>
      <el-button
          style="margin-left: 10px;"
          type="primary"
          @click="getList(pageNum,pageSize)"
      >查询
      </el-button>
    </div>
    <hr>
    <el-result icon="warning" title="暂无数据" subTitle="当前无数据或该项目不存在" style="text-align: center"
               v-if="this.tableData.length <= 0">
    </el-result>
    <el-table
        :data="tableData"
        style="width: 100%;min-height: 500px"
        max-height="550"
        border
        v-else
    >
      <el-table-column
          type="index"
          label="序号"
          align="center"
          fixed
          width="50">
      </el-table-column>
      <el-table-column
          prop="zyx"
          width="100"
          align="center"
          label="重要性"
      >
      </el-table-column>
      <el-table-column
          prop="lxld"
          label="联系领导"
          width="120"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="xmmc"
          align="center"
          width="200"
          fixed
          label="项目名称"
      >
        <template slot-scope="scope">
          <el-link type="primary" @click="goProjectDetail(scope.row.id,scope.row.xmmc)">{{ scope.row.xmmc }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="jsgmhnr"
          align="center"
          width="200"
          label="建设规模及内容">
      </el-table-column>
      <el-table-column
          prop="jsxz"
          width="120"
          align="center"
          label="建设性质">
        <template slot-scope="scope">
          <el-tag
              :type="tagType(scope.row.jsxz)"
          >{{ scope.row.jsxz }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="zjly"
          align="center"
          label="资金来源">
      </el-table-column>
      <el-table-column
          prop="jsksnx"
          align="center"
          label="建设起止年限">
      </el-table-column>
      <el-table-column
          prop="jsdz"
          align="center"
          width="200"
          label="项目所在地">
      </el-table-column>
      <el-table-column
          prop="ztz"
          align="center"
          label="计划总投资(万元)">
        <template slot-scope="scope">
          <el-tag effect="plain">
            {{ scope.row.ztz }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="bndxmzxjzqk"
          align="center"
          width="200"
          label="本年度项目最新进展情况">
      </el-table-column>
      <el-table-column
          prop="dqczdwthkn"
          align="center"
          width="200"
          label="当前存在的问题和困难">
      </el-table-column>
      <el-table-column
          prop="xybdgzjhhcs"
          align="center"
          width="200"
          label="下一步的工作计划及完成时限">
      </el-table-column>
      <el-table-column
          prop="xyldxt"
          align="center"
          width="200"
          label="需要领导协调和解决的问题及建议">
      </el-table-column>
      <el-table-column
          prop="xmyz"
          align="center"
          label="项目建设业主或意向业主">
      </el-table-column>
      <el-table-column
          prop="lxrdh"
          align="center"
          width="120"
          label="业主联系方式">
      </el-table-column>
      <el-table-column
          prop="xmcj"
          align="center"
          width="130"
          label="项目层级">
        <template slot-scope="scope">
          <el-tag
              v-for="i in scope.row.xmcj"
              :key="i"
              :type="tagType2(i)"
              v-show="i !== ''"
              style="margin-top: 5px"
          >{{ i }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="qtdw"
          align="center"
          width="200"
          label="牵头单位">
        <template slot-scope="scope">
          <el-tag effect="plain"
                  v-for="i in scope.row.qtdw"
                  :key="i"
                  v-show="i !== ''"
                  style="margin: 5px"
          >{{ i }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="zrdw"
          align="center"
          width="200"
          label="责任单位">
        <template slot-scope="scope">
          <el-tag effect="plain"
                  v-for="i in scope.row.zrdw"
                  :key="i"
                  v-show="i !== ''"
                  style="margin: 5px"
          >{{ i }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="tbdw"
          align="center"
          width="200"
          label="填报单位">
        <template slot-scope="scope">
          <el-tag effect="plain"
                  v-for="i in scope.row.tbdw"
                  :key="i"
                  v-show="i !== ''"
                  style="margin: 5px"
          >{{ i }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="phdw"
          align="center"
          width="200"
          label="配合单位">
                <template slot-scope="scope">
                  <el-tag effect="plain"
                          v-for="i in scope.row.phdw"
                          :key="i"
                          v-show="i !== ''"
                          style="margin: 5px"
                  >{{ i }}
                  </el-tag>
                </template>
      </el-table-column>
      <el-table-column
          prop="bz"
          align="center"
          width="150"
          label="备注">
      </el-table-column>
    </el-table>
    <!--    分页-->
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
</template>


<script>
import request from "@/utils/request";
import global from "@/common/Global.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'warningProjectList',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      date: '2023-01',
      searchName: '',
      projectLevel: '',
      projectLevelName: '',
      tableData: [],
      projectLevelList: [],
    }
  },
  created() {
    this.getList(1, 10)
  },
  methods: {
    getProjectLevelList() {
      request.get("/get-project-level").then(res => {
        this.projectLevelList = res.result
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取项目层级: ' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    // 跳转到详情卡片页
    goProjectDetail(id, name) {
      let url = '/yc/formDesign/index.html#/formView/2d4cf21fcdeab8e0b732f2a562c1f316?businessId=' + id;
      window.parent.parent.tabAddAndShow(url, name, id, false, '', 1);
    },
    refreshData() {
      this.searchName = ''
      this.date = this.getNowFormatDate()
      this.getList(1, 10)
    },
    getList(pageNum, pageSize) {
      if (this.date == null || this.date === "") {
        this.tableData = []
        return
      }
      this.pageNum = pageNum
      this.pageSize = pageSize
      request.get("/project/warninglist?pageNum=" + pageNum + "&pageSize=" + pageSize+ "&key=" + this.searchName).then(res => {
        this.tableData = res.result.list
        this.tableData.forEach(item => {
          item.xmcj = item.xmcj.split(',')
          item.zrdw = item.zrdw.split(',')
          item.qtdw = item.qtdw.split(',')
          item.tbdw = item.tbdw.split(',')
          item.phdw = item.phdw.split(',')
        })
        this.total = res.result.total
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败: ' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      console.log(`当前页: ${val}`);
      this.getList(this.pageNum, this.pageSize)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.pageNum = 1
      this.getList(this.pageNum, this.pageSize)
    },
    getNowFormatDate() {
      let date = new Date(),
          year = date.getFullYear(), //获取完整的年份(4位)
          month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
          strDate = date.getDate() // 获取当前日(1-31)
      if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
      if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
      return `${year}-${month}`
    },
    tagType(name) {
      switch (name) {
        case
        '续建类':
          return 'success';
        case
        '竣工投产类':
          return 'info';
        case
        '预备类':
          return 'warning';
        case
        '新开工类':
          return 'danger';
        default:
          return '';
      }
    },
    tagType2(name) {
      switch (name) {
        case
        '西乡塘区级项目':
          return 'success';
        case
        '南宁市级项目':
          return 'danger';
        case
        '旧城改造项目':
          return 'warning';
        case
        '自治区级项目':
          return '';
        default:
          return 'info';
      }
    },
  }

}
</script>
<style scoped>
.index {
  /*text-align: center;*/
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  font-weight: bold;
}

.page {
  margin-top: 10px;
  text-align: center;
}
</style>
