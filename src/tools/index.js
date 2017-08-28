/**
 *  Vue 工具方法插件 该方法基础所有工具方法到  this.$tool 下面
 *  创建时间 2017-05-25
 *  版本: v.0.0.1.0525
 *  创建人 : Peter Yang
 *  **********************************************以下是每次版本更新说明******************************************
 *  ********************************************** v.0.0.1.20170525 ******************************************
 *  **  Peter Yang
 *  **  创建网络请求工具方法
 */

import * as common from './common'
let Tool = {};
Tool.config = {};
Tool.install  = function (Vue, options) {
  Vue.prototype.$tool = {
    common : common
  };

};
export default Tool;
