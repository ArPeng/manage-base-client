// import Vue from 'vue'
import * as http from '@api/http'
// import {_return} from '@api/pretreatment'
// const $vue = new Vue()
/**
 * @purpose 获取权限白名单
 * @returns {Promise.<TResult>}
 */
export function ruleWhiteList () {
  return http
    .get('configure.ruleWhiteList')
    .then(r => r.data)
}

/**
 * @purpose 设置路由白名单
 * @param data
 * @returns {Promise.<TResult>}
 */
export function setRuleWhiteList (data = []) {
  return http
    .post('configure.setRuleWhiteList', data)
    .then(r => r.data)
}

/**
 * @purpose 设置应用swiper POST
 * @param data
 * @returns {Promise<T>}
 */
export function setAppSwiper (data) {
  return http
    .post('configure.setAppSwiper', data)
    .then(r => r.data)
}

/**
 * @purpose 获取应用swiper GET
 * @returns {*}
 */
export function getAppSwiper () {
  return http
    .get('configure.getAppSwiper')
    .then(r => r.data)
}

/**
 * @purpose 设置应用首页的分类展示 POST
 * @param data
 * @returns {Promise<T>}
 */
export function setAppBlockItem (data) {
  return http
    .post('configure.setAppBlockItem', data)
    .then(r => r.data)
}

/**
 * @purpose 获取应用首页的分类展示 GET
 * @returns {*}
 */
export function getAppBlockItem () {
  return http
    .get('configure.getAppBlockItem')
    .then(r => r.data)
}

/**
 * @purpose 设置应用首页要展示的品牌 post
 * @param data
 * @returns {Promise<T>}
 */
export function setAppBrand (data) {
  return http
    .post('configure.setAppBrand', data)
    .then(r => r.data)
}

/**
 * @purpose 获取应用首页要展示的品牌 post
 * @returns {*}
 */
export function getAppBrand () {
  return http
    .get('configure.getAppBrand')
    .then(r => r.data)
}
