const app = getApp();

Page({
    data: {
        shopName: "请选择门店",
        shopAddress: "",
        marker: null,
    },

    // 查找 poi
    bindSelectShop: function() {
        const that = this;

        wx.chooseLocation({
            success: function(res) {
                const marker = {
                    id: 99,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    iconPath: "../../images/map_marker.png",
                    width: 40,
                    height: 40,
                    label: {
                        content: res.name,
                        color: "#FF0000",
                    },
                };

                that.setData({
                    shopName: res.name,
                    shopAddress: res.address,
                    marker,
                });
            },
        });
    },

    bindOkBtn: function() {
        const markers = app.globalData.mapMarkers;
        const marker = this.data.marker;

        const ret = markers.find((item) => {
            return (item.latitude === marker.latitude && item.longitude === marker.longitude);
        });

        if (ret === undefined) {    // 没有就加入列表，如果门店已经有了，就不用重复新增了
            marker.id = markers.length;
            app.globalData.mapMarkers.push(marker);
            app.globalData.resetMarkers = true;
        }

        wx.switchTab({      // 返回地图页
            url: '../map/map',
        });
    },
});
