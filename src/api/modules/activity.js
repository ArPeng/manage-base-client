import * as http from '@api/http'

/**
 * @purpose 搜索商品
 * @param kw
 */
export function searchGoods (kw) {
  return http
    .get('activity.searchGoods', {
      kw: kw
    })
    .then(r => r.data)
}
/**
 * @purpose 添加特价商品时搜索商品
 * @param kw
 */
export function searchGoodsForSpecial (kw) {
  return http
    .get('activity.searchGoodsForSpecial', {
      kw: kw
    })
    .then(r => r.data)
}

/**
 * @purpose 添加商品到新品
 * @param goodsId
 * @returns {Promise<T>}
 */
export function newProductAdd (goodsId) {
  return http
    .post('activity.newProductAdd', {
      goods_id: goodsId
    })
    .then(r => r.data)
}

/**
 * @purpose 获取新品列表
 * @param page
 * @param size
 * @returns {*}
 */
export function newProductItems (page, size) {
  return http
    .get('activity.newProductItems', {
      page: page,
      size: size
    })
    .then(r => r.data)
}

/**
 * @purpose 从新品中移出一个商品
 * @param id
 * @returns {Promise<T>}
 */
export function newProductRemove (id) {
  return http
    .post('activity.newProductRemove', {
      id: id
    })
    .then(r => r.data)
}
/**
 * @purpose 从特价总移出一个商品
 * @param id
 * @returns {Promise<T>}
 */
export function specialOfferGoodsRemove (id) {
  return http
    .post('activity.specialOfferGoodsRemove', {
      id: id
    })
    .then(r => r.data)
}

/**
 * @purpose 添加一个商品到特价
 * @param data
 * @returns {Promise<T>}
 */
export function addSpecialOfferGoods (data) {
  return http
    .post('activity.addSpecialOfferGoods', data)
    .then(r => r.data)
}

/**
 * @purpose 编辑特价商品
 * @param data
 * @returns {Promise<T>}
 */
export function specialOfferGoodsEdit (data) {
  return http
    .post('activity.specialOfferGoodsEdit', data)
    .then(r => r.data)
}

/**
 * @purpose 获取特价商品列表
 * @param page
 * @param size
 * @returns {*}
 */
export function specialOfferGoodsItems (page, size) {
  return http
    .get('activity.specialOfferGoodsItems', {
      page: page,
      size: size
    })
    .then(r => r.data)
}
