import * as http from '@api/http'

/**
 * @purpose 获取退款列表
 * @param status
 * @param page
 * @param size
 * @returns {*}
 */
export function items (status, page, size) {
  return http
    .get('refund.items', {
      status: status,
      page: page,
      size: size
    })
    .then(r => r.data)
}

/**
 * @purpose 同意退款
 * @param orderNo
 * @returns {Promise<T>}
 */
export function agree (orderNo) {
  return http
    .post('refund.agree', {
      order_no: orderNo
    })
    .then(r => r.data)
}

/**
 * @purpose 拒绝退款
 * @param orderNo
 * @param reason
 * @returns {Promise<T>}
 */
export function refuse (orderNo, reason) {
  return http
    .post('refund.refuse', {
      order_no: orderNo,
      reason: reason
    })
    .then(r => r.data)
}
