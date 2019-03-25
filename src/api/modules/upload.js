import * as http from '@api/http'

/**
 * @purpose 检查食品md5值
 * @param md5
 * @returns {*}
 */
export function checkVideoMd5 (md5) {
  return http
    .get('upload.checkVideoMd5', {
      md5: md5
    })
    .then(r => r.data)
}
