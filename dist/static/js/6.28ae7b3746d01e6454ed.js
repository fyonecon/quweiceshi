webpackJsonp([6],{CltE:function(t,e){},IgJZ:function(t,e){},ZakN:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("y+mr");var i=n("3JdW"),s=n.n(i),a=n("Xxa5"),o=n.n(a),c=(n("qONS"),n("UQTY")),r=n.n(c),l=n("//Fk"),u=n.n(l),p=(n("34+y"),n("X+yh")),m=n.n(p),f=n("exGp"),v=n.n(f),d=n("pjeT"),h=n("mS0+"),g={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var w=n("VU/8")({name:"clip-img"},g,!1,function(t){n("CltE")},"data-v-691840f7",null).exports,_=n("psC7"),b=n("0oWP"),x=n("KvKp"),C=n("JAv/"),k=n("fxnj"),y=n.n(k),I={data:function(){return{step:1,nickname:"",sex:"",options:{showRadio:!1,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(t,e,n){n(function(e){Object(C.a)(1).then(function(e){Object(x.a)(t)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)}),this.init()},methods:{close:function(){this.show=!1},init:function(){var t=localStorage.getItem("clip_img");if(!t)return console.log("裁图为空时使用默认图片"),void(this.$refs.clip_img.src="http://quweifiles.mukzz.pw/web-project/dashuaimai/null.jpg");this.$refs.clip_img.src=t},toResult:function(){var t=this;return v()(o.a.mark(function e(){var n,i,s,a,c,l,p,f,v,d,h;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.nickname.trim()){e.next=3;break}return m()("请输入姓名"),e.abrupt("return");case 3:return m()("加载中.."),n=t,i="http://quweifiles.mukzz.pw/web-project/dashuaimai/bg.jpg",s=localStorage.getItem("clip_img"),a="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(i),c=window.location.href,l=run_only(c),a=a+"/p/"+l,console.log(a),p=get_user_ip(),console.log(p),a=a+"/ip/"+p,console.log(a),m()("加载中.."),e.next=21,Object(x.b)(a);case 21:f=e.sent,v=document.createElement("canvas"),d=v.getContext("2d"),h="left",new u.a(function(t,e){var n=new Image;n.crossOrigin="anonymous",n.src=i,n.onload=function(){v.width=n.width,v.height=n.height,d.drawImage(n,0,0,n.width,n.height),t()}}).then(function(){return new u.a(function(t,e){var n=new Image;n.crossOrigin="anonymous",n.src=f,n.onload=function(){d.drawImage(n,63,921,125,125),t()}})}).then(function(){return new u.a(function(e,n){d.font="50px 微软雅黑 bold",d.fillStyle="#ffffff",d.textAlign=h,d.textBaseline="top",d.fillText(t.nickname,40,100),e()})}).then(function(){return new u.a(function(t,e){var n=new Image;n.crossOrigin="anonymous",n.src=s,n.onload=function(){d.beginPath(),d.arc(183,451,120,0,2*Math.PI),d.clip(),d.drawImage(n,63,321,260,260),t()}})}).then(function(){n.result=v.toDataURL("image/jpeg"),r.a.close(),window.scrollTo(0,0),run_btn_cal(),Object(x.e)()?t.show=!0:y.a.previewImage({current:n.result,urls:[n.result]})});case 26:case"end":return e.stop()}},e,t)}))()}},components:{List:d.a,"mt-button":s.a,scriptRender:b.a,FixedBottom:h.a,ClipImg:w,preview:_.a}},j={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[t._v("\n    520大甩卖\n  ")]),t._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.step,expression:"step===1"}],staticClass:"p1"},[t._m(0),t._v(" "),n("div",{staticClass:"clip-box"},[n("img",{ref:"clip_img",staticClass:"clip-img float-left",attrs:{src:"",id:"clip-img",alt:"裁剪图"}}),t._v(" "),n("a",{staticClass:"up-img-a",attrs:{href:"../play_h5/files/clip-img/index.html"}},[t._v("上传图片")]),t._v(" "),n("div",{staticClass:"clear"}),t._v(" "),n("clip-img")],1),t._v(" "),t.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",maxlength:"4",placeholder:"请输入姓名"},domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value)}}}):t._e(),t._v(" "),n("mt-button",{staticClass:"btn-submit btn-ok",attrs:{type:"danger",size:"large"},on:{click:t.toResult}},[t._v("确 定")])],1)]),t._v(" "),n("list"),t._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(e){t.$router.push("/")}}},[t._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),t._v(" "),n("fixed-bottom"),t._v(" "),n("preview",{attrs:{pic:t.result,show:t.show},on:{close:t.close}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{"margin-bottom":"20px"}},[e("div",{staticClass:"small-title"},[this._v("经营项目")]),this._v(" "),e("div",{staticClass:"small-title-txt"},[this._v("牵手？！亲嘴儿？！看电影？！假装情侣？！")])])}]};var O=n("VU/8")(I,j,!1,function(t){n("IgJZ")},"data-v-515257f4",null);e.default=O.exports}});