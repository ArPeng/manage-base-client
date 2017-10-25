import config from '@config'
export default {
  methods: {
    /**
     * toast提示
     * @param message 提示信息
     * @param time 显示时长
     * @param callback 关闭之后的回调函数
     */
    $toast (message = '', time = 3, callback) {
      let _time = 3000
      let _callback = callback
      if (typeof time === 'function') {
        _callback = time
      }
      if (typeof time === 'number') {
        _time = parseInt(Number(time) * 1000)
      }
      let data = {
        message: message,
        callback: _callback
      }
      this.$store.dispatch('toast', data)
      setTimeout(() => {
        this.$store.dispatch('closeToast')
      }, _time)
    },
    /**
     * 多语言处理
     * @param msg
     */
    $lang (msg = '') {
      let lang = config.language
      let language = require(`@config/lang/${lang}`)
      if (language.default) {
        language = language.default
      }
      if (!language[msg]) {
        return msg
      }
      return language[msg]
    },
    /**
     * 判断一个对象是否为空对象 `{}`
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject (obj) {
      for (let name in obj) {
        return false
      }
      return true
    },
    /**
     * @description 接收url的get参数
     * @param key
     * @param url
     * @returns {*}
     */
    getValueFromUrl (key, url = window.location.href) {
      let _data
      let data = {}
      if (url.indexOf('?') === -1) {
        return ''
      }

      _data = url.split('?')
      _data = _data[1]
      _data = _data.split('&')
      let _data_
      for (let i in _data) {
        _data_ = _data[i].split('=')
        data[decodeURI(_data_[0])] = decodeURI(_data_[1])
      }
      if (!data[key]) {
        return false
      }
      if (key && data[key]) {
        return data[key]
      }
      return data
    },
    /**
     * 生成随机数
     * @param under  范围开始
     * @param over 范围结束
     * @returns {*}
     */
    randAB (under, over) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * under + 1)
        case 2:
          return parseInt(Math.random() * (over - under + 1) + under)
        default:
          return 0
      }
    }
  }
}
