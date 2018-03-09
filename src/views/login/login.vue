<template>
  <div>
    <x-header :left-options="{backText:''}"class="app-top" >登录</x-header>
    <div class="p20 align-c">
      <div data-dpr="xl" class="pt50 pb60">YOUR LOGO</div>
      <div class="align-c p20">请使用QQ一键登录</div>
      <div class="align-c pb130"><span id="qqLoginBtn"></span></div>
      <div @click="linkToHome()"><span class="f-btn bgcolor-gray">返 回</span></div>
    </div>

    <div class="info pb30" data-dpr="s">请在pc电脑上授权登录</div>
    <div class="info gray4" data-dpr="s">Github: https://github.com/lain6512/vux</div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {XButton,XHeader,md5} from 'vux'
  import {mapState} from 'vuex'

  export default {
    components: {XButton,XHeader},
    name: 'Login',
    data: function () {
      return {
        qqLoginFinish:false,
        reqData:'',//qq登录返回数据
      }
    },
    mounted: function () {
      this.checkQQ()

      if (!this.currentUser) {
        this.initQQlogin();
      }else{
        var url = this.$router.history.current.query.Rurl
        console.log("登录前url:"+url)
        if(url == null || url=='' || url== undefined){
          this.$router.replace({path: '/member'})
        }else{
          this.$router.replace({path: url})
        }

      }
    },
    computed: mapState(["currentUser","outLogin"]),//显示全局参数第二种方法
    methods: {
      //QQ登录
      initQQlogin: function () {
        var self = this;
        //业务逻辑
        if (this.currentUser) {
          console.log("【bmob已登录】");
        } else {
          console.log("【bmob未登录】");
          if (QC.Login.check()) {
            console.log("【QQ已登录】");
            QC.Login.getMe(function (openId, accessToken) {
              self.bmobLoginGo(openId,null);
            });

          } else {
            console.log("【QQ未登录】");
            QC.Login({
              btnId: "qqLoginBtn",//插入按钮的节点id
              //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
              size: "A_L"
            }, function (reqData, opts) {
              console.log("【QQ登录成功】");
              self.qqLoginFinish =true
              self.reqData =reqData
              window.QBloginUserInfo = reqData;//保存返回用户信息
              return
            });
          }
        }
      },
      /**
       * bmob登录方法，成功后返回user信息给回调函数
       * @param openId {string}
       */
      bmobLoginGo: function (openId, reqData) {
        var self = this;
        var pass =this.pass(openId)
        Bmob.User.logIn(openId, pass, {
          success: function (user) {
            console.log("bmob登录成功");
            self.$store.commit('updateData', user);
            self.$router.replace({path: self.$route.query.Rurl})//跳转回去登录前页面
          },
          error: function (user, error) {
            console.log("bmob登录失败");
            console.log(user);
            console.log(error);
            if (error.code && error.code == "101") {

              /**
               * bmob注册方法，用户名是openid,密码根据一定规则设置，
               * @param openId {string}
               */
                // console.log("注册 reqData:")
                // console.log(reqData)
              var bmobUser = new Bmob.User();
              bmobUser.set("username", openId);
              bmobUser.set("password", pass);
              bmobUser.set("nickName", reqData.nickname);
              bmobUser.set("userNameInfo", reqData);
              // bmobUser.set("myPhoto", []);

              bmobUser.signUp(null, {
                success: function (user) {
                  console.log("bmob册成功");
                  // console.log(user);
                  self.$store.commit('updateData', user);
                  self.$router.replace({path: self.$route.query.Rurl})//跳转回去登录前页面
                },
                error: function (user, error) {
                  console.log("bmob注册失败");
                  console.log(user);
                  console.log(error);
                  alert("Error: " + error.code + " " + error.message);
                }
              });


            }
          }
        });
      },
      //加密
      pass: function (openId) {
        if(openId =='' || openId==!undefined || !openId){
          console.log("openId 获取不到")
          return false
        }
        var passWord = ''
        passWord = openId+'77493b2a'
        passWord = md5(passWord.split("").reverse().join(""))
        return passWord
      },
      //返回首页按钮
      linkToHome: function () {
        this.$router.push({path: '/'})
      },
      //检测qq文件是否加载
      checkQQ:function () {
        var errNum = 0;
        //【定时器】检查qq第二个文件是否加载进来
        var watchQQ = setInterval(function () {
//          console.log("===> QC.Login loading.......");
          if (isError('QC')) {
            clearInterval(watchQQ);
          } else {
          }
        }, 400);

        function isError(fn) {
          try {
            eval(fn)
          } catch (e) {
            console.log("未加载，出错了");
             errNum++;
             if(errNum > 3){
               clearInterval(watchQQ);
                 alert("网路不给力，重新加载");
                 location.reload();
               return
             }
            return false;
          }
          return true;
        }

      }
    },
    watch:{
      /**
       * 多次切换页面路由，QC.Login()的回调函数会多次执行，避免重复执行，采用监听方式
       * @param val
       * @param oldVal
       */
      qqLoginFinish:function (val, oldVal) {
        console.log("qqLoginFinish:"+val)
        console.log(oldVal)
        var self = this;
        if(val){
          QC.Login.getMe(function (openId, accessToken) {
            self.bmobLoginGo(openId, self.reqData);
          });
        }


      }
    }

  }

</script>

<style scoped>
  .logo{
    width: 80px;
    height: 80px;
    border-radius: 100px;
    overflow: hidden;
    margin:0 auto;
  }
  .logo.scale-1px:after{
    border:#e7e7e7 1px solid;
    border-radius: 100px;
  }
  .info{
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
  }
</style>
