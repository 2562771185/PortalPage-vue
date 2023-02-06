<template>
  <div class="index">
    <h1 style="text-align: center;margin-bottom: 40px">
      {{ date.substring(0, 4) }}年{{ date.substring(5) }}月西乡塘区“项目为王”重大项目库进展表</h1>
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
    <span style="margin-left: 15px;margin-right: 10px">项目层级</span>
    <el-select v-model="projectLevel" filterable placeholder="请选择项目层级"
               @change="getList(pageNum,pageSize)"
               clearable
    >
      <el-option
          v-for="item in projectLevelList"
          :key="item.id"
          :label="item.mc"
          :value="item.id"
      >
      </el-option>
    </el-select>
    <!--    <el-select v-model="projectLevel"-->
    <!--               multiple-->
    <!--               filterable-->
    <!--               allow-create-->
    <!--               default-first-option-->
    <!--               placeholder="请选择项目层级"-->
    <!--               @change="getList(pageNum,pageSize)"-->
    <!--               style="width: 300px;">-->
    <!--      <el-option-->
    <!--          v-for="item in projectLevelList"-->
    <!--          :key="item.id"-->
    <!--          :label="item.mc"-->
    <!--          :value="item.id">-->
    <!--      </el-option>-->
    <!--    </el-select>-->
    <!--    <el-button-->
    <!--        style="margin-left: 10px"-->
    <!--        type="primary"-->
    <!--        :disabled="this.date == null"-->
    <!--        @click="findData()"-->
    <!--    >搜索-->
    <!--    </el-button>-->
    <el-button
        style="margin-left: 10px"
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
      searchName: '',
      projectLevel: '',
      tableData: [],
      projectLevelList: [],
    }
  },
  created() {
    let level = this.$route.query.level
    if (level != null && level !== '') {
      this.selectLevel(level)
    }
    this.getProjectLevelList()
    this.date = this.getNowFormatDate()
    this.getList(1, 10)
  },
  methods: {
    selectLevel(level) {
      // console.log(level)
      this.projectLevel = level
    },
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
      window.parent.tabAddAndShow(url, name, id, false, '', 1);
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
        if (this.searchName != null && this.searchName !== "") {
          msg += "，项目名称为：" + this.searchName
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定导出',
          cancelButtonText: '取消导出',
          type: 'warning'
        }).then(() => {
          if (type === '本页') {
            url = global.host + '/yc/sso/exportProjectInfo?pageNum=' + this.pageNum + "&pageSize=" + this.pageSize
                + "&date=" + this.date + "&key=" + this.searchName + "&level=" + this.projectLevel
          } else {
            url = global.host + '/yc/sso/exportProjectInfo?pageNum=' + -1 + "&pageSize=" + -1
                + "&date=" + this.date + "&key=" + this.searchName + "&level=" + this.projectLevel
          }
          const a = document.createElement('a')
          a.setAttribute('download', name)
          console.log(url)
          a.setAttribute('href', url)
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
      this.projectLevel = []
      this.getList(1, 10)
    },
    createStateFilter() {
      return (state) => {
        for (let i = 0; i < this.projectLevel.length; i++) {
          if (state.xmcj.indexOf(this.projectLevel[i]) !== -1) {
            return true;
          }
        }
        return false;
      };
    },
    getList(pageNum, pageSize) {
      if (this.date == null || this.date === "") {
        this.tableData = []
        return
      }
      this.pageNum = pageNum
      this.pageSize = pageSize
      request.get("/project-info/page?pageNum=" + pageNum + "&pageSize=" + pageSize
          + "&date=" + this.date + "&key=" + this.searchName + "&level=" + this.projectLevel).then(res => {
        this.tableData = res.result.list
        this.tableData.forEach(item => {
          item.xmcj = item.xmcj.split(',')
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
