import Vue from 'vue'
import * as http from '@api/http'
const $vue = new Vue()
const Promise = require('es6-promise').Promise
// group: {
//   // 创建管理组
//   create: '/group.create',
//     // 修改管理组
//     update: '/group.update',
//     // 删除管理组
//     delete: '/group.delete',
//     // 通过ID获取单挑管理组
//     getGroupInfoById: '/group.get_group_info_by_id',
//     // 获取管理组列表
//     getList: '/group.get_list'
// }
/**
 * @purpose 创建管理组
 * @param data
 * @returns {*}
 */
export function create (data) {
  if (!data.name) {
    return _return($vue.$lang('名称不能为空!'))
  }
  return http
    .post('group.create', data)
    .then(r => r.data)
}

/**
 * @purpose 修改管理组
 * @param data
 * @returns {*}
 */
export function update (data) {
  if (!data.id) {
    return _return($vue.$lang('缺少ID!'))
  }
  return http
    .post('group.update', data)
    .then(r => r.data)
}

/**
 * @purpose 删除管理组
 * @param id 可批量删除, id格式: 1,2,3,4,5
 * @returns {*}
 */
export function deleteById (id) {
  if (!id) {
    return _return($vue.$lang('缺少ID!'))
  }
  return http
    .post('group.delete', {id: id})
    .then(r => r.data)
}

/**
 * @purpose 通过ID获取弹条管理组数据
 * @param id
 * @returns {*}
 */
export function getGroupInfoById (id) {
  if (!id) {
    return _return($vue.$lang('缺少ID!'))
  }
  return http
    .get('group.getGroupInfoById', {id: id})
    .then(r => r.data)
}

/**
 * @purpose 获取管理组列表
 * @param page
 * @param size
 * @returns {V|*}
 */
export function getList (page = 1, size = 20) {
  return http
    .get('group.getList', {
      page: page,
      size: size
    })
    .then(r => r.data)
}

/**
 * @purpose 给用户组授权
 * @param id
 * @param rules
 * @returns {Promise.<TResult>}
 */
export function authorization (id, rules) {
  return http
    .post('group.authorization', {
      id: id,
      rules: rules
    })
    .then(r => r.data)
}

/**
 * @purpose 获取所有用户组
 * @returns {Promise.<TResult>}
 */
export function all () {
  return http
    .get('group.all')
    .then(r => r.data)
}
/**
 * 验证失败时返回的错误信息
 * @param msg 错误提示
 * @returns {Promise<any>}
 * @private
 */
function _return (msg = '') {
  $vue.$message.error(msg)
  return new Promise((resolve, reject) => {
    reject(new Error(msg))
  })
}
