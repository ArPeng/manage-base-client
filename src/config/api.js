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
    items: '/user.list'
  }
}
