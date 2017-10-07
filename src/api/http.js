import axios from 'axios'
import config from '@config'
import Vue from 'vue'
import qs from 'qs'
let $vue = new Vue()
let instance = axios.create({
  baseURL: config.baseUri
})
let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}
/**
 * @purpose http POST 请求
 * @param path
 * @param data
 */
export function post (path = '', data = {}) {
  let url = _getApi(path)
  if (!url) {
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast('Parameter [path] cannot is empty')
      reject()
    })
  }
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: headers,
      transformRequest: [() => {
        return qs.stringify(data)
      }]
    }).then(r => {
      if (r.status === 200) {
        if (
          (typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 0) ||
          (typeof r.data.code !== 'undefined' && parseInt(r.data.code) !== 0)) {
          $vue.$auxiliary.toast(r.data.message)
        }
        resolve(r.data)
      } else {
        $vue.$auxiliary.toast('请求错误: ' + JSON.stringify(r))
        reject(r)
      }
    }).catch(e => {
      $vue.$auxiliary.toast(JSON.stringify(e))
      reject(e)
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
      $vue.$auxiliary.toast('Parameter [path] cannot is empty')
      reject()
    })
  }
  return new Promise((resolve, reject) => {
    instance.get(path, data, {
      headers: headers
    }).then(r => {
      if (r.status === 200) {
        if (
          (typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 0) ||
          (typeof r.data.code !== 'undefined' && parseInt(r.data.code) !== 0)) {
          $vue.$auxiliary.toast(r.data.message)
        }
        resolve(r.data)
      } else {
        $vue.$auxiliary.toast('ERROR: ' + JSON.stringify(r))
        reject(r)
      }
    }).catch(e => {
      $vue.$auxiliary.toast(JSON.stringify(e))
      reject(e)
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
    $vue.$auxiliary.toast(`Api '${path}' is not found`)
    return false
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
