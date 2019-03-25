import * as http from '@api/http'

/**
 * @purpose 获取带转码视频列表
 * @returns {*}
 */
export function transcoding (params = {}) {
  return http
    .get('video.transcoding', params)
    .then(r => r.data)
}

/**
 * @purpose 获取视频列表
 * @param params
 * @returns {*}
 */
export function items (params = {}) {
  return http
    .get('video.items', params)
    .then(r => r.data)
}

/**
 * @purpose 截取视频指定时间的图片并设置为封面
 * @param params
 * @returns {Promise<T | never>}
 */
export function screenshotsAndSaveToTheCover (params = {}) {
  return http
    .post('video.screenshotsAndSaveToTheCover', params)
    .then(r => r.data)
}
