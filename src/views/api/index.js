// 接口相关代码
// 导入axios
import axios from 'axios'
// 导入auth
import auth from '@/utils/auth.js'

//1. 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 2.请求头
// axios.defaults.headers.Authorazition = `Bearer ${auth.getUser().token}`

// 3.请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorazition = `Bearer ${auth.getUser().token}`
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 4.响应拦截器
export default axios