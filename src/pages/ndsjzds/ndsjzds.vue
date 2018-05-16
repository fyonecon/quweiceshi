<template>
  <div class="web-index">
    <div class="title">
      你的身价值多少
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/ndsjzds/cover.jpg" alt="" class="cover-img">
        <input type="text" v-model="nickname" placeholder="请输入姓名" class="input" v-if="options.showInput">
        <div class="radio-box" v-if="options.showRadio">
          <label for="man">
            <input type="radio" id="man" name="sex" v-model="sex" value="male"> 我是男生
          </label>
          <label for="woman">
            <input type="radio" id="woman" name="sex" v-model="sex" value="female"> 我是女生
          </label>
        </div>
        <mt-button type="danger" size="large" @click="start" class="btn-submit">开 始 答 题</mt-button>
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

    <!-- 答题页面-->
    <div class="answer" v-show="gameStart">
      <div class="block">
        <h1>{{question[index].title}}</h1>
        <mt-button type="primary" size="large" @click="chose(item.score)" class="btn-chose" v-for="item in question[index].question" :key="item.content">{{item.content}}</mt-button>
      </div>
    </div>
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
  import {createQRCode, isAndroid, countDetail,getQueryString} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"
  import {getUserInfo} from '@api/weixin'

  let manLink = 'http://quweifiles.mukzz.pw/web-project/ndsjzds/';
  const dataBase = [
    {
      title: '1、你觉得下面哪种职业最有价值？',
      question:[
        {content:'a. 救死扶伤的医生',score:5},
        {content:'b. 传播知识的作家',score:4},
        {content:'c. 万人瞩目的演员（明星）',score:2},
        {content:'d. 发掘历史的考古学家',score:3},
      ]
    },
    {
      title: '2、你觉得什么是不公平的？',
      question:[
        {content:'a. 学校分等级',score:3},
        {content:'b. 重男轻女',score:2},
        {content:'c. 富人更富，穷人更穷',score:5},
        {content:'d. 职业歧视',score:4},
      ]
    },
    {
      title: '3、你身边的人比你——？',
      question:[
        {content:'a. 幼稚',score:5},
        {content:'b. 成熟',score:2},
        {content:'c. 有趣',score:4},
        {content:'d. 无趣',score:3},
      ]
    },
    {
      title: '4、对于我们，毁灭力最大的是——？',
      question:[
        {content:'a. 手机 游戏',score:3},
        {content:'b. 思想 观念',score:5},
        {content:'c. 整容 毒品',score:2},
        {content:'d. 金钱 权利',score:4},
      ]
    },
    {
      title: '5、你希望未来的自己——？',
      question:[
        {content:'a. 有学问',score:2},
        {content:'b. 有理想',score:5},
        {content:'c. 有激情',score:3},
        {content:'d. 有保障',score:4},
      ]
    },
  ];

  export default{
    data(){
      return {
        step: 1,
        nickname: '',
        sex: '',
        options: {showRadio: false, showInput: false},
        result: '',
        count: '',
        question:dataBase,
        index:0,
        score:0,
        gameStart:false,
        show: false
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        getHost(1)
          .then(res=>{
            countDetail(to);
            return;

            if(typeof res.appId === "undefined"){
              countDetail(to);
              vm.nickname = "游客";
              vm.avatar = "-";

            }else {
              return getUserInfo(res.appId);
            }

          })
          // .then(userInfo => {
          //   countDetail(to);
          //   vm.nickname = userInfo.nickname;
          //   vm.avatar = userInfo.avatar
          // })
      });
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
      start(){
        this.gameStart=true;
      },
      chose(score){
          this.score += score;
          if(this.index===4){
            this.toResult();
          }else{
            this.index+=1;
          }
      },
      async toResult(){
        Toast('加载中..');;
        let _this = this;
        let r = _this.score<15?2:_this.score>=15&&_this.score<20?1:0;
        let bg = `${manLink}${r}.jpg`;
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
          console.log("1")
        })
          .then(() => {
            return new Promise((resolve, reject) => {
              let img = new Image();
              img.crossOrigin = "anonymous";
              img.src = qrcode;
              img.onload = () => {
                ctx.drawImage(img, 270, 578, 120, 120);
                resolve()
              }
            })
          })
          .then(() => { //有问题函数
            return new Promise((resolve, reject) => {
              let img = new Image();
              img.crossOrigin = "anonymous";
              //img.src = _this.avatar;
              img.src = `${manLink}0.png`;
              console.log(img.src);
              img.onload = () => {
                ctx.save();
                // 圆心 x,y,半径，起始角度，结束角度
                ctx.arc(320, 336, 35, 0, 2 * Math.PI);
                // 从画布上裁剪出这个圆形
                ctx.clip();
                ctx.drawImage(img, 285, 301, 70, 70);
                ctx.restore();
                resolve()
              }
              console.log("3")
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              console.log("4.3")
              ctx.font = "26px 微软雅黑";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "left";
              ctx.fillText('← 长按识别', 403, 647);
              console.log("4.4")
              resolve()

            })
          })
          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
            Indicator.close();
            window.scrollTo(0, 0);run_btn_cal();
            console.log("5")
            if (isAndroid()) {
              this.show = true
            } else {
              wx.previewImage({
                current: _this.result, // 当前显示图片的http链接
                urls: [_this.result] // 需要预览的图片http链接列表
              });
            }
            _this.index=0;
            _this.gameStart=false;
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

  .answer{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 7;
    background: url("http://quweifiles.mukzz.pw/web-project/ndsjzds/bg.jpg") no-repeat top center;
    background-size: cover;
    .block{
      padding: 200px 50px;
      text-align: center;
      font-size: 34px;
      color: #2692ff;
      h1{
        margin-bottom: 120px;
        font-weight: 700;
        letter-spacing: 2px;
      }
      .btn-chose{
        margin-bottom: 40px;
      }
    }
  }
</style>
