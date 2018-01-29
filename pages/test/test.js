const util = require('../../utils/util.js');

Page({
    data: {
        logs: [],
        text: 'init data',
        num: 0,
        array: [{ text: 'init data' }],
        object: {
            text: 'init data',
        },
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log));
            }),
        })
    },
    changeText: function () {
        // this.data.text = 'changed data'  // bad, it can not work
        this.setData({
            text: 'changed data',
        });
    },
    changeNum: function () {
        this.data.num = 1;
        this.setData({
            num: this.data.num,
        });
    },
    changeItemInArray: function () {
        // you can use this way to modify a danamic data path
        this.setData({
            'array[0].text': 'changed data',
        });
    },
    changeItemInObject: function () {
        this.setData({
            'object.text': 'changed data',
        });
    },
    addNewField: function () {
        this.setData({
            'newField.text': 'new data',
        });
    },
});
