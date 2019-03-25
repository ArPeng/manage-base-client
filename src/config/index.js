/**
 * 基础配置文件,请勿随意修改
 */
export default {
  baseUri: '/api/',
  // 系统语音
  language: 'zh-cn',
  //  内部路由前缀
  routePrefix: '',
  cdn: '/cdn',
  imageUrl: 'http://v-she-image.oss-cn-beijing.aliyuncs.com/'
  // imageUrl: process.env.NODE_ENV === 'production' ? 'http://img.chen.cas.cx/' : 'http://image.admin.com/'
  // imageUrl: 'http://image.admin.com/'
}
