import Cookie from 'js-cookie'
export default {
  state: {
    sidebar: {
      mini: Boolean(Number(Cookie.get('sidebarMini')))
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.mini = !state.sidebar.mini
      Cookie.set('sidebarMini', Number(state.sidebar.mini))
    }
  },
  actions: {
    ToggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
