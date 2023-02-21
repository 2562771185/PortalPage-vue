<template>
  <div class="index">
    <h1 style="text-align: center;margin-bottom: 40px">
      {{ date.substring(0, 4) }}年{{ date.substring(5) }}月重大项目报表</h1>
    <el-button
        type="warning"
        style="float: right;margin-right: 20px;width: 100px;"
        @click="exportProjectInfo('全部')"
        :disabled="this.date == null"
    >导出全部
    </el-button>
    <el-button
        type="success"
        style="float: right;margin-right: 10px;width: 100px;"
        @click="exportProjectInfo('本页')"
        :disabled="this.date == null && this.tableData.length < 1"
    >导出当前页
    </el-button>
    <span style="margin-left: 5px;margin-right: 10px">选择查询日期</span>
    <el-date-picker
        v-model="date"
        type="month"
        value-format="yyyy-MM"
        :default-value="this.date"
        @change="getList(pageNum,pageSize)"
        placeholder="选择年月">
    </el-date-picker>
    <span style="margin-left: 15px;margin-right: 10px">项目名称</span>
    <el-input v-model="searchName"
              placeholder="请输入项目名称"
              style="width: 200px;"
              :clearable="true"
              @change="getList(pageNum,pageSize)"
    ></el-input>
    <!--    <span style="margin-left: 15px;margin-right: 10px">项目层级</span>-->
    <!--    <el-select v-model="projectLevel" filterable disabled  placeholder="请选择项目层级"-->
    <!--               @change="getList(pageNum,pageSize)"-->
    <!--    >-->
    <!--      <el-option-->
    <!--          v-for="item in projectLevelList"-->
    <!--          :key="item.id"-->
    <!--          :label="item.mc"-->
    <!--          :value="item.id"-->
    <!--      >-->
    <!--      </el-option>-->
    <!--    </el-select>-->
    <el-button
        style="float: right;margin-right: 0;"
        type="primary"
        @click="refreshData"
    >刷新
    </el-button>
    <hr>
    <el-result icon="warning" title="暂无数据" subTitle="当前日期无数据或该项目不存在" style="text-align: center"
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
          prop="xmmc"
          width="200"
          fixed
          align="center"
          label="项目名称"
      >
        <template slot-scope="scope">
          <el-link class="tagClass" type="primary" @click="goProjectDetail(scope.row.id,scope.row.xmmc)">{{ scope.row.xmmc }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="jsxz"
          label="建设性质"
          fixed
          width="120"
          align="center"
      >
        <template slot-scope="scope">
          <el-tag class="tagClass"
              :type="tagType(scope.row.jsxz)"
          >{{ scope.row.jsxz }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="ztz"
          align="center"
          width="200"
          fixed
          label="总投资(万元)"
      >
        <template slot-scope="scope">
          <el-tag effect="plain" class="tagClass">
            {{ scope.row.ztz }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="bjdtzjesum"
          align="center"
          width="200"
          :label="label1">
        <template slot-scope="scope">
          <el-tag effect="plain" class="tagClass">
            {{ scope.row.bjdtzjesum }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="bytzje"
          width="120"
          align="center"
          :label="label2">
        <template slot-scope="scope" >
          <el-tag effect="plain" class="tagClass">
            {{ scope.row.bytzje }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="bndljtzje"
          align="center"
          width="200"
          :label="label3">
        <template slot-scope="scope">
          <el-tag effect="plain" class="tagClass">
            {{ scope.row.bndljtzje }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="qtdw"
          align="center"
          width="200"
          label="牵头单位">
        <template slot-scope="scope">
          <el-tag effect="plain" class="tagClass"
                  v-for="i in scope.row.qtdw"
                  :key="i"
                  v-show="i !== ''"
                  style="margin: 5px"
          >{{ i }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="cylb"
          align="center"
          width="200"
          label="产业类别">
      </el-table-column>
      <el-table-column
          prop="fwddz"
          align="center"
          label="服务队长">
      </el-table-column>
      <el-table-column
          prop="bjdtzjesum"
          align="center"
          width="120"
          label="完成比例">
        <template slot-scope="scope">
          <el-tag type="danger" effect="plain" class="tagClass">
            {{ scope.row.wcbl }}
          </el-tag>
        </template>
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
  name: 'page8',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100,
      date: '2023-01',
      label1: '',
      label2: '2023-01',
      label3: '2023-01',
      searchName: '',
      projectLevel: '',
      tableData: [],
      projectLevelList: [],
    }
  },
  created() {
    this.date = this.getNowFormatDate()
    this.getList(1, 10)
    this.label1 = this.date.substring(0, 4) + "年度计划投资(万元)"
    this.label2 = this.date.substring(5) + "月完成投资(万元)"
    this.label3 = this.date.substring(0, 4) + "年1-12月累计完成投资(万元)"
  },
  methods: {
    selectLevel(level) {
      // console.log(level)
      this.projectLevel = level
    },
    // 跳转到详情卡片页
    goProjectDetail(id, name) {
      let url = '/yc/formDesign/index.html#/formView/2d4cf21fcdeab8e0b732f2a562c1f316?businessId=' + id;
      window.parent.parent.tabAddAndShow(url, name, id, false, '', 1);
    },
    // 导出excel
    exportProjectInfo(type) {
      if (this.tableData.length <= 0) {
        this.$message({
          type: 'warning',
          message: '无数据,无法导出!'
        });
        return
      }
      let msg = "确认导出" + type + "数据吗？";
      let url = '';
      if (this.date != null && this.date !== "") {
        msg = msg + '导出日期为：' + this.date
        // if (this.searchName != null && this.searchName !== "") {
        //   msg += "，项目名称为：" + this.searchName
        // }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定导出',
          cancelButtonText: '取消导出',
          type: 'warning'
        }).then(() => {
          if (type === '本页') {
            url = global.host + '/yc/sso/exportStatementInfo?pageNum=' + this.pageNum + "&pageSize=" + this.pageSize
                + "&date=" + this.date + "&key=" + this.searchName
          } else {
            url = global.host + '/yc/sso/exportStatementInfo?pageNum=' + -1 + "&pageSize=" + -1
                + "&date=" + this.date + "&key=" + this.searchName
          }
          const a = document.createElement('a')
          a.setAttribute('download', name)
          a.setAttribute('href', url)
          a.setAttribute("target","_blank")
          a.click()
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });
        });
      } else {
        this.$message({
          type: 'error',
          message: '未选择日期,无法导出!'
        });
      }
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
      request.get("/statement-info/page?pageNum=" + pageNum + "&pageSize=" + pageSize
          + "&date=" + this.date + "&key=" + this.searchName).then(res => {
        this.tableData = res.result.list
        this.tableData.forEach(item => {
          item.qtdw = item.qtdw.split(',')
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
.tagClass{
  /*font-size: 1vw;*/
}
</style>
