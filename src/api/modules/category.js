// import Vue from 'vue'
import * as http from '@api/http'
// import {_return} from '@api/pretreatment'
// const $vue = new Vue()

/**
 * @purpose 创建分类
 * @param name
 * @param thumb
 * @param pid
 * @returns {Promise<T>}
 */
export function create (name, thumb, pid = 0) {
  return http
    .post('category.create', {
      name: name,
      thumb: thumb,
      pid: pid
    })
    .then(r => r)
}

/**
 * @purpose 获取分类列表
 * @param pid
 */
export function items (pid) {
  return http
    .get('category.items', {pid: pid})
    .then(r => r.data)
}

/**
 * @purpose 获取无限极分类数据
 */
export function infinite () {
  return http
    .get('category.infinite')
    .then(r => r.data)
}

/**
 * @purpose 删除分类
 * @param id
 * @returns {Promise<T>}
 */
export function deleteCategory (id) {
  return http
    .post('category.delete', {
      id: id
    })
    .then(r => r.data)
}

/**
 * @purpose 通过ID修改数据
 * @param data
 * @returns {Promise<T>}
 */
export function updateById (data) {
  return http
    .post('category.updateById', data)
    .then(r => r)
}

/**
 * @purpose 通过ID获取单条数据
 * @param id
 */
export function infoById (id) {
  return http
    .get('category.infoById', {id: id})
    .then(r => r.data)
}
