import Toast from './tools/toast'
import Loading from './tools/loading'
import config from '@config'
let Utils = {}
Utils.install = function (Vue, options) {
  /**
   * 工具方法, toast, loading, alert等待...
   * @type {{toast}}
   */
  let _Loading = Loading(Vue)
  let _Toast = Toast(Vue)
  Vue.prototype.$utils = {
    toast: _Toast,
    loading: _Loading.loading,
    closeLoading: _Loading.closeLoading
  }
  /**
   * 多语言处理
   * @param msg
   */
  Vue.prototype.$lang = function (msg = '') {
    let lang = config.language
    let language = require(`@utils/lang/${lang}`)
    if (language.default) {
      language = language.default
    }
    if (!language[msg]) {
      return msg
    }
    return language[msg]
  }
}
export default Utils
