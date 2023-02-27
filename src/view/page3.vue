<template>
  <div class="app-container3">
    <!--    <h4 class="headtitle3">报表统计</h4>-->
    <!--    <hr class="hrstyle3">-->
    <div class="box3">
      <ul class="infinite-list">
        <li v-for="(i,index) in listData" :key="i.index" class="infinite-list-item"><span class="text3" @click="goPage2(index)">{{
            i
          }}</span></li>
      </ul>
    </div>
  </div>
</template>


<script>
import global from "@/common/Global";
import Cookies from 'js-cookie'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page3',
  data() {
    return {
      listData: ["自 治 区 级 项 目", "南 宁 市 级 项 目", "西 乡 塘 区 级 项 目", "旧 城 区 改 造 项 目", "其 他 项 目"],
      actionHost: global.host,
      msg: "",
      mytoken: null,
      pageNum: 1,
      pageSize: 8,
      total: 100,
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
    goPage2(val) {

      let url = ""
      let id = ""
      switch (val) {
        case 0:
          id = '894b26759909452db2424a26795a795d,1ce4de1b12bf4a77815b90a22f6e6b9f,19cf36d0bc9d4bd7b667893129c4a554'
          url =  '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], "894b26759909452db2424a26795a795d", false, '', 1);
          break;
        case 1:
          id = '1ce4de1b12bf4a77815b90a22f6e6b9f,19cf36d0bc9d4bd7b667893129c4a554'
          url =  '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], "1ce4de1b12bf4a77815b90a22f6e6b9f", false, '', 1);
          break;
        case 2:
          id = '19cf36d0bc9d4bd7b667893129c4a554'
          url =  '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], id, false, '', 1);
          break;
        case 3:
          id = '87efd54e69f5415bbeae242bbeb70d61'
          url =  '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], id, false, '', 1);
          break;
        case 4:
          id = '8b1fa72d34884954a9f3dbffcc739687'
          url =  '/yc/static/wsjrj/projectmanagement/index.html#/page7?level=' + id;
          window.parent.parent
              .tabAddAndShow(url, this.listData[val], id, false, '', 1);
          break;
        default:
          url = "/yc/portal/loginPortal/afterLogin.do"
      }
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
  margin-bottom: 25px;
  /*margin: 10px;*/
  height: 50px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: rgba(6, 90, 244, 0.53);
}
</style>
