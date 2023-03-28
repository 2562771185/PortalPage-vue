<template>
  <div class="app-container1">
<!--    <h4 class="headtitle1">项目信息</h4>-->
<!--    <hr class="hrstyle1">-->
    <div class="box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title" @click="goDeclarationTimeout"><i class="el-icon-s-release"></i>填报超时</span>
        </div>
        <div class="text item">
          {{ declarationTimeoutCount }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title" @click="goUnqualifiedInvestment"><i class="el-icon-s-finance"></i>投资未达标</span>
        </div>
        <div class="text item">
          <div class="text"
          >{{ unqualifiedInvestmentCount }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title" @click="goExcessInvestment"><i class="el-icon-s-flag"></i>未按期竣工</span>
        </div>
        <div class="text item">
          <div class="text"
          >{{ excessInvestmentCount }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title" @click="goNotWork"><i class="el-icon-s-open"></i>未按期开工</span>
        </div>
        <div class="text item">
          <div class="text"
          >{{ noneWorkCount }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title" @click="goStartWork"><i class="el-icon-s-check"></i>开工项目</span>
        </div>
        <div class="text item">
          <div class="text"
          >{{ startWorkCount }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title" @click="goDoneWork"><i class="el-icon-s-claim"></i>竣工项目</span>
        </div>
        <div class="text item">
          <div class="text"
          >{{ doneWorkCount }}
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>


<script>
import global from "@/common/Global";
import Cookies from 'js-cookie'
import request from "@/utils/request";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page1',
  data() {
    return {
      actionHost: global.host,
      msg: "",
      mytoken: null,
      startWorkCount: 0,
      // 未按期开工
      noneWorkCount: 0,
      doneWorkCount: 0,
      unqualifiedInvestmentCount: 0,
      // 未按期竣工
      excessInvestmentCount: 0,
      declarationTimeoutCount: 0,
    }
  },
  mounted() {
  },
  created() {
    var token = Cookies.get("access_token");
    this.mytoken = {Authorization: token}
    this.getProjectCounts();
  },
  watch: {},
  methods: {
    getProjectCounts() {
      this.getNoneWorkCount();
      this.getDoneWorkCount();
      this.getStartWorkCount();
      this.getExcessInvestmentCount();
      this.getUnqualifiedInvestmentCount();
      this.getDeclarationTimeoutCount();
    },
    getNoneWorkCount() {
      request.get('/project/nonework').then(res => {
        this.noneWorkCount = res.result;
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    getDoneWorkCount() {
      request.get('/project/donework').then(res => {
        this.doneWorkCount = res.result;
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    getStartWorkCount() {
      request.get('/project/startwork').then(res => {
        this.startWorkCount = res.result;
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    getExcessInvestmentCount() {
      request.get('/project/excessinvestment').then(res => {
        this.excessInvestmentCount = res.result;
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    // 投资未达标
    getUnqualifiedInvestmentCount() {
      //todo 只显示3，6，9，12月份
      request.get('/project/unqualifiedinvestment').then(res => {
        this.unqualifiedInvestmentCount = res.result;
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    getDeclarationTimeoutCount() {
      request.get('/project/declarationtimeout').then(res => {
        this.declarationTimeoutCount = res.result;
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败!' + error.message,
          type: 'error',
          duration: 2000
        });
      })
    },
    goNotWork() {
      let url = `/yc/formDesign/index.html#/listView/ab8d6eac724cacf05df6acf0abab7749`;
      window.parent.parent.tabAddAndShow(url, '未按期开工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goStartWork() {
      let url = `/yc/formDesign/index.html#/listView/37da4f610a60b4bba2f417130a1244ea`;
      window.parent.parent.tabAddAndShow(url, '开工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goDoneWork() {
      let url = `/yc/formDesign/index.html#/listView/7353cf20787d3b4cc6ba61a6531792a8`;
      window.parent.parent.tabAddAndShow(url, '竣工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goExcessInvestment() {
      let url = `/yc/formDesign/index.html#/listView/5b40e993b41c0eff025814637ddf6c8d`;
      window.parent.parent.tabAddAndShow(url, '未按期竣工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goUnqualifiedInvestment() {
      let url = `/yc/formDesign/index.html#/listView/952f3d71e8095908cdbc8301f1516c61`;
      window.parent.parent.tabAddAndShow(url, '投资未达标', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goDeclarationTimeout(){
      let url = `/yc/formDesign/index.html#/listView/c959fcad8da49df2d390a2e5f56c2783`;
      window.parent.parent.tabAddAndShow(url, '填报超时', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
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

.clearfix {
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
  margin: 0 auto;
  height: auto;
  width: 100%;
  position: relative;
  /*overflow: auto;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /*border: 1px rebeccapurple solid;*/
}

.box-card {
  text-align: left;
  width: 25%;
  border-radius: 15px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  max-height: 110px;
  background-color: rgba(242, 244, 247, 0.4);
}

.title:hover {
  cursor: pointer
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
  margin: 10px;
  float: left;
  left: 37px;
  top: -5px;
  position: relative;
  color: rgba(6, 90, 244, 0.79);
}

.hrstyle1 {
  float: left;
  left: -45px;
  top: 20px;
  position: relative;
  width: 80px;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}
</style>
