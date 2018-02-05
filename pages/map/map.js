const app = getApp();

Page({
    data: {
        // id: 0 留给 marker
        scale: 16,
        controls: [{
            id: 1,
            iconPath: "../../images/map_zoom_plus.png",
            position: {
                left: 60,
                top: 20,
                width: 40,
                height: 40,
            },
            clickable: true,
        }, {
            id: 2,
            iconPath: "../../images/map_zoom_minus.png",
            position: {
                left: 20,
                top: 20,
                width: 40,
                height: 40,
            },
            clickable: true,
        }],
    },
    onLoad: function() {
        const that = this;
        const systemInfo = app.globalData.systemInfo;
        this.mapCtx = wx.createMapContext('myMap');

        let controls = [...this.data.controls];
        controls.push({
            id: 3,
            iconPath: "../../images/map_return.png",
            position: {
                left: 20,
                top: systemInfo.windowHeight - 50,
                width: 40,
                height: 40,
            },
            clickable: true,
        });
        controls.push({
            id: 4,
                iconPath: "../../images/map_search.png",
                position: {
                left: systemInfo.windowWidth - 50,
                top: systemInfo.windowHeight - 50,
                width: 40,
                height: 40,
            },
            clickable: true,
        });

        wx.getLocation({
            success: (res) => {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    controls,
                    polyline: [{
                        points: [{
                            longitude: res.latitude,
                            latitude: res.longitude,
                        }, {
                            longitude: res.latitude + 50,
                            latitude: res.longitude + 50,
                        }],
                        color:"#FF0000",
                        width: 2,
                        dottedLine: true
                    }],
                    circles: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        color: "#0fa5d9",
                        fillColor: "#7cb5ec88",
                        radius: 1000,
                        strokeWidth: 1,
                    }],
                });
            },
        });
    },

    // 点击左上角缩放按钮
    controlTap: function(e) {
        const controlId = e.controlId;

        if (controlId === 1) {  // 增加 zoom
            this.setData({
                scale: this.data.scale + 1,
            });
        } else if (controlId === 2) {   // 缩小 zoom
            this.setData({
                scale: this.data.scale - 1,
            });
        } else if (controlId === 3) {   // 回到我的位置
            this.mapCtx.moveToLocation();
        } else if (controlId === 4) {   // 查找 poi
            this.chooseLocation();
        }
    },

    // 查找 poi
    chooseLocation: function(e) {
        const that = this;

        wx.chooseLocation({
            success: function(res) {
                let markers = [];
                if (that.data.hasOwnProperty("markers")) {
                    markers = [...that.data.markers];
                }
                const id = markers.length ? markers[markers.length - 1].id + 1 : 0;

                markers.push({
                    id,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    iconPath: "../../images/map_marker.png",
                    width: 40,
                    height: 40,
                    label: {
                        content: res.name,
                        color: "#FF0000",
                    },
                });

                that.setData({
                    markers,
                });
            },
        });
    },

    // 视野发生变化
    regionChange: function(e) {
        console.log(e.type);
    },

    // 点击大头钉
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
