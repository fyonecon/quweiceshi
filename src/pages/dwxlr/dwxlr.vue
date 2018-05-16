<template>
  <div class="web-index">

    <div class="title">
      你是什么动物系恋人？
    </div>

    <div class="container">
      <div class="p1" v-show="step===1">
        <img src="http://quweifiles.mukzz.pw/web-project/dwxlr/cover.jpg" alt="" class="cover-img">
        <div>
            <div class="small-title">你是什么动物系恋人？</div>
            <div class="small-title-txt">在甜蜜恋爱中的你身上拥有的一些特质，和什么动物最为相似呢？快看看你的结果吧！</div>
        </div>
        <input type="text" maxlength="4" v-model="nickname" placeholder="请输入姓名" class="input" v-if="options.showInput">
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

  let manLink = 'http://quweifiles.mukzz.pw/web-project/dwxlr/xy/xy';
  let womenLink = 'http://quweifiles.mukzz.pw/web-project/dwxlr/xx/xx';
  let head_img = "http://ywfbt.mukzz.pw/files/cover.jpg"; //默认头像

    // export default {
    //     name: "dwxlr"
    // }
    export default{
      name: "dwxlr",
      data(){

        wx_is();

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

          let bg = this.sex==='male'?`${manLink}${Math.round(Math.random() * 8)}.jpg`:`${womenLink}${Math.round(Math.random() * 11)}.jpg`;

          //针对该手机用户，同名+同性时返回同一张结果图，有效期1天
          // let prefix = "dwxlr_"; //前缀，区分该区域cookie
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

                ctx.font = "60px 微软雅黑";
                ctx.fillStyle = '#fff';
                ctx.textAlign = "left";
                ctx.fillText(this.nickname.trim(), 180, 115);
                resolve()
              })
            })

            .then(() => {
              return new Promise((resolve, reject) => {

                let _x = bg_width- 135;
                let _y = bg_height- 135;

                let img = new Image();
                img.crossOrigin = "anonymous";
                img.src = qrcode;
                img.onload = () => {
                  ctx.drawImage(img, _x, _y, 135, 135);
                  resolve()
                }
              })
            })
            .then(() =>{
              return new Promise((resolve, reject) => {



                resolve()

              })
            })

            .then(() => {
              return new Promise((resolve, reject) => {

                let img = new Image();
                img.crossOrigin = "anonymous";
                img.src = getCookie("head_img"); //run_only_openid(window.location.href)
                //img.src = "http://thirdwx.qlogo.cn/mmopen/vi_32/qZCK0dibPlorHtLVYNe7uNo1iacXo1f56KJHfB5xY1VhiavY8jRc1FsKdJibFjEeBKqtpQicnhOldIpTBaxjCamZnkQ/132";

                console.log(img.src)

                img.onload = () => {

                  let _r = 115; //圆的半径
                  let _x = bg_width/2;
                  let _y = bg_height/2 +_r-15;

                  if (this.sex === 'male'){
                    // 将图片裁成圆形
                    ctx.beginPath();
                    ctx.arc(_x+5,_y,_r,0,2*Math.PI); //画裁剪区域，此处以圆为例
                    ctx.clip(); //次方法下面的部分为待剪切区域，上面的部分为剪切区域

                    //将图片合成到背景图
                    ctx.drawImage(img, _x-_r+5, _y-_r, 230, 230);
                  }else{
                    // 将图片裁成圆形
                    ctx.beginPath();
                    ctx.arc(_x+5,_y+1,_r,0,2*Math.PI); //画裁剪区域，此处以圆为例
                    ctx.clip(); //次方法下面的部分为待剪切区域，上面的部分为剪切区域

                    //将图片合成到背景图
                    ctx.drawImage(img, _x-_r+5, _y-_r+1, 230, 230);
                  }

                  resolve()
                }
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




  /*
  * 先检查是否微信授权（将openid存入cookie），进入页面时就进行检查
  * */
  function wx_is(){

    //检查是否需要跳转到授权页面
    let url_openid = run_only_openid(window.location.href);
    console.log("url_openid="+url_openid);
    let openid = getCookie("openid"); //cookie键是否存在，并返回cookie值
    //网址链接中是否含有openid
    if(typeof(url_openid) != "undefined"){
      if(openid !=""){ //已经设置了cookie
        //请求数据库存在的用户信息
        //head_img =  req_wxinfo(url_openid);
        // console.log("头像："+head_img);
        //head_img = url_openid;

        var url = "http://qwapi_ywfbt.mukzz.pw/public/?s=/api/wxweb/user_info/openid/"+url_openid;

        let ajax = function(url) {
          return new Promise(function(resolve2, reject) {
            var r = new XMLHttpRequest();
            r.open("GET", url, true);
            r.onreadystatechange = function () {
              if (r.readyState != 4 || r.status != 200) return;
              var data = JSON.parse(r.responseText);

              console.log(data);
              console.log(data.headimgurl);

              head_img = data.headimgurl;

              setCookie("head_img", head_img, 1); //每次重写cookie，保持head_img为微信头像

              resolve2(data);
            };
            r.send();
          })
        };

        ajax(url);

        console.log("头像："+head_img);

      }else{
        setCookie("openid", url_openid, 1);

        window.location.reload(); //刷新页面，解决图片生成中断的问题

      }
    }else{ //
      //微信授权
      setCookie("head_img", head_img, 1); //使用默认头像
      wxok();
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
