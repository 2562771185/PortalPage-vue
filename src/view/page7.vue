<template>
  <div class="index">
    <h1 style="text-align: center">西乡塘区“项目为王”重大项目库进展表</h1>
    <el-button
        type="warning"
        style="float: right;margin-right: 20px;width: 100px;"
        @click="exportProjectInfoAllPage"
    >导出全部
    </el-button>
    <el-button
        type="success"
        style="float: right;margin-right: 10px;width: 100px;"
        @click="exportProjectInfoCurPage"
    >导出当前页
    </el-button>
    <span style="margin-left: 5px;margin-right: 10px">选择查询年月份</span>
    <el-date-picker
        v-model="date"
        type="month"
        value-format="yyyy-MM"
        :default-value="this.date"
        placeholder="选择年月">
    </el-date-picker>
    <el-button
        style="margin-left: 10px"
        type="primary"
        :disabled="this.date == null"
        @click="getList(pageNum,pageSize)"
    >搜索
    </el-button>
    <hr>
    <el-table
        :data="tableData"
        style="width: 100%;min-height: 500px"
        max-height="550"
        border
    >
      <el-table-column
          type="index"
          label="序号"
          align="center"
          fixed
          width="50">
      </el-table-column>
      <!--      todo 设置样式-->
      <el-table-column
          prop="zyx"
          width="100"
          fixed
          align="center"
          label="重要性"
      >
      </el-table-column>
      <el-table-column
          prop="lxld"
          label="联系领导"
          fixed
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
          <el-link type="primary">{{ scope.row.xmmc }}</el-link>
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
          label="计划总投资">
        <template slot-scope="scope">
          <el-tag effect="plain">
            {{ scope.row.ztz }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="bjdtzjesum"
          align="center"
          width="120"
          label="本年度计划投资">
        <template slot-scope="scope">
          <el-tag effect="plain">
            {{ scope.row.bjdtzjesum }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="kgjg"
          align="center"
          width="150"
          label="本年度计划开/竣工月份">
      </el-table-column>
      <el-table-column
          prop="jdmb"
          align="center"
          width="200"
          label="本年度工作进度目标">
      </el-table-column>
      <el-table-column
          prop="bndljwctz"
          align="center"
          width="120"
          label="1-12月完成投资">
        <template slot-scope="scope">
          <el-tag effect="plain">
            {{ scope.row.bndljwctz }}
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
              :type="tagType2(scope.row.xmcj)"
          >{{ scope.row.xmcj }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="qtdw"
          align="center"
          width="120"
          label="牵头单位">
      </el-table-column>
      <el-table-column
          prop="zrdw"
          align="center"
          width="120"
          label="责任单位">
      </el-table-column>
      <el-table-column
          prop="tbdw"
          align="center"
          width="120"
          label="填报单位">
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
  name: 'page7',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100,
      date: '2023-01',
      tableData: []
    }
  },
  created() {
    this.date = this.getNowFormatDate()
    this.getList(1, 10)
  },
  methods: {
    exportProjectInfoCurPage() {
      const a = document.createElement('a')
      a.setAttribute('download', name)
      // a.setAttribute('target', '_blank')
      let url = global.host + '/yc/sso/exportProjectInfo?pageNum=' + this.pageNum + "&pageSize=" + this.pageSize
          + "&date=" + this.date
      a.setAttribute('href', url)
      a.click()
    },
    exportProjectInfoAllPage() {
      const a = document.createElement('a')
      a.setAttribute('download', name)
      // a.setAttribute('target', '_blank')
      let url = global.host + '/yc/sso/exportProjectInfo?pageNum=' + -1 + "&pageSize=" + -1
          + "&date=" + this.date
      a.setAttribute('href', url)
      a.click()
    },
    getList(pageNum, pageSize) {
      // this.total = 0
      this.pageNum = pageNum
      this.pageSize = pageSize
      request.get("/project-info/page?pageNum=" + pageNum + "&pageSize=" + pageSize
          + "&date=" + this.date).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total
      }).catch(error => {
        console.log(error)
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
          return 'info';
        case
        '旧城改造项目':
          return 'warning';
        case
        '新开自治区级项目':
          return 'danger';
        default:
          return '';
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
