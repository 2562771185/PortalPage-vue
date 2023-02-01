<template>
  <div class="app-container2">
    <h4 class="headtitle2">快捷入口</h4>
    <hr class="hrstyle2">
    <div class="box2">
      <el-card class="box-card2">
        <div @click="goPage(1)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-s-promotion"></i>
          </div>
          <div class="item2">
            项目信息上报
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage(2)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-s-home"></i>
          </div>
          <div class="item2">
            项目库
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage(3)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-pie-chart"></i>
          </div>
          <div class=" item2">
            进度上报
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage(4)" style="cursor:pointer;">
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
          url =  '/yc/workFlow/runtime/workFlowPage.do?showType=faqi&processId=b47be961d2324b78b21ea387db4f8d95&formType=3';
          window.parent
              .tabAddAndShow(url, '项目信息上报', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 2:
          url =  '/yc/formDesign/index.html#/listView/e7795d9252400b6f79b71f0ea2901036';
          window.parent
              .tabAddAndShow(url, '项目库', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 3:
          url =  '/yc/formDesign/index.html#/listView/5bb968f4e8e4de4962dea469830162f3';
          window.parent
              .tabAddAndShow(url, '进度上报', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 4:
          url =  '/yc/formDesign/index.html#/listView/d8a9775c4077cc9c5f0d5d23ecbbc903';
          window.parent
              .tabAddAndShow(url, '项目投资计划', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        default:
          url =  "/yc/portal/loginPortal/afterLogin.do"
      }
    },
  }
}
</script>
<style scoped>
.app-container2 {
  width: 92%;
  height: 92%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  left: 40px;
  top: 10px;
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
