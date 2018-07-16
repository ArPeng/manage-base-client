import Vue from 'vue'
import * as http from '@api/http'
import {_return} from '@api/pretreatment'
const $vue = new Vue()

/**
 * 通过密码登录
 * @param sign  手机号码或邮箱
 * @param password 密码
 * @returns {*}
 */
export function signByPassword (sign = '', password = '') {
  if (!sign) {
    return _return($vue.$lang('手机号码或邮箱不能为空!'))
  }
  if (!password) {
    return _return($vue.$lang('密码不能为空!'))
  }
  return http
    .post('sign.signByPassword', {
      sign: sign,
      password: password
    }).then(r => r.data)
}

/**
 * 验证Token 以及权限
 * @param identification 路由name属性
 * @returns {*}
 */
export function verification (identification) {
  let token = $vue.getToken()
  if (!token) {
    return _return(new Error($vue.$lang('Token为空')))
  }
  return http
    .post('sign.verification', {
      token: token,
      identification: identification
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
