/**
 *  基础工具方法
 *  组件里面通过: this.$tool.common 调用
 *  插件里面通过import调研
 *  创建时间 2017-05-25
 *  版本: v.0.0.2.0525
 *  创建人 : Peter Yang
 *  **********************************************以下是每次版本更新说明******************************************
 *  ********************************************** v.0.0.3.20170708 ******************************************
 *  ** Peter Yang
 *  ** 1.新增lang方法
 *  ********************************************** v.0.0.2.20170525 ******************************************
 *  ** Peter Yang
 *  ** 1.新增 get_config方法
 *  ** 2.修改全部错误异常日志抛出方式 console.log 改为  console.error
 *  ** 3.修复get_config import config 报错, 修改为require引入
 *  ********************************************** v.0.0.1.20170525 ******************************************
 *  ** Peter Yang
 *  ** 创建基础工具方法
 */
/**
 * 生成随机数
 * @param under  范围开始
 * @param over 范围结束
 * @returns {*}
 */
export function randAB (under, over) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * under + 1)
    case 2:
      return parseInt(Math.random() * (over - under + 1) + under)
    default:
      return 0
  }
}

/**
 * @description 接收url的get参数
 * @param key
 * @param url
 * @returns {*}
 */
export function getValueFromUrl (key, url = window.location.href) {
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
}

/**
 * @description  获取全局配置
 * @param path  key.key.key 方式获取
 * @returns {*}
 */
export function getConfig (path = '') {
  let config = require('../config/config')
  config = config.default

  let _config = config

  if (path === '') {
    return config
  }
  if (path.indexOf('.') >= 1) {
    let _path = path.split('.')
    for (let i = 0; i <= _path.length - 1; i++) {
      _path = _path[_path[i]]
    }

    if (!_path) {
      // toast('config [' + path + '] is not find!')
      console.error('config [' + path + '] is not find!')
      return false
    }
    return _path
  } else {
    return _config[path]
  }
}

/**
 * 判断一个json对象是否为空对象 `{}`
 * @param v
 * @returns {boolean}
 */
export function isEmptyJSON (v) {
  for (let t in v) {
    return false
  }
  return true
}

/**
 * 语言包调用
 * @param field  中文语言
 * @returns {*}  对应语言
 */

export function lang (field) {
  let lang = getConfig('lang')
  let language = require(`../config/lang/${lang}.js`)
  let res = language[field]
  if (typeof res === 'undefined') {
    throw new Error(`language [${field}] is undefined`)
  }
  return res
}
