
<template>
  <div class="web-index">

    <div class="title">
      你的名字
    </div>

    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/nidemingzi/cover.jpg" alt="" class="cover-img">
        <div>
          <div class="small-title">One more time, One more chance</div>
          <div class="small-title-txt">相遇轻而易举，重逢却需君百般努力。现在开始轮到我了，带上经验与知识，还有已经发霉的勇气，以前所未有的速度，冲向你的身边！</div>
        </div>
        <input type="text" maxlength="4" v-model="nickname" placeholder="请输入你的中文姓名" class="input" v-if="options.showInput">
        <div class="radio-box" v-if="options.showRadio">
          <label for="man">
            <input type="radio" id="man" name="sex" v-model="sex" value="male"> 我是男生
          </label>
          <label for="woman">
            <input type="radio" id="woman" name="sex" v-model="sex" value="female"> 我是女生
          </label>
        </div>
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

  let manLink = 'http://quweifiles.mukzz.pw/web-project/nidemingzi/xy';
  let womenLink = 'http://quweifiles.mukzz.pw/web-project/nidemingzi/xx';

  export default{

    data(){

      return {
        step: 1,
        nickname: '',
        sex: '',
        options: {showRadio: true, showInput: true},
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

        if(!this.sex){
          Toast('请选择性别');
          return
        }


        Toast('加载中..');

        let _this = this;

        let bg = this.sex==='male'?`${manLink}.jpg`:`${womenLink}.jpg`;

        //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
        // let prefix = "nidemingzi_"; //前缀，区分该区域cookie
        // let bg_src = prefix + this.nickname.trim()+this.sex; //cookie键
        // let bg_str = getCookie(bg_src); //cookie键是否存在，并返回cookie值
        // if(bg_str != ""){
        //   bg = bg_str;
        //
        // }else{
        //   setCookie(bg_src, bg, 1);
        // }


        //wxok();

        //域名防封，统计+二级分销关系
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


        //Toast('正在生成');

        let qrcode = await createQRCode(url);
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        let bg_width = 0;
        let bg_height = 0;

        new Promise((resolve, reject) => {
          let img = new Image();
          img.crossOrigin = "anonymous";
          img.src = bg;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            bg_width = img.width;
            bg_height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);
            resolve()
          }
        })
          .then(() => {
            return new Promise((resolve, reject) => {

              if(this.sex==='male'){ //男
                ctx.font = "20px LiSu";
                ctx.fillStyle = '#000';
                ctx.textAlign = "left";
                ctx.fillTextVertical_rotate_spacing(this.nickname.trim(), 158, 242, -15, 1);
              }else{ //女
                ctx.font = "18px KaiTi";
                ctx.fillStyle = '#000';
                ctx.textAlign = "left";
                ctx.fillTextVertical_rotate_spacing(this.nickname.trim(), 120, 220,-20, 1);
              }

              resolve()
            })
          })

          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
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
   * 列，让字体可以倾斜，有间距
   * @author 原作者:http://www.zhangxinxu.com/，二次修改:方圆2652335796@qq.com
   * @licence MIT
   * @description canvas绘制文字竖直排列、竖直倾斜排列、竖直字体带间距。在原基础上，增加倾斜、字体间距
   */
  CanvasRenderingContext2D.prototype.fillTextVertical_rotate_spacing = function (text, x, y, rotate, spacing) {
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
      context.rotate(rotate * Math.PI/180);
      context.fillText(letter, x, y);
      // 旋转坐标系还原成初始态
      context.setTransform(1, 0, 0, 1, 0, 0);
      // 确定下一个字符的纵坐标位置
      var letterWidth = arrWidth[index];
      y = y + letterWidth + spacing;
    });
    // 水平垂直对齐方式还原
    context.textAlign = align;
    context.textBaseline = baseline;
  };


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
  <!--<div>3234nidemingzi</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--name: "nidemingzi"-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
