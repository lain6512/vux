import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import NoPage from '@/components/404'
import Login from '@/views/login/login.vue'
import Member from '@/views/login/member.vue'
import About from '@/views/login/about.vue'

Vue.use(Router);
/**
 * 路由设置说明：
 * auth:true 需要登录后访问
 * scroll：true 切换页面，再返回，滚动条回来原来的位置
 */
export default new Router({
  mode: 'history',//地址栏模式，非hash没有#，部署静态服务器需要做特定设置；
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index', name: '首页', component: Index},
    {path: '/login', name: '登录', component: Login},
    {path: '/member', name: '会员中心', component: Member,meta:{auth:true}},
    {path: '/about', name: '关于框架', component: About,},
    {path: '/*', name: '页面未找到', component: NoPage}
  ],
  scrollBehavior (to, from, savedPosition) {
    //设置需要记录滚动条位置的页面
    if(to.matched.some(m => m.meta.scroll)){
      if (savedPosition) {
        return savedPosition
      } else {
        return false
      }
    }else{
      return { x: 0, y: 0 }
    }


  }
})
