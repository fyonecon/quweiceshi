webpackJsonp([28],{OMeI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("y+mr");var i=n("3JdW"),o=n.n(i),l=n("Xxa5"),a=n.n(l),s=(n("qONS"),n("UQTY")),c=n.n(s),r=n("//Fk"),u=n.n(r),f=(n("34+y"),n("X+yh")),p=n.n(f),x=n("exGp"),m=n.n(x),w=n("pjeT"),h=n("mS0+"),v=n("psC7"),g=n("0oWP"),d=n("KvKp"),b=n("JAv/"),_=n("fxnj"),k=n.n(_),y={data:function(){return{step:1,nickname:"",sex:"",options:{showRadio:!1,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(t,e,n){n(function(e){Object(b.a)(1).then(function(e){Object(d.a)(t)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)})},methods:{close:function(){this.show=!1},toResult:function(){var t=this;return m()(a.a.mark(function e(){var n,i,o,l,s,r,f,x,m,w,h,v,g,b;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.nickname.trim()){e.next=3;break}return p()("请输入姓名"),e.abrupt("return");case 3:return p()("加载中.."),n=t,i="http://quweifiles.mukzz.pw/web-project/gghbb/bg2.jpg",o="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(i),l=window.location.href,s=run_only(l),o=o+"/p/"+s,console.log(o),r=get_user_ip(),console.log(r),o=o+"/ip/"+r,console.log(o),p()("加载中.."),e.next=20,Object(d.b)(o);case 20:f=e.sent,x=document.createElement("canvas"),m=x.getContext("2d"),w=205,h="left",v=new Date,(g=v.getMinutes())<10&&(g="0"+g),b=v.getHours()+":"+g,console.log(b),new u.a(function(t,e){var n=new Image;n.crossOrigin="anonymous",n.src=i,n.onload=function(){x.width=n.width,x.height=n.height,m.drawImage(n,0,0,n.width,n.height),t()}}).then(function(){return new u.a(function(t,e){var n=new Image;n.crossOrigin="anonymous",n.src=f,n.onload=function(){m.drawImage(n,32,1770,145,145),t()}})}).then(function(){return new u.a(function(t,e){m.font="36px SimHei bolder",m.fillStyle="#fff",m.textAlign=h,m.textBaseline="top",m.fillText(b,87,48),t()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,280),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,480),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,670),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,870),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,1060),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,1270),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,1460),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,1670),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,2050),e()})}).then(function(){return new u.a(function(e,n){m.font="40px 微软雅黑",m.fillStyle="#979797",m.textAlign=h,m.textBaseline="top",m.fillText(t.nickname,w,2250),e()})}).then(function(){n.result=x.toDataURL("image/jpeg"),c.a.close(),window.scrollTo(0,0),run_btn_cal(),Object(d.e)()?t.show=!0:k.a.previewImage({current:n.result,urls:[n.result]})});case 31:case"end":return e.stop()}},e,t)}))()}},components:{List:w.a,"mt-button":o.a,scriptRender:g.a,FixedBottom:h.a,preview:v.a}},j={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[t._v("\n    公众号表白\n  ")]),t._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.step,expression:"step===1"}],staticClass:"p1"},[n("img",{staticClass:"cover-img",attrs:{src:"http://quweifiles.mukzz.pw/web-project/gghbb/cover.jpg",alt:""}}),t._v(" "),t._m(0),t._v(" "),t.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",maxlength:"20",placeholder:"请输入表白语，最多20字"},domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value)}}}):t._e(),t._v(" "),n("mt-button",{staticClass:"btn-submit btn-ok",attrs:{type:"danger",size:"large"},on:{click:t.toResult}},[t._v("确 定")])],1)]),t._v(" "),n("list"),t._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(e){t.$router.push("/")}}},[t._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),t._v(" "),n("fixed-bottom"),t._v(" "),n("preview",{attrs:{pic:t.result,show:t.show},on:{close:t.close}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"small-title"},[this._v("赶快去生成吧")]),this._v(" "),e("div",{staticClass:"small-title-txt"},[this._v("大牌公众号帮你表白，实现你装逼成功的可能。")])])}]};var T=n("VU/8")(y,j,!1,function(t){n("U/wj")},"data-v-69d5e42e",null);e.default=T.exports},"U/wj":function(t,e){}});