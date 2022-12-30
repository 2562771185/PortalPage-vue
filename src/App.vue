<template>
  <div>
<!--    <router-link to="/page1">page1</router-link>-->
<!--    <router-link to="/page2">page2</router-link>-->
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  mounted() {
  },
  created() {

  },
  watch: {},
  methods: {}
}
</script>
<style>
.app-container {
  text-align: center; /*让div内部文字居中*/
  border-radius: 20px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}


</style>
