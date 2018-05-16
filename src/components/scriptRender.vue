<template>
  <div>
    <remote-js :src="src"></remote-js>
  </div>
</template>

<script>
  export default{
    props: {
        src:{
          type:String,
          default:''
        }
    },
    components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', {attrs: {language: 'JavaScript', src: this.src}});
        },
        props: {
          src: {type: String, required: true},
        },
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  div {
    display: none;
  }
</style>
