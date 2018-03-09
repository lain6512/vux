<template>
  <div class="">
    <h2 class="align-c mt100">Vue2.js+Bmob后端云+QQ授权登录<br>集成框架</h2>
    <div class="pt20 pb50 align-c" data-dpr="s">v1.0</div>
    <div class="p20">
      <router-link to="/login"><x-button>登录</x-button></router-link>
    </div>
    <div class="p20">
      <router-link to="/member"><x-button>会员中心</x-button></router-link>
    </div>
    <div class="p20">
      <router-link to="/about"><x-button>关于</x-button></router-link>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import { XButton,XHeader } from 'vux'

export default {
  components: {
    XButton,XHeader
  },
  computed: mapState(["headShow"]),
  data:function (){
    return {
      title: '首页',
    }
  },
  mounted:function(){
  },
  methods:{
  }
}
</script>
<style scoped>
</style>
