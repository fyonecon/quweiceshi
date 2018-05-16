import {Indicator, MessageBox} from "mint-ui";
import Cookie from "js-cookie";
import {getQueryString} from "@js/utils";
import axios from 'axios'

// export const baseUrl = process.env.NODE_ENV === 'production' ? 'http://seif.fsherun.cn/yunshi' : '/yunshi';

export const baseUrl = '/api/yunshi';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // Toast('加载中..');;
  return config;
}, function (error) {
  // 对请求错误做些什么
  Indicator.close();
  // MessageBox.alert('服务端异常，请稍后再试','出错了');
  //MessageBox.alert(error);
  return Promise.reject('服务端异常，请稍后再试1');
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Indicator.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  // MessageBox.alert('服务端异常，请稍后再试','出错了');
  //MessageBox.alert(error);
  return Promise.reject('服务端异常，请稍后再试2');
});


// 获取微信配置参数
export function getWX() {
  return axios.get(`${baseUrl}/get_wx_params?url=${encodeURIComponent(location.href.split('#')[0])}`)
}

// 判断字符串是否为json格式
function IsJsonString(str) {
  try {
    let a = JSON.parse(str).avatar;
  } catch (e) {
    return false;
  }
  return true;
}


// 获取用户信息,返回值{avatar:"",nickname:""}
export function getUserInfo(appid) {
  return new Promise((resolve, reject) => {
    if(!Cookie.get("uInfo") || !IsJsonString(Cookie.get('uInfo'))){
      if (getQueryString("state") !== "1") {
        let redirectUrl = window.location.href;
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          redirectUrl
        )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
      } else {
        let code = getQueryString("code");
        Toast('加载中..');;
        axios.get(`${baseUrl}/get_user_info?code=${code}`)
          .then(res => {
            if (!res.data.error) {
              let userInfo = {
                nickname: res.data.data.nickname,
                avatar: res.data.data.headimgurl
              };
              Cookie.set("uInfo", JSON.stringify(userInfo), {expires: 30});
              resolve(userInfo);
            } else {
              MessageBox.alert(res.data.msg,'出错了1');
              reject({})
            }
          })
          .catch(err => {
            MessageBox.alert(err,'出错了2');
            console.log(err);
            reject({})
          });
      }
    }else{
      resolve(Cookie.get('uInfo')?JSON.parse(Cookie.get('uInfo')):{})
    }
  });
}


