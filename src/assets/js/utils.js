import QRCode from 'qrcode'


//动态改变页面标题（兼容微信浏览器）
export function setTitle(title) {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    let i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}


// 获取url参数
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


// 获取当前域名,如果是本地测试则指向某个线上接口域名
export function getHost(){
  let host = window.location.origin;
  let local = 'http://localhost:8080';
  return host === local? local : host;
}

// 生成二维码
export function createQRCode(link){
  return new Promise((resolve,reject)=>{
    link = link.replace(/\?[\W\w]+\#/,'#');
    QRCode.toDataURL(link,{margin:1})
      .then(url=>{
        resolve(url)
      })
      .catch(err=>{
        console.log(err)
      })
  })
}

// 判断是否为andro手机
export function isAndroid(){
  let ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) {
    return true
  }
  return false
}


// 统计代码追踪
export function countDetail(to){
  // 统计代码实现
  let _hmt = window._hmt || [];
  console.log(to.fullPath);
  if (to.path) {
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
}

// 判断图片是否加载完成
export function loadingImg(array){
  return new Promise((resolve,reject)=>{
    let len = array.length;
    let count = 0;
    for(let i = 0;i<len;i++){
      let img = new Image();
      img.src=array[i];
      img.onload=()=>{
        count+=1;
        if(count===len){
          resolve()
        }
      }
    }
  })
}
