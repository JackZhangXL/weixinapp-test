const app = getApp();

Page({
    data: {},
    onLoad: function() {
        const that = this;
        const systemInfo = app.globalData.systemInfo;
        const markers = app.globalData.mapMarkers;
        this.mapCtx = wx.createMapContext('myMap');

        const controls = [{
            id: 1,
            iconPath: "../../images/map_return.png",
            position: {
                left: 20,
                top: systemInfo.windowHeight - 50,
                width: 40,
                height: 40,
            },
            clickable: true,
        }, {
            id: 2,
                iconPath: "../../images/map_zoom_plus.png",
                position: {
                left: systemInfo.windowWidth - 50,
                top: systemInfo.windowHeight - 50,
                width: 40,
                height: 40,
            },
            clickable: true,
        }];

        wx.getLocation({
            success: (res) => {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers,
                    circles: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        color: "#0fa5d9",
                        fillColor: "#7cb5ec88",
                        radius: 1000,
                        strokeWidth: 1,
                    }],
                    controls,
                });
            },
        });
    },

    onShow: function() {
        if (app.globalData.resetMarkers) {
            app.globalData.resetMarkers = false;
            this.setData({
                markers: app.globalData.mapMarkers,
            });
        }
    },

    controlTap: function(e) {
        const controlId = e.controlId;

        if (controlId === 1) {  // 回到我的位置
            this.mapCtx.moveToLocation();
        } else if (controlId === 2) {   // 增加【我的门店】
            wx.navigateTo({
                url: '../shop/shop',
            });
        }
    },

    markerTap: function(e) {
        console.log(e.markerId);

        // wx.showActionSheet({
        //     itemList: ["A"],
        //     success: function (res) {
        //         console.log(res.tapIndex);
        //     },
        //     fail: function (res) {
        //         console.log(res.errMsg);
        //     },
        // });
    },

    // // 视野发生变化
    // regionChange: function(e) {
    //     console.log(e.type);
    // },
    //
    // // 获取位置
    // getCenterLocation: function() {
    //     this.mapCtx.getCenterLocation({
    //         success: function(res){
    //             console.log(res.longitude)
    //             console.log(res.latitude)
    //         }
    //     })
    // },
    // // 移动标注
    // translateMarker: function() {
    //     this.mapCtx.translateMarker({
    //         markerId: 0,
    //         autoRotate: true,
    //         duration: 1000,
    //         destination: {
    //             latitude:121.42698,
    //             longitude:31.22346,
    //         },
    //         animationEnd() {
    //             console.log('animation end')
    //         }
    //     })
    // },
    // // 缩放视野展示所有经纬度
    // includePoints: function() {
    //     this.mapCtx.includePoints({
    //         padding: [10],
    //         points: [{
    //             latitude:23.10229,
    //             longitude:113.3345211,
    //         }, {
    //             latitude:23.00229,
    //             longitude:113.3345211,
    //         }]
    //     })
    // },
});
