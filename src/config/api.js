export default {
  sign: {
    // 登录 POST
    signByPassword: '/sign.by_password',
    // 验证Token POST
    verificationToken: '/sign.verification_token',
    // 退出时清除token POST
    clearToken: '/sign.clear_token'
  },
  user: {
    // 创建管理员 POST
    create: '/user.create',
    // 获取管理员列表 GET
    items: '/user.list',
    // 获取用户信息 GET
    info: '/user.info',
    // 获取用户信息 POST
    update: '/user.update',
    // 删除管理员 POST
    delete: '/user.delete',
    // 禁用/解禁管理员
    isDisable: '/user.is_disable'
  },
  rule: {
    // 创建权限 PSST
    create: '/rule.create',
    // 修改权限 POST
    update: '/rule.update',
    // 删除权限 POST
    delete: '/rule.delete',
    // 通过pid获取权限列表 GET
    getListByPid: '/rule.get_list_by_pid'
  }
}
