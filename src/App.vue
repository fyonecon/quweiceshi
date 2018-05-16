<template>
  <div id="app">
    <a class="link"><span class="text">结婚照为什么不能挂床头？千万别这样挂</span><span  class="iconfont icon-iconfonticonfonti2copycopy"></span></a>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "./assets/scss/variabel";
  #app{
    font-size: $font-medium;
    width: 750px;
    max-width: 750px;
    margin: auto;
  }
  .link{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 10px;
    font-size: $font-medium;
    color: #fff;
    background: rgba(0, 0, 0, .3);
    box-sizing: border-box;
    display: none;
    .text{
    flex: 1;
    text-decoration: underline;
    }
  }

</style>
