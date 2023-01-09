import axios from 'axios'
import Cookies from "js-cookie";
import Global from "@/common/Global";


// 这里自己获取token
let token = Cookies.get("access_token");
axios.defaults.headers.common['tokenid'] = token;
// http request 拦截器
axios.interceptors.request.use(
    config => {
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `${token}`; // 根据实际情况自行修改
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
);
// create an axios instance
const service = axios.create({
  baseURL: Global.host+'/yc/sso', // url = base url + request url
  timeout: 5000 // request timeout
})
export default service
