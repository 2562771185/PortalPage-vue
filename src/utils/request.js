import axios from 'axios'
import Cookies from "js-cookie";
import Global from "@/common/Global";
import ElementUI from 'element-ui';
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
    baseURL: Global.host + '/yc/sso', // url = base url + request url
    timeout: 5000 // request timeout
})

// respone拦截器
service.interceptors.response.use(
    response => {
        // console.log("拦截响应:",response)
        // 统一处理状态
        const res = response.data;
        if (res.code == null || res.code !== 200) { // 需自定义
            // 返回异常
            return Promise.reject({
                status: res.success,
                message: res.msg
            });
        } else {
            return response.data;
        }
    },
    // 处理处理错误
    error => {
        console.log('发生错误：',error)
        ElementUI.Message({
            showClose: true,
            message: error.message,
            type: 'error',
            duration: 2000
        });
        return Promise.reject(error);
    }
)

export default service
