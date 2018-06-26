/**
 * 基础配置文件,请勿随意修改
 */
export default {
  baseUri: '/api/',
  // 系统语音
  language: 'zh-cn',
  //  内部路由前缀
  routePrefix: '',
  imageUrl: process.env.NODE_ENV === 'production' ? 'http://img.dcr0.cn/' : 'http://image.admin.com/'
  // imageUrl: 'http://image.admin.com/'
}
