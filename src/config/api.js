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
    identification: '/rule.identification',
    // 菜单排序
    sort: '/rule.sort'
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
    // 获取应用首页要展示的品牌 get
    getAppBrand: '/configure.get_app_brand',
    // 设置分销比例 post
    setDistributionRatio: '/configure.set_distribution_ratio',
    // 获取分销比例 get
    getDistributionRatio: '/configure.get_distribution_ratio',
    // 设置代理商升级配置 post
    setAgentUpgrade: '/configure.set_agent_upgrade',
    // 获取代理商升级配置 get
    getAgentUpgrade: '/configure.get_agent_upgrade',
    // 设置客服微信 post
    setCustomerWechat: '/configure.set_customer_wechat',
    // 获取客服微信
    getCustomerWechat: '/configure.get_customer_wechat'
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
  },
  order: {
    // 获取订单列表 get
    items: '/order.items',
    // 订单发货 post
    deliverGoods: '/order.deliver.goods',
    // 获取订单详情
    detailById: '/order.detail.by.id'
  },
  express: {
    // 获取快递公司列表 get
    items: '/express.items',
    // 设置默认发货快递公司 post
    setDefault: '/express.set.default',
    // 获取默认发货快递公司 get
    getDefault: '/express.get.default',
    // 搜索快递公司
    search: '/express.search'
  },
  withdraw: {
    // 获取提现申请列表
    items: '/admin.financial.withdraw.items',
    // 确认转账
    confirm: '/admin.financial.withdraw.confirm',
    // 拒绝申请
    refused: '/admin.financial.withdraw.refused'
  },
  refund: {
    // 获取退款列表
    items: '/admin.financial.refund.items',
    // 同意退款
    agree: '/admin.financial.refund.agree',
    // 拒绝退款
    refuse: '/admin.financial.refund.refuse'
  },
  statistical: {
    // 注册统计
    memberRegister: '/admin.member.statistical.register',
    // 注册走势
    todayRegisterMovements: '/admin.member.today.register.movements'
  },
  activity: {
    // 搜索商品
    searchGoods: '/admin.activity.search.goods',
    // 添加商品到新品
    newProductAdd: '/admin.activity.new-product.add',
    // 获取新品列表
    newProductItems: '/admin.activity.new.product.items',
    // 从新品中移出一个商品
    newProductRemove: '/admin.activity.new.product.remove',
    // 添加特价商品时搜索商品
    searchGoodsForSpecial: '/admin.activity.search.goods.for.special',
    // 添加一个特价商品
    addSpecialOfferGoods: '/admin.activity.add.special.offer.goods',
    // 获取特价商品列表
    specialOfferGoodsItems: '/admin.activity.special.offer.goods.items',
    // 将商品从特价中移出
    specialOfferGoodsRemove: '/admin.activity.special.offer.goods.remove',
    // 编辑特价商品
    specialOfferGoodsEdit: '/admin.activity.special.offer.goods.edit'
  },
  upload: {
    // 检查文件md5值
    checkVideoMd5: '/upload.video.check.md5'
  },
  album: {
    // 获取图库资源列表
    items: '/admin.album.items'
  },
  video: {
    // 获取带转码的视频列表
    transcoding: '/video.transcoding',
    // 获取视频列表
    items: '/video.items',
    // 截取视频指定时间的图片并设置为封面
    screenshotsAndSaveToTheCover: '/video.screenshots.and.save.to.the.cover'
  }

}
