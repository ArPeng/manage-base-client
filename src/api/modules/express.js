import * as http from '@api/http'

/**
 * @purpose 获取快递公司列表
 * @returns {*}
 */
export function items (page = 1, size = 50, kw = '') {
  return http
    .get('express.items', {
      page: page,
      size: size,
      kw: kw
    })
    .then(r => r.data)
}

/**
 * @purpose 设置默认发货快递公司
 * @param id
 * @returns {Promise<T>}
 */
export function setDefault (id) {
  return http
    .post('express.setDefault', {
      id: id
    })
    .then(r => r.data)
}

/**
 * @purpose 获取默认发货快递公司
 * @returns {*}
 */
export function getDefault () {
  return http
    .get('express.getDefault')
    .then(r => r.data)
}

/**
 * @purpose 搜索快递公司
 * @param kw
 * @returns {*}
 */
export function search (kw = '') {
  return http
    .get('express.search', {
      kw: kw
    })
    .then(r => r.data)
}
