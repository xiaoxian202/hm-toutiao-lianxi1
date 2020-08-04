// 接口相关代码
// 导入axios
import axios from 'axios'
// 导入auth
import auth from '@/utils/auth.js'
// 导入router
import router from '@/router'

//1. 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 2.请求头
// axios.defaults.headers.Authorazition = `Bearer ${auth.getUser().token}`

// 3.请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = `Bearer ${auth.getUser().token}`
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 4.响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.dir(error); //获取获取对象
  if(error.response && error.response.status === 401) {
    // 清除token
    // auth.delUser()
    // 跳转登录页面
    // 1. 编程式导航  this.$router.push('/login')  this不是vue实例
    // 2. $router 其实就是我们自己初始化的 router实例 src/router/index.js导出
    // 3. 此模块导入路由实例，使用路由实例调用push函数即可
    router.push('/login')

  }
  return Promise.reject(error);
})

export default axios