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
    setRuleWhiteList: '/configure.set_rule_white_list',
    // 设置应用swiper POST
    setAppSwiper: '/configure.set_app_swiper',
    // 获取应用swiper GET
    getAppSwiper: '/configure.get_app_swiper',
    // 设置应用首页的分类展示 POST
    setAppBlockItem: '/configure.set_app_block_item',
    // 获取应用首页的分类展示 GET
    getAppBlockItem: '/configure.get_app_block_item',
    // 设置应用首页要展示的品牌 post
    setAppBrand: '/configure.set_app_brand',
    // 获取应用首页要展示的品牌 post
    getAppBrand: '/configure.get_app_brand'
  },
  category: {
    // 创建分类 POST
    create: '/category.create',
    // 分类列表 GET
    items: '/category.items',
    // 无限极分类数据 GET
    infinite: '/category.infinite',
    // 删除分类 POST
    delete: '/category.delete',
    // 通过ID修改分类 POST
    updateById: '/category.update_by_id',
    // 通过ID获取单条数据 GET
    infoById: '/category.info_by_id'
  },
  attribute: {
    // 获取属性列表 GET
    items: '/attribute.items',
    // 创建属性 POSt
    create: '/attribute.create',
    // 删除属性 POST
    del: '/attribute.delete',
    // 添加属性值 POST
    createAttach: '/attribute.create.attach',
    // 删除属性值 POST
    delAttach: '/attribute.delete.attach',
    // 排序 POST
    sort: '/attribute.sort'
  },
  goods: {
    // 添加商品 POST
    create: '/goods.create',
    // 获取商品列表 GET
    items: '/goods.items',
    // 通过ID获取单条记录 GET
    infoById: '/goods.info_by_id',
    // 编辑商品 POST
    edit: '/goods.edit',
    // 通过ID更新商品状态
    status: 'goods.status'
  },
  brand: {
    // 添加商品 POST
    create: '/brand.create',
    // 编辑品牌 POST
    edit: '/brand.edit',
    // 删除品牌 POSt
    del: '/brand.delete',
    // 对品牌排序 POST
    sort: '/brand.sort',
    // 获取品牌列表 GET
    items: '/brand.items',
    // 获取单条品牌数据 GET
    infoById: '/brand.info_by_id',
    // 发布商品时获取品牌 GET
    itemByCreateGoods: '/brand.item_by_create_goods'
  }
}
