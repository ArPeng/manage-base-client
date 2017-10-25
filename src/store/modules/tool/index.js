// import Vue from 'vue'
// const $vue = new Vue()
export default {
  state: {
    toast: {
      // 是否开启toast true: 开启, false: 关闭
      show: false,
      // toast文字信息
      message: '',
      // 关闭之后的回调
      callback: () => {}
    }
  },
  mutations: {
    // 显示toast
    toast: (state, data) => {
      if (typeof data === 'undefined') {
        return false
      }
      if (!data) {
        return false
      }
      if (typeof data.show === 'boolean') {
        state.toast.show = data.show
      }
      if (typeof data.message === 'string' &&
          data.message.length > 0
      ) {
        state.toast.message = data.message
      }
      if (typeof data.callback === 'function') {
        state.toast.callback = data.callback
      }
    },
    // 关闭toast
    closeToast: (state) => {
      // 定时关闭toast
      state.toast = {
        show: false,
        message: '',
        callback: () => {}
      }
    }
  },
  actions: {
    toast: ({commit}, data) => {
      data.show = true
      commit('toast', data)
    },
    closeToast: ({commit}) => {
      commit('closeToast')
    }
  },
  getters: {
    toast: state => state.toast
  }
}
