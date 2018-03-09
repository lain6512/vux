export default {
  //设置
  bmob_appId:'037efc641ecfa2f2ce6bd0639d881f92',//bmob Application ID
  bmob_apiKey:'e1b9415b3d31ccedbd1869353608bf22',//bmob REST API Key

  //状态类
  currentUser: false,//登录用户状态
  outLogin: false,//退出登录状态

  //初始化状态,只记录状态
  initFinish: {
    state: false,//总状态
    userInfo: false,//用户信息
  },

  //数据存放
  userInfo: {},//用户信息
  //dom显示隐藏
  show_btnBottm: false,//底部漂浮按钮


  //路由相关
  count: 1,
  pageDirection: 'leftIn',
  routeChain: []
}
