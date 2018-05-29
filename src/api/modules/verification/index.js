import {_return} from '@api/pretreatment'
import * as http from '@api/http'

/**
 * @purpose 获取控制台菜单
 * @returns {Promise.<TResult>}
 */
export function dashboard () {
  return http
    .get('rule.dashboard')
    .then(r => r.data)
}

/**
 * @purpose 获取按钮以及板块展示权限
 * @param $identification
 * @returns {Promise.<TResult>}
 */
export function identification ($identification) {
  return http
    .get('rule.identification', {
      identification: $identification
    }).then(r => r.data)
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
    .get('rule.sidebarMenu', {
      identification: identification
    }).then(r => r.data)
}
