import Vue from 'vue'
import Router from 'vue-router'
import wx from "weixin-js-sdk";
import {setTitle} from "../assets/js/utils";

Vue.use(Router);

//codeSplit function
function routeModule(componentsPath){
  return (resolve) => {
    componentsPath.then((module) => {
      resolve(module)
    })
  }
}

// 判断字符串是否为json格式
function IsJsonString(str) {
  try {
    let a=JSON.parse(str).avatar;
  } catch (e) {
    return false;
  }
  return true;
}
// 首页
const index = routeModule(import('@p/index/index'));
// 搜索
const search = routeModule(import('@p/search/search'));

// 大甩卖
const dashuaimai = routeModule(import('@p/dashuaimai/dashuaimai'));

// 公众号表白
const gghbb = routeModule(import('@p/gghbb/gghbb'));

// 你的名字
const nidemingzi = routeModule(import('@p/nidemingzi/nidemingzi'));
// 爱情券
const aiqingquan = routeModule(import('@p/aiqingquan/aiqingquan'));
// 三行情书
const shqs = routeModule(import('@p/shqs/shqs'));
//动物系恋人
const dwxlr = routeModule(import('@p/dwxlr/dwxlr'));
// 人生成绩单
const rscjd = routeModule(import('@p/rscjd/rscjd'));
// 2018最佳月份
const yqzjyf = routeModule(import('@p/yqzjyf/yqzjyf'));
// 拆迁补偿协议书
const cqbcxys = routeModule(import('@p/cqbcxys/cqbcxys'));
// 人生比例图
const rsblt = routeModule(import('@p/rsblt/rsblt'));
// 2018年运势
const ys2018 = routeModule(import('@p/2018ys/2018ys'));
// 2018你的真爱在哪里
const zazn = routeModule(import('@p/zazn/zazn'));
// 预测你的2018
const your2018 = routeModule(import('@p/your2018/your2018'));
// 那个姓氏会旺你
const name = routeModule(import('@p/name/name'));
// 测测你的小性格
const xxg = routeModule(import('@p/xxg/xxg'));
// 我花208万祝你新婚快乐
const marry208 = routeModule(import('@p/208/208'));
// 性格大字报
const xgdzb = routeModule(import('@p/xgdzb/xgdzb'));
// 心情预报
const xqyb = routeModule(import('@p/xqyb/xqyb'));
// 暴脾气
const bpq = routeModule(import('@p/bpq/bpq'));
// 你的人生账单
const rszd = routeModule(import('@p/rszd/rszd'));
// 你的身价值多少
const ndsjzds = routeModule(import('@p/ndsjzds/ndsjzds'));
// 你的心情日历
const xqrl = routeModule(import('@p/xqrl/xqrl'));
// 你的心情日历
const tdmj = routeModule(import('@p/tdmj/tdmj'));
// 你的2018走什么运
const zsmy = routeModule(import('@p/zsmy/zsmy'));
// 你天生带有什么福
const tsdysmf = routeModule(import('@p/tsdysmf/tsdysmf'));
// 你的名字代表什么含义
const mzdbsmhy = routeModule(import('@p/mzdbsmhy/mzdbsmhy'));
// 适合你的转运大法
const zydf = routeModule(import('@p/zydf/zydf'));
// 测一测你的前世身份
const qssf = routeModule(import('@p/qssf/qssf'));
// 神在创造你的时候
const szczndsh = routeModule(import('@p/szczndsh/szczndsh'));
// 你和他上辈子是什么关系
const sbzdgx = routeModule(import('@p/sbzdgx/sbzdgx'));
// 第一印象问卷调查
const dyyxwjdc = routeModule(import('@p/dyyxwjdc/dyyxwjdc'));
// 狗年运势
const gnys = routeModule(import('@p/gnys/gnys'));
// 你的名字会给你带来多少钱
const mzdldsq = routeModule(import('@p/mzdldsq/mzdldsq'));
// 属于你的元素
const syndys = routeModule(import('@p/syndys/syndys'));
// 放弃治疗
const fqzl = routeModule(import('@p/fqzl/fqzl'));
// 内在性格
const nzxg = routeModule(import('@p/nzxg/nzxg'));
// 你的2018标签
const bq2018 = routeModule(import('@p/2018bq/2018bq'));
// 属于我的形象标签
const xxbq = routeModule(import('@p/xxbq/xxbq'));
// 你会因什么生气
const nhysmsq = routeModule(import('@p/nhysmsq/nhysmsq'));
// 愚人节发生的故事
const yrjfsdgs = routeModule(import('@p/yrjfsdgs/yrjfsdgs'));
// 你将来会在哪里发财
const jlhznlfc = routeModule(import('@p/jlhznlfc/jlhznlfc'));
// 愚人节小游戏
const yurenjie = routeModule(import('@p/yurenjie/yurenjie'));
// 见缝插针
const corners = routeModule(import('@p/jfcz/jfcz'));
// 六角形消消乐
const hextris = routeModule(import('@p/hextris/hextris'));
// 星星相连
const stars = routeModule(import('@p/stars/stars'));
// 2018靠什么吃饭
const ksmcf = routeModule(import('@p/ksmcf/ksmcf'));
// 减肥通知书
const jftzs = routeModule(import('@p/jftzs/jftzs'));
// 你的另一半特征
const lybtz = routeModule(import('@p/lybtz/lybtz'));
// 狗年关键词
const gngjc = routeModule(import('@p/gngjc/gngjc'));
// 你的前世身份
const ndqssf = routeModule(import('@p/ndqssf/ndqssf'));
// 爱情离你有多远
const aqlnydy = routeModule(import('@p/aqlnydy/aqlnydy'));
// 潜在的最强属性
const qzdzqsx = routeModule(import('@p/qzdzqsx/qzdzqsx'));
// 测测你内心隐藏着什么
const nxyczsm = routeModule(import('@p/nxyczsm/nxyczsm'));
// 智商充值生成器
const zsczscq = routeModule(import('@p/zsczscq/zsczscq'));
// 和你最有夫妻相的明星
const hnzyfqxdmx = routeModule(import('@p/hnzyfqxdmx/hnzyfqxdmx'));
// 命运分析
const myfx = routeModule(import('@p/myfx/myfx'));
// 清明
const qingming = routeModule(import('@p/qingming/qingming'));
// 放假安排
const fjap = routeModule(import('@p/fjap/fjap'));
//  是什么阻断了你的桃花运？
const smzdndthy = routeModule(import('@p/smzdndthy/smzdndthy'));
// 看看你有钱没钱多大差别
const yqmqddcb = routeModule(import('@p/yqmqddcb/yqmqddcb'));
// 看看你被暗恋的几率
const baldjl = routeModule(import('@p/baldjl/baldjl'));
// 查看你的恋爱能力
const lanlfxt = routeModule(import('@p/lanlfxt/lanlfxt'));
// 测测你的五月运势
const ccndsyys = routeModule(import('@p/ccndsyys/ccndsyys'));
// 你的欲望分布图
const ywfbt = routeModule(import('@p/ywfbt/ywfbt'));
//404
const NotFound = routeModule(import('@/components/404'));


