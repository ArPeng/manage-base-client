import * as http from '@api/http'

/**
 * @purpose 获取提现列表
 * @param page
 * @param size
 * @param status
 * @returns {*}
 */
export function items (page = 1, size = 50, status = 1) {
  return http
    .get('withdraw.items', {
      page: page,
      size: size,
      status: status
    })
    .then(r => r.data)
}

/**
 * @purpose 确认转账
 * @param id
 * @returns {Promise<T>}
 */
export function confirm (id) {
  return http
    .post('withdraw.confirm', {
      id: id
    })
    .then(r => r.data)
}

/**
 * @purpose 拒绝转账
 * @param id
 * @param reason
 * @returns {Promise<T>}
 */
export function refund (id, reason) {
  return http
    .post('withdraw.refund', {
      id: id,
      reason: reason
    })
    .then(r => r.data)
}
