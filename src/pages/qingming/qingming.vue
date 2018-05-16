<template>
  <div class="container">
    <audio id="audio" src="https://quweifiles.mukzz.pw/h5/qingming/qingming.mp3?a=1" preload autoplay loop></audio>
    <div class="loading" v-show="!start">
      <div class="loading-content">
        <img :src="avatar" alt="" class="avatar">
        <p class="tips">友情奉献</p>
        <div class="progress">
          <div class="progress-bar" :style="{width:(count/total*100)+'%'}">
            <span>{{parseInt(count/total*100)}}%</span>
          </div>
        </div>
      </div>
    </div>
    <a v-show="start" href="javascript:void(0);" class="music" @click="playMusic" :class="[play?'play':'']">
      <img src="http://quweifiles.mukzz.pw/h5/qingming/music.png" alt="">
    </a>
    <div v-show="start" id="pageContainer" class="page-container">
      <div class="page p1">
        <img class="zhang animated fadeInDown" src="http://quweifiles.mukzz.pw/h5/qingming/zhang.png" alt="">
        <div class="avatar-box" v-if="avatar">
          <img :src="avatar" alt="" class="avatar">
          <p>友情奉献</p>
        </div>
        <div class="shi">
          <div class="wrap">
            <div class="shi-content" :class="[page===0?'show':'']">
              <img src="http://quweifiles.mukzz.pw/h5/qingming/shi1.png" alt="">
            </div>
            <div class="shi-content" :class="[page===0||page===-1?'show':'']">
              <img src="http://quweifiles.mukzz.pw/h5/qingming/shi2.png" alt="">
            </div>
          </div>
        </div>
        <img class="qing animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/qing.png" alt="">
        <img class="ming animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/ming.png" alt="">
        <img class="shijian animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/shijian.png" alt="">
        <img class="chuan" src="http://quweifiles.mukzz.pw/h5/qingming/chuan.png" alt="">
        <div class="music-list">
          <div>
            <i class="music1"></i>
            <i class="music2"></i>
            <i class="music3"></i>
          </div>
        </div>
      </div>
      <div class="page p2">
        <div class="avatar-box" v-if="avatar">
          <img :src="avatar" alt="" class="avatar">
          <p>友情奉献</p>
        </div>
        <img class="p2title animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/p2title.png" alt="">
        <img class="border animated" :class="[page===1?'slideInUp':'']" src="http://quweifiles.mukzz.pw/h5/qingming/border.png" alt="">
        <img class="text1 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text1.png" alt="">
        <img class="p2subtitle2 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle2.png" alt="">
        <img class="text2 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text2.png" alt="">
      </div>
      <div class="page p3">
        <div class="avatar-box" v-if="avatar">
          <img :src="avatar" alt="" class="avatar">
          <p>友情奉献</p>
        </div>
        <img class="p2subtitle3 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle3.png" alt="">
        <img class="text3 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text3.png" alt="">
        <img class="p2subtitle4 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle4.png" alt="">
        <img class="text4 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text4.png" alt="">
        <img class="p2subtitle5 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle5.png" alt="">
        <img class="text5 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text5.png" alt="">
      </div>
      <div class="page p4">
        <div class="avatar-box" v-if="avatar">
          <img :src="avatar" alt="" class="avatar">
          <p>友情奉献</p>
        </div>
        <img class="p2subtitle6 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle6.png" alt="">
        <img class="text6 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text6.png" alt="">
        <img class="p2subtitle7 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle7.png" alt="">
        <img class="text7 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text7.png" alt="">
        <img class="p2subtitle8 animated fadeInLeft" src="http://quweifiles.mukzz.pw/h5/qingming/p2subtitle8.png" alt="">
        <img class="text8 animated zoomIn" src="http://quweifiles.mukzz.pw/h5/qingming/text8.png" alt="">
      </div>
      <div class="page p5">
        <img src="./bg5.jpg" alt="">
      </div>
    </div>
    <img v-show="start&&page!==4" src="up.png" alt="" class="up">
  </div>
</template>

