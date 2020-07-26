// 路由相关代码
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 导入登录
import Login from '@/views/login'
// 导入首页
import Layout from '@/views/Layout'

// 注册
Vue.use(VueRouter)

//初始化路由
const routes = [
    {path:'/login',component:Login},
    {path:'/',component:Layout}
]

//new一个VueRouter实例
const router = new VueRouter({
    routes
})

// 导出
export default router

