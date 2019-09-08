import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main.vue'
import NotFound from './views/404.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: NotFound // 匹配所有找不到家的孩子
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '', // 默认的耳机路由为空字符串
          component: Main
        },
        {
          path: 'comment', // 评论管理
          component: () => import('./views/comment')
        },
        {
          path: 'material', // 素材管理
          component: () => import('./views/material')
        }, {
          path: 'articles', // 内容列表
          component: () => import('./views/articles')
        },
        {
          path: 'publish', // 发布文章
          component: () => import('./views/publish')
        }, {
          path: 'publish/:articleId', // 修改文章   定义动态路由
          component: () => import('./views/publish')
        },
        {
          // 账户信息
          path: 'account',
          component: () => import('./views/account')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
