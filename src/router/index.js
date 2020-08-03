// 路由相关代码
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)
// 导入登录
import Login from '@/views/login'
// 导入首页
import Layout from '@/views/Layout'
// 导入欢迎
import Welcome from '@/views/welcome'
// 导入404
import NoFound from '@/views/404'

// 导入auth
import auth from '@/utils/auth.js'

//初始化路由
const routes = [
    {path:'/login',component:Login},
    {
        path:'/',
        component:Layout,
        children:[
            // 欢迎
            {path:'/',component:Welcome}
        ]
    },
    // 404
    {
        path:'*',
        component:NoFound
    }
]

//new一个VueRouter实例
const router = new VueRouter({
    routes
})

// 导航守卫
router.beforeEach((to,from,next) => {
    // const token = auth.getUser().token
    // if(to.path !== '/login' && !token) {
    //     // 判断有没有用户信息，如果没有拦截到登录页
    //     next('/login')
    // }else {
    //     // 其他情况一律放行
    //     next()
    // }

    // 如果跳转的不是登录页并且没有token拦截在登录页，其他情况一律放行
    const loadUser = auth.getUser()
    if(to.path !== '/login' && !loadUser.token) return next('/login')
    next()
})

// 导出
export default router

