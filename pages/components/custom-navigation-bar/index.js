Page({
  data: {
    loading: false,
    active: true
  },
  goBack: function () {
    wx.navigateBack();
    this.triggerEvent('back');
  },
  goHome:function(){
    wx.reLaunch({
      url: '../index'
    })
  },
  onPageScroll(res) { // 滚动到距离顶部400位置时，显示导航栏    
    if (res.scrollTop > 400) {
      if (!this.data.active) {
        this.setData({
          active: true
        })
      }
    } else {
      if (this.data.active) {
        this.setData({
          active: false
        })
      }
    }
  }
})