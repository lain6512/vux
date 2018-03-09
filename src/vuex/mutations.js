import beforEach from "../router/beforEach";
export default {
    //更新数据
    updateData:function(state,user){
        if(user){
          state.userInfo = user.attributes;
          state.currentUser = Bmob.User.current();
            // state.initFinish.userInfo =  true;
        }
    },
    /**
     * 获取bmob用户id
     * @param userId {string}
     */
    getBmobUserInfo:function(state,parm,back){
        var User = Bmob.Object.extend("_User");
        var query = new Bmob.Query(User);
        query.get(parm.userId, {
            success: function(data) {
                console.log("更新用户数据成功");
                console.log(data);
                state.userInfo =  data.attributes;//保存用户信息到全局
                state.currentUser = data;
                state.initFinish.userInfo =  true
            },
            error: function(object, error) {
                console.log("更新用户数据失败");
                console.log(object);
                console.log(error);
            }
        });
    },

    //退出登录
    outLogin: function (state) {
      console.log("退出登录");
      Bmob.User.logOut();

      //清除所有cookie，刷新页面
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      location.reload();
    },
    //点击返回按钮，控制页面左右方向滑入动画
    backBtnClick:function(state,isBack){
        state.backBtnState = isBack;
    },


    //路由切换动画相关
    addRouteChain(state, route){state.routeChain.push(route);},
    popRouteChain(state){state.routeChain.pop();},
    setPageDirection(state, dir){state.pageDirection = dir;},

    //底部浮动框
    btnBottm:function(state,isShow){
      if(isShow == true){
        state.show_btnBottm = true;
      }else{
        state.show_btnBottm = false;
      }
    },

}
