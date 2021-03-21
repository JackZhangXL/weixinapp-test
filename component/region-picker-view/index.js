// 该组件参照了：https://developers.weixin.qq.com/community/develop/article/doc/0000643f674fa81a18a92b37455413

var address = require('./city.js')

Component({
  options: {
    multipleSlots: false // 启用多slot支持
  },
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    address: '', //详细收货地址（四级）
    value: [0, 0, 0], // 地址选择器省市区 暂存 currentIndex
    regionValue: [0, 0, 0], // 地址选择器省市区 最终 currentIndex
    region: '', //所在地区
    provinces: [], // 一级地址
    citys: [], // 二级地址
    areas: [], // 三级地址
    visible: false
  },
  ready() {
    var id = address.provinces[0].id // 默认联动显示北京
    this.setData({
      provinces: address.provinces, // 34省
      citys: address.citys[id], //默认北京市辖区
      areas: address.areas[address.citys[id][0].id]
    })
  },
  methods: {
    pickAddress() {
      this.setData({
        visible: true,
        value: [...this.data.regionValue]
      })
    },
    closePopUp() {
      this.setData({ visible: false })
    },
    cityChange(e) {
      var value = e.detail.value
      let { provinces, citys } = this.data
      var provinceNum = value[0]
      var cityNum = value[1]
      var areaNum = value[2]

      if (this.data.value[0] !== provinceNum) {
        var id = provinces[provinceNum].id
        this.setData({
          value: [provinceNum, 0, 0],
          citys: address.citys[id],
          areas: address.areas[address.citys[id][0].id]
        })
      } else if (this.data.value[1] !== cityNum) {
        var id = citys[cityNum].id
        this.setData({
          value: [provinceNum, cityNum, 0],
          areas: address.areas[citys[cityNum].id]
        })
      } else {
        this.setData({
          value: [provinceNum, cityNum, areaNum]
        })
      }
    },
    getRegionId(type) {
      let value = this.data.regionValue
      let provinceId = address.provinces[value[0]].id
      let townId = address.citys[provinceId][value[1]].id
      let areaId = ''
      if (address.areas[townId][value[2]].id) {
        areaId = address.areas[townId][value[2]].id
      } else {
        areaId = 0
      }
  
      if (type === 'provinceId') {
        return provinceId
      } else if (type === 'townId') {
        return townId
      } else {
        return areaId
      }
    },
    cityCancel(e) { // 点取消
      var id = address.provinces[0].id 
      this.setData({
        citys: this.data.lastCitys ||  address.citys[id], //默认北京市辖区,
        areas: this.data.lastAreas || address.areas[address.citys[id][0].id],
        value: [...this.data.regionValue],
        visible: false
      })
    },
    citySure(e) { // 点保存
      var value = this.data.value
      this.setData({ visible: false })
      
      try { // 将选择的城市信息显示到输入框
        var region = (this.data.provinces[value[0]].name || '') + (this.data.citys[value[1]].name || '')
        if (this.data.areas.length > 0) {
          region = region + this.data.areas[value[2]].name || ''
        } else {
          this.data.value[2] = 0
        }
      } catch (error) {
        console.log('adress select something error')
      }
  
      this.setData({
        region: region,
        lastCitys: this.data.citys,
        lastAreas: this.data.areas,
        regionValue: [...this.data.value]
      }, () => {
        console.log(`省份ID：${this.getRegionId('provinceId')}: 市区ID：${this.getRegionId('townId')}：城区ID：${this.getRegionId('areas')}`)
        // 触发调用处 wxml 里的 change 事件：<region-picker-view bindchange="onRegionChange"></region-picker-view>
        this.triggerEvent('change', {
          value: {
            region,
            province:{
              id: this.getRegionId('provinceId'),
              name: this.data.provinces[value[0]].name
            },
            town:{
              id: this.getRegionId('townId'),
              name: this.data.citys[value[1]].name
            },
            area:{
              id: this.getRegionId('areas'),
              name: this.data.areas[value[2]].name
            }
          }
        })
      })
    }
  }
})
