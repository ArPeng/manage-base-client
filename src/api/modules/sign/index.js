import Vue from 'vue'
import * as http from '@api/http'
const $vue = new Vue()
const Promise = require('es6-promise').Promise
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
 * 验证失败时返回的错误信息
 * @param msg 错误提示
 * @returns {Promise<any>}
 * @private
 */
function _return (msg = '') {
  return new Promise((resolve, reject) => {
    reject(new Error(msg))
  })
}
