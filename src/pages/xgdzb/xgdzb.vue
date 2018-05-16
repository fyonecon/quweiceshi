<template>
  <div class="web-index">
    <div class="title">
      性格大字报
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/xgdzb/cover.jpg" alt="" class="cover-img">
        <input type="text" v-model="nickname" placeholder="请输入姓名" class="input" v-if="options.showInput">
        <div class="radio-box" v-if="options.showRadio">
          <label for="man">
            <input type="radio" id="man" name="sex" v-model="sex" value="male"> 我是男生
          </label>
          <label for="woman">
            <input type="radio" id="woman" name="sex" v-model="sex" value="female"> 我是女生
          </label>
        </div>
        <mt-button type="danger" size="large" @click="toResult" class="btn-submit">确 定</mt-button>
      </div>
    </div>
    <!--列表-->
    <list></list>
    <!-- 更多测试按钮-->
    <div class="btn-box">
      <mt-button type="primary" size="large" @click="$router.push('/')" class="scale">更多测试 <i
        class="iconfont icon-next"></i></mt-button>
    </div>
    <!-- 固定在底部的按钮-->
    <fixed-bottom></fixed-bottom>
    <!--安卓预览蒙层-->
    <preview :pic="result" @close="close" :show="show"></preview>
    <!--统计代码-->
    <!--<p style="display: none">-->
      <!--<script-render :src="count"></script-render>-->
    <!--</p>-->
  </div>
</template>

<script>
  import {Button, Indicator, Toast} from 'mint-ui'
  import List from '@c/list.vue'
  import preview from '@c/preview'
  import FixedBottom from '@c/fixed-bottom'
  import scriptRender from '@c/scriptRender'
  import {createQRCode,isAndroid,getQueryString,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"
  import {getUserInfo} from '@api/weixin'

  let manLink = 'http://quweifiles.mukzz.pw/web-project/xgdzb/';

  export default{
    data(){
      return {
        step: 1,
        nickname: '',
        sex: '',
        options: {showRadio: false, showInput: false},
        result: '',
        count: '',
        show:false
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        getHost(1)



          .then(res=>{
            return
            if (getQueryString("state") !== "1") {
              let redirectUrl = window.location.href;
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.appId}&redirect_uri=${encodeURIComponent(
                redirectUrl
              )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
            } else {
              return res
            }
          })
          .then(res => {
            return
//            vm.count = res.statistics;

              countDetail(to)
            return getUserInfo(res.appId)
          })
          .then(userInfo => {
            return
            vm.nickname = userInfo.nickname;
            vm.avatar = userInfo.avatar
          })
      })
    },
    mounted(){
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    },
    methods: {
      close(){
        this.show=false
      },
      async toResult(){
        Toast('加载中..');;
        let _this = this;
        let bg = `${manLink}${Math.round(Math.random() * 7)}.jpg`;
        let url = "http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp";        console.log( bg);        let ok_str = window.location.href;        let url_pice = run_only(ok_str);        url = url+"/p/"+url_pice;        console.log(url);        let ip_src = get_user_ip();        console.log(ip_src);        url = url+"/ip/"+ip_src;        console.log(url);
        Toast('加载中..');;
        let qrcode = await createQRCode(url);
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        new Promise((resolve, reject) => {
          let img = new Image();
          img.crossOrigin = "anonymous";
          img.src = bg;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            resolve()
          }
        })
          .then(() => {
            return new Promise((resolve, reject) => {
              let img = new Image();
              img.crossOrigin = "anonymous";
              img.src = qrcode;
              img.onload = () => {
                ctx.drawImage(img, 496, 795, 120, 120);
                resolve()
              }
            })
          })
          // .then(() => {
          //   return new Promise((resolve, reject) => {
          //     let img = new Image();
          //     img.crossOrigin = "anonymous";
          //     img.src = _this.avatar;
          //     img.onload = () => {
          //       ctx.save();
          //       // 圆心 x,y,半径，起始角度，结束角度
          //       ctx.arc(208, 208, 50, 0, 2 * Math.PI);
          //       // 从画布上裁剪出这个圆形
          //       ctx.clip();
          //       ctx.drawImage(img, 158, 158, 100, 100);
          //       ctx.restore();
          //       resolve()
          //     }
          //   })
          // })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "50px 微软雅黑";
              ctx.fillStyle = '#333333';
              ctx.textAlign = "left";
              ctx.fillText(_this.nickname, 300, 230);
              resolve()
            })
          })
          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
            Indicator.close();
            window.scrollTo(0, 0);run_btn_cal();
            if(isAndroid()){
              this.show=true
            }else{
              wx.previewImage({
                current: _this.result, // 当前显示图片的http链接
                urls: [_this.result] // 需要预览的图片http链接列表
              });
            }
          })
      }
    },
    components: {
      List,
      'mt-button': Button,
      scriptRender,
      FixedBottom,
      preview
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../assets/scss/temp';
</style>
