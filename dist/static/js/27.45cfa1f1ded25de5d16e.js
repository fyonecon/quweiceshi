webpackJsonp([27],{"23O0":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("y+mr");var a=n("3JdW"),i=n.n(a),s=n("Xxa5"),o=n.n(s),r=n("//Fk"),l=n.n(r),c=(n("34+y"),n("X+yh")),u=n.n(c),m=n("exGp"),p=n.n(m),d=n("pjeT"),v=n("mS0+"),h=n("psC7"),f=n("0oWP"),x=n("KvKp"),w=n("JAv/"),g=n("fxnj"),_=n.n(g),b={data:function(){return{step:1,nickname:"",sex:"",options:{showRadio:!0,showInput:!0},result:"",count:"",show:!1}},beforeRouteEnter:function(t,e,n){n(function(e){Object(w.a)(1).then(function(e){Object(x.a)(t)})})},mounted:function(){this.$nextTick(function(){window.scrollTo(0,0)})},methods:{close:function(){this.show=!1},toResult:function(){var t=this;return p()(o.a.mark(function e(){var n,a,i,s,r,c,m,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.nickname.trim()){e.next=3;break}return u()("请输入姓名"),e.abrupt("return");case 3:if(t.sex){e.next=6;break}return u()("请选择性别"),e.abrupt("return");case 6:return u()("加载中.."),n=t,a="male"===t.sex?"http://quweifiles.mukzz.pw/web-project/nidemingzi/xy.jpg":"http://quweifiles.mukzz.pw/web-project/nidemingzi/xx.jpg",i="http://qwapi_ywfbt.mukzz.pw/public/?s=/api/jump/jp",console.log(a),s=window.location.href,r=run_only(s),i=i+"/p/"+r,console.log(i),c=get_user_ip(),console.log(c),i=i+"/ip/"+c,console.log(i),e.next=21,Object(x.b)(i);case 21:e.sent,m=document.createElement("canvas"),p=m.getContext("2d"),0,0,new l.a(function(t,e){var n=new Image;n.crossOrigin="anonymous",n.src=a,n.onload=function(){m.width=n.width,m.height=n.height,n.width,n.height,p.drawImage(n,0,0,n.width,n.height),t()}}).then(function(){return new l.a(function(e,n){"male"===t.sex?(p.font="20px LiSu",p.fillStyle="#000",p.textAlign="left",p.fillTextVertical_rotate_spacing(t.nickname.trim(),158,242,-15,1)):(p.font="18px KaiTi",p.fillStyle="#000",p.textAlign="left",p.fillTextVertical_rotate_spacing(t.nickname.trim(),120,220,-20,1)),e()})}).then(function(){n.result=m.toDataURL("image/jpeg"),window.scrollTo(0,0),run_btn_cal(),Object(x.e)()?t.show=!0:_.a.previewImage({current:n.result,urls:[n.result]})});case 27:case"end":return e.stop()}},e,t)}))()}},components:{List:d.a,"mt-button":i.a,scriptRender:f.a,FixedBottom:v.a,preview:h.a}};CanvasRenderingContext2D.prototype.fillTextVertical_rotate_spacing=function(t,e,n,a,i){var s=this,o=(s.canvas,t.split("")),r=o.map(function(t){return s.measureText(t).width}),l=s.textAlign,c=s.textBaseline;"left"==l?e+=Math.max.apply(null,r)/2:"right"==l&&(e-=Math.max.apply(null,r)/2),"bottom"==c||"alphabetic"==c||"ideographic"==c?n-=r[0]/2:"top"!=c&&"hanging"!=c||(n+=r[0]/2),s.textAlign="center",s.textBaseline="middle",o.forEach(function(o,l){var c=r[l];o.charCodeAt(0)<=256?(s.translate(e,n),s.rotate(90*Math.PI/180),s.translate(-e,-n)):l>0&&t.charCodeAt(l-1)<256&&(n+=r[l-1]/2),s.rotate(a*Math.PI/180),s.fillText(o,e,n),s.setTransform(1,0,0,1,0,0);c=r[l];n=n+c+i}),s.textAlign=l,s.textBaseline=c};var k={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"web-index"},[n("div",{staticClass:"title"},[t._v("\n    你的名字\n  ")]),t._v(" "),n("div",{staticClass:"container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.step,expression:"step===1"}],staticClass:"p1"},[n("img",{staticClass:"cover-img",attrs:{src:"http://quweifiles.mukzz.pw/web-project/nidemingzi/cover.jpg",alt:""}}),t._v(" "),t._m(0),t._v(" "),t.options.showInput?n("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],staticClass:"input",attrs:{type:"text",maxlength:"4",placeholder:"请输入你的中文姓名"},domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value)}}}):t._e(),t._v(" "),t.options.showRadio?n("div",{staticClass:"radio-box"},[n("label",{attrs:{for:"man"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.sex,expression:"sex"}],attrs:{type:"radio",id:"man",name:"sex",value:"male"},domProps:{checked:t._q(t.sex,"male")},on:{change:function(e){t.sex="male"}}}),t._v(" 我是男生\n        ")]),t._v(" "),n("label",{attrs:{for:"woman"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.sex,expression:"sex"}],attrs:{type:"radio",id:"woman",name:"sex",value:"female"},domProps:{checked:t._q(t.sex,"female")},on:{change:function(e){t.sex="female"}}}),t._v(" 我是女生\n        ")])]):t._e(),t._v(" "),n("mt-button",{staticClass:"btn-submit btn-ok",attrs:{type:"danger",size:"large"},on:{click:t.toResult}},[t._v("确 定")])],1)]),t._v(" "),n("list"),t._v(" "),n("div",{staticClass:"btn-box"},[n("mt-button",{staticClass:"scale",attrs:{type:"primary",size:"large"},on:{click:function(e){t.$router.push("/")}}},[t._v("更多测试 "),n("i",{staticClass:"iconfont icon-next"})])],1),t._v(" "),n("fixed-bottom"),t._v(" "),n("preview",{attrs:{pic:t.result,show:t.show},on:{close:t.close}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"small-title"},[this._v("One more time, One more chance")]),this._v(" "),e("div",{staticClass:"small-title-txt"},[this._v("相遇轻而易举，重逢却需君百般努力。现在开始轮到我了，带上经验与知识，还有已经发霉的勇气，以前所未有的速度，冲向你的身边！")])])}]};var y=n("VU/8")(b,k,!1,function(t){n("qnoR")},"data-v-6c477a2a",null);e.default=y.exports},qnoR:function(t,e){}});