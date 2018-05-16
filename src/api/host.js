/**
 * Created by Administrator on 2018/3/20.
 */
import axios from 'axios'
import {getWX} from './weixin'
import wx from "weixin-js-sdk";

let baseUrl = '/api/url';

// 泛解析跳落地
function open_without_referrer(link) {
  console.log(link);
  document.body.appendChild(document.createElement('iframe')).src = 'javascript:"<script>top.location.replace(\'//' + link + '\')<\/script>"';
}

// 请求泛解析或者落地域名
// @param type 0为泛解析域名,1为落地域名
export function getHost(type) {
  return new Promise((resolve, reject) => {

    console.log("执行了getHost(type)函数");
    //每次进入某个活动页面都会统计
    run_item_cal();

    return resolve();

    return axios.get(`${baseUrl}?type=${type}`)
      .then(res => {
        if (type === 0) {
          let now = window.location.href;
          console.log(res.data.data);
          let url = now.replace(window.location.host, res.data.data);
          resolve(url)
        } else {
          let params = {
            url: res.data.data.url,
            statistics: res.data.data.statistics
          };
          let nowHost = window.location.host;
          let flag = false;
          console.log(res.data.data.total_url);
          let urls = res.data.data.total_url;
          for (let i = 0; i < urls.length; i++) {
            if (urls[i].url === nowHost) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            let link = window.location.href.replace('http://' + nowHost, params.url);
            open_without_referrer(link)
          } else {
            getWX()
              .then(res => {
                wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: res.data.data.appId, // 必填，公众号的唯一标识
                  timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                  signature: res.data.data.signature, // 必填，签名，见附录1
                  jsApiList: ['previewImage','showOptionMenu','showMenuItems','hideMenuItems','hideOptionMenu','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                params.appId = res.data.data.appId;
                resolve(params)
              });
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
}
