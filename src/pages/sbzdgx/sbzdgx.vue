<template>
  <div class="web-index">
    <div class="title">
      你和Ta上辈子是什么关系 💓
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/sbzdgx/cover.png" alt="" class="cover-img">
        <input type="text" v-model="nickname" placeholder="请输入对方的名字" class="input" v-if="options.showInput">
        <input type="text" v-model="nickname2" placeholder="请输入您的名字" class="input" v-if="options.showInput">
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
  import {createQRCode,isAndroid,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  let manLink = 'http://quweifiles.mukzz.pw/web-project/sbzdgx/';

  export default{
    data(){
      return {
        step: 1,
        nickname: '',
        nickname2: '',
        sex: '',
        options: {showRadio: false, showInput: true},
        result: '',
        count: '',
        show:false
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        getHost(1)
          .then(res => {
//            vm.count = res.statistics;
            countDetail(to)
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

        if (!this.nickname.trim()) {
          Toast('请输入对方的名字');
          return
        }
        if (!this.nickname2.trim()) {
          Toast('请输入您的名字');
          return
        }
        Toast('加载中..');;
        let _this = this;
        let bg = `${manLink}${Math.round(Math.random() * 13)}.jpg`;
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
                ctx.drawImage(img, 438, 817, 110, 110);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "50px 黑体";
              ctx.fillStyle = '#ff4949';
              ctx.textAlign = "right";
              ctx.fillText(`${_this.nickname}`, 273, 270);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "50px 黑体";
              ctx.fillStyle = '#ff4949';
              ctx.textAlign = "left";
              ctx.fillText(`${_this.nickname2}`, 335, 270);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "20px 微软雅黑";
              ctx.fillStyle = '#ff4949';
              ctx.textAlign = "center";
              ctx.fillText('长按识别就能看你的', 507, 967);
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
