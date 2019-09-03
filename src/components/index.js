import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
// 定义所有自定义组件的插件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
