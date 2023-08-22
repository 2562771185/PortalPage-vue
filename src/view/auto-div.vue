<template>
  <div class="app-container">
    <div class="flex-container">
      <el-card class="flex-item" v-for="item in list" :key="item.ID">
        <div slot="header" class="iconstyle">
          <i :class="item.ICON"></i>
          <span>{{ item.TITLE }}</span>
        </div>
        <div class="value">
          <span>{{ item.VALUE }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>

import request from "@/utils/request";
import ElementUI from "element-ui";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'autoDiv',
  data() {
    return {
      list: []
    }
  },
  mounted() {
  },
  created() {
    this.getList()
  },
  watch: {},
  methods: {
    async getList() {
      request.post('/platform/dataSource/getDataBySql', {
        "conditions": [],
        "currpage": 1,
        "limit": 1000,
        "isall": true,
        "focusId": "c498cbdaba831fdb332a612418689ec2",
        "dynamicDataSourceId": '',
        "sql": 'select * from mashan_ore.fm_portal_button'
      }).then(async res => {
        console.log('查询配置', res)
        if (res.result == null || res.result.length === 0) {
          ElementUI.Message({
            showClose: true,
            message: '配置列表为空！',
            type: 'warning',
            duration: 2000
          });
          return
        }
        for (const item of res.result) {
          await this.executeSql(item)
        }
        this.list = res.result
        console.log(this.list)
      })
    },
    async executeSql(item) {
      if (item.EX_SQL !== '' && item.EX_SQL != null && item.EX_SQL.includes('select')) {
        await request.post('/platform/dataSource/getDataBySql', {
          "conditions": [],
          "currpage": 1,
          "limit": 1000,
          "isall": true,
          "focusId": "c498cbdaba831fdb332a612418689ec2",
          "dynamicDataSourceId": item.DATA_SOURCE_ID === null ? '' : item.DATA_SOURCE_ID,
          "sql": item.EX_SQL
        }).then(res => {
          console.log('执行sql：', res.result)
          item.VALUE = res.result[0].value
        }).catch(error => {
          ElementUI.Message({
            showClose: true,
            message: error.message + '，请检查【' + item.TITLE + '】配置',
            type: 'error',
            duration: 2000
          });
        })
      } else {
        ElementUI.Message({
          showClose: true,
          message: '非法sql:[' + item.EX_SQL + ']，请检查【' + item.TITLE + '】SQL配置',
          type: 'error',
          duration: 4000
        });
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}


.value {
  position: absolute;
  font-size: 4.5vh;
  font-weight: bold;
}

.box {
//text-align: left; margin: auto; height: auto; width: 100%; //position: relative;
  /*overflow: auto;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.box-card {
  text-align: left;
  width: 30%;
  border-radius: 15px;
  height: 45%;
  /*overflow: hidden;*/
  margin-bottom: 50px;
  background-color: rgba(242, 244, 247, 0.4);
  min-width: 200px;
//flex: 3; /* 设置每个 div 元素的相对比例，将会平均分配宽度 */ //max-width: calc(33.33% - 10px); /* 设置每个 div 元素的最大宽度，保证一行最多三个元素 */
}

.iconstyle {
  position: relative;
  float: left;
  top: -20px;
  font-weight: bolder;
  font-size: 1.5rem;
  color: rgba(6, 90, 244, 0.79);
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.flex-item {
  height: 120px;
  flex-basis: calc(33% - 10px); /* 设置每个 div 元素的基础宽度 */
  /* 设置 div 之间的间距 */
//width: 32%;  /* 设置每个 div 的高度 */ background-color: rgba(242, 244, 247, 0.4); border-radius: 15px; margin: 5px 5px 30px;
}

/* 在屏幕宽度小于某个阈值时，调整样式 */
@media (max-width: 600px) {
  .flex-item {
    flex-basis: calc(49% - 10px); /* 使每行最多有两个元素，平分宽度 */
  }
}

</style>
