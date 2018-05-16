
<template>
  <div class="web-index">
    <div class="title">
      公众号表白
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/gghbb/cover.jpg" alt="" class="cover-img">
        <div>
          <div class="small-title">赶快去生成吧</div>
          <div class="small-title-txt">大牌公众号帮你表白，实现你装逼成功的可能。</div>
        </div>

        <input type="text" maxlength="20" v-model="nickname" placeholder="请输入表白语，最多20字" class="input" v-if="options.showInput">

        <mt-button type="danger" size="large" @click="toResult" class="btn-submit btn-ok">确 定</mt-button>
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
  </div>
</template>

<script>
  import {Button, Indicator, Toast} from 'mint-ui'
  import List from '@c/list.vue'
  import FixedBottom from '@c/fixed-bottom'
  import preview from '@c/preview'
  import scriptRender from '@c/scriptRender'
  import {createQRCode,isAndroid,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  let manLink = 'http://quweifiles.mukzz.pw/web-project/gghbb/';

  export default{
    data(){

      return {
        step: 1,
        nickname: '',
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

        if(!this.nickname.trim()){
          Toast('请输入姓名');
          return
        }

        Toast('加载中..');;
        let _this = this;

        let bg = `${manLink}bg2.jpg`;

        //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
        // let prefix = "gghbb_"; //前缀，区分该区域cookie
        // let bg_src = prefix+this.nickname.trim()+this.sex; //cookie键
        // let bg_str = getCookie(bg_src); //cookie键是否存在，并返回cookie值
        // if(bg_str != ""){
        //   bg = bg_str;
        //
        // }else{
        //   setCookie(bg_src, bg, 1);
        // }

        let url = "http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp";
        console.log( bg);
        let ok_str = window.location.href;
        let url_pice = run_only(ok_str);
        url = url+"/p/"+url_pice;
        console.log(url);
        let ip_src = get_user_ip();
        console.log(ip_src);
        url = url+"/ip/"+ip_src;
        console.log(url);



        Toast('加载中..');
        let qrcode = await createQRCode(url);
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let text_left = 205;
        let text_align = "left";

        //当前时间
        let d = new Date();
        let mn = d.getMinutes();
        if(mn<10){
          mn = "0"+mn;
        }
        let _time = d.getHours()+":"+mn;
        console.log(_time);

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
                ctx.drawImage(img, 32, 1770, 145, 145);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "36px SimHei bolder";
              ctx.fillStyle = '#fff';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(_time, 87, 48);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 280);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 480);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 670);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 870);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 1060);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 1270);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 1460);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 1670);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 2050);

              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "40px 微软雅黑";
              ctx.fillStyle = '#979797';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, text_left, 2250);

              resolve()
            })
          })


          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
            Indicator.close();
            window.scrollTo(0, 0);run_btn_cal();
            Toast('生成后可长按保存图片');
            setTimeout(() => {
              if(isAndroid()){
                this.show=true;
              }else{
                wx.previewImage({
                  current: _this.result, // 当前显示图片的http链接
                  urls: [_this.result] // 需要预览的图片http链接列表
                });

              }
            }, 1500);
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

  .btn-box{
    display: none !important;
  }
  .list{
    display: none !important;
  }

  .fixed{
    display: none !important;
  }

  .title{
    background: #FFD008;
  }

  .small-title{
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: black;
    margin-top: 40px;
    margin-bottom: 30px;
    letter-spacing: 2px;
  }
  .small-title-txt{
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: grey;
    line-height: 40px;
    letter-spacing: 1px;
  }

  .btn-ok{
    background: #FFD008;
    border: 4px solid #303082;
    border-radius: 20px;
    color: #303082;
    height: 80px;
  }
  .container{
    margin-top: 1.4rem;
    padding-bottom:1rem;
  }


</style>


<!--<template>-->
    <!--<div>222</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name: "gghbb"-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
