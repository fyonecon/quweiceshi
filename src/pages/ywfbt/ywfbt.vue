<template>
  <div class="web-index">
    <div class="title">
      欲望分布图
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/ywfbt/cover.jpg" alt="" class="cover-img">
        <input type="text" maxlength="4" v-model="nickname" placeholder="请输入姓名" class="input" v-if="options.showInput">
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
  import {createQRCode,isAndroid,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

  let manLink = 'http://quweifiles.mukzz.pw/web-project/ywfbt/0/';
  let womenLink = 'http://quweifiles.mukzz.pw/web-project/ywfbt/1/';
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


        Toast('加载中..');;
        let _this = this;

        let bg = this.sex==='male'?`${manLink}${Math.round(Math.random() * 6)}.jpg`:`${womenLink}${Math.round(Math.random() * 7)}.jpg`;

        //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
        let bg_src = this.nickname.trim()+this.sex; //cookie键
        let bg_str = getCookie(bg_src); //cookie键是否存在，并返回cookie值
        if(bg_str != ""){
            bg = bg_str;

        }else{
            setCookie(bg_src, bg, 1);
        }

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


        Toast('正在生成');

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
                ctx.drawImage(img, 265, 615, 110, 110);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "50px 微软雅黑";
              ctx.fillStyle = '#ff4949';
              ctx.textAlign = "center";
              ctx.fillText(`${this.nickname} 的欲望分布图`,320, 110);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "20px 微软雅黑";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "center";
              ctx.fillText(`长按识别查看你的欲望分布`, 320, 757);
              resolve()
            })
          })
          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
            window.scrollTo(0, 0);run_btn_cal();
            if(isAndroid()){
              this.show=true
            }else{
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

  .btn-box{
     display: none !important;
  }
  .list{
     display: none !important;
  }

  .fixed{
     display: none !important;
  }

</style>
