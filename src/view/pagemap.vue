<template>
  <div class="index">
    <h4 class="headtitle">项目地图</h4>
    <hr class="hrstyle">
    <div class="box">
      <el-card class="box-card1">
        <div class="item4">
          我参与的项目:{{ myJoinProjectCount }}
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="item4">
          我关注的项目:{{ myCareProjectCount }}
        </div>
      </el-card>
      <el-card class="box-card3">
        <div class="item4">
          预警的项目:{{ warningProjectCount }}
        </div>
      </el-card>
      <el-card class="box-card4">
        <div class="item5">
          项目名称：
          <el-autocomplete
              popper-class="my-autocomplete"
              popper-append-to-body="false"
              v-model="keyword"
              :fetch-suggestions="querySearchAsync"
              size="mini"
              placeholder="请输入项目名称进行搜索"
              clearable
              @select="handleSelect"
              @clear="blurForBug"
              style="width: 220px;margin-right: 10px"
          >
            <template slot-scope="{ item }">
              <div
                  :class="{package1: item.type===1, package2:item.type===2, package3:item.type===3}"
              >
                <div class="package-path-value">{{ item.value }}</div>
                <span class="package-path-name">{{ item.ztz }}</span>
              </div>
            </template>
          </el-autocomplete>
          <el-button type="success" size="mini" plain @click="clear">重置</el-button>
        </div>
      </el-card>
    </div>
    <!--        经度<input v-model.number="center.lng">-->
    <!--        维度<input v-model.number="center.lat">-->
    <!--        缩放等级<input v-model.number="zoom">-->
    <baidu-map class="map" :center="center" @ready="handler"
               :zoom="zoom" :scroll-wheel-zoom="true"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom">
      <bm-marker v-for="marker of markers" :key="marker.id" :position="{lng: marker.jd, lat: marker.wd}"
                 @click="lookDetail(marker)"
      >
        <!--        鼠标移入显示信息-->
        <el-tooltip class="tip" effect="dark" :content="marker.ztz" placement="top">
          <!--          自定义覆盖物-->
          <MyOverLay
              class="showDetail"
              :position="{lng: marker.jd, lat: marker.wd}"
              :text="marker.xmmc"
              :id="marker.id"
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
import MyOverLay from "@/components/MyOverLay";
import request from "@/utils/request";

export default {
  name: 'page-map',
  components: {MyOverLay},
  data() {
    return {
      myCareProjectCount: 0,
      myJoinProjectCount: 0,
      warningProjectCount: 0,
      searchList: [],
      active: false,
      msg: "",
      center: {lng: 108.297296, lat: 22.851574},
      zoom: 14,
      keyword: '',
      markers: [],
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
        if (res.code === 200) {
          for (let i of res.result.list) {
            i.showFlag = false;
            i.value = i.xmmc;
            i.ztz = '总投资' + i.ztz + '万'
          }
          this.markers = res.result.list;
          this.myCareProjectCount = res.result.myCareProjectCount
          this.myJoinProjectCount = res.result.myJoinProjectCount
          this.warningProjectCount = res.result.warningProjectCount
        }
        if (this.markers.length <= 0) {
          this.$message({
            showClose: true,
            message: '获取数据失败!',
            type: 'error',
            duration: 2000
          });
        }
      }).catch(error =>{
        this.$message({
          showClose: true,
          message: '获取数据失败!'+error,
          type: 'error',
          duration: 2000
        });
      })

    },
    clear() {
      //回到初始位置
      this.center.lng = 108.289403
      this.center.lat = 22.863727
      this.keyword = ''
      this.zoom = 14
    },
    querySearchAsync(queryString, cb) {
      if (this.markers == null || this.markers.length <= 0) {
        this.$message({
          showClose: true,
          message: '无数据..........',
          type: 'error',
          duration: 1000
        });
        return
      }
      var results = queryString ? this.markers.filter(item => {
        return item.xmmc.includes(queryString)
      }) : this.markers;
      if (results.length <= 0) {
        this.$message({
          showClose: true,
          message: '无相关数据，请重新输入项目名称',
          type: 'warning',
          duration: 800
        });
      }
      cb(results);
    },
    handleSelect(item) {
      this.center = {lng: item.jd, lat: item.wd}
      this.zoom = 17
    },
    handler({BMap, map}) {
      console.log('地图初始化', BMap, map)
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
<style lang="scss" scoped>

.my-autocomplete {
  .package1:hover{
    transform: scale(1.1);
  }
  .package2:hover{
    transform: scale(1.1);
  }
  .package3:hover{
    transform: scale(1.1);
  }
  .package-path-value {
    text-overflow: ellipsis;
    overflow: hidden;
    color: #20010b;
    font-size: 14px;
    font-weight: bold;
  }

  .package-path-name {
    font-size: 14px;
    color: #f40737;
  }

  .package1 {
    padding: 5px;
    border-radius: 5px;
    line-height: 25px;
    margin-bottom: 4px;
    background-color: rgba(66, 185, 131, 0.8);
  }

  .package2 {
    padding: 5px;
    border-radius: 5px;
    line-height: 25px;
    margin-bottom: 4px;
    background-color: rgba(220, 166, 57, 0.8);
  }

  .package3 {
    padding: 5px;
    border-radius: 5px;
    line-height: 25px;
    margin-bottom: 4px;
    background-color: rgba(231, 56, 56, 0.91);
  }
}
</style>
