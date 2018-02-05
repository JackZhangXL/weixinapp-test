//app.js
// require('./utils/polyfill');
// const ajax = require('./utils/ajax');
// const host = require('./config/request-host');

App({
    onLaunch: function () {
        this.globalData.systemInfo = wx.getSystemInfoSync();
    },
    getUserInfo: function(cb) {
        const that = this;

        if (this.globalData.userInfo) {
            console.log('jack 用户信息有了');
            typeof cb === 'function' && cb(this.globalData.userInfo);
        } else {
            console.log('jack 用户信息没有');
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            console.log('jack 用户信息',res);
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            });
        }
    },
    globalData: {
        userInfo: null,
        systemInfo: null,
    },
});
