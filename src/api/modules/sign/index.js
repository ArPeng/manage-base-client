import Vue from 'vue'
import * as http from '@api/http'
const $vue = new Vue()
const Promise = require('es6-promise').Promise

/**
 * 通过密码登录
 * @param s
 * @param p
 * @returns {*}
 */
export function signByPassword (s = '', p = '') {
  if (!s) {
    return _return($vue.$lang('手机号码或邮箱不能为空!'))
  }
  if (!s) {
    return _return($vue.$lang('密码不能为空!'))
  }
  return http
    .post('sign.signByPassword', {
      sign: s,
      password: p
    }).then(r => r.data)
}

/**
 * 验证Token
 * @returns {*}
 */
export function verificationToken () {
  let token = $vue.getToken()
  if (!token) {
    return _return(new Error($vue.$lang('Token为空')))
  }
  return http
    .post('sign.verificationToken', {
      token: token
    }).then(r => r.data)
}

/**
 * 退出时清除服务端token
 * @returns {*|Promise<any>|Promise.<TResult>|Thenable<any>}
 */
export function clearToken () {
  let token = $vue.getToken()
  if (!token) {
    return _return(new Error($vue.$lang('Token为空')))
  }
  return http
    .post('sign.clearToken', {
      token: token
    }).then(r => r.data)
}
/**
 * 验证失败时返回的错误信息
 * @param msg 错误提示
 * @returns {Promise<any>}
 * @private
 */
function _return (msg = '') {
  $vue.$message.error(msg)
  return new Promise((resolve, reject) => {
    reject(new Error(msg))
  })
}
