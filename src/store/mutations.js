export default {
  /**
   * 缓存用户信息
   * @param state
   * @param data
   */
  setUserInfo: (state, data) => {
    state.userInfo = data
  },
  /**
   * @purpose 设置侧边栏菜单数据
   * @param state
   * @param data
   */
  setSidebarMenu: (state, data) => {
    state.sidebarMenu = data
  },
  /**
   * @purpose 设置页面的按钮以及板块显示权限
   * @param state
   * @param data
   */
  setPermission: (state, data) => {
    state.permission = data
  }
}
