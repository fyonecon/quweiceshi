webpackJsonp([61],{MkHK:function(e,t){},zRCy:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("y+mr");var a=n("3JdW"),o=n.n(a),s=n("Xxa5"),i=n.n(s),r=(n("qONS"),n("UQTY")),c=n.n(r),l=n("//Fk"),u=n.n(l),p=(n("34+y"),n("X+yh")),m=n.n(p),f=n("exGp"),d=n.n(f),v=n("pjeT"),h=n("psC7"),w=n("mS0+"),x=n("0oWP"),g=n("KvKp"),b=n("JAv/"),_=n("fxnj"),k=n.n(_),y={data:function(){return{step:1,nickname:"",sex:"",options:{showRadio:!1,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(e,t,n){n(function(t){Object(b.a)(1).then(function(t){Object(g.a)(e)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)})},methods:{close:function(){this.show=!1},smalltoBIG:function(e){var t=["角","分"],n=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],a=[["元","万","亿"],["","拾","佰","仟"]],o=e<0?"欠":"";e=Math.abs(e);for(var s="",i=0;i<t.length;i++)s+=(n[Math.floor(10*e*Math.pow(10,i))%10]+t[i]).replace(/零./,"");s=s||"整",e=Math.floor(e);for(i=0;i<a[0].length&&e>0;i++){for(var r="",c=0;c<a[1].length&&e>0;c++)r=n[e%10]+a[1][c]+r,e=Math.floor(e/10);s=r.replace(/(零.)*零$/,"").replace(/^$/,"零")+a[0][i]+s}return o+s.replace(/(零.)*零元/,"元").replace(/(零.)+/g,"零").replace(/^整$/,"零元整")},toResult:function(){var e=this;return d()(i.a.mark(function t(){var n,a,o,s,r,l,p,f,d;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.nickname.trim()){t.next=3;break}return m()("请输入姓名"),t.abrupt("return");case 3:return m()("加载中.."),n=e,a="http://quweifiles.mukzz.pw/web-project/damages/cq.png",o="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(a),s=window.location.href,r=run_only(s),o=o+"/p/"+r,console.log(o),l=get_user_ip(),console.log(l),o=o+"/ip/"+l,console.log(o),m()("加载中.."),t.next=21,Object(g.b)(o);case 21:p=t.sent,f=document.createElement("canvas"),d=f.getContext("2d"),new u.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=a,n.onload=function(){f.width=n.width,f.height=n.height,d.drawImage(n,0,0,n.width,n.height),e()}}).then(function(){return new u.a(function(e,t){var n=new Image;n.crossOrigin="anonymous",n.src=p,n.onload=function(){d.drawImage(n,130,565,100,100),e()}})}).then(function(){return new u.a(function(e,t){d.font="35px 微软雅黑",d.fillStyle="#2E2E2E",d.textAlign="left",d.fillText(n.nickname,650,780),e()})}).then(function(){return new u.a(function(e,t){d.font="600 18px 微软雅黑",d.fillStyle="#2E2E2E",d.textAlign="left";var n=parseFloat(Math.round(1e8*Math.random())).toFixed(2);d.fillText(n,489,204),e(n)})}).then(function(e){return new u.a(function(t,a){d.font="600 18px 微软雅黑",d.fillStyle="#2E2E2E",d.textAlign="left";var o=n.smalltoBIG(e);d.fillText(o,192,234),t()})}).then(function(){n.result=f.toDataURL("image/jpeg"),c.a.close(),window.scrollTo(0,0),run_btn_cal(),Object(g.e)()?e.show=!0:k.a.previewImage({current:n.result,urls:[n.result]})});case 25:case"end":return t.stop()}},t,e)}))()}},components:{List:v.a,"mt-button":o.a,scriptRender:x.a,FixedBottom:w.a,preview:h.a}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[e._v("\n    拆迁补偿协议书\n  ")]),e._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step===1"}],staticClass:"p1"},[n("img",{staticClass:"cover-img",attrs:{src:"http://quweifiles.mukzz.pw/web-project/damages/damages.jpg",alt:""}}),e._v(" "),e.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",placeholder:"请输入姓名"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}):e._e(),e._v(" "),e.options.showRadio?n("div",{staticClass:"radio-box"},[n("label",{attrs:{for:"man"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"man",name:"sex",value:"male"},domProps:{checked:e._q(e.sex,"male")},on:{change:function(t){e.sex="male"}}}),e._v(" 我是男生\n        ")]),e._v(" "),n("label",{attrs:{for:"woman"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",id:"woman",name:"sex",value:"female"},domProps:{checked:e._q(e.sex,"female")},on:{change:function(t){e.sex="female"}}}),e._v(" 我是女生\n        ")])]):e._e(),e._v(" "),n("mt-button",{staticClass:"btn-submit",attrs:{type:"danger",size:"large"},on:{click:e.toResult}},[e._v("确 定")])],1)]),e._v(" "),n("list"),e._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(t){e.$router.push("/")}}},[e._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),e._v(" "),n("fixed-bottom"),e._v(" "),n("preview",{attrs:{pic:e.result,show:e.show},on:{close:e.close}})],1)},staticRenderFns:[]};var j=n("VU/8")(y,C,!1,function(e){n("MkHK")},"data-v-0dc60764",null);t.default=j.exports}});