webpackJsonp([49],{EeAw:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("y+mr");var a=n("3JdW"),o=n.n(a),s=n("Xxa5"),i=n.n(s),r=n("//Fk"),c=n.n(r),l=(n("34+y"),n("X+yh")),u=n.n(l),m=n("exGp"),p=n.n(m),d=n("pjeT"),f=n("mS0+"),w=n("psC7"),v=n("0oWP"),h=n("KvKp"),x=n("JAv/"),g=n("fxnj"),b=n.n(g),_={data:function(){return{step:1,nickname:"",sex:"",options:{showRadio:!0,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(e,t,n){n(function(t){Object(x.a)(1).then(function(t){Object(h.a)(e)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)})},methods:{close:function(){this.show=!1},toResult:function(){var e=this;return p()(i.a.mark(function t(){var n,a,o,s,r,l,m,p,d,f,w;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.nickname.trim()){t.next=3;break}return u()("请输入姓名"),t.abrupt("return");case 3:if(e.sex){t.next=6;break}return u()("请选择性别"),t.abrupt("return");case 6:return u()("加载中.."),n=e,a="male"===e.sex?"http://quweifiles.mukzz.pw/web-project/ywfbt/0/"+Math.round(6*Math.random())+".jpg":"http://quweifiles.mukzz.pw/web-project/ywfbt/1/"+Math.round(7*Math.random())+".jpg",o=e.nickname.trim()+e.sex,""!=(s=getCookie(o))?a=s:setCookie(o,a,1),r="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(a),l=window.location.href,m=run_only(l),r=r+"/p/"+m,console.log(r),p=get_user_ip(),console.log(p),r=r+"/ip/"+p,console.log(r),u()("正在生成"),t.next=26,Object(h.b)(r);case 26:d=t.sent,f=document.createElement("canvas"),w=f.getContext("2d"),new c.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=a,n.onload=function(){f.width=n.width,f.height=n.height,w.drawImage(n,0,0,n.width,n.height),e()}}).then(function(){return new c.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=d,n.onload=function(){w.drawImage(n,265,615,110,110),e()}})}).then(function(){return new c.a(function(t,n){w.font="50px 微软雅黑",w.fillStyle="#ff4949",w.textAlign="center",w.fillText(e.nickname+" 的欲望分布图",320,110),t()})}).then(function(){return new c.a(function(e,t){w.font="20px 微软雅黑",w.fillStyle="#000000",w.textAlign="center",w.fillText("长按识别查看你的欲望分布",320,757),e()})}).then(function(){n.result=f.toDataURL("image/jpeg"),window.scrollTo(0,0),run_btn_cal(),Object(h.e)()?e.show=!0:b.a.previewImage({current:n.result,urls:[n.result]})});case 30:case"end":return t.stop()}},t,e)}))()}},components:{List:d.a,"mt-button":o.a,scriptRender:v.a,FixedBottom:f.a,preview:w.a}},k={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[e._v("\n    欲望分布图\n  ")]),e._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step===1"}],staticClass:"p1"},[n("img",{staticClass:"cover-img",attrs:{src:"http://quweifiles.mukzz.pw/web-project/ywfbt/cover.jpg",alt:""}}),e._v(" "),e.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",maxlength:"4",placeholder:"请输入姓名"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}):e._e(),e._v(" "),e.options.showRadio?n("div",{staticClass:"radio-box"},[n("label",{attrs:{for:"man"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"man",name:"sex",value:"male"},domProps:{checked:e._q(e.sex,"male")},on:{change:function(t){e.sex="male"}}}),e._v(" 我是男生\n        ")]),e._v(" "),n("label",{attrs:{for:"woman"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"woman",name:"sex",value:"female"},domProps:{checked:e._q(e.sex,"female")},on:{change:function(t){e.sex="female"}}}),e._v(" 我是女生\n        ")])]):e._e(),e._v(" "),n("mt-button",{staticClass:"btn-submit",attrs:{type:"danger",size:"large"},on:{click:e.toResult}},[e._v("确 定")])],1)]),e._v(" "),n("list"),e._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(t){e.$router.push("/")}}},[e._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),e._v(" "),n("fixed-bottom"),e._v(" "),n("preview",{attrs:{pic:e.result,show:e.show},on:{close:e.close}})],1)},staticRenderFns:[]};var y=n("VU/8")(_,k,!1,function(e){n("i9AQ")},"data-v-2c3fabfa",null);t.default=y.exports},i9AQ:function(e,t){}});