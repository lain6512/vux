<template>
    <div class="loader">
        <div class="loadEffect">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'home',
        data: function () {
            return {
            }
        }
    }
</script>

<style scoped>
    .loader.hide{
        display: none;

    }
    .loadEffect{
        width: 50px;
        height: 50px;
        position: relative;
        margin: 0 auto;
        /*margin-top:100px;*/
        animation: show 0.6s;
    }
    @-webkit-keyframes show {
      0% {
        opacity: 0;
      }
      70% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .loadEffect span{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background:#cccccc;
        position: absolute;
        -webkit-animation: load 1.04s ease infinite;
    }
    @-webkit-keyframes load{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0.1;
        }
    }
    .loadEffect span:nth-child(1){
        left: 0;
        top: 50%;
        margin-top:-8px;
        -webkit-animation-delay:0.13s;
    }
    .loadEffect span:nth-child(2){
        left: 7px;
        top: 7px;
        -webkit-animation-delay:0.26s;
    }
    .loadEffect span:nth-child(3){
        left: 50%;
        top: 0;
        margin-left: -4px;
        -webkit-animation-delay:0.39s;
    }
    .loadEffect span:nth-child(4){
        top: 7px;
        right:7px;
        -webkit-animation-delay:0.52s;
    }
    .loadEffect span:nth-child(5){
        right: 0;
        top: 50%;
        margin-top:-4px;
        -webkit-animation-delay:0.65s;
    }
    .loadEffect span:nth-child(6){
        right: 7px;
        bottom:7px;
        -webkit-animation-delay:0.78s;
    }
    .loadEffect span:nth-child(7){
        bottom: 0;
        left: 50%;
        margin-left: -4px;
        -webkit-animation-delay:0.91s;
    }
    .loadEffect span:nth-child(8){
        bottom: 7px;
        left: 7px;
        -webkit-animation-delay:1.04s;
    }
</style>
