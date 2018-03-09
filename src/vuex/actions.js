import {md5} from 'vux'
export default {
    //初始化app数据
    initAppData:function(context,parm){
        console.log('----------------执行全局方法 initAppData（）-------------------');
        Bmob.initialize(context.state.bmob_appId, context.state.bmob_apiKey);//初始化Bmob
        context.currentUser = Bmob.User.current();


        //登录逻辑
        var errNum = 0;
        if(context.currentUser){
            console.log("【bmob已登录】");
            context.commit('updateData',context.currentUser);
            var parm = {
              userId:context.currentUser.id
            }
            context.commit('getBmobUserInfo',parm);

        }else{
            console.log("【bmob未登录】");
            //【定时器】检查qq第二个文件是否加载进来
                if(isError('QC')){
                    //登录判断逻辑
                    if(QC.Login.check() && context.state.outLogin == false){
                        console.log("【QQ已登录】");
                        QC.Login.getMe(function(openId, accessToken){
                            var parm ={};
                            parm.openId = openId;

                          //密码规则
                          var passWord = ''
                          passWord = openId+'77493b2a'
                          passWord = md5(passWord.split("").reverse().join(""))

                            Bmob.User.logIn(openId, passWord, {
                                success: function(user) {
                                    console.log("bmob登录成功");
                                    console.log(user);
                                    context.commit('getBmobUserInfo',parm);
                                },
                                error: function(user, error) {
                                    console.log("bmob登录失败");
                                    console.log(error);
                                }
                            });
                        });
                    }else{
                        console.log("【QQ未登录】");
                        context.state.initFinish.userInfo =  true;
                        context.commit('updateData',false);
                    }
                }else{
                  console.log("QC.Login 未加载");
                  context.state.initFinish.userInfo =  true;
                  context.commit('updateData',false);
                }



            function isError(fn) {
                try {
                    eval(fn)
                } catch (e) {
                    console.log(e.name + ": " + e.message);
                    console.log("未加载，出错了");
                    errNum++;
                    if(errNum > 20){
                        alert("网路不给力，重新加载");
                        location.reload();
                    }
                    return false;
                }
                return true;
            }


        }

    },

}
