import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册
Vue.use(ElementUI)
// 导入router
import router from '@/router'

// 导入axios
import axios from '@/api'
// 挂载全局
Vue.prototype.$http = axios

// 导入自己的插件
import plugin from '@/plugin'
// 注册
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  // 注册
  router,
  render: h => h(App)
}).$mount('#app')
