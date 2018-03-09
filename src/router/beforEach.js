import store from '../vuex/store.js';
export default {
    /**
     * 检验是否登录
     */
    watchInitFinish: function (to, from, next) {

        //是否登录校验
        if (to.matched.some(m => m.meta.auth)) {
            if (store.state.currentUser) {
                this.urlHistory(to, from, next)
            } else {
                console.log("路由钩子判断未登录");
                // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
                next({path: '/login', query: {Rurl: to.fullPath}});
            }
        } else {
            this.urlHistory(to, from, next)
        }

    },
    /**
     *路由切换，判断前进后退，控制左右滑入动画
     */
    urlHistory:function(to, from, next){
        //console.log("执行 urlHistory")
        let routeLength = store.state.routeChain.length;
        if (routeLength === 0) {
            store.commit('setPageDirection', 'leftIn');
            if (to.path === from.path && to.path === '/') {
                //当直接打开根路由的时候
                store.commit('addRouteChain', to);
            } else {
                //直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
                store.commit('addRouteChain', from);
                store.commit('addRouteChain', to);
            }
        } else if (routeLength === 1) {
            store.commit('setPageDirection', 'rightIn');
            store.commit('addRouteChain', to);
        } else {
            let lastBeforeRoute = store.state.routeChain[routeLength-2];
            if (lastBeforeRoute.path === to.path) {
                store.commit('popRouteChain');
                store.commit('setPageDirection', 'leftIn');
            } else {
                store.commit('addRouteChain', to);
                store.commit('setPageDirection', 'rightIn');
            }
        }
        next();

    }
}
