import Loading from './loading.vue'
export default (Vue) => {
  let TplObj = Vue.extend(Loading)
  let $vm = new TplObj()
  let tpl = $vm.$mount().$el
  document.body.appendChild(tpl)
  let bgEvent = false
  $vm.$emit = (event, data) => {
    if (event === 'bgEvent' && bgEvent) {
      closeLoading()
    }
  }
  /**
   * 显示loading
   * @param msg
   * @param option
   */
  let loading = (msg = '', option = {}) => {
    if (typeof option.bgClose !== 'undefined' ||
      option.bgClose === true) {
      bgEvent = true
    } else {
      bgEvent = false
    }
    if (typeof option.zIndex !== 'undefined' ||
      Number(option.zIndex) >= 0) {
      $vm.zIndex = option.zIndex
    }
    $vm.show = true
    $vm.message = msg
  }
  /**
   * 关闭loading
   */
  let closeLoading = () => {
    $vm.show = false
    $vm.message = ''
  }
  return {
    loading: loading,
    closeLoading: closeLoading
  }
}
