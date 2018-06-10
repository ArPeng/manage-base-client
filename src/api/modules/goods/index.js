import * as http from '@api/http'

/**
 * @purpose 添加新商品
 * @param data
 * @returns {Promise<T>}
 */
export function create (data) {
  return http
    .post('goods.create', data)
    .then(r => r.data)
}

/**
 * @purpose 获取
 * @param data
 * @returns {*}
 */
export function items (data) {
  return http
    .get('goods.items', data)
    .then(r => r.data)
}

/**
 * @purpose 通过ID获取单条商品信息
 * @param id
 * @returns {Promise<any> | Promise | Thenable<any> | * | PromiseLike<T> | Promise<T>}
 */
export function infoById (id) {
  return http
    .get('goods.infoById', {
      id: id
    }).then(r => r.data)
}

/**
 * @purpose 编辑商品
 * @param data
 * @returns {Promise<T>}
 */
export function edit (data) {
  return http
    .post('goods.edit', data)
    .then(r => r.data)
}

/**
 * @purpose 通过ID更新商品状态
 * @param id
 * @param status
 * @returns {Promise<T>}
 */
export function status (id, status) {
  return http
    .post('goods.status', {
      id: id,
      status: status
    }).then(r => r.data)
}
