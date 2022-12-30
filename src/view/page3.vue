<template>
  <div class="app-container3">
    <h4 class="headtitle3">报表统计</h4>
    <hr class="hrstyle3">
    <div class="box3">
      <ul class="infinite-list">
        <li v-for="i in listData" class="infinite-list-item"><span class="text3">{{ i }}</span></li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import global from "@/common/Global";
import Cookies from 'js-cookie'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page3',
  data() {
    return {
      listData: ["自治区级项目", "南宁市级项目", "西乡塘区级项目", "旧城区改造项目", "其他项目"],
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
    goPage() {
      console.log("goPage")
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
.app-container3 {
  width: 400px;
  height: 400px;
  position: relative;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*border: 1px red solid;*/
}


.text3 {
  position: relative;
  top: 10px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
  color: rgb(10, 0, 14);
  /*border: 1px #0157f1 solid;*/
}

.box3 {
  height: auto;
  width: 100%;
  position: relative;
  /*overflow: auto;*/
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*justify-content: space-around;*/
}


.headtitle3 {
  margin: 5px;
  position: relative;
  left: 10px;
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
  padding: 10px;
  position: relative;
}

.infinite-list-item {
  list-style-type: none;
  margin-bottom: 20px;
  height: 50px;
  width: 350px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: rgba(6, 90, 244, 0.3);
}
</style>
