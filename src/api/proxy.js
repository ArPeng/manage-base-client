/**
 * Api入口,如果是Vue插件,则以插件方式暴露
 * @type {boolean}
 */
// 利用代理获取对象调用的属性
// todo Proxy 存在兼容性问题,现在还不确定哪些浏览器的哪些版本支持,后面需要测试
export default new Proxy({}, {
  get (target, key, receiver) {
    try {
      if (key === 'install') {
        return null
      }
      return require(`@api/modules/${key}/index.js`)
    } catch (e) {
      console.error(e)
    }
  }
})
