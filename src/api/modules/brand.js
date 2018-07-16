import * as http from '@api/http'

/**
 * @purpose 添加品牌
 * @param data
 * @returns {Promise<T>}
 */
export function create (data) {
  return http
    .post('brand.create', data)
    .then(r => r.data)
}

/**
 * @purpose 编辑品牌
 * @param data
 * @returns {Promise<T>}
 */
export function edit (data) {
  return http
    .post('brand.edit', data)
    .then(r => r.data)
}
/**
 * @purpose 删除品牌
 * @param data
 * @returns {Promise<T>}
 */
export function del (id) {
  return http
    .post('brand.del', {id: id})
    .then(r => r.data)
}
/**
 * @purpose 排序
 * @param data
 * @returns {Promise<T>}
 */
export function sort (data) {
  return http
    .post('brand.sort', data)
    .then(r => r.data)
}

/**
 * @purpose 获取品牌列表
 * @param page
 * @param size
 * @returns {Promise<any> | Promise | Thenable<any> | * | PromiseLike<T> | Promise<T>}
 */
export function items (page = 1, size = 50) {
  return http
    .get('brand.items', {
      page: page,
      size: size
    }).then(r => r.data)
}

/**
 * @purpose 获取单条数据
 * @param id
 * @returns {Promise<any> | Promise | Thenable<any> | * | PromiseLike<T> | Promise<T>}
 */
export function infoById (id) {
  return http
    .get('brand.infoById', {id: id})
    .then(r => r.data)
}

/**
 * @purpose 发布商品时获取品牌列表
 * @returns {Promise<any> | Promise | Thenable<any> | * | PromiseLike<T> | Promise<T>}
 */
export function itemByCreateGoods () {
  return http
    .get('brand.itemByCreateGoods')
    .then(r => r.data.list)
}
