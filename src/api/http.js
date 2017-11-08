import axios from 'axios'
import config from '@config'
import Vue from 'vue'
import qs from 'qs'
const $vue = new Vue()
const loading = $vue.loading()
let instance = axios.create({
  baseURL: config.baseUri
})
let headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Token': $vue.getToken()
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
    loading.close()
    return new Promise((resolve, reject) => {
      this.$message.error($vue.$lang('参数[path]不可为空!'))
      reject(new Error($vue.$lang('参数[path]不可为空!')))
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
      loading.close()
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
          !r.data) {
          this.$message.error($vue.$lang('服务器响应数据格式错误或为空!'))
          reject(new Error($vue.$lang('服务器响应数据格式错误或为空!')))
          return false
        }
        if (typeof r.data.code === 'undefined') {
          this.$message.error($vue.$lang('服务器未响应状态码!'))
          reject(new Error($vue.$lang('服务器未响应状态码')))
          return false
        }
        if ((typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 10000) ||
          (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 10000)) {
          $vue.$utils.toast(r.data.message)
          reject(new Error(r.data.message))
          return false
        }
        resolve(r.data)
      } else {
        this.$message.error($vue.$lang('网络不给力,稍后再试!'))
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      loading.close()
      this.$message.error($vue.$lang('网络不给力,稍后再试!'))
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
    loading.close()
    return new Promise((resolve, reject) => {
      this.$message.error($vue.$lang('参数[path]不可为空!'))
      reject(new Error($vue.$lang('参数[path]不可为空!')))
    })
  }
  return new Promise((resolve, reject) => {
    instance.get(url, {params: data}, {
      headers: headers
    }).then(r => {
      loading.close()
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
          !r.data) {
          this.$message.error($vue.$lang('服务器响应数据格式错误或为空!'))
          reject(new Error($vue.$lang('服务器响应数据格式错误或为空!')))
          return false
        }
        if (typeof r.data.code === 'undefined') {
          this.$message.error($vue.$lang('服务器未响应状态码!'))
          reject(new Error($vue.$lang('服务器未响应状态码')))
          return false
        }
        if (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 10000) {
          $vue.$utils.toast(r.data.message)
          reject(new Error(r.data.message))
          return false
        }
        resolve(r.data)
      } else {
        this.$message.error($vue.$lang('网络不给力,请稍后再试!'))
        $vue.$utils.toast($vue.$lang('网络不给力,请稍后再试!'))
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      loading.close()
      this.$message.error($vue.$lang('网络不给力,请稍后再试!'))
      $vue.$utils.toast($vue.$lang('网络不给力,请稍后再试!'))
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
    this.$message.error($vue.$lang(`Api "${path}" 未定义!`))
    throw new Error($vue.$lang(`Api "${path}" 未定义!`))
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
