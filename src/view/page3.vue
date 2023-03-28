<template>
  <div class="app-container3">
    <!--    <h4 class="headtitle3">报表统计</h4>-->
    <!--    <hr class="hrstyle3">-->
    <div class="box3">
      <ul class="infinite-list">
        <li v-for="(i,index) in projectLevelList" :key="i.id" class="infinite-list-item"><span class="text3"
                                                                                          @click="goPage2(index)">{{
            i.mc
          }}</span></li>
      </ul>
    </div>
  </div>
</template>


<script>
import global from "@/common/Global";
import Cookies from 'js-cookie'
import request from "@/utils/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page3',
  data() {
    return {
      listData: ["自  治  区  层  面", "市  层  面", "城  区  层  面", "市  直  管  重  大  项  目", "自  治  区  直  管  项  目"],
      actionHost: global.host,
      msg: "",
      mytoken: null,
      pageNum: 1,
      pageSize: 8,
      total: 100,
      projectLevelList: []
    }
  },
  mounted() {
  },
  created() {
    var token = Cookies.get("access_token");
    this.mytoken = {Authorization: token}
    this.getProjectLevelList();
  },
  watch: {},
  methods: {
    goPage2(val) {

      let url = ""
      let id = ""

      switch (val) {
        case 0:
          // id = '894b26759909452db2424a26795a795d,1ce4de1b12bf4a77815b90a22f6e6b9f,19cf36d0bc9d4bd7b667893129c4a554'
          id = '894b26759909452db2424a26795a795d'
          url = '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], "894b26759909452db2424a26795a795d", false, '', 1);
          break;
        case 1:
          // id = '1ce4de1b12bf4a77815b90a22f6e6b9f,19cf36d0bc9d4bd7b667893129c4a554'
          id = '1ce4de1b12bf4a77815b90a22f6e6b9f'
          url = '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], "1ce4de1b12bf4a77815b90a22f6e6b9f", false, '', 1);
          break;
        case 2:
          id = '19cf36d0bc9d4bd7b667893129c4a554'
          url = '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], id, false, '', 1);
          break;
        case 3:
          id = '87efd54e69f5415bbeae242bbeb70d61'
          url = '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], id, false, '', 1);
          break;
        case 4:
          id = '354044d4abff4120a3e37cf85ac89c56'
          url = '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], id, false, '', 1);
          break;
        default:
          url = "/yc/portal/loginPortal/afterLogin.do"
      }
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
  }
}
</script>
<style scoped>
.app-container3 {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  /*border: 1px red solid;*/
}


.text3 {
  position: relative;
  top: 10px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  /*border: 1px #0157f1 solid;*/
}

.box3 {
  height: auto;
  width: 90%;
  position: relative;
  /*border: 1px #0157f1 solid;*/
  margin: 0 auto;

  /*overflow: auto;*/
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*justify-content: space-around;*/
}


.headtitle3 {
  margin-bottom: 0px;
  position: relative;
  left: 17px;
  top: 5px;
  color: rgba(6, 90, 244, 0.79);
}

.hrstyle3 {
  float: left;
  width: 80px;
  position: relative;
  left: 10px;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}

.infinite-list {
  padding: 0;
  position: relative;
}

.infinite-list-item {
  list-style-type: none;
  margin-bottom: 20px;
  /*margin: 10px;*/
  height: 50px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: rgba(6, 90, 244, 0.53);
}
</style>
