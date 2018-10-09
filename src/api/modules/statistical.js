import * as http from '@api/http'

/**
 * @purpose 获取注册统计
 * @returns {*}
 */
export function memberRegister () {
  return http
    .get('statistical.memberRegister')
    .then(r => r.data)
}

/**
 * @purpose 今日注册走势
 * @returns {*}
 */
export function todayRegisterMovements () {
  return http
    .get('statistical.todayRegisterMovements')
    .then(r => r.data)
}
