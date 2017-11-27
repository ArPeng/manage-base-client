import Vue from 'vue'
const $vue = new Vue()
const Promise = require('es6-promise').Promise
/**
 * 验证失败时返回的错误信息
 * @param msg 错误提示
 * @returns {Promise<any>}
 * @private
 */
export function _return (msg = '') {
  $vue.$message.error(msg)
  $vue.closeLoading()
  return new Promise((resolve, reject) => {
    reject(new Error(msg))
  })
}
