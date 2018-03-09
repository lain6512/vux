<template>
  <div>
    <x-header :left-options="{backText:''}" class="app-top">我的信息</x-header>
    <flexbox :gutter="0" class="f-list vux-1px-b  vux-1px-t">
      <flexbox-item :span="3/12" class="align-c flex-row">
        <div class="f-head-map w5 scale-1px">
          <img :src="userData.figureurl_qq_2">
        </div>
        <div class="name"></div>
      </flexbox-item>
      <flexbox-item :span="8/12">
        <div class="title">{{userData.nickname}}</div>
        <div class="introduction"></div>
        <div class="num gray4">
          <span>{{userData.province}} {{userData.city}}</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/12">
      </flexbox-item>
    </flexbox>

    <group class="mt20 font14">
      <cell title="关于框架" is-link link="/about"></cell>
      <cell title="版本" disabled value="V1.00"></cell>
    </group>

    <br><br><br><br><br>
    <br><br><br><br><br>

    <div class="p20">
      <x-button @click.native="$store.commit('outLogin')">退出登录</x-button>
    </div>
    <div class="p20">
      <x-button @click.native="$router.go(-1)">返回</x-button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {XButton, Flexbox, FlexboxItem, Group, Cell, CellBox, XHeader} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'member',
    components: {
      XButton, Flexbox, FlexboxItem, Group, Cell, CellBox, XHeader
    },
    data: function () {
      return {
        title: '个人中心',
        userData:''
      }
    },
    computed: mapState(["currentUser"]),
    created: function () {
      this.$store.commit('setPageDirection', 'leftIn');
    },
    mounted: function () {
      this.userData = this.currentUser.attributes.userNameInfo
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .f-list{
    padding:10px 0;
    background: #ffffff;
    .name{
      padding: 5px 10px 0 10px;
      line-height: 14px;
    }
    .title{
      font-size:16px;
      color: #fe649a;
    }
    .introduction{
      color: #999999;
      line-height: 14px;
      padding:3px 0;
    }
    .num{
      span{
        width: 40%;
        display: inline-block;
      }
    }
  }
</style>
