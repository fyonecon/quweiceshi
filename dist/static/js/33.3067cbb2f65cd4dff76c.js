webpackJsonp([33],{FfNO:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("y+mr");var a=n("3JdW"),o=n.n(a),s=n("Xxa5"),i=n.n(s),r=(n("qONS"),n("UQTY")),c=n.n(r),l=n("//Fk"),u=n.n(l),m=(n("34+y"),n("X+yh")),p=n.n(m),d=n("exGp"),v=n.n(d),f=n("pjeT"),w=n("mS0+"),h=n("psC7"),x=n("0oWP"),b=n("KvKp"),g=n("JAv/"),_=n("fxnj"),k=n.n(_),y={data:function(){return{step:1,nickname:"",sex:"",options:{showRadio:!0,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(e,t,n){n(function(t){Object(g.a)(1).then(function(t){Object(b.a)(e)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)})},methods:{close:function(){this.show=!1},toResult:function(){var e=this;return v()(i.a.mark(function t(){var n,a,o,s,r,l,m,d,v;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.nickname.trim()){t.next=3;break}return p()("请输入姓名"),t.abrupt("return");case 3:if(e.sex){t.next=6;break}return p()("请选择性别"),t.abrupt("return");case 6:return p()("加载中.."),n=e,a="male"===e.sex?"http://quweifiles.mukzz.pw/web-project/lybtz/0/"+Math.round(5*Math.random())+".jpg":"http://quweifiles.mukzz.pw/web-project/lybtz/1/"+Math.round(13*Math.random())+".jpg",o="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(a),s=window.location.href,r=run_only(s),o=o+"/p/"+r,console.log(o),l=get_user_ip(),console.log(l),o=o+"/ip/"+l,console.log(o),p()("加载中.."),t.next=24,Object(b.b)(o);case 24:m=t.sent,d=document.createElement("canvas"),v=d.getContext("2d"),new u.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=a,n.onload=function(){d.width=n.width,d.height=n.height,v.drawImage(n,0,0,n.width,n.height),e()}}).then(function(){return new u.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=m,n.onload=function(){v.drawImage(n,560,588,100,100),e()}})}).then(function(){return new u.a(function(e,t){v.font="40px 微软雅黑",v.fillStyle="#000000",v.textAlign="left",v.fillText(n.nickname+"的另一半特征",25,650),e()})}).then(function(){n.result=d.toDataURL("image/jpeg"),c.a.close(),window.scrollTo(0,0),run_btn_cal(),Object(b.e)()?e.show=!0:k.a.previewImage({current:n.result,urls:[n.result]})});case 28:case"end":return t.stop()}},t,e)}))()}},components:{List:f.a,"mt-button":o.a,scriptRender:x.a,FixedBottom:w.a,preview:h.a}},j={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[e._v("\n    你的另一半特征\n  ")]),e._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step===1"}],staticClass:"p1"},[n("img",{staticClass:"cover-img",attrs:{src:"http://quweifiles.mukzz.pw/web-project/lybtz/cover.jpg",alt:""}}),e._v(" "),e.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",maxlength:"4",placeholder:"请输入姓名"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}):e._e(),e._v(" "),e.options.showRadio?n("div",{staticClass:"radio-box"},[n("label",{attrs:{for:"man"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"man",name:"sex",value:"male"},domProps:{checked:e._q(e.sex,"male")},on:{change:function(t){e.sex="male"}}}),e._v(" 我是男生\n        ")]),e._v(" "),n("label",{attrs:{for:"woman"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"woman",name:"sex",value:"female"},domProps:{checked:e._q(e.sex,"female")},on:{change:function(t){e.sex="female"}}}),e._v(" 我是女生\n        ")])]):e._e(),e._v(" "),n("mt-button",{staticClass:"btn-submit",attrs:{type:"danger",size:"large"},on:{click:e.toResult}},[e._v("确 定")])],1)]),e._v(" "),n("list"),e._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(t){e.$router.push("/")}}},[e._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),e._v(" "),n("fixed-bottom"),e._v(" "),n("preview",{attrs:{pic:e.result,show:e.show},on:{close:e.close}})],1)},staticRenderFns:[]};var z=n("VU/8")(y,j,!1,function(e){n("bJcR")},"data-v-5feeaa54",null);t.default=z.exports},bJcR:function(e,t){}});