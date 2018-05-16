<template>
  <div class="list">
    <div class="list-item" @click="toTest(item)" v-for="item in list" :key="item.id">
      <img :src="item.pic" alt="">
      <div class="info">
        <h1><span>{{item.title}}</span></h1>
        <i class="iconfont icon-new scale" v-if="item.hot"></i>
        <p class="date" v-if="item.time">{{item.time}}</p>
        <p>已经有 {{item.num}} 人玩过啦</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {dataBase} from '@js/data'

  export default{
    data(){
      return {
        list: [
          {
            path: '/xxg',
            title: '测测你的小性格',
            pic: 'http://quweifiles.mukzz.pw/web-project/xxg/cover.jpg',
            num: 194862,
            tips: '小性格决定小幸运',
            hot: true,
            time: '2018/3/23'
          }
        ]
      }
    },
    mounted(){
      let array = [];
      Object.values(dataBase).map(v => {
        array = array.concat(v)
      });
//      array.map(v=>{
////          if(v.hot && this.list.length<5){
////              this.list.push(v)
////          }
//      });
      this._filterArray(array)
    },
    methods: {
      toTest(item){
        if (item.path.indexOf('http://') > -1) {
          window.location.href = item.path
        } else {
          this.$router.push(item.path)
          window.scrollTo(0, 0)
        }
      },
      _filterArray(array){
        if (this.list.length < 5) {
          let r = Math.round(Math.random() * (array.length - 1));
          let flag = false;
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].path === array[r].path) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            this.list.push(array[r])
          }
          this._filterArray(array)
        } else {
          return this.list
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../assets/scss/mixin';

  .list {
    margin: 20px 25px 50px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, .2);
    border: 1px solid #eaeaea;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
    .list-item {
      padding: 15px 20px;
      position: relative;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eaeaea;
      &:last-child {
        border-bottom: none;
      }
      .info {
        position: relative;
        padding-left: 20px;
        flex: 1;
        @include no-wrap();
        h1 {
          position: relative;
          font-size: 34px;
          height: 100px;
          font-weight: 600;
          line-height: 1.3;
          @include no-wrap();
        }
        p {
          color: #888;
          font-size: 28px;
          @include no-wrap();
          &.date {
            position: absolute;
            top: 55px;
            left: 20px;
          }
        }
      }
      img {
        width: 200px;
        height: 150px;
      }
    }
  }

  .icon-new {
    display: block;
    color: #ff4949;
    font-size: 54px;
    position: absolute;
    top: -7px;
    right: 20px;
    animation: topDown 1s infinite;
  }

  @keyframes topDown {
    0% {
      transform: translate(0, 2px);
    }
    50% {
      transform: translate(0, -2px);
    }
    100% {
      transform: translate(0, 2px);
    }
  }
</style>
