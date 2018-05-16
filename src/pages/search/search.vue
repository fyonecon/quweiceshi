<template>
  <div class="search">
    <div class="search-form">
      <div class="search-label">
        <input type="text" placeholder="请输入感兴趣的测试标题" v-model="title">
        <i class="iconfont icon-search"></i>
        <i class="iconfont icon-clear" @click="title=''" v-show="title.length>0"></i>
      </div>
      <mt-button type="default" size="small" @click="$router.back()">返 回</mt-button>
    </div>
    <div class="search-result">
      <router-link tag="div" :to="item.path" class="cell" v-for="(item,index) in listData" :key="index">
        <div class="cell-hd">
          <img :src="item.pic" alt="">
        </div>
        <div class="cell-bd">
          <i class="iconfont icon-new" v-if="item.hot"></i>
          <h1 v-html="item.title"></h1>
          <p class="tips">{{item.tips}}</p>
          <p class="num"><i class="iconfont icon-footprint"></i> <span>{{item.num}}</span></p>
        </div>
        <div class="cell-ft">
          <i class="iconfont icon-next"></i>
        </div>
      </router-link>
    </div>
    <div class="none" v-show="none">
      <p>没有找到符合条件的测试 😓</p>
    </div>
  </div>
</template>

<script>
  import {Button, Indicator, Toast} from 'mint-ui'
  import {dataBase} from '@js/data'

  export default{
    data(){
      return {
        listData: [],
        none: false,
        title: '',
        dataBase: []
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.timeOut = null;
        Object.values(dataBase).map(v => {
          this.dataBase = this.dataBase.concat(v);
        });
      })
    },
    watch: {
      'title'(newVal, oldVal){
        this.listData = [];
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          if (newVal.length === 0) {
            this.none = false;
          } else {
            let reg = new RegExp(newVal, 'g');
            this.dataBase.map((v, index) => {
              if (v.title.indexOf(newVal) > -1) {
                this.listData.push(Object.assign({}, v, {
                  title: v.title.replace(reg, `<span style="font-weight: 600;color:#ff4949">${newVal}</span>`)
                }))
              }
            });
            if (this.listData.length === 0) {
              this.none = true;
            }
          }
        }, 500);
      }
    },
    components: {
      'mt-button': Button
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../assets/scss/mixin';

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    z-index: 10;
    background: #dedede;
    border-bottom: 1px solid #eaeaea;
    box-sizing: border-box;
    .search-label {
      flex: 1;
      position: relative;
      margin: 15px 20px;
      height: 80px;
      overflow: hidden;
      background: #ffffff;
      border-radius: 10px;
      input {
        padding: 0 80px;
        display: block;
        width: 100%;
        height: 80px;
        font-size: 32px;
        color: #333333;
        box-sizing: border-box;
      }
      .iconfont {
        position: absolute;
        top: 0;
        display: block;
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 40px;
        text-align: center;
        &.icon-search {
          left: 0;
          color: #888888;
        }
        &.icon-clear {
          right: 0;
          color: rgba(0, 0, 0, .4);
        }
      }
    }
    button {
      margin-right: 20px;
    }
  }

  .search-result {
    position: relative;
    margin-top: 130px;
    background: #ffffff;
  }

  .cell {
    padding: 15px 20px;
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    .cell-hd {
      img {
        display: block;
        width: 200px;
        height: 150px;
        margin-right: 15px;
      }
    }
    .cell-bd {
      position: relative;
      flex: 1;
      .icon-new {
        display: block;
        color: #ff4949;
        font-size: 54px;
        position: absolute;
        top: -10px;
        right: 0;
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
      h1 {
        font-size: 32px;
        line-height: 1.5;
        font-weight: 600;
        padding-bottom: 10px;
        @include no-wrap();
      }
      .tips {
        color: #666666;
        padding-bottom: 20px;
        @include no-wrap();
      }
      .num {
        color: #888;
        font-size: 24px;
        .iconfont {
          font-size: 28px;
        }
      }
    }
    .cell-ft {
      padding-left: 10px;
      .icon-next {
        color: #dedede;
        font-size: 50px;
      }
    }
  }

  .none {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
    font-size: 36px;
    p {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      color: #aaaaaa;
    }
  }
</style>
