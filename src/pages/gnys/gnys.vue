<template>
  <div class="web-index">
    <div class="title">
      你的狗年运势 🐶
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/gnys/bg.jpg" alt="" class="cover-img">
        <input @click="openPicker" class="input" type="text" readonly :value="birth|transformDate"
               placeholder="请选择自己的生日">
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
    <data-picker v-model="birth"
                 type="date"
                 ref="picker"
                 :startDate="new Date('1950/1/1')"
                 :endDate="new Date()"
                 @confirm="handleConfirm"
    >
    </data-picker>
    <!--安卓预览蒙层-->
    <preview :pic="result" @close="close" :show="show"></preview>
    <!--统计代码-->
    <!--<p style="display: none">-->
    <!--<script-render :src="count"></script-render>-->
    <!--</p>-->
  </div>
</template>

<script>
  import {Button, Indicator, Toast,DatetimePicker} from 'mint-ui'
  import List from '@c/list.vue'
  import preview from '@c/preview'
  import FixedBottom from '@c/fixed-bottom'
  import scriptRender from '@c/scriptRender'
  import {createQRCode, isAndroid, countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"
  import {getUserInfo} from '@api/weixin'

  let manLink = 'http://quweifiles.mukzz.pw/web-project/gnys/';

  export default{
    data(){
      return {
        step: 1,
        nickname: '',
        sex:'',
        birth: "",
        options: {showRadio: false, showInput: true},
        result: '',
        count: '',
        show: false
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {

        return;

        getHost(1)
          .then(res=>{
            return getUserInfo(res.appId)
          })
          .then(userInfo => {
            countDetail(to);
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
    filters: {
      transformDate(value) {
          console.log(value);
        if (value) {
          let date = new Date(value);
          return `${date.getFullYear()}年${date.getMonth() +
          1}月${date.getDate()}日`;
        } else {
          return "";
        }
      }
    },
    methods: {
      handleConfirm(e) {
        this.birth = e;
      },
      openPicker() {
        this.$refs.picker.open();
      },
      close(){
        this.show = false
      },
      async toResult(){

        if (!this.birth) {
          Toast('请选择生日');
          return
        }
        Toast('加载中..');;
        let _this = this;
        let bg = `${manLink}${Math.round(Math.random() * 12)}.jpg`;
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
                ctx.drawImage(img, 270, 948, 180, 180);
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
          //       ctx.arc(229, 205, 50, 0, 2 * Math.PI);
          //       // 从画布上裁剪出这个圆形
          //       ctx.clip();
          //       ctx.drawImage(img, 179, 155, 100, 100);
          //       resolve()
          //     }
          //   })
          // })
          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
            Indicator.close();
            window.scrollTo(0, 0);run_btn_cal();
            if (isAndroid()) {
              this.show = true
            } else {
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
      preview,
      "data-picker": DatetimePicker
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../assets/scss/_temp';
</style>
