<template>
    <div class="subscribe">
        <div class="subscribeWeChat" @click="subscribe" v-show="!show">
          <span>订阅</span>
        </div>
        <div class="cover-container" v-show="show">
          <div class="cover" @click="cancel"></div>
          <div class="qrcode">
              <img src="https://quweifiles.mukzz.pw/wechat/public/qrcode/web/test/qrcode1.jpg"/>
              <p class="p">长按识别</p>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "subscribe",
        props:['_link'],
        data(){
          return {
            show: false
          }
        },
        methods: {
          subscribe(e){
            console.log('e this._link', this._link)
            let link = this._link
            if(link){
              if(link.startsWith('/')){
                this.$router.push(link)
              } else if(link.startsWith('http')){
                window.location.href = link
              }
              return
            }
            this.show = true
          },
          cancel(e){
            this.show = false
          },
          coverTouch(e){
            e.preventDefault()
          }
        }
    }
</script>

<style scoped>
  .subscribe {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 50;
  }

  .cover-container {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cover {
    position: fixed;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.9);
  }

  .qrcode {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
  }

  .qrcode p {
    height: 100px;
    line-height: 100px;
    font-size: 40px;
    color: #fff;
    text-align: center;
  }

  .subscribeWeChat {
    position: fixed;
    right: 5px;
    z-index: 2;
    width: 70px;
    padding: 30px 0;
    color: #fff;
    text-align: center;
    bottom: 120px;
    animation: shake 4s ease infinite;
  }

  .subscribeWeChat span{
    box-sizing: border-box;
    writing-mode: tb-rl;
    letter-spacing: 10px;
    font-size: 30px;
    background: #228b22;
    border-radius: 8px;
    padding: 20px 15px 15px;
  }

  @keyframes shake {
    0% {
      transform: scale(1)
    }
    50%{
      transform: scale(1.08)
    }
    100% {
      transform: scale(1)
    }
  }

</style>
