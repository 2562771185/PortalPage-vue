<template>
  <bm-overlay
      ref="customOverlay"
      :class="{sample: type == null,sample1:type===1, sample2:type===2, sample3:type===3,active}"
      pane="labelPane"
      @draw="draw">
    <div v-text="text" @click="handleClick(id)"></div>
  </bm-overlay>
<!--  <bm-overlay-->
<!--      ref="customOverlay"-->
<!--      :class="{sample: type != null,active}"-->
<!--      pane="labelPane"-->
<!--      @draw="draw">-->
<!--    <div v-text="text" @click="handleClick(id)"></div>-->
<!--  </bm-overlay>-->
</template>

<script>

import global from "@/common/Global.vue";

export default {
  props: ['text', 'detail', 'position', 'active', 'type', 'id'],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    handleClick(id) {
      let url =  global.host + '/yc/formDesign/index.html#/formView/2d4cf21fcdeab8e0b732f2a562c1f316?businessId=' + id;
      window.parent.tabAddAndShow(url, this.text, id, false, '', 1);
    },
    draw({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style>
.sample {
  margin: -48px;
  width: 200px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample1 {
  margin: -48px;
  width: 200px;
  line-height: 20px;
  background: rgba(66, 185, 131, 0.86);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample2 {
  margin: -48px;
  width: 200px;
  line-height: 20px;
  background: rgba(220, 166, 57, 0.86);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample3 {
  margin: -48px;
  width: 200px;
  line-height: 20px;
  background: rgba(237, 10, 10, 0.86);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}

.sample1.active {
  background: rgb(5, 55, 91);
  color: #fff;
}

.sample2.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}

.sample3.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>
