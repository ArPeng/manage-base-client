import Vue from 'vue'
import * as http from '@api/http'
const $vue = new Vue()
const Promise = require('es6-promise').Promise

/**
 * @purpose 获取控制台菜单
 * @returns {Promise.<TResult>}
 */
export function dashboard () {
  return http
    .get('verification.dashboard')
    .then(r => r.data)
}

/**
 * @purpose 获取侧边栏菜单
 * @param identification
 * @returns {*}
 */
export function sidebarMenu (identification) {
  if (!identification) {
    return _return('缺少ID')
  }
  return http
    .get('verification.sidebarMenu', {
      identification: identification
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