<script>
  import PageSwitch from 'pageswitch'
  import {getQueryString} from '@/assets/js/utils'
  import axios from 'axios'
  import wx from "weixin-js-sdk";

  const imgArray = [
    'http://quweifiles.mukzz.pw/h5/qingming/bg1.jpg',
    'http://quweifiles.mukzz.pw/h5/qingming/music.png',
    'http://quweifiles.mukzz.pw/h5/qingming/zhang.png',
    'http://quweifiles.mukzz.pw/h5/qingming/shi1.png',
    'http://quweifiles.mukzz.pw/h5/qingming/shi2.png',
    'http://quweifiles.mukzz.pw/h5/qingming/qing.png',
    'http://quweifiles.mukzz.pw/h5/qingming/ming.png',
    'http://quweifiles.mukzz.pw/h5/qingming/shijian.png',
    'http://quweifiles.mukzz.pw/h5/qingming/chuan.png',
    'http://quweifiles.mukzz.pw/h5/qingming/bg2.jpg',
    'http://quweifiles.mukzz.pw/h5/qingming/text1.png',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle2.png',
    'http://quweifiles.mukzz.pw/h5/qingming/text2.png',
    'http://quweifiles.mukzz.pw/h5/qingming/bg3.jpg',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle3.png',
    'http://quweifiles.mukzz.pw/h5/qingming/text4.png',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle4.png',
    'http://quweifiles.mukzz.pw/h5/qingming/text5.png',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle5.png',
    'http://quweifiles.mukzz.pw/h5/qingming/text6.png',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle6.png',
    'http://quweifiles.mukzz.pw/h5/qingming/text7.png',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle7.png',
    'http://quweifiles.mukzz.pw/h5/qingming/text8.png',
    'http://quweifiles.mukzz.pw/h5/qingming/p2subtitle8.png'
  ];

  export default{
    data(){
      return {
        page:'',
        count:0,
        total:imgArray.length,
        start:false,
        avatar:'',
        uid:'',
        play:true
      }
    },
    beforeRouteEnter(to,from,next){
      next(vm=>{
        if(getQueryString('uid')){
          vm.getAvatar(getQueryString('uid'))
            .then(res=>{
              wx.ready(function(){
                wx.onMenuShareTimeline({
                  title: '清明节友情提醒', // 分享标题
                  link: `http://seif.fsherun.cn/ceshi/h5game/qingming/index.html#/?uid=${vm.uid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: '' // 分享图标
                })
                wx.onMenuShareAppMessage({
                  title: '清明节友情提醒', // 分享标题
                  desc: '', // 分享描述
                  link:`http://seif.fsherun.cn/ceshi/h5game/qingming/index.html#/?uid=${vm.uid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: '', // 分享图标
                });
              })
            })
        }else{
          vm.peizhi()
        }
        imgArray.map(v=>{
          let img = new Image();
          img.src=v;
          img.onload=()=>{
            vm.count++;
          }
        })
      })
    },
    watch:{
      count(newVal,oldVal){
        if(newVal===imgArray.length){
          setTimeout(()=>{
              this.start = true
          },1000)
        }
      }
    },
    mounted(){
      var pw=new PageSwitch('pageContainer',{
        duration:600,			//int 页面过渡时间
        direction:1,			//int 页面切换方向，0横向，1纵向
        start:0,				//int 默认显示页面
        loop:false,				//bool 是否循环切换
        ease:'ease',			//string|function 过渡曲线动画，详见下方说明
        transition:'slide',		//string|function转场方式，详见下方说明
        freeze:false			//bool 是否冻结页面（冻结后不可响应用户操作，可以通过 `.freeze(false)` 方法来解冻）
      });
      pw.on('after',(newVal,oldVal)=>{
        console.log(newVal,oldVal)
        this.page=newVal
      });
      this.$nextTick(()=>{
        this.page=0;
        let audio = document.getElementById('audio');
        audio.play();
      })
    },
    methods:{
      getAvatar(uid){
         axios.get(`http://seif.fsherun.cn/api/qingming/get_info?uid=${uid}`)
           .then(res=>{
               this.avatar = res.data.data.headimgurl
           })
      },
      getUserInfo(appid){
          return new Promise((resolve,reject)=> {
            if (getQueryString("state") !== "1") {
              let redirectUrl = window.location.href;
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
                redirectUrl
              )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
            } else {
              let code = getQueryString("code");
              axios.get(`/api/yunshi/get_user_info?code=${code}`)
                .then(res => {
                  if (!res.data.error) {
                    this.avatar=res.data.data.headimgurl;
                    this.uid = res.data.data.uid
                  }
                })
            }
          })
      },
      peizhi(){
        axios.get(`/api/yunshi/get_wx_params?url=${encodeURIComponent(location.href.split('#')[0])}`)
          .then(res=>{
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.signature, // 必填，签名，见附录1
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            this.getUserInfo(res.data.data.appId);
          })
      },
      playMusic(){
        this.play=!this.play;
        let audio=document.getElementById('audio');
        this.play?audio.play():audio.pause();
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .container,.page-container,.loading{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    touch-action: pan-y;
  }
  .loading{
    background: url("http://quweifiles.mukzz.pw/h5/qingming/loading.jpg") no-repeat center;
    background-size: cover;
    z-index: 10001;
    .loading-content{
      position: absolute;
      bottom: 5%;
      left: 0;
      width: 100%;
      text-align: center;
      .avatar{
        margin: 20px auto;
        display: block;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        animation: shine 3s infinite;
      }
      .tips{
        font-size: 40px;
        color: #ffffff;
        font-weight: 600;
      }
      .progress{
        position: relative;
        margin: 85px auto 0;
        width: 600px;
        height: 50px;
        border-radius: 30px;
        overflow: hidden;
        background: #ffffff;
        border: 1px solid #eaeaea;
        box-sizing: border-box;
        .progress-bar{
          width: 100px;
          height: 50px;
          border-radius: 30px;
          background: #ff4949;
          transition: all .2s;
          span{
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 28px;
            text-align: center;
          }
        }
      }
    }
  }
  .music{
    display: block;
    position: fixed;
    top: 25px;
    right: 25px;
    width: 75px;
    height: 75px;
    z-index: 100;
    background: rgba(0,0,0,.5);
    border-radius: 50%;
    box-sizing: border-box;
    &.play{
      animation: rotate 4s linear infinite;
    }
    img{
      width: 75px;
      height: 75px;
    }
  }
  .page{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    .center{
      transform: translate(-50%,-50%);
    }
    .wrap{
      position: relative;
      width: 100%;
      height: 100%;
    }
    &.p1{
      background: url("http://quweifiles.mukzz.pw/h5/qingming/bg1.jpg") no-repeat center;
      background-size: cover;
      .avatar-box{
        position: absolute;
        top: 50px;
        left: 25px;
        text-align: center;
        .avatar{
          width: 80px;
          height: 80px;
          border-radius: 50%;

          margin-bottom: 10px;
        }
        p{
          font-size: 28px;
          color: #ff4949
        }
      }
      .shi{
        position: absolute;
        top:92px;
        left:446px;
        width: 110px;
        height: 258px;
        .shi-content{
          position: absolute;
          top:0;
          width: 55px;
          height: 0;
          overflow: hidden;
          &:first-child{
            left:0;
            transition: height 2s 1s;
          }
          &:last-child{
            left:60px;
            transition: height 2s;
          }
          &.show{
            height:258px
          }
          img{
            width: 55px;
            height: 258px;
          }
        }
      }
      .qing{
        position: absolute;
        top: 55px;
        left: 198px;
        width: 226px;
        height: 324px;
      }
      .ming{
        position: absolute;
        top: 365px;
        left: 304px;
        width: 215px;
        height: 272px;
        animation-delay: 0.3s !important;
      }
      .shijian{
        position: absolute;
        top: 382px;
        left: 157px;
        width: 144px;
        height: 65px;
      }
      .chuan{
        position: absolute;
        top: 952px;
        left: 131px;
        width: 93px;
        height: 37px;
        animation: translate0 5s linear infinite
      }
      .zhang{
        position: absolute;
        left: 578px;
        top: 50px;
        display: block;
        width: 58px;
        height: 108px;
      }
      .music-list{
        position: absolute;
        left: 524px;
        top: 640px;
        width: 200px;
        height: 234px;
        z-index: 10;
        &>div{
          position: relative;
          width: 100%;
          height: 100%;
          i{
            display: block;
            position: absolute;
            background: url("http://quweifiles.mukzz.pw/h5/qingming/music2.png") no-repeat center;
            background-size: contain;
          }
          .music1{
            bottom: 0;
            left: 10px;
            width: 25px;
            height: 25px;
            animation:fade0 3s ease infinite
          }
          .music2{
            bottom: 25px;
            left: 40px;
            width: 45px;
            height: 45px;
            animation-name:fade0;
            animation-duration: 3s;
            animation-delay: 0.35s;
            animation-iteration-count:infinite
          }
          .music3{
            bottom: 80px;
            left: 20px;
            width: 65px;
            height: 65px;
            animation-name:fade0;
            animation-duration: 3s;
            animation-delay: .75s;
            animation-iteration-count:infinite
          }
        }
      }
    }
    &.p2{
      background: url("http://quweifiles.mukzz.pw/h5/qingming/bg2.jpg") no-repeat center;
      background-size: cover;
      .avatar-box{
        position: absolute;
        bottom: 5%;
        left: 325px;
        text-align: center;
        .avatar{
          width: 80px;
          height: 80px;
          border-radius: 50%;

          margin-bottom: 10px;
        }
        p{
          font-size: 28px;
          color: #ff4949
        }
      }
      .p2title{
        position: absolute;
        top: 104px;
        left: 198px;
        width: 358px;
        height: 43px;
      }
      .border{
        position: absolute;
        top: 172px;
        left: 72px;
        width: 608px;
        height: 9px;
        animation-delay: .3s !important;
      }
      .text1{
        position: absolute;
        top: 204px;
        left: 80px;
        width: 586px;
        height: 172px;
        animation-delay: .6s !important;
      }
      .p2subtitle2{
        position: absolute;
        top: 548px;
        left: 76px;
        width: 250px;
        height: 34px;
        animation-delay: .9s !important;
      }
      .text2{
        position: absolute;
        top: 612px;
        left: 76px;
        width: 586px;
        height: 268px;
        animation-delay: 1.2s !important;
      }
    }
    &.p3{
      background: url("http://quweifiles.mukzz.pw/h5/qingming/bg3.jpg") no-repeat center;
      background-size: cover;
      .avatar-box{
        position: absolute;
        bottom: 5%;
        left: 325px;
        text-align: center;
        .avatar{
          width: 80px;
          height: 80px;
          border-radius: 50%;

          margin-bottom: 10px;
        }
        p{
          font-size: 28px;
          color: #ff4949
        }
      }
      .p2subtitle3{
        position: absolute;
        top: 64px;
        left: 78px;
        width: 281px;
        height: 29px;
      }
      .text3{
        position: absolute;
        top: 140px;
        left: 78px;
        width: 586px;
        height: 220px;
        animation-delay: .3s !important;
      }
      .p2subtitle4{
        position: absolute;
        top: 434px;
        left: 78px;
        width: 389px;
        height: 31px;
        animation-delay: .6s !important;
      }
      .text4{
        position: absolute;
        top: 502px;
        left: 78px;
        width: 587px;
        height: 124px;
        animation-delay: .9s !important;
      }
      .p2subtitle5{
        position: absolute;
        top: 710px;
        left: 78px;
        width: 390px;
        height: 30px;
        animation-delay: 1.2s !important;
      }
      .text5{
        position: absolute;
        top: 782px;
        left: 78px;
        width: 587px;
        height: 124px;
        animation-delay: 1.5s !important;
      }
    }
    &.p4{
      background: url("http://quweifiles.mukzz.pw/h5/qingming/bg4.jpg") no-repeat center;
      background-size: cover;
      .avatar-box{
        position: absolute;
        bottom: 5%;
        left: 325px;
        text-align: center;
        .avatar{
          width: 100px;
          height: 100px;
          border-radius: 50%;

          margin-bottom: 10px;
        }
        p{
          font-size: 28px;
          color: #ff4949
        }
      }
      .p2subtitle6{
        position: absolute;
        top: 64px;
        left: 78px;
        width: 317px;
        height: 31px;
      }
      .text6{
        position: absolute;
        top: 140px;
        left: 78px;
        width: 586px;
        height: 172px;
        animation-delay: .3s !important;
      }
      .p2subtitle7{
        position: absolute;
        top: 434px;
        left: 78px;
        width: 534px;
        height: 30px;
        animation-delay: .6s !important;
      }
      .text7{
        position: absolute;
        top: 502px;
        left: 78px;
        width: 587px;
        height: 171px;
        animation-delay: .9s !important;
      }
      .p2subtitle8{
        position: absolute;
        top: 710px;
        left: 78px;
        width: 284px;
        height: 30px;
        animation-delay: 1.2s !important;
      }
      .text8{
        position: absolute;
        top: 782px;
        left: 78px;
        width: 587px;
        height: 220px;
        animation-delay: 1.5s !important;
      }
    }
    &.p5{
      background: #000000;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
  .up{
    position: fixed;
    bottom: -49px;
    left: 50%;
    display: block;
    width: 49px;
    height: 48px;
    transform: translateX(-50%);
    animation: up 3s infinite;
    z-index: 1000;
  }

  @keyframes fade0 {
    0%{
      opacity: 1;
    }
    50%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  @keyframes translate0 {
    0%{
      transform: translateX(0);
    }
    50%{
      transform: translateX(5px);
    }
    100%{
      transform: rotate(0);
    }
  }
  @keyframes up {
    0%{
      transform: translateY(0);
      opacity: 0;
    }
    50%{
      transform: translateY(-49px);
      opacity: 1;
    }
    50.5%{
      transform: translateY(-49px);
      opacity: 0;
    }
    100%{
      transform: translateY(-49px);
      opacity: 0;
    }
  }
  @keyframes shine {
    0%{
      opacity: 0;
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  @keyframes shake {
    from, to {
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      transform: translate3d(-10px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      transform: translate3d(10px, 0, 0);
    }
  }
</style>
