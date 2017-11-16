import Vue from 'vue'
import * as http from '@api/http'
const $vue = new Vue()
const Promise = require('es6-promise').Promise

/**
 * 创建管理员
 * @param name
 * @param mobile
 * @param email
 * @param password
 * @returns {*}
 */
export function create (name, mobile, email, password) {
  if (!name) {
    $vue.$message.error($vue.$lang('请输入管理员姓名!'))
    return _return($vue.$lang('请输入管理员姓名!'))
  }
  if (!mobile && !email) {
    $vue.$message.error($vue.$lang('邮箱或手机号码必须填有一个!'))
    return _return($vue.$lang('邮箱或手机号码必须填有一个!'))
  }
  if (!password) {
    $vue.$message.error($vue.$lang('请输入密码!'))
    return _return($vue.$lang('请输入密码!'))
  }
  /*eslint-disable */
  if (mobile &&
    !(/^1[3|4|5|6|7|8]\d{9}$/).test(mobile)) {
    $vue.$message.error($vue.$lang('手机号码格式错误!'))
    return _return($vue.$lang('手机号码格式错误!'))
  }
  if (email &&
    !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,8})+$/).test(email)) {
    $vue.$message.error($vue.$lang('邮箱格式错误!'))
    return _return($vue.$lang('邮箱格式错误!'))
  }
  if (!(/^[a-zA-Z\d_]{8,}$/).test(password)) {
    $vue.$message.error($vue.$lang('密码格式错误!'))
    return _return($vue.$lang('密码格式错误!'))
  }
  /*eslint-enable */
  $vue.showLoading()
  return http
    .post('user.create', {
      name: name,
      mobile: mobile,
      email: email,
      password
    }).then(r => r.data)
}

/**
 * @purpose 通过uuid获取管理员信息
 * @param uuid
 * @returns {*}
 */
export function info (uuid) {
  if (!uuid) {
    $vue.$message.error($vue.$lang('缺少参数[UUID]'))
    return _return($vue.$lang('缺少参数[UUID]'))
  }
  return http
    .get('user.info', {
      uuid: uuid
    }).then(r => r.data)
}

/**
 * @purpose 删除一个管理员
 * @param uuid
 * @returns {*}
 */
export function deleteUser (uuid) {
  if (!uuid) {
    $vue.$message.error($vue.$lang('缺少参数[UUID]'))
    return _return($vue.$lang('缺少参数[UUID]'))
  }
  return http
    .post('user.delete', {
      uuid: uuid
    }).then(r => r.data)
}
/**
 * $purpose 修改管理员
 * @param uuid
 * @param data
 * @returns {Promise.<TResult>}
 */
export function update (uuid, data) {
  return http
    .post('user.update', {
      uuid: uuid,
      data: data
    }).then(r => r.data)
}

/**
 * @purpose 禁用/解禁管理员
 * @param uuid uuid
 * @param type 1: 解禁,2: 禁用
 * @returns {Promise.<TResult>}
 */
export function isDisable (uuid, type) {
  return http
    .post('user.isDisable', {
      uuid: uuid,
      type: type
    }).then(r => r.data)
}
/**
 * 获取管理员列表
 * @param page
 * @param nums
 * @returns {*|Promise<any>|Promise.<TResult>|Thenable<any>}
 */
export function items (page = 1, nums = 20) {
  return http
    .get('user.items', {
      page: page,
      num: nums
    }).then(r => r.data)
}
/**
 * 验证失败时返回的错误信息
 * @param msg 错误提示
 * @returns {Promise<any>}
 * @private
 */
function _return (msg = '') {
  return new Promise((resolve, reject) => {
    reject(new Error(msg))
  })
}
