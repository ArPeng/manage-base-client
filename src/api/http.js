import axios from 'axios'
import config from '@config'
import Vue from 'vue'
const $vue = new Vue()
import qs from 'qs'
let instance = axios.create({
  baseURL: config.baseUri
})
let headers = {
  // 'Accept': '*/*',
  // 'Accept': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Token': ''
}
/**
 * @purpose http POST 请求
 * @param path
 * @param data
 * @param type 请求方式 json   formData
 */
export function post (path = '', data = {}, type = 'json') {
  let url = _getApi(path)
  if (!url) {
    return new Promise((resolve, reject) => {
      reject(new Error(
        'Parameter [path] cannot is empty'))
    })
  }
  if (type === 'formData') {
    headers.Accept = '*/*'
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: headers,
      transformRequest: [data => {
        if (type === 'json') {
          return JSON.stringify(data)
        } else if (type === 'formData') {
          return qs.stringify(data)
        }
      }]
    }).then(r => {
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
          !r.data) {
          reject(new Error('Error returning data format. Response is empty!'))
          return
        }
        if (typeof r.data.code === 'undefined') {
          reject(new Error('服务器未响应状态码'))
          return false
        }
        if ((typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 10000) ||
          (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 10000)) {
          reject(new Error(r.data.message))
          return false
        }
        resolve(r.data)
      } else {
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      reject(new Error('请求错误: ', e))
    })
  })
}
/**
 * @purpose http GET 请求
 * @param path
 * @param data
 */
export function get (path = '', data = {}) {
  let url = _getApi(path)
  if (!url) {
    return new Promise((resolve, reject) => {
      reject(new Error('Parameter [path] cannot is empty'))
    })
  }
  return new Promise((resolve, reject) => {
    instance.get(url, {params: data}, {
      headers: headers
    }).then(r => {
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
          !r.data) {
          console.warn(
            'Error returning data format. Response is empty!',
            url)
          reject(new Error('Error returning data format. Response is empty!'))
          return
        }
        if (typeof r.data.code === 'undefined') {
          reject(new Error('服务器未响应状态码'))
          return false
        }
        if ((typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 10000) ||
          (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 10000)) {
          reject(new Error(r.data.message))
          return false
        }
        resolve(r.data)
      } else {
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      reject(new Error('请求错误: ', e))
    })
  })
}
/**
 * @purpose 获取api路径
 * @param path
 * @private
 */
function _getApi (path) {
  if (!path) {
    throw new Error(`Api '${path}' is not found!`)
  }
  let api = require('@config/api')
  if (api.default) {
    api = api.default
  }
  if (path.indexOf('.') < 0) {
    return api[path]
  }
  path = path.split('.')
  path.forEach(item => {
    api = api[item]
  })
  return api
}
