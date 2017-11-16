import Vue from 'vue'
import * as http from '@api/http'
const $vue = new Vue()
const Promise = require('es6-promise').Promise

/**
 * @purpose 创建权限
 * @param data
 * @returns {*}
 */
export function create (data) {
  if (!data.type) {
    return _return($vue.$lang('请选择权限类型'))
  }
  if (!data.name) {
    return _return($vue.$lang('请填写权限名称'))
  }
  if (typeof data.pid === 'undefined') {
    data.pid = 0
  }
  return http
    .post('rule.create', data)
    .then(r => r.data)
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
