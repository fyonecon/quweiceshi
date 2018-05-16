import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import FastClick from 'fastclick'
import "@/assets/scss/_index.scss"
import {getHost} from '@js/utils'

Vue.config.productionTip = false

//解决移动端点击延迟
FastClick.attach(document.body);

// 隐藏微信原生分享按钮
document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
  // 通过下面这个API隐藏右上角按钮
  WeixinJSBridge.call("hideOptionMenu");
});

// 获取当前域名
window.origenHost = getHost();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
