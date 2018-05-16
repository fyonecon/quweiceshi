<template>
  <div class="fixed" id="fixed">
    <div class="btn" @click="goBack"><i class="iconfont icon-back"></i><span>返回</span></div>
    <div @click="toOutLink" class="btn-middle">☞ 🔥内在小性格</div>
    <router-link tag="div" to="/" @click="goTop" class="btn"><span>首页</span><i class="iconfont icon-right"></i>
    </router-link>
  </div>
</template>
<script>
  export default{
      methods:{
        goBack(){
          this.$router.back();
          this.goTop();
        },
        goTop(){
          window.scrollTo(0, 0)
        },
        toOutLink(){
//          this.$router.push('/xxg')
          window.location.href='http://www.djfans.net/WxGameJumpController/index/1'
        }
      }
  }

</script>

<style lang="scss" type="text/scss" scoped>
  @import '../assets/scss/mixin';

  .fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px !important;
    line-height: 90px !important;
    letter-spacing: 2px;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
    color: red;
    background: #ffffff;
    box-shadow: 0 5px 10px 10px rgba(0,0,0,.2);
    z-index: 101;
    .btn {
      background: #ffffff;
      padding: 0 15px;
      font-size: 30px;
      color: #26a2ff;
      line-height: 70px;
      .iconfont{
        font-size: 24px;
      }
    }
    .btn-middle {
      flex: 1;
      color: #ff4949;
      padding: 0 10px;
      text-align: center;
      line-height: 70px;
      font-size: 30px;
      @include no-wrap()
    }
  }
</style>
