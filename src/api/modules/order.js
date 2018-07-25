import * as http from '@api/http'

/**
 * @purpose 获取订单列表
 * @param status
 * @param page
 * @param size
 * @returns {*}
 */
export function items (
  status = 99,
  page = 1,
  size = 40) {
  return http
    .get('order.items', {
      status: status,
      page: page,
      size: size
    })
    .then(r => r.data)
}

/**
 * @purpose 订单发货
 * @param options
 * @returns {Promise<T>}
 */
export function deliverGoods (options) {
  return http
    .post('order.deliverGoods', options)
    .then(r => r.data)
}

/**
 * @purpose 获取订单详情
 * @param id
 * @returns {*}
 */
export function detailById (id) {
  return http
    .get('order.detailById', {
      id: id
    })
    .then(r => r.data)
}
