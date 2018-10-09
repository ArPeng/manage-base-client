<template>
  <div class="detail">
    <el-dialog
      title="订单详情"
      :close-on-click-modal="false"
      :visible.sync="selfShow"
      width="80%">
      <div class="hint">
        <div class="text">订单信息</div>
      </div>
      <div class="items">
        <div class="item">
          <div
            class="field">
            订单状态
          </div>
          <div class="box">
            <span>{{status[orderInfo.status]}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button
              v-if="orderInfo.status === 2 && auth('order.manager.deliver.goods')"
              @click="showDeliverGoods = true"
              size="little"
              type="primary">立即发货</el-button>
          </div>
        </div>
        <div class="item">
          <div
            class="field">
            订单编号
          </div>
          <div class="box">
            {{orderInfo.order_no}}
          </div>
        </div>
        <div class="item">
          <div
            class="field">
            下单用户
          </div>
          <div class="box">
            <img :src="orderInfo.avatar" style="width: 30px;height: 30px;border-radius: 50%">
            &nbsp;&nbsp;
            {{orderInfo.nickname}}
          </div>
        </div>
        <div class="item">
          <div
            class="field">
            收货人信息
          </div>
          <div class="box">
            {{orderInfo.contacts}}&nbsp;&nbsp;{{orderInfo.contacts_mobile}}
          </div>
        </div>
        <div class="item">
          <div
            class="field">
            收货地址
          </div>
          <div class="box">
            {{orderInfo.address}}
          </div>
        </div>
        <div class="item">
          <div
            class="field">
            物流信息
          </div>
          <div class="box">
            {{orderInfo.express_company}}&nbsp;&nbsp; {{orderInfo.express_no}}
          </div>
        </div>
        <div class="item">
          <div
            class="field">
            下单时间
          </div>
          <div class="box">
            {{orderInfo.create_time}}
          </div>
        </div>
        <template v-if="inArray(orderInfo.status,[2,3,7])">
          <div class="item">
            <div
              class="field">
              支付时间
            </div>
            <div class="box">
              {{orderInfo.pay_date}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              支付单号
            </div>
            <div class="box">
              {{orderInfo.pay_no}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              支付方式
            </div>
            <div class="box">
              {{({1: '微信支付', 2: '支付宝支付'})[orderInfo.pay_type]}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              支付金额
            </div>
            <div class="box">
              {{(Number(orderInfo.pay_money) / 100).toFixed(2)}}
            </div>
          </div>
        </template>
        <div class="item">
          <div
            class="field">
            买家留言
          </div>
          <div class="box">
            {{orderInfo.message}}
          </div>
        </div>
        <div class="item" v-if="orderInfo === 4">
          <div
            class="field">
            取消理由
          </div>
          <div class="box">
            {{orderInfo.cancel_reason}}
          </div>
        </div>
      </div>
      <div class="hint">
        <div class="text">购买商品信息</div>
      </div>
      <div class="items">
        <div class="item" v-for="(goods,idx) in orderInfo.attach" :key="'order-item-' + idx">
          <div class="goods-box">{{goods.title}}</div>
          <div class="goods-box">编号: {{goods.goods_number}}</div>
          <div class="goods-box">{{goods.spec}}</div>
          <div class="goods-box">{{goods.number}}件</div>
          <div class="goods-box">
            <el-popover
              placement="left"
              width="500"
              trigger="hover">
              <img :src="imageUrl + goods.thumb" style="width: 100%;height: 100%">
              <img slot="reference" :src="imageUrl + goods.thumb" style="width: 40px;height: 40px;margin-top: 5px">
            </el-popover>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selfShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <ui-deliver-goods
      @success="() => {$parent.getItems(); getData()}"
      :show.sync="showDeliverGoods"
      :order-id="orderId"
      :order-no="orderNo"></ui-deliver-goods>
  </div>
</template>
<script>
import uiDeliverGoods from './deliver-goods'
export default {
  components: {
    uiDeliverGoods
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    orderNo: {
      type: String,
      default: ''
    },
    orderId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showDeliverGoods: false,
      imageUrl: this.config('imageUrl'),
      selfShow: false,
      orderInfo: {},
      status: {
        1: '待付款',
        2: '待发货',
        3: '待收货',
        4: '订单取消',
        5: '订单删除',
        6: '交易关闭',
        7: '交易完成',
        8: '已签收',
        9: '申请退款中'
      }
    }
  },
  watch: {
    show (val) {
      this.selfShow = val
      if (val) {
        this.getData()
      }
    },
    selfShow (val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    /**
     * @purpose 获取订单详情
     */
    getData () {
      this.showLoading()
      this
        .$api
        .order
        .detailById(this.orderId)
        .then(r => {
          this.orderInfo = r
        })
    }
  }
}
</script>
<style scoped lang="sass">
  .hint
    width: 100%
    height: 40px
    display: flex
    align-items: center
    border-left: 4px solid #09bb07
    background-color: #ebebeb
    margin: 1.5rem 0
    .text
      font-size: 1rem
      margin-left: .5rem
      font-weight: bold
  .items
    width: 100%
    height: auto
    .item
      width: 100%
      height: 50px
      border: 1px solid #ebebeb
      display: flex
      align-items: center
      border-top: none
      &:first-child
        border-top: 1px solid #ebebeb
      .box
        flex: 1
        height: 100%
        display: flex
        align-items: center
        padding: 0 1rem
        border-right: 1px solid #ebebeb
        &:last-child
          border-right: none
      .goods-box
        width: auto
        height: 100%
        display: flex
        align-items: center
        padding: 0 1rem
        border-right: 1px solid #ebebeb
        &:nth-child(2)
          width: 150px
        &:nth-child(3)
          width: 100px
        &:nth-child(4)
          width: 100px
          text-align: center
        &:nth-child(5)
          width: 50px
          padding: 0 5px
        &:last-child
          border-right: none
        &:first-child
          padding-left: 5px
          flex: 1
      .field
        width: 150px
        height: 100%
        border-right: 1px solid #ebebeb
        display: flex
        align-items: center
        font-size: 1rem
        font-weight: bold
        justify-content: flex-end
        padding-right: 1rem
  .text-picture-detail
    width: 100%
    height: 500px
    display: flex
    justify-content: center
    .content
      width: 320px
      height: 100%
      overflow-x: hidden
      overflow-y: auto
      padding: 1rem
      border-radius: 5px
      background-color: #f4f4f4
</style>
