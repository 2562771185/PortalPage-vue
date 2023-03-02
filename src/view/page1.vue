<template>
  <div class="app-container1">
    <!--    <el-button type="primary" @click="goFwPage(1)" :disabled="ssocode == ''" class="btn">访问泛微页面1</el-button>-->
    <!--    <el-button type="primary" @click="goFwPage(2)" :disabled="ssocode == ''" class="btn">访问泛微页面2</el-button>-->
    <!--    <el-button type="primary" @click="goFwPage(3)" :disabled="ssocode == ''" class="btn">访问泛微页面3</el-button>-->
    <!--    <el-button type="primary" @click="goFwPage(4)" :disabled="ssocode == ''" class="btn">访问泛微页面4</el-button>-->
    <!--    <h4>session: {{ sToken }}</h4>-->
    <!--    <h4>cookie: {{ cToken }}</h4>-->
    <!--    <h4>urlToken: {{ urlToken }}</h4>-->
        <h4>code: {{ ssocode }}</h4>
    <iframe
        :src="fwurl"
        style="width: 100%;height: 800px;"></iframe>
  </div>
</template>


<script>


import request from "@/utils/request";
import Global from "@/common/Global.vue";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page1',
  data() {
    return {
      insertFlag: 0,
      ssocode: '',
      sToken: '',
      cToken: '',
      urlToken: '',
      fwurl: 'http://192.168.2.188:8888/interface/EntranceApp.jsp?gopage=%2Fmobilemode%2Fmobile%2Fview.html%3Fappid%3D34&appname=ycyingyong&code='
      // fwurl: 'http://192.168.2.8:18080/yc//workFlow/view/workFlowDesign.html?basePath=http://192.168.2.8:18080/yc/&processId=c9b312116c1542d688c59358cfc4e5a0&definitionId=DEF_5028e8b6277d4e93936529bf8de297f1'
    }
  },
  created() {
    this.cToken = Cookies.get("access_token");
    this.sToken = sessionStorage.getItem("tokenid");
    this.urlToken = this.$route.query.tokenid
    this.checkUserInfo()
  },
  watch: {},
  methods: {
    goFwPage(val) {
      let pageUrl = ''
      var uri = encodeURIComponent('/mobilemode/mobile/view.html?appid=33');
      switch (val) {
        case 1:
          pageUrl = '%2Fmobilemode%2Fmobile%2Fview.html%3Fappid%3D34'
          break;
        case 2:
          pageUrl = '%2Fmobilemode%2Fmobile%2Fview.html%3Fappid%3D33'
          break;
        case 3:
          pageUrl = '%2Fmobilemode%2Fmobile%2Fview.html%3Fappid%3D31'
          break;
        case 4:
          pageUrl = '%2Fmobilemode%2Fmobile%2Fview.html%3Fappid%3D32'
          break;
      }
      if (this.insertFlag === 1 && this.ssocode !== '') {
        window.location.href = Global.fwHost + "/interface/EntranceApp.jsp?gopage=" + pageUrl + "&appname=ycyingyong&code=" + this.ssocode
      } else {
        this.$message({
          type: 'warning',
          message: '用户信息未完善'
        });
      }
    },
    //检查当前用户是否生成了ssouserinfo
    checkUserInfo() {
      axios({
        method: 'get',
        url: Global.host + '/yc/sso/fw/check-sso-user',
        headers: {'tokenid': this.urlToken}
      }).then(res => {
        if (res.data.code == 200) {
          this.insertFlag = 1
          this.ssocode = res.data.result
          this.fwurl += this.ssocode
          // this.goFwPage(1)
        } else {
          this.$message({
            type: 'error',
            message: '获取code失败'
          });
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.message
        });
      })
      // request.get('/fw/check-sso-user').then(res => {
      //   if (res.code == 200) {
      //     this.insertFlag = 1
      //     this.ssocode = res.result
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '获取code失败'
      //     });
      //   }
      // }).catch(error => {
      //   this.$message({
      //     type: 'error',
      //     message: error.message
      //   });
      // })
    }
  }
}
</script>
<style scoped>
.app-container1 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  /*border: 1px red solid;*/
}

.btn {
  width: 10rem;
  margin: .5rem;
}
</style>
