import Toast from './toast.vue'
export default (Vue) => {
  let TplObj = Vue.extend(Toast)
  let $vm = new TplObj()
  let tpl = $vm.$mount().$el
  document.body.appendChild(tpl)
  return (message = '', time, callback) => {
    let _time = 3
    let _callback = null
    if (Number(time) > 0) {
      _time = Number(time)
    }
    if (typeof callback === 'function') {
      _callback = callback
    }
    if (typeof time === 'function') {
      _callback = time
    }

    $vm.message = message
    $vm.show = true
    setTimeout(() => {
      $vm.show = false
      if (typeof _callback === 'function') {
        _callback()
      }
    }, _time * 1000)
  }
}
