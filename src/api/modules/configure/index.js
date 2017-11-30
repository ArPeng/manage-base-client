// import Vue from 'vue'
import * as http from '@api/http'
// import {_return} from '@api/pretreatment'
// const $vue = new Vue()
/**
 * @purpose 获取权限白名单
 * @returns {Promise.<TResult>}
 */
export function ruleWhiteList () {
  return http
    .get('configure.ruleWhiteList')
    .then(r => r.data)
}

/**
 * @purpose 设置路由白名单
 * @param data
 * @returns {Promise.<TResult>}
 */
export function setRuleWhiteList (data = []) {
  return http
    .post('configure.setRuleWhiteList', data)
    .then(r => r.data)
}
