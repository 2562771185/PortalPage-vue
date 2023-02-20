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
      let url = `/yc/formDesign/index.html#/listView/142dc2fb20745634a844308a0bcf19b6`;
      window.parent.tabAddAndShow(url, '未按期开工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goStartWork() {
      let url = `/yc/formDesign/index.html#/listView/debcd933ef4aa27fa4771ecf0629a5ec`;
      window.parent.tabAddAndShow(url, '开工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goDoneWork() {
      let url = `/yc/formDesign/index.html#/listView/e897f9fca086b2af79745aabb0d5d0b7`;
      window.parent.tabAddAndShow(url, '竣工项目', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goExcessInvestment() {
      let url = `/yc/formDesign/index.html#/listView/ebd29a6ceaeaf8892cfff8134f40c8ab`;
      window.parent.tabAddAndShow(url, '未按期竣工', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goUnqualifiedInvestment() {
      let url = `/yc/formDesign/index.html#/listView/902d21bd1bdc027ab4b02c0ec3e8afb8`;
      window.parent.tabAddAndShow(url, '投资未达标', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
    },
    goDeclarationTimeout(){
      let url = `/yc/formDesign/index.html#/listView/162368350ebe9dbc43a0e96381ebcbf0`;
      window.parent.tabAddAndShow(url, '填报超时', url.substring(url.lastIndexOf('/') + 1), false, '', 1);
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
  margin-top: 10px;
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
