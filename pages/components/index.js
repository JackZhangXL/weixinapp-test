// scroll-view 使用的最佳实践
// 1.启用 scroll-anchoring 时，同时添加 overflow-anchor: auto 的样式，以兼容安卓机型
// 2.scroll-y 和 scroll-x 只取其一，只开启一个方向的滚动（虽然可以同时开启）
// 3.开启 scroll-y 时，必须给组件一个高度，子组件的高度之和要大于这个高度
// 4.开启 scroll-x 时，必须给组件一个宽度，通常是100%等于屏宽，子组件的宽度之和要大于这个宽度。如果不滚动，可以添加 white-space: nowrap;display: inline-block;
// 5.开启 enable-flex，相当于给 scroll-view 添加了 display:flex。但如果我们自己加样式，只能添加到外围容器上，只有通过这个属性才能加到内部真正的容器上
// 6.开启 refresher-enabled 下拉刷新自定义动画，动画容器的插槽必须设为 slot="refresher"
// 7.不要在JS的 scroll 事件里直接更新视图，应该将频繁更新视图操作放到 WXS 脚本里

const createRecycleContext = require('miniprogram-recycle-view')
function rpx2px(rpx) {
  return (rpx / 750) * wx.getSystemInfoSync().windowWidth
}

Page({
  data: {
    percentValue: 80, // progress进度
    nodes: [{
      name: 'div',
      attrs: {
        class: 'rich_text_wrap',
        style: 'line-height: 20px;padding:20px;border:1px solid #111;'
      },
      children: [
        {
          name: 'img',
          attrs: {
            src: 'https://zxljack.com/wp-content/uploads/2018/03/border-radius11.png',
            style: 'width:33%'
          }
        }, {
          name: 'img',
          attrs: {
            src: 'https://zxljack.com/wp-content/uploads/2018/03/border-radius10.png',
            style: 'width:33%'
          }
        }, {
          name: 'img',
          attrs: {
            src: 'https://zxljack.com/wp-content/uploads/2018/03/border-radius14.png',
            style: 'width:33%'
          }
        }
      ]
    }],
    imgUrls: [],
    src: '',
  },
  onReady: function () {
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        width: rpx2px(650),
        height: rpx2px(100)
      }
    })
    let newList = []
    for (let i = 0; i < 20; i++) {
      newList.push({
        id: i,
        name: `标题${i + 1}`
      })
    }
    ctx.append(newList)
  },
  onLoad: function() {
    function findUrl(nodes) {
      let urls = []
      nodes.forEach(item => {
        if (item.name == 'img' && item.attrs) {
          for (const key in item.attrs) {
            if (key == 'src') {
              urls.push(item.attrs[key])
            }
          }
        }
        if (item.children) {
          urls = urls.concat(findUrl(item.children))
        }
      })
      return urls
    }
    this.data.imgUrls = findUrl(this.data.nodes)
    this.setData({
      slideButtons: [{
        text: '普通1',
      }, {
        text: '普通2',
        extClass: 'test',
      }, {
        type: 'warn',
        text: '警示3',
        extClass: 'test',
      }],
    });
  },
  drawProgress: function () { // 点击更新progress
    if (this.data.percentValue >= 100){
      this.setData({ percentValue: 0 })
    }
    this.setData({ percentValue: this.data.percentValue + 10 })
  },
  tap: function (e) { // 点击rich-text预览图片
    let urls = this.data.imgUrls
    wx.previewImage({
      current: urls[0],
      urls: urls
    })
  },
  onTap: function (e) { // 点击view节点
    console.log(e.target)
  },
  viewScrollToUpperEvent(e) { // 配合scroll-view的upper-threshold属性使用
    console.log('测试scrolltoupper事件', e.detail); 
  },
})