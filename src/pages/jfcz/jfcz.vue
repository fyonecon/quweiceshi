<template>
  <div class="web-index">
    <div class="iframe">
      <iframe id="iframe" :src="location" :width="width" :height="height" frameborder="0" scrolling="no"></iframe>
    </div>
    <!-- 固定在底部的按钮-->
    <fixed-bottom></fixed-bottom>
  </div>
</template>

<script>
  import {Indicator, Toast} from 'mint-ui'
  import FixedBottom from '@c/fixed-bottom'
  import {countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  export default{
    data(){
      return {
        location:'',
        width:'',
        height:''
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        getHost(1)
          .then(res=>{
            wx.ready(function () {
              wx.showMenuItems({
                menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"]
              });
              wx.onMenuShareTimeline({
                title: '见缝插针', // 分享标题
                link: `http://${window.location.host}/ceshi/index.html#/corners`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
              });
              wx.onMenuShareAppMessage({
                title: '见缝插针', // 分享标题
                desc: '', // 分享描述
                link: `http://${window.location.host}/ceshi/index.html#/corners`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
              });
            });
            countDetail(to);
            vm.width = window.innerWidth;
            vm.height = window.innerHeight;
            vm.location='http://seif.fsherun.cn/ceshi/h5game/corners/index.html';
          })
      })
    },
    mounted(){
      this.$nextTick(() => {
        window.scrollTo(0, 0);run_btn_cal();
      })
    },
    methods: {

    },
    components: {
      FixedBottom
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../assets/scss/temp';

  .iframe{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
  }
</style>
