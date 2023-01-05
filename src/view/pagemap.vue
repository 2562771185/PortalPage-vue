<template>
  <div class="index">
    <h4 class="headtitle">项目地图</h4>
    <hr class="hrstyle">
    <div class="box">
      <el-card class="box-card1">
        <div class="item4">
          我参与的项目：12
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="item4">
          我关注的项目：21
        </div>
      </el-card>
      <el-card class="box-card3">
        <div class="item4">
          预警的项目：11
        </div>
      </el-card>
      <el-card class="box-card4">
        <div class="item5">
          项目名称：
          <el-input v-model="xmmc" size="mini" placeholder="请输入项目名称" style="width: 200px;margin-right: 10px"></el-input>
          <el-button type="success" size="mini" plain>查询</el-button>
        </div>
      </el-card>
    </div>
    <baidu-map class="map" :center="center" @ready="handler" :zoom="14" :scroll-wheel-zoom="true">
      <bm-marker v-for="marker of markers" :position="{lng: marker.lng, lat: marker.lat}"
                 @click="lookDetail(marker)"
      >
        <el-tooltip class="tip" effect="dark" :content="marker.detail" placement="top">
          <MyOverLay
              class="showDetail"
              :position="{lng: marker.lng, lat: marker.lat}"
              :text="marker.name"
              :detail="marker.detail"
              :active="marker.showFlag"
              @mouseover.native="marker.showFlag = true"
              @mouseleave.native="marker.showFlag = false">
          </MyOverLay>
        </el-tooltip>

      </bm-marker>

    </baidu-map>
  </div>
</template>


<script>
import axios from 'axios'
import global from "@/common/Global";
import Cookies from 'js-cookie'
import MyOverLay from "@/components/MyOverLay";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page3',
  // eslint-disable-next-line vue/no-unused-components
  components: {MyOverLay},
  data() {
    return {
      active: false,
      actionHost: global.host,
      msg: "",
      mytoken: null,
      center: {lng: 108.297296, lat: 22.851574},
      zoom: 0,
      xmmc: '',
      markers: [
        {
          lng: 108.298733,
          lat: 22.875817,
          name: '南宁市西乡塘区万达广场',
          detail: '总投资1000万',
          showFlag: false //flag放在每一条数据里
        },
        {
          lng: 108.319861,
          lat: 22.849643,
          name: '南宁市西乡塘区地委大院',
          detail: '总投资1000万',
          showFlag: false
        },
        {
          lng: 108.275536,
          lat: 22.85172,
          name: '南宁市西乡塘区高新苑',
          detail: '总投资3000万',
          showFlag: false
        },
        {
          lng: 108.275305,
          lat: 22.841316,
          name: '南宁市西乡塘区动物园',
          detail: '总投资6000万',
          showFlag: false
        },
        {
          lng: 108.297296,
          lat: 22.851574,
          name: '南宁市西乡塘区广西大学',
          detail: '总投资1000万',
          showFlag: false
        },
        {
          lng: 108.298302,
          lat: 22.866094,
          name: '南宁市西乡塘区花卉公园',
          detail: '总投资7000万',
          showFlag: false
        }
      ],
      infoWindow: {
        info: {}
      },

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
    handler({BMap, map}) {
      // 22.857468170111016, 108.29227804828892
      console.log(BMap, map)
      this.center.lng = 108.29227804828892
      this.center.lat = 22.857468170111016
      this.zoom = 14
    },
    // 点击点坐标赋值
    lookDetail(marker) {
      marker.showFlag = true;
      this.infoWindow.info = marker;
    },
    // 关闭弹窗
    infoWindowClose(marker) {
      marker.showFlag = false
    },
    // 打开弹窗
    infoWindowOpen(marker) {
      marker.showFlag = true
    },

  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  font-weight: bold;
}

.map {
  width: 100%;
  height: 400px;
}

.headtitle {
  margin: 5px;
  position: relative;
  left: 10px;
  color: rgba(6, 90, 244, 0.79);
}

.hrstyle {
  float: left;
  width: 80px;
  position: relative;
  left: 10px;
  height: 2px;
  background-color: rgba(6, 90, 244, 0.79);
}

.box {
  margin-top: 20px;
  width: 1000px;
  height: auto;
  margin-bottom: 3px;
  /*border: 1px red solid;*/
}

.box-card1 {
  position: relative;
  left: -75px;
  width: 150px;
  height: 40px;
  display: inline-block;
  background-color: #42b983;
}

.box-card2 {
  position: relative;
  left: -75px;
  width: 150px;
  height: 40px;
  display: inline-block;
  background-color: #dca639;
}

.box-card3 {
  position: relative;
  left: -75px;
  width: 150px;
  height: 40px;
  display: inline-block;
  background-color: rgba(237, 10, 10, 0.69);
}

.box-card4 {
  position: relative;
  left: -75px;
  width: 400px;
  height: 40px;
  display: inline-block;
  /*background-color: rgba(43, 111, 235, 0.68);*/
}

.item4 {
  position: relative;
  bottom: 9px;
  font-size: 13px;
  /*border: 1px greenyellow solid;*/
}

.item5 {
  position: relative;
  bottom: 13px;
  font-size: 14px;
  /*border: 1px #ed0a0a solid;*/
}
</style>
