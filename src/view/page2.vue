<template>
  <div class="app-container2">
    <h4 class="headtitle2">快捷入口</h4>
    <hr class="hrstyle2">
    <div class="box2">
      <el-card class="box-card2">
        <div class="iconstyle">
          <i class="el-icon-s-home"></i>
        </div>
        <div class="item2">
          <a :href="goPage(1)" target="_blank">项目库</a>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="iconstyle">
          <i class="el-icon-star-on"></i>
        </div>
        <div class=" item2">
          <a :href="goPage(2)" target="_blank">我的收藏</a>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="iconstyle">
          <i class="el-icon-pie-chart"></i>
        </div>
        <div class=" item2">
          <a :href="goPage(2)" target="_blank">进度上报</a>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="iconstyle">
          <i class="el-icon-chat-line-square"></i>
        </div>
        <div class=" item2">
          <a :href="goPage(2)" target="_blank">项目投资计划</a>
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
    goPage(val) {
      let url = ""
      switch (val) {
        case 1:
          url = global.host + '/yc/static/wsjrj/modeldisplay5/index.html';
          break;
        default:
          url = "https://www.baidu.com/"
      }
      // window.open(url, "blank");
      return url;
    },
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
.app-container2 {
  text-align: center; /*让div内部文字居中*/
  width: 400px;
  height: 300px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*border: 1px red solid;*/
}


.item2 {
  margin-top: -10px;
  font-size: 13px;
  font-weight: bolder;
}

.item2:hover {
  cursor: pointer
}

.box2 {
  text-align: left;
  margin: auto;
  height: auto;
  width: 100%;
  position: relative;
  /*overflow: auto;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.box-card2 {
  text-align: center;
  width: 35%;
  border-radius: 15px;
  height: 90px;
  /*overflow: hidden;*/
  /*margin: 10px;*/
  margin-bottom: 50px;
  max-height: 100px;
  background-color: rgba(242, 244, 247, 0.4);
}

.iconstyle {
  margin-bottom: 5px;
  margin-top: -13px;
  font-size: 40px;
  color: rgba(6, 90, 244, 0.79);
}

.headtitle2 {
  margin: 5px;
  left: -130px;
  position: relative;
  color: rgba(6, 90, 244, 0.79);
}

.hrstyle2 {
  float: left;
  width: 80px;
  left: 35px;
  position: relative;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}

a {
  text-decoration: none;
  color: #20010b;
}
</style>
