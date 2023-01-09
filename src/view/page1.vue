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
          <span class="title"><i class="el-icon-s-check"></i>开工项目</span>
        </div>
        <div class="text item">
          <div class="text"
          >23
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-claim"></i>竣工项目</span>
        </div>
        <div class="text item">
          <div class="text"
          >43
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-finance"></i>投资未达标</span>
        </div>
        <div class="text item">
          <div class="text"
          >1
          </div>
        </div>
      </el-card>
      <el-card  class="box-card">
        <div slot="header" class="clearfix">
          <span class="title"><i class="el-icon-s-flag"></i>投资超额</span>
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
      actionHost: global.host,
      msg: "",
      mytoken: null,
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

  }
}
</script>
<style scoped>
.app-container1 {
  text-align: center; /*让div内部文字居中*/
  border-radius: 20px;
  width: 900px;
  height: 300px;
  padding: 0;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*border: 1px red solid;*/
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
  /*overflow: auto;*/
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-around;*/
}

.box-card {
  text-align: left;
  width: 28%;
  border-radius: 15px;
  height: 100px;
  /*overflow: hidden;*/
  padding: 5px;
  margin-left: 30px;
  margin-bottom: 30px;
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
  left: -375px;
  position: relative;
  color: rgba(6, 90, 244, 0.79);
}
.hrstyle1{
  float: left;
  left: 38px;
  position: relative;
  width: 80px;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}
</style>
