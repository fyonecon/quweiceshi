<template>
  <div class="not-found">
    <transition name="slide-up">
      <div v-show="enter" class="label">
        <h2>404</h2>
        <p>页面未找到~</p>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        enter:false
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.enter=true
      })
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .label{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    color: #999999;
    transform:translateY(-80%);
    h2{
      font-size: 160px;
      font-weight: 900;
    }
    p{
      padding-top: 25px;
      font-size: 34px;
    }
  }
  .slide-up-enter-active,.slide-up-leave-active{
    transition: all 1s;
  }
  .slide-up-enter,.slide-up-leave{
    transform: translateY(-40%);
    opacity: 0;
  }
</style>
