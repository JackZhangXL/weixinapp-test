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
                height: 40
            },
            clickable: true,
        }, {
            id: 2,
            iconPath: "../../images/map_zoom_minus.png",
            position: {
                left: 20,
                top: 20,
                width: 40,
                height: 40
            },
            clickable: true,
        }],
    },
    onLoad: function () {
        const that = this;

        wx.getLocation({
            success: (res) => {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: [{
                        id: 0,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        title: "哪里",
                        iconPath: "../../images/map_marker.png",
                        width: 40,
                        height: 40,
                    }],
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
                        radius: 300,
                        strokeWidth: 1,
                    }],
                });
            },
        });
    },

    // 视野发生变化
    regionChange(e) {
        console.log(e.type);
    },

    // 点击大头钉
    markerTap(e) {
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

    // 点击左上角缩放按钮
    controlTap(e) {
        const controlId = e.controlId;

        if (controlId === 1) {
            this.setData({
                scale: this.data.scale + 1,
            });
        } else if (controlId === 2) {
            this.setData({
                scale: this.data.scale - 1,
            });
        }
    },
});
