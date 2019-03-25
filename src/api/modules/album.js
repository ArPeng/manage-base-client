import * as http from '@api/http'

/**
 * @purpose 获取图库列表资源
 * @param prefix
 * @param mark
 * @returns {*}
 */
export function items (prefix = '', mark = '') {
  return http
    .get('album.items', {
      prefix: prefix,
      mark: mark
    })
    .then(r => r.data)
}
