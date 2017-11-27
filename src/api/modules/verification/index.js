import {_return} from '@api/pretreatment'
import * as http from '@api/http'

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
