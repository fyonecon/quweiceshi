<template>
  <div class="web-index">

    <div class="title">
      你的爱情券领取
    </div>

    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/aiqingquan/cover.jpg" alt="" class="cover-img">
        <div>
          <div class="small-title">当~当~当</div>
          <div class="small-title-txt">选择券的类型，你为心爱的人制作专属爱情券，是不是很有爱啊~_~</div>
        </div>
        <div class="radio-box" v-if="options.showRadio" style="width: 100%;">

          <div class="ra-div">
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="1"><br>捶<br>背<br>券</label>
            <br><br>
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="2"><br>聊<br>天<br>券</label>
          </div>
          <div class="ra-div">
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="3"><br>旅<br>行<br>券</label>
            <br><br>
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="4"><br>美<br>食<br>券</label>
          </div>
          <div class="ra-div">
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="5"><br>情<br>话<br>券</label>
            <br><br>
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="6"><br>拥<br>抱<br>券</label>
          </div>
          <div class="ra-div">
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="7"><br>索<br>吻<br>券</label>
            <br><br>
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="8"><br>撕<br>逼<br>券</label>
          </div>
          <div class="ra-div">
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="9"><br>装<br>逼<br>券</label>
            <br><br>
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="10"><br>约<br>会<br>券</label>
          </div>
          <div class="ra-div">
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="11"><br>做<br>饭<br>券</label>
            <br><br>
            <label for="man"><input type="radio"  name="sex" v-model="sex" value="12"><br>好<br>人<br>券</label>
          </div>

        </div>

        <input type="text" maxlength="4" v-model="nickname" placeholder="请输入你的姓名" class="input" v-if="options.showInput">
        <div class="blank-div"></div>
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

  let manLink = 'http://quweifiles.mukzz.pw/web-project/aiqingquan/';

  // export default {
  //     name: "dwxlr"
  // }
  export default{
    name: "dwxlr",
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
          Toast('请选择券的类型');
          return
        }


        Toast('加载中..');

        let _this = this;

        let bg = manLink+this.sex+'.jpg';

        //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
        // let prefix = "aiqingquan_"; //前缀，区分该区域cookie
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
                ctx.drawImage(img, 135, 570, 100, 100);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "18px 微软雅黑";
              ctx.fillStyle = '#000';
              ctx.textAlign = "center";
              ctx.textBaseline = 'top';
              ctx.fillText(this.nickname, 310, 688);
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

  .ra-div{
    width: 50%;
    text-align: center;
    /*background: grey;*/
    padding-bottom: 10px;
  }
  .ra-div label{
    line-height: 40px !important;
    font-size: 30px !important;
    color: #696969;
  }
  .ra-div label input{
      margin-bottom: 10px;
    margin-top: 10px;
  }
  .blank-div{
    padding-bottom: 20px;
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
