<template>
  <div class="preview" @click="close" v-if="show">
    <img :src="pic" alt="" class="img-show" id="img-show">
    <p class="tips">长按保存图片&nbsp;或<a :href="pic" style="color: blue;" download="你的专属图片">&nbsp;直接下载</a></p>
  </div>
</template>

<script>
  export default{
    props: {
      pic: {
        type: String,
        default: ''
      },
      show:{
        type: Boolean,
        default: false
      }
    },
    methods: {
      close(){
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: 100;
    img {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: auto;
      transform: translateY(-50%);
    }
    .tips {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      padding: 10px 20px;
      text-align: center;
      font-size: 32px;
      color: #ffffff;
      background: rgba(0, 0, 0, .3);
    }

  }
</style>
