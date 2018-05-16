<template>
  <div class="character">
    <!--https://quweifiles.mukzz.pw/character/1.mp3-->
    <audio id="audio" :src="ques[number].music" loop autoplay></audio>
    <div class="loading" v-show="!loadDone">
      <div class="loading-text">
        加载中
      </div>
    </div>
    <div class="container" v-show="loadDone">
      <div class="start" v-show="testShow" :style="{backgroundImage: `url(${startBg})`}">
        <input type="text" class="nickname" maxlength="4"
               v-show="this.startBg === 'http://quweifiles.mukzz.pw/character/O_bg.jpg'"
               placeholder="请输入昵称" v-model="nickname" @focus="hide" @blur="showBtn">
        <img v-show="!hideBtn" src="http://quweifiles.mukzz.pw/character/start-btn.png" alt="" class="btn-start"
             @click="start">
      </div>
      <div class="question-content" v-show='testStart'>
        <div class="content">
          <div class="title">
            <p class="page-num">{{number + 1 }}/{{ques.length}}</p>
            <p>{{ques.length > 0 ? ques[number].title : ''}}</p>
          </div>
          <div class="section">

            <div class="option" :class="[number===2?'picOption':'']" v-for="(item,index) in ques[number].answer"
                 @click="changeQues">
              <span>{{index === 0 ? 'A.' : index === 1 ? 'B.' : index === 2 ? 'C.' : 'D.'}}</span>
              <p v-if="number!==2">{{item}}</p>
              <img :src="item" alt="" v-else>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="result" v-show="result">
      <div class="title">
        长按保存图片，分享到朋友圈
      </div>
      <div class="pic-box">
        <img :src="result" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {Button, Indicator, Toast} from 'mint-ui'
  import List from '@c/list.vue'
  import FixedBottom from '@c/fixed-bottom'
  import preview from '@c/preview'
  import {createQRCode, isAndroid, countDetail, loadingImg} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  const data = {
    pics: [
      'http://quweifiles.mukzz.pw/character/A.png',
      'http://quweifiles.mukzz.pw/character/B.png',
      'http://quweifiles.mukzz.pw/character/C.png',
      'http://quweifiles.mukzz.pw/character/D.png',
      'http://quweifiles.mukzz.pw/character/loading.jpg',
      'http://quweifiles.mukzz.pw/character/home_bg.jpg',
      'http://quweifiles.mukzz.pw/character/start-btn.png',
      'http://quweifiles.mukzz.pw/character/O_bg.jpg',
      'http://quweifiles.mukzz.pw/character/question_bg.jpg',
      require('./result.jpg')
    ],
    ques: [
      {
        title: '这段音乐给你的感受是？',
        answer: ['舒适', '悲伤', '优雅', '冷漠'],
        music: 'http://quweifiles.mukzz.pw/character/1.mp3'
      },
      {
        title: '这段音乐对应的场景是？',
        answer: ['清晨散步', '夜间赶路', '午后懒惰', '凌晨失眠'],
        music: 'http://quweifiles.mukzz.pw/character/2.mp3'
      },
      {
        title: '这段音乐最配的图片？',
        answer: ['http://quweifiles.mukzz.pw/character/A.png', 'http://quweifiles.mukzz.pw/character/B.png', 'http://quweifiles.mukzz.pw/character/C.png', 'http://quweifiles.mukzz.pw/character/D.png'],
        music: 'http://quweifiles.mukzz.pw/character/3.mp3'
      },
      {
        title: '这段音乐播放的场景应该是？',
        answer: ['热闹的餐厅', '室外的草坪', '神秘的古堡', '空旷的会议室'],
        music: 'http://quweifiles.mukzz.pw/character/4.mp3'
      },
      {
        title: '这段音乐会让你想起下面哪种食物？',
        answer: ['一碗清淡的素面', '小火慢炖的卤肉', '丰盛诱人的海鲜', '精致考究的甜品'],
        music: 'http://quweifiles.mukzz.pw/character/5.mp3'
      },
      {
        title: '这段音乐是从什么地方播放出来的？',
        answer: ['咖啡馆的音响里', '漫步街头的耳机里', '昏暗房间的黑胶唱机里', '电影正在播放的电影片段里'],
        music: 'http://quweifiles.mukzz.pw/character/6.mp3'
      }
    ]
  };

  export default{
    data(){
      return {
        loadDone: false,
        testStart: false,
        testShow: false,
        startBg: 'http://quweifiles.mukzz.pw/character/home_bg.jpg',
        number: 0,
        nickname: '',
        ques: [{}],
        result: '',
        hideBtn: false,
        show: false
      }
    },
    beforeRouteEnter(to, from, next){
//      next(vm => {
//        getHost(1)
//          .then(res => {
////            vm.count = res.statistics;
//
//            countDetail(to)
//          })
//      })
      next();
    },
    mounted(){
      this.$nextTick(() => {
        loadingImg(data.pics)
          .then(() => {
            this.loadDone = this.testShow = true
          })
      })
    },
    methods: {
      close(){
        this.show = false
      },
      start(){
        if (this.startBg === 'http://quweifiles.mukzz.pw/character/home_bg.jpg') {
          this.startBg = 'http://quweifiles.mukzz.pw/character/O_bg.jpg'
        } else {
          if (!this.nickname) {
            Toast('请输入昵称');
            return
          }
          let audio = document.getElementById('audio');
          audio.play();
          this.testStart = true;
          this.ques = data.ques;
        }
      },
      showBtn(){
        this.hideBtn = false
      },
      hide(){
        this.hideBtn = true
      },
      changeQues(){
        let audio = document.getElementById('audio');
        if (this.number === this.ques.length - 1) {
          this.testShow = false;
          Toast('加载中..');;
          this._drawImage(require('./result.jpg'));
          audio.pause();
        } else {
          this.number = this.number + 1;
          audio.play();
        }
      },
      // 画背景图
      _drawImage(pic){
        let img = new Image();
        img.src = pic;
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let _this = this;
        img.onload = () => {
          console.log(pic);
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          ctx.font = "80px Arial";
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = "center";
          ctx.fillText(_this.nickname, 375, 160);
          console.log('0');
          getHost(0)
            .then(url => {
              return createQRCode(url)
            })
            .then(qrcode => {
              return new Promise((resolve, reject) => {
                let img = new Image();
                img.src = qrcode;
                img.width = 140;
                img.height = 140;
                img.onload = () => {
                  console.log('1');
                  ctx.drawImage(img, 581, 1014, img.width, img.height);
                  resolve()
                };
              })
            })
            .then(() => {
              let img = new Image();
              img.crossOrigin = "anonymous";
              let random = Math.round(Math.random() * 24);
              let src = `http://quweifiles.mukzz.pw/character/${random}.png`;
              console.log(src);
              img.src = src;
              img.width = 400;
              img.height = 400;
              img.onload = () => {
                console.log('2');
                ctx.drawImage(img, 172, 547, img.width, img.height);
                _this.testStart = false;
                Indicator.close();
                _this.result = canvas.toDataURL("image/jpeg");
              }
            })
        };
      }
    },
    components: {
      List,
      preview
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .container, .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  .loading {
    background: #000 url("http://quweifiles.mukzz.pw/character/loading.jpg") no-repeat center;
    background-size: cover;
    .loading-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 55px;
      color: #fff5e0;
      font-family: '黑体';
      font-weight: 800;
      font-size: 40px;
      border: 10px solid #ffffff;
      border-radius: 10px;
      animation: shine 4.5s infinite;
    }
  }

  .container {
    & > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .start {
      .nickname {
        position: relative;
        top: 420px;
        left: 50%;
        width: 400px;
        height: 90px;
        line-height: 90px;
        color: #f5f5f5;
        padding: 0 40px;
        font-size: 40px;
        font-weight: bolder;
        font-family: '黑体';
        transform: translateX(-50%);
        background: rgba(0, 0, 0, .7);
        border: 1px solid #474747;
        &::-webkit-input-placeholder {
          color: #ccc;
          font-family: '黑体';
        }
      }
      .btn-start {
        position: absolute;
        bottom: 80px;
        width: 600px;
        height: auto;
        left: 75px;
      }
    }
    .question-content {
      background-image: url('http://quweifiles.mukzz.pw/character/question_bg.jpg');
      .content {
        position: relative;
        padding: 0 50px;
        margin-top: 480px;
        color: #ffffff;
        font-weight: 700;
        font-family: '黑体';
        font-size: 36px;
        .title {
          line-height: 1.5;
        }
        .option {
          margin-top: 40px;
          display: flex;
          align-items: center;
          padding: 20px 30px;
          background: rgba(255, 255, 255, .4);
          border: 4px solid #ffffff;
          &.picOption {
            width: 240px;
            float: left;
            &:nth-child(even) {
              margin-left: 30px;
            }
          }
          p {
            flex: 1;
          }
          img {
            width: 200px;
            height: 200px;
          }
        }
      }
    }
  }

  .result {
    position: relative;
    z-index: 9;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;
      color: #ffffff;
      font-size: 34px;
      background: rgba(0, 0, 0, .5);
      z-index: 50;
    }
    .list {
      margin-bottom: 100px;
    }
    .pic-box {
      padding: 15px 25px;
      background: #f5f5f5;
      img {
        position: relative;
        display: block;
        width: 100%;
        height: auto;
        z-index: 49;
      }
    }
  }

  @keyframes shine {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
