<template>
  <div class="app-container2">
<!--    <h4 class="headtitle2">快捷入口</h4>-->
<!--    <hr class="hrstyle2">-->
    <div class="box2">
      <el-card class="box-card2">
        <div @click="goPage(1)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-s-home"></i>
          </div>
          <div class="item2">
            项目库
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage(2)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-star-on"></i>
          </div>
          <div class=" item2">
            我的收藏
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage(3)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-pie-chart"></i>
          </div>
          <div class=" item2">
            项目进度汇总
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div @click="goPage(4)" style="cursor:pointer;">
          <div class="iconstyle">
            <i class="el-icon-chat-line-square"></i>
          </div>
          <div class=" item2">
            项目投资计划汇总
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
          url =  '/yc/formDesign/index.html#/listView/3f3c8ea8cc61f422d3a2c78e79f5dc34';
          window.parent.parent
              .tabAddAndShow(url, '项目库', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 2:
          url =  '/yc/formDesign/index.html#/listView/4ba5d2e9470b9da99708142b506832ad';
          window.parent.parent
              .tabAddAndShow(url, '我的收藏', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 3:
          url =  '/yc/formDesign/index.html#/listView/5401ef87acff81718eed4c5ebdd8d66f';
          window.parent.parent
              .tabAddAndShow(url, '进度上报', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
          break;
        case 4:
          url =  '/yc/formDesign/index.html#/listView/220bb5f19ba8ad040288bd272d7953cc';
          window.parent.parent
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
  margin: 0;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*border: 1px red solid;*/

}


.item2 {
  margin-top: -10px;
  font-size: 2vw;
  font-weight: bolder;
}

.item2:hover {
  cursor: pointer
}

.box2 {
  margin-top: 18px;
  text-align: left;
  width: 100%;
  height: 100%;
  position: relative;
  /*overflow: auto;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

}

.box-card2 {
  text-align: center;
  width: 45%;
  border-radius: 15px;
  height: 105px;
  /*overflow: hidden;*/
  /*margin: 10px;*/
  margin-bottom: 25px;
  /*max-height: 90px;*/
  background-color: rgba(242, 244, 247, 0.4);
}

.iconstyle {
  margin-bottom: 5px;
  margin-top: -13px;
  font-size: 10vw;
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
