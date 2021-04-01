Page({
  data: {
    url:'',
    webViewData:{}
  },
  onReceivedMessage(e) {
    let data = e.detail.data  // data可能是多次 postMessage 的参数组成的数组
    if (Array.isArray(data)) data = data[0]
    console.log('onReceivedMessage',JSON.parse(data))
    this.setData({
      webViewData:JSON.parse(data)
    })
  },
  onShareAppMessage(options) {
    console.log('onShareAppMessage2 options', options)
    console.log('title',this.data.webViewData.title)
    return {
      title: this.data.webViewData.title,
      path: `./index?web-view-url=${options.webViewUrl}`
    }
  },
  onLoad: function (options) {
    let token = getApp().globalData.token // wx.login的success里得到的 jwt 签名放到url上，去服务器验证
    let url = `http://localhost:3000/user/web-view?token=${token}`
    this.setData({ url })
  },
})