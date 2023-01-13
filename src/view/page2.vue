<template>
  <div class="app-container2">
    <h4 class="headtitle2">快捷入口</h4>
    <hr class="hrstyle2">
    <div class="box2">
      <el-card class="box-card2">
        <a :href="goPage(1)" target="_blank">
          <div class="iconstyle">
            <i class="el-icon-s-home"></i>
          </div>
          <div class="item2">
            项目库
          </div>
        </a>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage2(2)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-star-on"></i>
          </div>
          <div class=" item2">
            我的收藏
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage2(3)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-pie-chart"></i>
          </div>
          <div class=" item2">
            进度上报
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage2(4)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-chat-line-square"></i>
          </div>
          <div class=" item2">
            项目投资计划
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
  name: 'page2',
  data() {
    return {
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
  },
  watch: {},
  methods: {
    goPage(val) {
      let url = ""
      switch (val) {
        case 1:
          url = global.host + '/yc/static/wsjrj/modeldisplay5/index.html';
          break;
        case 2:
          url = global.host + '/yc/formDesign/index.html#/listView/45c0a2343fdd7b5ec6dc986bc867e54b';
          break;
        case 3:
          url = global.host + '/yc/formDesign/index.html#/listView/5bb968f4e8e4de4962dea469830162f3';
          break;
        case 4:
          url = global.host + '/yc/formDesign/index.html#/listView/f0e00b876f12cc7fe70a12009c813e2b';
          break;
        default:
          url = "https://www.baidu.com/"
      }
      return url;
    },
    goPage2(val) {
      let url = ""
      switch (val) {
        case 1:
          url = global.host + '/yc/formDesign/index.html#/formView/6e8c83a80c455af5a73eeba93308481e';
          window.parent
              .tabAddAndShow(url, '项目库', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 2:
          url = global.host + '/yc/formDesign/index.html#/listView/906e82661343b438fea7bb8f87d2dfb0';
          window.parent
              .tabAddAndShow(url, '我的收藏', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 3:
          url = global.host + '/yc/formDesign/index.html#/listView/5bb968f4e8e4de4962dea469830162f3';
          window.parent
              .tabAddAndShow(url, '进度上报', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 4:
          url = global.host + '/yc/formDesign/index.html#/listView/f0e00b876f12cc7fe70a12009c813e2b';
          window.parent
              .tabAddAndShow(url, '项目投资计划', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        default:
          url = "https://www.baidu.com/"
      }
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
<style scoped>
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
