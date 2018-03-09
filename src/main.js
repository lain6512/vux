import Vue from 'vue'
import FastClick from 'fastclick'
import './assets/css/base.less';
import './assets/css/css.less';
import './assets/css/font/iconfont.js';//字体图标js
import store from './vuex/store.js';
import App from './App'
import Loading from "./components/loading/index"//全局loading
import router from './router/index.js';//路由配置文件
import axios from 'axios';//http请求组件
import BeforEach from './router/beforEach.js';
import  { ConfirmPlugin,ToastPlugin,LoadingPlugin,AlertPlugin } from 'vux'

Vue.use(Loading);
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

router.beforeEach((to, from, next) => {
  console.log('%c ---------------------------------------------------------------------------------------------------------------------------- 路由-->： ' + to.path,'color: #ccc');
  store.commit('btnBottm',false);//底部漂浮按钮隐藏
  BeforEach.watchInitFinish(to, from, next);//监听初始化状态
});

FastClick.attach(document.body);
Vue.config.productionTip = false;
/* eslint-disable no-new */

var vm = new Vue({
  router,
  store,
  render: h => h(App),
  methods: {},
  mounted: function () {
    store.dispatch('initAppData');//初始化
  },
  watch: {
    //监听初始设定数据
    '$store.state.initFinish': {
      deep: true,
      handler(val, oldVal) {
        if (store.state.initFinish.userInfo) {
          console.log('初始化完成')
          store.state.initFinish.state = true;
        }
      }
    }
  }

}).$mount('#app-box');
Vue.prototype.$axios = axios


