import axios from 'axios'
import config from '@config'
import Vue from 'vue'
import qs from 'qs'
const $vue = new Vue()
let instance = axios.create({
  baseURL: config.baseUri
})
let headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
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
    $vue.closeLoading()
    return new Promise((resolve, reject) => {
      $vue.$message.error($vue.$lang('参数[path]不可为空!'))
      reject(new Error($vue.$lang('参数[path]不可为空!')))
    })
  }
  if (type === 'formData') {
    headers.Accept = '*/*'
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  instance.defaults.headers.common['Token'] = $vue.getToken()
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
      $vue.closeLoading()
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
          !r.data) {
          $vue.$message.error($vue.$lang('服务器响应数据格式错误或为空!'))
          reject(new Error($vue.$lang('服务器响应数据格式错误或为空!')))
          return false
        }
        if (typeof r.data.code === 'undefined') {
          $vue.$message.error($vue.$lang('服务器未响应状态码!'))
          reject(new Error($vue.$lang('服务器未响应状态码')))
          return false
        }
        if ((typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 10000) ||
          (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 10000)) {
          $vue.$message.error(r.data.message)
          reject(new Error(r.data.message))
          _result(r.data)
          return false
        }
        resolve(r.data)
      } else {
        $vue.$message.error($vue.$lang('网络不给力,稍后再试!'))
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      $vue.closeLoading()
      $vue.$message.error($vue.$lang('网络不给力,稍后再试!'))
      reject(new Error('请求错误: ', e))
    })
  })
}
/**
 * @purpose http GET 请求
 * @param path
 * @param data
 * @param type 参数类型, ?:表示正常get参数, /:表示符合后端特点的get参数类型  '例如/a/b'
 */
export function get (path = '', data = {}, type = '?') {
  let _data = {}
  let url = _getApi(path)
  if (!url) {
    $vue.closeLoading()
    return new Promise((resolve, reject) => {
      $vue.$message.error($vue.$lang('参数[path]不可为空!'))
      reject(new Error($vue.$lang('参数[path]不可为空!')))
    })
  }
  if (type === '/') {
    let param = ''
    for (let i in data) {
      param += `/${data[i]}`
    }
    if (url.lastIndexOf('/') === (url.length - 1)) {
      url = url.substr(0, url.length - 1)
    }
    url += param
  } else if (type === '?') {
    _data = data
  }
  instance.defaults.headers.common['Token'] = $vue.getToken()
  return new Promise((resolve, reject) => {
    instance.get(url, {params: _data})
      .then(r => {
        $vue.closeLoading()
        if (r.status === 200) {
          if (typeof r.data === 'undefined' ||
            r.data === '' ||
            $vue.isEmptyObject(r.data) ||
            !r.data) {
            $vue.$message.error($vue.$lang('服务器响应数据格式错误或为空!'))
            reject(new Error($vue.$lang('服务器响应数据格式错误或为空!')))
            return false
          }
          if (typeof r.data.code === 'undefined') {
            $vue.$message.error($vue.$lang('服务器未响应状态码!'))
            reject(new Error($vue.$lang('服务器未响应状态码')))
            return false
          }
          if (typeof r.data.code !== 'undefined' &&
              parseInt(r.data.code) !== 10000) {
            $vue.$message.error(r.data.message)
            reject(new Error(r.data.message))
            _result(r.data)
            return false
          }
          resolve(r.data)
        } else {
          $vue.$message.error($vue.$lang('网络不给力,请稍后再试!'))
          $vue.$message.error($vue.$lang('网络不给力,请稍后再试!'))
          reject(new Error('请求错误: ', r))
        }
      }).catch(e => {
        $vue.closeLoading()
        $vue.$message.error($vue.$lang('网络不给力,请稍后再试!'))
        $vue.$message.error($vue.$lang('网络不给力,请稍后再试!'))
        reject(new Error('请求错误: ', e))
      })
  })
}

/**
 * @purpose 处理返回code
 * @private
 */
function _result (result) {
  switch (result.code) {
    case 10004: // 未找到token
      $vue.jump('/sign_in', true)
      break
    case 10005: // token已过期
      $vue.jump('/sign_in', true)
      break
    case 10011: // 权限不足
      $vue.jump('/401')
      break
  }
}
/**
 * @purpose 获取api路径
 * @param path
 * @private
 */
function _getApi (path) {
  if (!path) {
    $vue.$message.error($vue.$lang(`Api "${path}" 未定义!`))
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
