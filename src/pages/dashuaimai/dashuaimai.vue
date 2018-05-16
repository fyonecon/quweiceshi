

<template>
  <div class="web-index">
    <div class="title">
      520大甩卖
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <!--<img src="http://quweifiles.mukzz.pw/web-project/dashuaimai/cover.jpg" alt="" class="cover-img">-->
        <div style="margin-bottom: 20px;">
          <div class="small-title">经营项目</div>
          <div class="small-title-txt">牵手？！亲嘴儿？！看电影？！假装情侣？！</div>
        </div>
        <div class="clip-box">
          <img src="" id="clip-img" ref="clip_img" class="clip-img float-left" alt="裁剪图"/>
          <a class="up-img-a" href="../play_h5/files/clip-img/index.html">上传图片</a>
          <div class="clear"></div>

          <clip-img></clip-img>
        </div>

        <input type="text" maxlength="4" v-model="nickname" placeholder="请输入姓名" class="input" v-if="options.showInput">

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
  import ClipImg from '@c/clip-img'
  import preview from '@c/preview'
  import scriptRender from '@c/scriptRender'
  import {createQRCode,isAndroid,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  let manLink = 'http://quweifiles.mukzz.pw/web-project/dashuaimai/';

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
    mounted(){ //操作dom
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
      this.init();
    },
    methods: { //各种函数方法
      close(){
        this.show=false
      },
      init() {
        let clip = localStorage.getItem("clip_img");

        if(!clip){
          console.log("裁图为空时使用默认图片");
          this.$refs.clip_img.src = "http://quweifiles.mukzz.pw/web-project/dashuaimai/null.jpg"; // 读取标签dom
          return;
        }

        this.$refs.clip_img.src = clip; // 读取标签dom
      },
      async toResult(){

        if(!this.nickname.trim()){
          Toast('请输入姓名');
          return
        }

        Toast('加载中..');
        let _this = this;

        let bg = `${manLink}bg.jpg`; //背景图
        let clip = localStorage.getItem("clip_img"); //裁剪图

        //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
        // let prefix = "dashuaimai_"; //前缀，区分该区域cookie
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
        let text_align = "left";

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
                ctx.drawImage(img, 63, 921, 125, 125);
                resolve()
              }
            })
          })

          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "50px 微软雅黑 bold";
              ctx.fillStyle = '#ffffff';
              ctx.textAlign = text_align;
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, 40, 100);
              resolve()
            })
          })

          .then(() => {
            return new Promise((resolve, reject) => {
              let img = new Image();
              img.crossOrigin = "anonymous";
              img.src = clip;
              img.onload = () => {
                ctx.beginPath();

                ctx.arc(183,451,120,0, 2*Math.PI); //画裁剪区域，此处以圆为例
                ctx.clip(); //次方法下面的部分为待剪切区域，上面的部分为剪切区域

                ctx.drawImage(img, 63, 321, 260, 260);
                resolve()
              }
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
      ClipImg,
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

  .up-img-div{
    display: inline-block;
  }

  .up-img-a{
    font-size: 30px;
    padding: 15px 40px;
    background: grey;
    color: #f5f5f5;
    border-radius: 50px;
    margin-left: 30px;
    margin-top: 80px;
    float: right !important;
  }
  .clear{
    clear: both;
  }
  .float-left{
    float: left;
  }
  .clip-img{
    border: 2px solid #eee;
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



<!--<template>-->

  <!--<div>123</div>-->

<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name: "dashuaimai"-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
