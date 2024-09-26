// axois 基础的封装
import axios from "axios";
// 弹窗
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus';
// pinia
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

const httpInstance = axios.create({
    // 根域名
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    // 超时时间
    timeout: 100000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
    // 从pinia获取token数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    // 按照后端还要求拼接token数据
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
return config;
}, function (error) {
// 对请求错误做些什么
return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
// 2xx 范围内的状态码都会触发该函数。
// 对响应数据做点什么
return response;
}, function (error) {
    // 同一错误提示
    ElMessage({
        type:'warning',
        message: error.response.data.message
    })
    // 401 token失效处理
    // 清除本地用户数据，跳转到登录页
    const userStore = useUserStore()
    if( error.response.status === 401) {
        userStore.clearUserInfo()
        router.push('/login')
    }


return Promise.reject(error);
});

export default httpInstance