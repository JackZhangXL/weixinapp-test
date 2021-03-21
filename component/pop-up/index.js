
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {},
  ready(){},
  methods: {
    popPreventTouchmove() { },
    popPreventTouchmove2() { },
    popPreventTouchmove3() { },
    cityChange() { },
    close() {
      this.triggerEvent('close')
    },
    handleClickMask(e) {
      if (e.target.dataset.type !== 'unclose') this.close()
    }
  }
})
