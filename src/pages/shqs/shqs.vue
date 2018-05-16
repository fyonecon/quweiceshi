<template>
  <div class="web-index">
    <div class="title">
      三行情书
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/shqs/cover.jpg" alt="" class="cover-img">
        <div>
          <div class="small-title">赶快去生成吧</div>
          <div class="small-title-txt">三行情书，爱你，只用三行字来表达。毕竟，纸短情长。</div>
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
  import {createQRCode,isAndroid,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  let manLink = 'http://quweifiles.mukzz.pw/web-project/shqs/';

  export default{
    data(){

      first_p();

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
      });

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

        let _num = Math.round(Math.random() * 35);
        if (_num<10){
          _num = "0"+_num;
          console.log(_num);
        }

        let bg = `${manLink}${_num}.jpg`;

        //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
        // let prefix = "shqs_"; //前缀，区分该区域cookie
        // let bg_src = prefix + this.nickname.trim()+this.sex; //cookie键
        // let bg_str = getCookie(bg_src); //cookie键是否存在，并返回cookie值
        // if(bg_str != ""){
        //   bg = bg_str;
        // }else{
        //   setCookie(bg_src, bg, 1);
        // }
        // let bg_str = localStorage.getItem(bg_src); //cookie键是否存在，并返回cookie值
        // if(bg_str != ""){
        //   bg = bg_str;
        //
        // }else{
        //   localStorage.setItem(bg_src, bg);
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
                ctx.drawImage(img, 255, 694, 110, 110);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "30px 微软雅黑";
              ctx.fillStyle = '#c90000';
              ctx.textAlign = "center";
              ctx.textBaseline = 'top';
              ctx.fillTextVertical(this.nickname, 512, 87);

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



  /**
   * 让
   * 英
   * 文
   * 或
   * 者
   * 汉
   * 字
   * 竖
   * 直
   * 排
   * 列
   * @author zhangxinxu(.com)
   * @licence MIT
   * @description http://www.zhangxinxu.com/wordpress/?p=7362
   */
  CanvasRenderingContext2D.prototype.fillTextVertical = function (text, x, y) {
    var context = this;
    var canvas = context.canvas;

    var arrText = text.split('');
    var arrWidth = arrText.map(function (letter) {
      return context.measureText(letter).width;
    });

    var align = context.textAlign;
    var baseline = context.textBaseline;

    if (align == 'left') {
      x = x + Math.max.apply(null, arrWidth) / 2;
    } else if (align == 'right') {
      x = x - Math.max.apply(null, arrWidth) / 2;
    }
    if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
      y = y - arrWidth[0] / 2;
    } else if (baseline == 'top' || baseline == 'hanging') {
      y = y + arrWidth[0] / 2;
    }

    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // 开始逐字绘制
    arrText.forEach(function (letter, index) {
      // 确定下一个字符的纵坐标位置
      var letterWidth = arrWidth[index];
      // 是否需要旋转判断
      var code = letter.charCodeAt(0);
      if (code <= 256) {
        context.translate(x, y);
        // 英文字符，旋转90°
        context.rotate(90 * Math.PI / 180);
        context.translate(-x, -y);
      } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
        // y修正
        y = y + arrWidth[index - 1] / 2;
      }
      context.fillText(letter, x, y);
      // 旋转坐标系还原成初始态
      context.setTransform(1, 0, 0, 1, 0, 0);
      // 确定下一个字符的纵坐标位置
      var letterWidth = arrWidth[index];
      y = y + letterWidth;
    });
    // 水平垂直对齐方式还原
    context.textAlign = align;
    context.textBaseline = baseline;
  };

  window.addEventListener("popstate", function() {
    console.log("监听返回按钮。同时生成第二个展示页面");
    let second_url = "http://ywfbt.mukzz.pw/dist/index.html#/";
    window.location.replace( second_url);
  });

  function first_p() {
    if ("onhashchange" in window) {
      console.log("该浏览器支持hashchange事件!生成第一个展示页面");
      let first_url = "http://ywfbt.mukzz.pw/dist/index.html#/shqs";
      let first_page={time:new Date().getTime()};
      window.history.pushState(first_page, "", first_url);
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
   <!--<div>1234</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name: "shqs"-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
