<template>
  <div style="text-align: center;margin: 0 auto">
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
      <!-- 添加更多的 div 元素 -->
    </div>

  </div>
</template>
<script >
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'test',
  data() {
    return {
      list:[
        {
          title: '今日新增用户',
          value: '0',
          icon: 'el-icon-user-solid'
        }, {
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

      ]
    }
  },
  mounted() {
  },
  created() {
  },
  watch: {},
  methods: {}
}
</script>
<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex-item {
  flex-basis: calc(32% - 10px); /* 设置每个 div 元素的基础宽度 */
  margin: 5px; /* 设置 div 之间的间距 */
  height: 100px; /* 设置每个 div 的高度 */
  background-color: lightgray;
}

/* 在屏幕宽度小于某个阈值时，调整样式 */
@media (max-width: 600px) {
  .flex-item {
    flex-basis: calc(48% - 10px); /* 使每行最多有两个元素，平分宽度 */
  }
}

</style>