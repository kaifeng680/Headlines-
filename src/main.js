import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui' // 引入UI
import Component from './components' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入初始化样式
import axios from './utils/axios.config'

Vue.prototype.$axios = axios // 给Vue对象的原型属性赋值 那么所有vue实例自动拥有$axios
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册elementui 组件 任意组件都可以使用
Vue.use(Component)// 全局注册自定义组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
