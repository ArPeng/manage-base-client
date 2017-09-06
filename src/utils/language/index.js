/***
 * 多语言处理插件
 */
import config from '@config'

let lang = config.language
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
