export default {
  sign: {
    // 登录 POST
    signByPassword: '/sign.by_password',
    // 验证Token以及权限 POST
    verification: '/sign.verification',
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
    isDisable: '/user.is_disable',
    // 管理员授权接口
    authorization: '/user.authorization'
  },
  rule: {
    // 创建权限 POST
    create: '/rule.create',
    // 修改权限 POST
    update: '/rule.update',
    // 删除权限 POST
    delete: '/rule.delete',
    // 通过pid获取权限列表 GET
    getListByPid: '/rule.get_list_by_pid',
    // 获取无限极格式的数据 GET
    infinite: '/rule.infinite',
    // 通过ID获取单条权限信息 GET
    getRuleInfoById: '/rule.get_rule_info_by_id',
    // 获取dashboard 菜单(一级菜单) GET
    dashboard: '/rule.dashboard',
    // 获取侧边栏菜单 GET
    sidebarMenu: '/rule.menu',
    // 获取按钮以及展示权限 GET
    identification: '/rule.identification'
  },
  group: {
    // 创建管理组 POST
    create: '/group.create',
    // 修改管理组 POST
    update: '/group.update',
    // 删除管理组 POST
    delete: '/group.delete',
    // 通过ID获取单条管理组 GET
    getGroupInfoById: '/group.get_group_info_by_id',
    // 获取管理组列表 GET
    getList: '/group.get_list',
    // 给用户组授权 POST
    authorization: '/group.authorization',
    // 获取所有用户组 GET
    all: '/group.all'
  },
  // verification: {
  //   // 获取dashboard 菜单(一级菜单) GET
  //   dashboard: '/verification.dashboard',
  //   // 获取侧边栏菜单
  //   sidebarMenu: '/verification.menu',
  //   // 获取按钮以及展示权限
  //   identification: '/verification.identification'
  // },
  configure: {
    // 获取权限名单 GET
    ruleWhiteList: '/configure.rule_white_list',
    // 设置权限白名单 POST
    setRuleWhiteList: '/configure.set_rule_white_list'
  },
  category: {
    // 创建分类
    create: '/category.create',
    // 分类列表
    items: '/category.items',
    // 无限极分类数据
    infinite: '/category.infinite',
    // 删除分类
    delete: '/category.delete',
    // 通过ID修改分类
    updateById: '/category.update_by_id',
    // 通过ID获取单条数据
    infoById: '/category.info_by_id'
  },
  attribute: {
    // 获取属性列表
    items: '/attribute.items',
    // 创建属性
    create: '/attribute.create',
    // 删除属性
    del: '/attribute.delete',
    // 添加属性值
    createAttach: '/attribute.create.attach',
    // 删除属性值
    delAttach: '/attribute.delete.attach'
  }
}
