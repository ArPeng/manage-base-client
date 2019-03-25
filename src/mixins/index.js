import config from '@config'
import Cookie from 'js-cookie'
import {Loading} from 'element-ui'
import Store from '@store'
import storage from 'store'
let loadingResult = null
export default {
  methods: {

    /**
     * @purpose 秒数格式化
     * @param value
     * @returns {string}
     */
    formatSeconds (value) {
      var secondTime = parseInt(value)// 秒
      var minuteTime = 0// 分
      var hourTime = 0// 小时
      if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
        // 获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60)
        // 获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60)
        // 如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          // 获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60)
          // 获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60)
        }
      }
      var result = ''
      if (secondTime > 10) {
        result = secondTime
      } else if (secondTime === 0) {
        result = '00'
      } else if (secondTime < 10) {
        result = '0' + secondTime
      } else {
        result = secondTime
      }
      if (minuteTime === 0) {
        result = '00:' + result
      } else if (minuteTime >= 10) {
        result = minuteTime + ':' + result
      } else {
        result = '0' + minuteTime + ':' + result
      }
      if (hourTime === 0) {
        result = '00:' + result
      } else if (hourTime >= 10) {
        result = hourTime + ':' + result
      } else {
        result = '0' + hourTime + ':' + result
      }
      return result
    },
    /**
     * @introduction: 剪切URL路径，组装需要规格的图片地址 目前只支持阿里云OSS
     * @date: 2015-03-26 12：58
     * @param:url String 图片地址
     * @param:width Number 图片宽度
     * @param:height Number 图片高度
     * @returns {*}
     */
    cutImg (url, width = 500, height = 500, type = 1) {
      switch (parseInt(type)) {
        case 1 :
          if (parseInt(width) && parseInt(height)) {
            // 按比例裁剪 ?x-oss-process=image/resize,m_pad,h_500,w_500,color_ffffff
            url = url + '?x-oss-process=image/resize,m_pad,w_' + width + ',h_' + height + ',color_ffffff' // '/quality,q_100'
          }
          break
        case 2 :
          // 按照宽度缩放
          if (parseInt(width)) {
            url = url + '?x-oss-process=image/resize,w_' + width
          }
          break
        case 3 :
          // 按照高度缩放
          if (parseInt(height)) {
            url = url + '?x-oss-process=image/resize,h_' + height
          }
          break
        default:
          return url
      }
      return url
    },
    /**
     * @purpose 获取日期
     * @returns String
     */
    getDate (split = '-') {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      return `${year}${split}${month}${split}${day}`
    },
    /**
     * @purpose 获取日期加时间
     * @param split
     * @returns {string}
     */
    getDateTime (split = '-') {
      let _date = this.getDate(split)
      let date = new Date()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      return `${_date} ${hour}:${minutes}:${seconds}`
    },
    /**
     * @purpose 获取本地缓存
     * @returns {*}
     */
    storage () {
      return storage
    },
    auth (permission) {
      let _permission = Store.getters.permission
      return this.inArray(permission, _permission)
    },
    /**
     * @purpose 字符串截取
     * @param str
     * @param length
     * @param ending
     */
    stringCut (str = '', length = 20, ending = '...') {
      if (str.length <= length) {
        return str
      }
      return str.substr(0, length) + ending
    },
    /**
     * @purpose Toast
     * @param message
     * @param type
     * @param callback
     */
    toast (message = '', type = 'success', callback = null) {
      switch (type) {
        case 'error':
          this.$message({
            message: message,
            type: 'error',
            onClose: () => {
              if (typeof type === 'function') {
                type()
              } else if (typeof callback === 'function') {
                callback()
              }
            }
          })
          break
        case 'success':
          this.$message({
            message: message,
            type: 'success',
            onClose: () => {
              if (typeof type === 'function') {
                type()
              } else if (typeof callback === 'function') {
                callback()
              }
            }
          })
          break
        case 'warning':
          this.$message({
            message: message,
            type: 'warning',
            onClose: () => {
              if (typeof type === 'function') {
                type()
              } else if (typeof callback === 'function') {
                callback()
              }
            }
          })
          break
        case 'notice':
          this.$message({
            message: message,
            onClose: () => {
              if (typeof type === 'function') {
                type()
              } else if (typeof callback === 'function') {
                callback()
              }
            }
          })
          break
        default:
          this.$message({
            message: message,
            type: 'success',
            onClose: () => {
              if (typeof type === 'function') {
                type()
              } else if (typeof callback === 'function') {
                callback()
              }
            }
          })
          break
      }
    },
    /**
     * @purpose 多语言处理
     * todo 暂时未设计完该功能
     * @param message
     * @returns {string}
     */
    $lang (message = '') {
      return message
    },
    /**
     * 关闭loading
     */
    closeLoading () {
      // console.log(loadingResult)
      // Loading.service().close()
      if (loadingResult) {
        loadingResult.close()
      }
    },
    /**
     * 开启loading
     * 参数参考: http://element-cn.eleme.io/#/zh-CN/component/loading
     * @param target
     * @param fullScreen
     * @param lock
     * @param background
     * @returns {*}
     */
    showLoading (target = '', fullScreen = true, lock = true, background = '') {
      let options = {}
      if (target) {
        options.target = target
        fullScreen = false
      }
      options.fullscreen = fullScreen
      if (background) {
        options.background = background
      }
      options.lock = lock
      loadingResult = Loading.service(options)
      return loadingResult
    },
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
        return false
        // throw new Error('第二个参数的类型必须是数组!')
      }
      return array.indexOf(ele) > -1
    },
    /**
     * 路由跳转 函数
     * @param path
     * @param type 跳转方式, false: 内部路由, true: 外部url
     */
    jump (path, type = false) {
      if (typeof path === 'number' ||
      path < 0) {
        this.$router.go(path)
        return false
      }
      if (typeof path === 'object') {
        this.$router.push(path)
        return false
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
          return false
        }
      }
    },
    /**
     * @purpose 获取配置
     * @param path
     */
    config (path) {
      let _config = config
      if (path.indexOf('.') < 0) {
        return _config[path]
      }
      path = path.split('.')
      path.forEach(item => {
        _config = _config[item]
      })
      return _config
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
