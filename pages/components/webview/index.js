Page({
  data: {},
  login(e) {
    console.log(e);
    let { userInfo, encryptedData, iv } = e.detail
    console.log('userInfo, encryptedData, iv', userInfo, encryptedData, iv);

    const requestLoginApi = (code) => {
      console.log(code);
      wx.request({
        url: 'http://localhost:3000/user/wexin-login',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          code: code,
          userInfo,
          encryptedData,
          iv
        },
        success(res) {
          console.log('请求成功', res.data)
          let token = res.data.data.authorizationToken
          wx.setStorageSync('token', token)
          onUserLogin(token)
          console.log('authorization', token)
        },
        fail(err) {
          console.log('请求异常', err)
        }
      })
    }
  
    const onUserLogin = (token)=>{
      getApp().globalData.token = token
      wx.showToast({
        title: '登陆成功了',
      })
    }
  
    wx.checkSession({ // 如果直接登录，第一次登录会报错
      success () {
        console.log('在登陆中');
        let token = wx.getStorageSync('token')
        if (token) onUserLogin(token)
      },
      fail () {
        wx.login({
          success(res0) {
            if (res0.code) {
              requestLoginApi(res0.code)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },  
  login_old(e) { // 第一次登录会报错
    // 第一步：wx.getUserInfo获取：加密过的数据encryptedData，解密参数iv
    let { userInfo, encryptedData, iv } = e.detail
    console.log('userInfo', userInfo); // {nickName, avatarUrl, city, country, gender, ...}
    console.log('encryptedData', encryptedData); // 加密过的数据：YQvHU1TDXZYZb4NtLDOGzAT9x......Y4HHtojE0iw8NRiljYLUyImw9YpX2ylk=
    console.log('iv', iv); // 解密参数iv：OoMZpC3q4psSyDlVF4ncqw

    wx.login({ // 第二步：wx.login获取用户临时登录凭证code
      success(res0) {
        console.log('res0', res0); // {code: "021CAC000EA1sL1QbA100gZ5sJ0CAC0m", errMsg: "login:ok"}
        if (res0.code) {
          // 第三步：把步骤一、二中的code、encryptedData、iv 传到服务端
          // 服务端会请求微信接口：https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
          // 微信接口会返回 openid, session_key 等
          wx.request({
            url: 'http://localhost:3000/user/weixin-login',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res0.code,
              userInfo,
              encryptedData,
              iv
            },
            success(res) {
              console.log('请求成功', res.data)
              getApp().globalData.token = res.data.data.authorizationToken
              console.log('authorization', getApp().globalData.token)
            },
            fail(err) {
              console.log('请求异常', err)
            }
          })
        } else {
          console.log('登录失败！' + res0.errMsg)
        }
      }
    })
  },
  onShareAppMessage:function(options) {
    console.log('onShareAppMessage options', options)
    return {
      title: '登陆',
      path: './index'
    }
  },
})