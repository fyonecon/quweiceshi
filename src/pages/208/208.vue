<template>
  <div class="web-index">
    <div class="title">
      预测你的2018年运势
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/208/cover.jpg" alt="" class="cover-img">
        <input type="text" v-model="nickname2" placeholder="请输入对方姓名" class="input">
        <input type="text" v-model="nickname" placeholder="请输入我的姓名" class="input">
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

    <p class="font"></p>
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

  let manLink = 'http://quweifiles.mukzz.pw/web-project/208/nan.jpg';
  let womanLink = 'http://quweifiles.mukzz.pw/web-project/208/nv.jpg';

  export default{
    data(){
      return {
        step: 1,
        nickname: '',
        nickname2:'',
        sex: '',
        options: {showRadio: true},
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

        if (!this.nickname.trim()) {
          Toast('请输入你的姓名');
          return
        }
        if(!this.nickname2.trim()){
          Toast('请输入对方的姓名');
          return
        }
        if(!this.sex){
          Toast('请选择性别');
          return
        }
        Toast('加载中..');;
        let _this = this;
        let bg = this.sex==='female'?womanLink:manLink;
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
                ctx.drawImage(img, 906, 1215, 140, 140);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "700 80px MaiYa";
              ctx.fillStyle = '#24211a';
              ctx.textAlign = "right";
              ctx.fillText('', 0, 0);
              setTimeout(()=>{
                ctx.fillText(_this.nickname2, 300, 120);
                resolve()
              },4000)
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "700 80px MaiYa";
              ctx.fillStyle = '#24211a';
              ctx.textAlign = "left";
              ctx.fillText(_this.nickname, 464, 1210);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "500 40px MaiYa";
              ctx.fillStyle = '#000000';
              ctx.textAlign = "center";
              ctx.fillText('长按识别', 976, 1420);
              resolve()
            })
          })
          .then(() => {
            _this.result = canvas.toDataURL('image/jpeg');
            Indicator.close();
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

  @font-face{
    font-family: 'MaiYa';
    src : url('http://quweifiles.mukzz.pw/web-project/208/font-lixu.ttf') format('truetype');
  }

  .font{
    font-family: 'MaiYa';
    font-size: 26px;
  }

</style>
