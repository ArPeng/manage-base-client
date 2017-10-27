import config from '@config'
import Cookie from 'js-cookie'
export default {
  methods: {
    /**
     * 清除token
     */
    clearToken () {
      Cookie.remove('t')
    },
    /**
     * 设置token
     * @param token
     */
    setToken (token) {
      Cookie.set('t', token)
    },
    /**
     * 获取token
     * @returns {*}
     */
    getToken () {
      return Cookie.get('t')
    },
    /**
     * 检测一个元素是否是某个数组的元素
     * @param ele
     * @param array
     * @returns {boolean}
     */
    inArray (ele, array) {
      if ((array instanceof Array) !== true) {
        throw new Error(this.$lang('第二个参数的类型必须是数组!'))
      }
      return array.indexOf(ele) > -1
    },
    /**
     * 路由跳转 函数
     * @param path
     * @param type 跳转方式, false: 内部路由, true: 外部url
     */
    jump (path, type = false) {
      if (typeof path === 'object') {
        this.$router.push(path)
      } else {
        if (type) {
          window.location.href = path
        } else {
          // 因为线上多目录的问题,在这里统一添加一个路由前缀
          if (path.indexOf('/') === 0) {
            path = `${config.routePrefix}${path}`
          } else {
            path = `${config.routePrefix}/${path}`
          }
          this.$router.push(path)
        }
      }
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
