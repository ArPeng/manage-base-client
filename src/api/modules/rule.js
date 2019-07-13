import Vue from 'vue'
import * as http from '@api/http'
import {_return} from '@api/pretreatment'
const $vue = new Vue()

/**
 * @purpose 创建权限
 * @param data
 * @returns {*}
 */
export function create (data) {
  if (!data.type) {
    return _return($vue.$lang('请选择权限类型'))
  }
  if (!data.name) {
    return _return($vue.$lang('请填写权限名称'))
  }
  if (typeof data.pid === 'undefined') {
    data.pid = 0
  }
  return http
    .post('rule.create', data)
    .then(r => r.data)
}

/**
 * @purpose 通过ID获取单挑数据
 * @param id
 * @returns {Promise.<TResult>}
 */
export function getRuleInfoById (id) {
  return http
    .get('rule.getRuleInfoById', {
      id: id
    }).then(r => r.data)
}
/**
 * @purpose 修改权限
 * @param data
 * @returns {*}
 */
export function update (data) {
  if (!data.id) {
    return _return($vue.$lang('缺少ID'))
  }
  return http
    .post('rule.update', data)
    .then(r => r.data)
}

/**
 * @purpose 删除权限
 * @param id 可删除多条 1,2,3,4
 * @returns {Promise.<TResult>}
 */
export function deleteRules (id) {
  return http
    .post('rule.delete', {
      id: id
    })
    .then(r => r.data)
}

/**
 * @purpose 获取无限极格式的全部数据
 * @returns {Promise.<TResult>}
 */
export function infinite () {
  return http
    .get('rule.infinite')
    .then(r => r.data)
}
/**
 * @purpose 通过pid获取权限列表
 * @param pid
 * @returns {Promise.<TResult>}
 */
export function getListByPid (pid = 0) {
  return http
    .get('rule.getListByPid', {
      pid: pid
    }).then(r => r.data)
}

/**
 * @purpose 菜单排序
 * @param data
 * @returns {Q.Promise<any>}
 */
export function sort (data) {
  return http
    .post('rule.sort', data)
    .then(r => r.data)
}
