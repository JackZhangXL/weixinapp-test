Page({
  data: {
    pullingMessage: '下拉刷新', //下拉刷新，释放更新，加新中...
    refresherTriggered: false,
  },
  onScroll(e){
    console.log(e.detail.scrollTop, e.detail.scrollLeft, e.detail.scrollHeight, e.detail.scrollWidth)
  },
  willCompleteRefresh() {
    console.log('willCompleteRefresh：更新中')
    let intervalId = setInterval(() => { // 模拟【更新中...】的动画效果
      let pullingMessage = this.data.pullingMessage
      if (pullingMessage.length < 7){
        pullingMessage += '.'
      } else {
        pullingMessage = '更新中'
      }
      this.setData({
        pullingMessage
      })
    }, 500)
    setTimeout(() => { // 模拟网络请求耗时2s
      console.log('willCompleteRefresh：更新完了')
      clearInterval(intervalId)
      this.setData({
        pullingMessage: "已刷新",
        refresherTriggered: false,
      })
    }, 2000)
  },
})