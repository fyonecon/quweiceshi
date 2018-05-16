<template>
  <div class="web-index">
    <div class="title">
      你的2018标签
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/2018bq/cover.jpg" alt="" class="cover-img">
        <input type="text" v-model="nickname2" placeholder="请输入姓名" class="input" v-if="options.showInput">
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
  import FixedBottom from '@c/fixed-bottom'
  import preview from '@c/preview'
  import scriptRender from '@c/scriptRender'
  import {createQRCode, isAndroid, countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"
  import {getUserInfo} from '@api/weixin'
  import Cookie from 'js-cookie'

  let manLink = 'http://quweifiles.mukzz.pw/web-project/2018bq/';

  export default{
    data(){
      return {
        step: 1,
        nickname2: '',
        sex: '',
        avatar: '',
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
          .then(res => {
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
    methods: {
      close(){
        this.show = false
      },
      async toResult(){
        if (!this.nickname2.trim()) {
          Toast('请输入姓名');
          return;
        }
        Toast('加载中..');;
        let _this = this;
        let bg = `${manLink}${Math.round(Math.random() * 14)}.jpg`;
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
                ctx.drawImage(img, 468, 1119, 140, 140);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "50px 微软雅黑";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "center";
              ctx.fillText(`2018狗年标签`, 375, 192);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "34px 微软雅黑";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "left";
              ctx.fillText(`${_this.nickname2}`, 546, 290);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "30px 微软雅黑";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "right";
              ctx.fillText('想知道你的标签如何？', 450, 1180);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "30px 微软雅黑";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "right";
              ctx.fillText('长按识别查看', 450, 1220);
              resolve()
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
          //       ctx.arc(372, 667, 80, 0, 2 * Math.PI);
          //       // 从画布上裁剪出这个圆形
          //       ctx.clip();
          //       ctx.drawImage(img, 292, 587, 160, 160);
          //       ctx.restore();
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
      preview
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../assets/scss/temp';
</style>
