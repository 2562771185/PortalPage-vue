<template>
  <div class="index">
    <h4 class="headtitle">项目地图</h4>
    <hr class="hrstyle">
    <div class="box">
      <el-card class="box-card1">
        <div class="item4">
          我参与的项目:{{ myInvolvedProjectNum }}
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="item4">
          我关注的项目:{{ myCareProjectNum }}
        </div>
      </el-card>
      <el-card class="box-card3">
        <div class="item4">
          预警的项目:{{ projectWarningNum }}
        </div>
      </el-card>
      <el-card class="box-card4">
        <div class="item5">
          项目名称：
          <el-autocomplete
              v-model="keyword"
              :fetch-suggestions="querySearchAsync"
              size="mini"
              placeholder="请输入项目名称进行搜索"
              clearable
              @select="handleSelect"
              :trigger-on-focus="false"
              @clear="blurForBug"
              style="width: 220px;margin-right: 10px"
          ></el-autocomplete>
          <el-button type="success" size="mini" plain @click="clear">重置</el-button>
        </div>
      </el-card>
    </div>
    <!--    经度<input v-model.number="center.lng">-->
    <!--    维度<input v-model.number="center.lat">-->
    <!--    缩放等级<input v-model.number="zoom">-->
    <baidu-map class="map" :center="center" @ready="handler"
               :zoom="zoom" :scroll-wheel-zoom="true"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom">
      <bm-marker v-for="marker of markers" :key="marker.xmmc" :position="{lng: marker.jd, lat: marker.wd}"
                 @click="lookDetail(marker)"
      >
        <!--        鼠标移入显示信息-->
        <el-tooltip class="tip" effect="dark" :content="marker.ztz" placement="top">
          <!--          自定义覆盖物-->
          <MyOverLay
              class="showDetail"
              :position="{lng: marker.jd, lat: marker.wd}"
              :text="marker.xmmc"
              :detail="marker.ztz"
              :active="marker.showFlag"
              :type="marker.type"
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
import MyOverLay from "@/components/MyOverLay";
import request from "@/utils/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page3',
  // eslint-disable-next-line vue/no-unused-components
  components: {MyOverLay},
  data() {
    return {
      myCareProjectNum: 0,
      myInvolvedProjectNum: 0,
      projectWarningNum: 0,
      searchList: [],
      active: false,
      msg: "",
      center: {lng: 108.297296, lat: 22.851574},
      zoom: 14,
      keyword: '',
      markers: [
        {
          showFlag: false //flag放在每一条数据里
        },
      ],
      infoWindow: {
        info: {}
      },

    }
  },
  mounted() {
  },
  created() {
    this.getMapList()
  },
  watch: {},
  methods: {
    syncCenterAndZoom(e) {
      const {lng, lat} = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    getMapList() {
      request.get('/map/list').then(res => {
        for (let i of res.data.result) {
          i.showFlag = false;
          i.ztz = '总投资' + i.ztz + '万'
        }
        this.markers = res.data.result;
        this.myCareProjectNum = res.data.result.length
      })
    },
    clear() {
      this.center.lng = 108.289403
      this.center.lat = 22.863727
      this.keyword = ''
      this.zoom = 14
    },
    querySearchAsync(queryString, cb) {
      if (queryString == null || queryString === '') return;
      let list = [{}];
      const val = this.keyword.trim();
      if (val === '' || val == null) return;
      request.get('/map/find?keyword=' + val).then(res => {
        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (let i of res.data.result) {
          i.value = i.xmmc;  //将想要展示的数据作为value
        }
        list = res.data.result;
        if (list.length <= 0) {
          this.$message({
            showClose: true,
            message: '无相关数据.....',
            type: 'warning',
            duration: 800
          });
        }
        cb(list);
      })
    },
    handleSelect(item) {
      // console.log(item);
      this.center = {lng: item.jd, lat: item.wd}
      this.zoom = 16
    },
    handler({BMap, map}) {
      // 22.857468170111016, 108.29227804828892
      console.log(BMap, map)
      this.center.lng = 108.289403
      this.center.lat = 22.863727
      // this.zoom = 14
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
    blurForBug() {
      document.activeElement.blur()
    }
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
  height: 600px;
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
  width: 1100px;
  height: auto;
  margin-bottom: 3px;
  /*border: 1px red solid;*/
}

.box-card1 {
  position: relative;
  left: -75px;
  width: 170px;
  height: 40px;
  display: inline-block;
  background-color: #42b983;
}

.box-card2 {
  position: relative;
  left: -75px;
  width: 170px;
  height: 40px;
  display: inline-block;
  background-color: #dca639;
}

.box-card3 {
  position: relative;
  left: -75px;
  width: 170px;
  height: 40px;
  display: inline-block;
  background-color: rgba(237, 10, 10, 0.69);
}

.box-card4 {
  position: relative;
  left: -75px;
  width: 412px;
  height: 40px;
  display: inline-block;
  /*background-color: rgba(43, 111, 235, 0.68);*/
}

.item4 {
  position: relative;
  bottom: 11px;
  font-size: 17px;
  /*border: 1px greenyellow solid;*/
}

.item5 {
  position: relative;
  bottom: 13px;
  font-size: 16px;
  /*border: 1px #ed0a0a solid;*/
}
</style>