//配置路由
const route = new Router({
  routes: [
    {
      path: '/',
      component:index,
      meta:{
        title:'520活动-趣味测试'
      }
    },
    {
      path: '/webIndex',
      redirect: '/yqzjyf'
    },
    {
      path: '/search',
      component:search,
      meta:{
        title:'趣味相投'
      }
    },
    {
      path: '/search',
      component:search,
      meta:{
        title:'趣味相投'
      }
    },

    {
      path: '/dashuaimai',
      component:dashuaimai,
      meta:{
        title:'520大甩卖'
      }
    },
    {
      path: '/gghbb',
      component:gghbb,
      meta:{
        title:'公众号表白'
      }
    },
    {
      path: '/nidemingzi',
      component:nidemingzi,
      meta:{
        title:'你的名字'
      }
    },
    {
      path:'/aiqingquan',
      component:aiqingquan,
      meta: {
        title:'爱情券'
      },
    },
    {
      path:'/shqs',
      component:shqs,
      meta: {
        title:'三行情书'
      },
    },
    {
      path:'/dwxlr',
      component:dwxlr,
      meta: {
        title:'你是什么动物系恋人'
      },
    },
    {
      path:'/yqzjyf',
      component:yqzjyf,
      meta: {
        title:'2018年你的运气最佳月份'
      },
    },
    {
      path:'/cqbcxys',
      component:cqbcxys,
      meta: {
        title:'拆迁补偿协议书'
      },
    },
    {
      path:'/rsblt',
      component:rsblt,
      meta: {
        title:'你的人生比例图'
      },
    },
    {
      path:'/2018ys',
      component:ys2018,
      meta: {
        title:'测你的2018年运势'
      },
    },
    {
      path:'/zazn',
      component:zazn,
      meta: {
        title:'2018你的真爱在哪里'
      },
    },
    {
      path:'/your2018',
      component:your2018,
      meta: {
        title:'预测你的2018'
      },
    },
    {
      path:'/name',
      component:name,
      meta: {
        title:'2018哪个姓氏会旺你'
      },
    },
    {
      path:'/xxg',
      component:xxg,
      meta: {
        title:'测测你的小性格'
      },
    },
    {
      path:'/208',
      component:marry208,
      meta: {
        title:'我花208万祝你新婚快乐'
      },
    },
    {
      path:'/xgdzb',
      component:xgdzb,
      meta: {
        title:'性格大字报'
      },
    },
    {
      path:'/xqyb',
      component:xqyb,
      meta: {
        title:'心情预报'
      },
    },
    {
      path:'/bpq',
      component:bpq,
      meta: {
        title:'暴脾气'
      },
    },
    {
      path:'/rszd',
      component:rszd,
      meta: {
        title:'你的人生账单'
      },
    },
    {
      path:'/ndsjzds',
      component:ndsjzds,
      meta: {
        title:'你的身价值多少'
      },
    },
    {
      path:'/xqrl',
      component:xqrl,
      meta: {
        title:'你的心情日历'
      },
    },
    {
      path:'/tdmj',
      component:tdmj,
      meta: {
        title:'你的脱单秘籍'
      },
    },
    {
      path:'/zsmy',
      component:zsmy,
      meta: {
        title:'你的2018走什么运'
      },
    },
    {
      path:'/tsdysmf',
      component:tsdysmf,
      meta: {
        title:'你天生带有什么福'
      },
    },
    {
      path:'/mzdbsmhy',
      component:mzdbsmhy,
      meta: {
        title:'你的名字代表什么含义'
      },
    },
    {
      path:'/zydf',
      component:zydf,
      meta: {
        title:'适合你的转运大发'
      },
    },
    {
      path:'/qssf',
      component:qssf,
      meta: {
        title:'测一测你的前世身份'
      },
    },
    {
      path:'/szczndsh',
      component:szczndsh,
      meta: {
        title:'神在创造你的时候 😝'
      },
    },
    {
      path:'/sbzdgx',
      component:sbzdgx,
      meta: {
        title:'你和Ta上辈子是什么关系 💓'
      },
    },
    {
      path:'/dyyxwjdc',
      component:dyyxwjdc,
      meta: {
        title:'第一印象问卷调查 🤔'
      },
    },
    {
      path:'/gnys',
      component:gnys,
      meta: {
        title:'你的狗年运势 🐶'
      },
    },
    {
      path:'/mzdldsq',
      component:mzdldsq,
      meta: {
        title:'你的名字会给你带来多少钱 💎'
      },
    },
    {
      path:'/syndys',
      component:syndys,
      meta: {
        title:'属于你的元素'
      },
    },
    {
      path:'/fqzl',
      component:fqzl,
      meta: {
        title:'请不要放弃治疗 💊'
      },
    },
    {
      path:'/nzxg',
      component:nzxg,
      meta: {
        title:'测试你的内在性格'
      },
    },
    {
      path:'/2018bq',
      component:bq2018,
      meta: {
        title:'你的2018标签'
      },
    },
    {
      path:'/yurenjie',
      component:yurenjie,
      meta: {
        title:'愚人节专题123算术题',
        share:true
      },
    },
    {
      path:'/corners',
      component:corners,
      meta: {
        title:'见缝插针',
        share:true
      },
    },
    {
      path:'/hextris',
      component:hextris,
      meta: {
        title:'六角形消消乐',
        share:true
      },
    },
    {
      path:'/xxbq',
      component:xxbq,
      meta: {
        title:'属于我的形象标签'
      },
    },
    {
      path:'/nhysmsq',
      component:nhysmsq,
      meta: {
        title:'你会因为什么生气'
      },
    },
    {
      path:'/yrjfsdgs',
      component:yrjfsdgs,
      meta: {
        title:'愚人节发生的故事 😂'
      },
    },
    {
      path:'/jlhznlfc',
      component:jlhznlfc,
      meta: {
        title:'你将来会在哪里发财 💰'
      },
    },
    {
      path:'/stars',
      component:stars,
      meta: {
        title:'星星相连 3'
      },
    },
    {
      path:'/ksmcf',
      component:ksmcf,
      meta: {
        title:'2018你靠什么吃饭'
      },
    },
    {
      path:'/jftzs',
      component:jftzs,
      meta: {
        title:'减肥通知书'
      },
    },
    {
      path:'/lybtz',
      component:lybtz,
      meta: {
        title:'你的另一半特征'
      },
    },
    {
      path:'/gngjc',
      component:gngjc,
      meta: {
        title:'你的狗年关键词'
      },
    },
    {
      path:'/ndqssf',
      component:ndqssf,
      meta: {
        title:'你的前世身份'
      },
    },
    {
      path:'/aqlnydy',
      component:aqlnydy,
      meta: {
        title:'爱情离你有多远'
      },
    },
    {
      path:'/qzdzqsx',
      component:qzdzqsx,
      meta: {
        title:'你潜在的最强属性'
      },
    },
    {
      path:'/nxyczsm',
      component:nxyczsm,
      meta: {
        title:'测测你内心隐藏着什么'
      },
    },
    {
      path:'/zsczscq',
      component:zsczscq,
      meta: {
        title:'智商充值生成器'
      },
    },
    {
      path:'/hnzyfqxdmx',
      component:hnzyfqxdmx,
      meta: {
        title:'和你最有夫妻相的明星'
      },
    },
    {
      path:'/myfx',
      component:myfx,
      meta: {
        title:'你的命运分析'
      },
    },
    {
      path:'/qingming',
      component:qingming,
      meta: {
        title:'清明节'
      },
    },
    {
      path:'/fjap',
      component:fjap,
      meta: {
        title:'放假安排'
      },
    },
    {
      path:'/smzdndthy',
      component:smzdndthy,
      meta: {
        title:'是什么阻断了你的桃花运？'
      },
    },
    {
      path:'/yqmqddcb',
      component:yqmqddcb,
      meta: {
        title:'看看你有钱没钱多大差别？'
      },
    },
    {
      path:'/baldjl',
      component:baldjl,
      meta: {
        title:'看看你被暗恋的几率'
      },
    },
    {
      path:"/lanlfxt",
      component:lanlfxt,
      meta: {
        title:'恋爱能力分析图'
      },
    },
    {
      path:"/ccndsyys",
      component:ccndsyys,
      meta: {
        title:'测测你的五月运势'
      },
    },
    {
      path:"/ywfbt",
      component:ywfbt,
      meta: {
        title:'你的欲望分布图'
      },
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
route.beforeEach((to,from,next)=>{

  //设置页面标题
  if(to.meta.title){
    setTitle(to.meta.title);
  }
  wx.hideMenuItems({
    menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"]
  });
  next()
});

export default route;
