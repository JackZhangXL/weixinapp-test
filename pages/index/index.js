const app = getApp();     //获取应用实例

Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        categoryList: [
            {
                icon: "../../images/code.png",
                text: "程序"
            },
            {
                icon: "../../images/paint.png",
                text: "绘画"
            },
            {
                icon: "../../images/music.png",
                text: "音乐"
            },
            {
                icon: "../../images/opera.png",
                text: "歌剧"
            }
        ],
    },

    onLoad: function () {
        console.log('jack onLoad');
    },

    onReady : function(){
        console.log('jack onLoad');
    },
});
