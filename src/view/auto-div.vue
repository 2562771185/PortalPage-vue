<template>
  <div class="app-container">
    <div class="flex-container">
      <el-card class="flex-item" v-for="item in list" :key="item.id">
        <div slot="header" class="iconstyle">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </div>
        <div class="value">
          <span>{{ item.value }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>

import request from "@/utils/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'autoDiv',
  data() {
    return {
      list: [
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        },
        {
          title: '今日新增订单',
          value: '0',
          icon: 'el-icon-s-order'
        },
        {
          title: '今日新增收入',
          value: '0',
          icon: 'el-icon-s-data'
        },
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        },
        {
          title: '今日新增订单',
          value: '0',
          icon: 'el-icon-s-order'
        },
        {
          title: '今日新增收入',
          value: '0',
          icon: 'el-icon-s-data'
        },
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        },
        {
          title: '今日新增订单',
          value: '0',
          icon: 'el-icon-s-order'
        },
        {
          title: '今日新增收入',
          value: '0',
          icon: 'el-icon-s-data'
        },
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        },
        {
          title: '今日新增订单',
          value: '0',
          icon: 'el-icon-s-order'
        },
        {
          title: '今日新增收入',
          value: '0',
          icon: 'el-icon-s-data'
        },
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        },
        {
          title: '今日新增订单',
          value: '0',
          icon: 'el-icon-s-order'
        },
        {
          title: '今日新增收入',
          value: '0',
          icon: 'el-icon-s-data'
        },
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        },
        {
          title: '今日新增订单',
          value: '0',
          icon: 'el-icon-s-order'
        },
      ]
    }
  },
  mounted() {
  },
  created() {
  },
  watch: {},
  methods: {
    getList() {
      request.get('/api/xxx').then(res => {
        console.log(res)
        this.list = res.result
      })
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
  position: relative;
  font-size: 3.5vh;
  font-weight: bolder;
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
  flex-basis: calc(33% - 10px); /* 设置每个 div 元素的基础宽度 */
  /* 设置 div 之间的间距 */
//width: 32%; height: 100px; /* 设置每个 div 的高度 */
  background-color: rgba(242, 244, 247, 0.4);
  border-radius: 15px;
  margin: 5px 5px 30px;
}

/* 在屏幕宽度小于某个阈值时，调整样式 */
@media (max-width: 600px) {
  .flex-item {
    flex-basis: calc(49% - 10px); /* 使每行最多有两个元素，平分宽度 */
  }
}

</style>
