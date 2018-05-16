<template>
  <div class="index">
    <div class="fixed-top">
      <scroll ref="scroll" class="scroll" :scrollX="true" :data="scrollBtn">
        <div class="scroll-wrap">
          <div class="btn-nav" :class="[item.id===active?'active':'']" v-for="item in scrollBtn" :key="item.id" @click="chose(item.id)">
            {{item.title}}
          </div>
        </div>
      </scroll>
      <router-link tag="div" class="btn-search" to="/search"><i class="iconfont icon-search"></i></router-link>
    </div>
    <tab-container :swipeable="true" v-model="active">
      <tab-container-item v-for="item in scrollBtn" :id="item.id" :key="item.id">
        <div  @click="goto(todo.path)" class="cell" v-for="todo in listData[item.id]" :key="todo.path">
          <div class="cell-hd">
            <img :src="todo.pic" alt="">
          </div>
          <div class="cell-bd">
            <i class="iconfont icon-new" v-if="todo.hot"></i>
            <h1 v-html="todo.title"></h1>
            <p class="tips">{{todo.tips}}</p>
            <p class="num"><i class="iconfont icon-footprint"></i> <span>{{todo.num}}</span>   <span v-if="todo.time" class="date">{{todo.time}}</span></p>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-next"></i>
          </div>
        </div>
      </tab-container-item>
    </tab-container>
  </div>
</template>

<script>
  import {TabContainer, TabContainerItem} from 'mint-ui';
  import Scroll from '@c/scroll'
  import {countDetail} from '@js/utils'
  import {scrollList,dataBase} from '@js/data'
  import {getHost} from '@api/host'

  export default {
    data(){
      return {
        active:'tab1', //首页默认页
        search:'',
        scrollBtn:[],
        listData:[],
        result:[],
        focusSearch:false
      }
    },
    watch:{
      'active'(newVal,oldVal){
        let dom = document.querySelector('.active');
        this.$refs.scroll.scrollToElement(dom,200,true)
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        countDetail(to)
      })
    },
    mounted(){
        this.$nextTick(()=>{
            this.scrollBtn = scrollList;
            this.listData = dataBase;
            window.scrollTo(0,0)
        })
    },
    methods:{
      chose(id){
         this.active= id
      },
      goto(path){
        if(path.indexOf('http://')>-1){
            window.location.href=path
        }else{
            this.$router.push(path)
        }
      }
    },
    components: {
      TabContainer,
      TabContainerItem,
      Scroll
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../assets/scss/mixin';

  .fixed-top{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    z-index: 10;
    .btn-search{
      display: block;
      width: 120px;
      height: 99px;
      line-height: 99px;
      text-align: center;
      border-right: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;
      box-sizing: border-box;
      background: #ef4f4f;
      .iconfont{
        color: #ffffff;
        font-size: 40px;
      }
    }
    .scroll{
      position: relative;
      width: 100%;
      height: 100px;
      line-height: 100px;
      background: #ffffff;
      border-bottom: 1px solid #eaeaea;
      box-sizing: border-box;
      .scroll-wrap{
        position: absolute;
        white-space: nowrap;
      }
      .btn-nav{
        position: relative;
        display: inline-block;
        width: 140px;
        text-align: center;
        font-size: 32px;
        letter-spacing: 5px;
        margin: 0 10px;
        &.active{
          color: #ff4949;
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background: #ff4949;
          }
        }
      }
    }
    .mint-search{
      height: auto;
    }
  }
  .mint-tab-container{
    margin-top: 115px;
    border-top: 1px solid #eaeaea;
    background: #ffffff;
  }

  .cell{
    padding: 15px 20px;
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    .cell-hd{
      img{
        display: block;
        width: 200px;
        height: 150px;
        margin-right: 15px;
      }
    }
    .cell-bd{
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
      h1{
        font-size: 32px;
        line-height: 1.5;
        font-weight: 600;
        padding-bottom: 10px;
        @include no-wrap();
      }
      .tips{
        color: #666666;
        padding-bottom: 20px;
        @include no-wrap();
      }
      .num{
        color: #888;
        font-size: 24px;
        overflow: hidden;
        .iconfont{
          font-size: 28px;
        }
        .date{
          float: right;
        }
      }
    }
    .cell-ft{
      padding-left: 10px;
      .icon-next{
        color: #dedede;
        font-size: 50px;
      }
    }
  }
</style>
