<template>
  <div id="app">
    <div v-if="initFinish.state" class="app-body-mar">
      <transition :name="pageDirection" v-on:leave="bodyLeave" v-on:after-leave="afterLeave" appear>
        <router-view class="app-body"></router-view>
      </transition>
    </div>
    <loading  v-if="!initFinish.state" class="mt140"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {XButton, XHeader} from 'vux'

  export default {
    name: 'app',
    components: {
      XButton, XHeader
    },
    directives: {
    },
    computed: mapState(["pageDirection", "initFinish"]),
    data: function () {
      return {
        transitionName: 'rightIn',
        cssName: '$route'.cssName,
        cssName2: '$route'.cssName2,
      }
    },
    methods: {
      bodyLeave: function () {
        this.$store.commit('backBtnClick', false);//全局滑入动画结束事件触发，返回按钮控制动画
      },
      afterLeave: function () {
        this.$store.commit('btnBottm', true);//
      },
    },
    mounted: function () {
    },
    watch: {
      //监听路由变化，改变动画滑入方向
      '$route': function (to, from) {
        if (this.$store.state.backBtnState == true) {
          this.cssName = 'leftIn';
          this.cssName2 = 'box-left ';
        } else {
          this.cssName = 'rightIn';
          this.cssName2 = 'box-right ';
        }
      },

    }

  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';

  body {
    background-color: #fbf9fe;
  }
</style>
