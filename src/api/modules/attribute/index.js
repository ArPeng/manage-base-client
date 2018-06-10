import * as http from '@api/http'

/**
 * @purpose 获取属性列表
 */
export function items () {
  return http
    .get('attribute.items')
    .then(r => r.data)
}

/**
 * @purpose 添加属性
 * @param name
 * @returns {Promise<T>}
 */
export function create (name) {
  return http
    .post('attribute.create', {name: name})
    .then(r => r.data)
}

/**
 * @purpose 删除属性
 * @param id
 * @returns {Promise<T>}
 */
export function del (id) {
  return http
    .post('attribute.del', {id: id})
    .then(r => r.data)
}

/**
 * @purpose 添加属性值
 * @param name
 * @param attributeId
 * @returns {AxiosPromise<any> | * | void}
 */
export function createAttach (name, attributeId) {
  return http
    .post('attribute.createAttach', {
      name: name,
      attribute_id: attributeId
    })
    .then(r => r.data)
}

/**
 * @purpose 删除属性值
 * @param id
 * @returns {Promise<T>}
 */
export function delAttach (id) {
  return http
    .post('attribute.delAttach', {id: id})
    .then(r => r.data)
}

/**
 * @purpose 属性排序
 * @param sort
 * @returns {Promise<T>}
 */
export function sort (sort) {
  return http
    .post('attribute.sort', sort)
    .then(r => r.data)
}
