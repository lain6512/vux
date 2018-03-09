<template>
  <div>
    <x-header :left-options="{backText:''}" class="app-top">关于框架</x-header>
    <div class="p20" data-dpr="m">
      <span class="bold">包括模块：</span><br>
      vue<br>
      vue-router<br>
      vuex<br>
      vux<br>
      axios<br>
      webpack<br>


      <br>
      <span class="bold">功能：</span><br>
      QQ js-sdk授权；<br>
      bmob后端云注册、登录；<br>
      切换页面左右滑入画出动画；<br>
      未登录判断和跳转，登录后返回之前页面；<br>
      初始化完成前的loading；<br>


      <br>
      <span class="bold">Github地址：</span><br>
      https://github.com/lain6512/vux<br>
      <div class="p20 mt60">
        <x-button @click.native="$router.go(-1)">返回</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XButton,XHeader} from 'vux'
  import {mapState} from 'vuex'

  export default {
    components: {
      XButton, XHeader
    },
    data: function () {
      return {
        title: '关于框架',
        userData:''
      }
    },
    computed: mapState(["currentUser"]),
    mounted: function () {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
</style>
