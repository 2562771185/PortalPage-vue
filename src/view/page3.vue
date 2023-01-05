<template>
  <div class="app-container3">
    <h4 class="headtitle3">报表统计</h4>
    <hr class="hrstyle3">
    <div class="box3">
      <ul class="infinite-list">
        <li v-for="i in listData" class="infinite-list-item"><span class="text3" @click="goPage2(i)">{{ i }}</span></li>
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
    goPage(val) {
      // console.log(val)
      let url = ""
      switch (val) {
        case '自治区级项目':
          url = global.host + '/yc/formDesign/index.html#/listView/c7a8ea97c08a82a7213f2bad7cc5f258';
          break;
        case '南宁市级项目':
          url = global.host + '/yc/formDesign/index.html#/listView/4811e6f35682da2b8c6bf65644d4f077';
          break;
        case '西乡塘区级项目':
          url = global.host + '/yc/formDesign/index.html#/listView/1dabaf47f61ef7be55c02d6387b1d48a';
          break;
        case '旧城区改造项目':
          url = global.host + '/yc/formDesign/index.html#/listView/ba7203f1af557172c490f147b46a7207';
          break;
        case '其他项目':
          url = global.host + '/yc/formDesign/index.html#/listView/08628055e7b4e986b59f4fa7422d04d2';
          break;
        default:
          url = "https://www.baidu.com/"
      }
      return url;
    },
    goPage2(val) {
      let url = ""
      switch (val) {
        case '自治区级项目':
          url = global.host + '/yc/formDesign/index.html#/listView/c7a8ea97c08a82a7213f2bad7cc5f258';
          window.parent
              .tabAddAndShow(url, val, '123asdf', false, '', 1);
          break;
        case '南宁市级项目':
          url = global.host + '/yc/formDesign/index.html#/listView/4811e6f35682da2b8c6bf65644d4f077';
          window.parent
              .tabAddAndShow(url, val, '1123fsdfsd', false, '', 1);
          break;
        case '西乡塘区级项目':
          url = global.host + '/yc/formDesign/index.html#/listView/1dabaf47f61ef7be55c02d6387b1d48a';
          window.parent
              .tabAddAndShow(url, val, 'sdf234', false, '', 1);
          break;
        case '旧城区改造项目':
          url = global.host + '/yc/formDesign/index.html#/listView/ba7203f1af557172c490f147b46a7207';
          window.parent
              .tabAddAndShow(url, val, 'fsda23432sda', false, '', 1);
          break;
        case '其他项目':
          url = global.host + '/yc/formDesign/index.html#/listView/08628055e7b4e986b59f4fa7422d04d2';
          window.parent
              .tabAddAndShow(url, val, '23435dfsf', false, '', 1);
          break;
        default:
          url = "https://www.baidu.com/"
      }
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
  color: white;
  cursor: pointer;
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
  background-color: rgba(6, 90, 244, 0.53);
}
</style>
