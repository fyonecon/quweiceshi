webpackJsonp([31],{LA8L:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("y+mr");var a=n("3JdW"),o=n.n(a),i=n("Xxa5"),s=n.n(i),r=(n("qONS"),n("UQTY")),c=n.n(r),l=n("//Fk"),u=n.n(l),m=(n("34+y"),n("X+yh")),p=n.n(m),d=n("exGp"),f=n.n(d),v=n("pjeT"),w=n("psC7"),h=n("mS0+"),x=n("0oWP"),g=n("KvKp"),b=n("JAv/"),_=n("fxnj"),k=n.n(_),y={data:function(){return{step:1,nickname:"",nickname2:"",sex:"",options:{showRadio:!1,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(e,t,n){n(function(t){Object(b.a)(1).then(function(t){Object(g.a)(e)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)})},methods:{close:function(){this.show=!1},toResult:function(){var e=this;return f()(s.a.mark(function t(){var n,a,o,i,r,l,m,d,f;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.nickname.trim()){t.next=3;break}return p()("请输入对方的名字"),t.abrupt("return");case 3:if(e.nickname2.trim()){t.next=6;break}return p()("请输入您的名字"),t.abrupt("return");case 6:return p()("加载中.."),n=e,a="http://quweifiles.mukzz.pw/web-project/sbzdgx/"+Math.round(13*Math.random())+".jpg",o="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(a),i=window.location.href,r=run_only(i),o=o+"/p/"+r,console.log(o),l=get_user_ip(),console.log(l),o=o+"/ip/"+l,console.log(o),p()("加载中.."),t.next=24,Object(g.b)(o);case 24:m=t.sent,d=document.createElement("canvas"),f=d.getContext("2d"),new u.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=a,n.onload=function(){d.width=n.width,d.height=n.height,f.drawImage(n,0,0,n.width,n.height),e()}}).then(function(){return new u.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=m,n.onload=function(){f.drawImage(n,438,817,110,110),e()}})}).then(function(){return new u.a(function(e,t){f.font="50px 黑体",f.fillStyle="#ff4949",f.textAlign="right",f.fillText(""+n.nickname,273,270),e()})}).then(function(){return new u.a(function(e,t){f.font="50px 黑体",f.fillStyle="#ff4949",f.textAlign="left",f.fillText(""+n.nickname2,335,270),e()})}).then(function(){return new u.a(function(e,t){f.font="20px 微软雅黑",f.fillStyle="#ff4949",f.textAlign="center",f.fillText("长按识别就能看你的",507,967),e()})}).then(function(){n.result=d.toDataURL("image/jpeg"),c.a.close(),window.scrollTo(0,0),run_btn_cal(),Object(g.e)()?e.show=!0:k.a.previewImage({current:n.result,urls:[n.result]})});case 28:case"end":return t.stop()}},t,e)}))()}},components:{List:v.a,"mt-button":o.a,scriptRender:x.a,FixedBottom:h.a,preview:w.a}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[e._v("\n    你和Ta上辈子是什么关系 💓\n  ")]),e._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step===1"}],staticClass:"p1"},[n("img",{staticClass:"cover-img",attrs:{src:"http://quweifiles.mukzz.pw/web-project/sbzdgx/cover.png",alt:""}}),e._v(" "),e.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",placeholder:"请输入对方的名字"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}):e._e(),e._v(" "),e.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname2,expression:"nickname2"}],staticClass:"input",attrs:{type:"text",placeholder:"请输入您的名字"},domProps:{value:e.nickname2},on:{input:function(t){t.target.composing||(e.nickname2=t.target.value)}}}):e._e(),e._v(" "),e.options.showRadio?n("div",{staticClass:"radio-box"},[n("label",{attrs:{for:"man"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"man",name:"sex",value:"male"},domProps:{checked:e._q(e.sex,"male")},on:{change:function(t){e.sex="male"}}}),e._v(" 我是男生\n        ")]),e._v(" "),n("label",{attrs:{for:"woman"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"woman",name:"sex",value:"female"},domProps:{checked:e._q(e.sex,"female")},on:{change:function(t){e.sex="female"}}}),e._v(" 我是女生\n        ")])]):e._e(),e._v(" "),n("mt-button",{staticClass:"btn-submit",attrs:{type:"danger",size:"large"},on:{click:e.toResult}},[e._v("确 定")])],1)]),e._v(" "),n("list"),e._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(t){e.$router.push("/")}}},[e._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),e._v(" "),n("fixed-bottom"),e._v(" "),n("preview",{attrs:{pic:e.result,show:e.show},on:{close:e.close}})],1)},staticRenderFns:[]};var j=n("VU/8")(y,C,!1,function(e){n("az2v")},"data-v-6598bd76",null);t.default=j.exports},az2v:function(e,t){}});