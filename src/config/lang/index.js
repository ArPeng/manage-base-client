/***
 * 多语言处理插件
 */
import { getConfig } from '../../tools/common'

let lang = getConfig('lang')
let language = require(`./${lang}.js`)
let Lang = {}
Lang.config = {}
Lang.install = function (Vue, options) {
  Vue.prototype.$lang = function (field) {
    let res = language.default[field]

    if (typeof res === 'undefined') {
      throw new Error(`language [${field}] is undefined`)
    }
    return res
  }
}
export default Lang
