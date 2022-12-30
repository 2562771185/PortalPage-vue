<template>
  <div class="app-container1">
    <h4 class="headtitle1">项目信息</h4>
    <hr class="hrstyle1">
    <div class="box">
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-star-on"></i>我参与的项目</span>
        </div>
        <div class="text item">
          50
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-release"></i>申报超时</span>
        </div>
        <div class="text item">
          <div class="text"
          >12
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-cooperation"></i>批文超时</span>
        </div>
        <div class="text item">
          <div class="text"
          >23
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-error"></i>投资未达标</span>
        </div>
        <div class="text item">
          <div class="text"
          >43
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-finance"></i>批文预警</span>
        </div>
        <div class="text item">
          <div class="text"
          >1
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-data"></i>投资超额</span>
        </div>
        <div class="text item">
          <div class="text"
          >2
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>


<script>
import axios from 'axios'
import global from "@/common/Global";
import Cookies from 'js-cookie'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page1',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }],
      actionHost: global.host,
      msg: "",
      mytoken: null,
      pageNum: 1,
      pageSize: 8,
      total: 100,
      xmmc: "",
      xmyz: "",
      zrdw: "",
      xmcj: "",
    }
  },
  mounted() {
  },
  created() {
    var token = Cookies.get("access_token");
    this.mytoken = {Authorization: token}
    this.getPage(1, 8)
  },
  watch: {},
  methods: {
    getPage(num, size) {
      // axios.get(this.actionHost + '/yc/sso/xmxx/page?pageNum=' + num + "&pageSize=" + size +
      //     "&xmmc=" + this.xmmc + "&xmyz=" + this.xmyz + "&zrdw=" + this.zrdw + "&xmcj=" + this.xmcj).then(res => {
      //   this.tableData = res.data.result.list
      //   this.total = res.data.result.total
      // })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      // console.log(`当前页: ${val}`);
      this.getPage(this.pageNum, this.pageSize)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.pageNum = 1
      this.getPage(this.pageNum, this.pageSize)
    },
    searchKeyWord() {
      this.getPage(this.pageNum, this.pageSize)
    },
    clearSearch() {
      this.xmmc = ""
      this.xmcj = ""
      this.zrdw = ""
      this.xmyz = ""
      this.pageNum = 1
      this.getPage(1, this.pageSize)
    },
  }
}
</script>
<style>
.app-container1 {
  text-align: center; /*让div内部文字居中*/
  border-radius: 20px;
  width: 1100px;
  height: 350px;
  margin: auto;
  padding: 0;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text {
  font-size: 35px;
  font-weight: bolder;
  color: #20010b;
}

.item {
  margin-top: -18px;
}

.clearfix{
  margin-top: -12px;
  margin-bottom: 5px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box {
  margin: auto;
  height: auto;
  width: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-around;*/
}

.box-card {
  text-align: left;
  width: 25%;
  border-radius: 15px;
  height: 100px;
  overflow: hidden;
  padding: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  max-height: 110px;
  background-color: rgba(242, 244, 247, 0.4);
}

.title {
  margin: 0;
  padding: 0;
  position: absolute;
  font-size: 20px;
  font-family: 黑体;
  font-weight: bolder;
  color: rgba(6, 90, 244, 0.79);
}

.headtitle1 {
  margin: 5px;
  left: -490px;
  position: relative;
  color: rgba(6, 90, 244, 0.79);
}
.hrstyle1{
  float: left;
  left: 20px;
  position: relative;
  width: 80px;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}
</style>
