<template>
  <div class="web-index">
    <div class="title">
      拆迁补偿协议书
    </div>
    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/damages/damages.jpg" alt="" class="cover-img">
        <input type="text" v-model="nickname" placeholder="请输入姓名" class="input" v-if="options.showInput">
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
  import preview from '@c/preview'
  import FixedBottom from '@c/fixed-bottom'
  import scriptRender from '@c/scriptRender'
  import {createQRCode,isAndroid,countDetail} from '@js/utils'
  import {getHost} from '@api/host'
  import wx from "weixin-js-sdk"

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
      smalltoBIG(n){
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);

        var s = '';

        for (var i = 0; i < fraction.length; i++) {
          s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++) {
          var p = '';
          for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
      },
      async toResult(){

        if (!this.nickname.trim()) {
          Toast('请输入姓名');
          return
        }
        Toast('加载中..');;
        let _this = this;
        let bg = 'http://quweifiles.mukzz.pw/web-project/damages/cq.png';
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
                ctx.drawImage(img, 130, 565, 100, 100);
                resolve()
              }
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "35px 微软雅黑";
              ctx.fillStyle = '#2E2E2E';
              ctx.textAlign = "left";
              ctx.fillText(_this.nickname, 650, 780);
              resolve()
            })
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              ctx.font = "600 18px 微软雅黑";
              ctx.fillStyle = '#2E2E2E';
              ctx.textAlign = "left";
              let r = parseFloat(Math.round(Math.random() * 100000000)).toFixed(2);
              ctx.fillText(r, 489, 204);
              resolve(r)
            })
          })
          .then(r => {
            return new Promise((resolve, reject) => {
              ctx.font = "600 18px 微软雅黑";
              ctx.fillStyle = '#2E2E2E';
              ctx.textAlign = "left";
              let big = _this.smalltoBIG(r);
              ctx.fillText(big, 192, 234);
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

</style>
