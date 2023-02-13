
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "@/App";

import router from "./router/index.js";

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, { ak: 'GyYsyrdPoxO5uX2GLobyD5bX2Z2esYqN' })

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
