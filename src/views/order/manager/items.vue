<template>
  <div class="items">
    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column
        width="50px"
        label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 30px;height: 30px" />
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="用户昵称">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="订单编号">
        <template slot-scope="scope">
          <span>{{scope.row.order_no}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="收货地址">
        <template slot-scope="scope">
          <span>{{scope.row.contacts}}:</span>
          <span>{{scope.row.contacts_mobile}}:</span>
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="下单时间">
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="inArray(status,[3,7])"
        :show-overflow-tooltip="true"
        label="快递公司">
        <template slot-scope="scope">
          <span>{{scope.row.express_company}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="inArray(status,[3,7])"
        :show-overflow-tooltip="true"
        label="快递单号">
        <template slot-scope="scope">
          <span>{{scope.row.express_no}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="支付时间">
        <template slot-scope="scope">
          <span>{{scope.row.pay_date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="inArray(status,[2,3,7])"
        :show-overflow-tooltip="true"
        label="支付单号">
        <template slot-scope="scope">
          <span>{{scope.row.pay_no}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="inArray(status,[2,3,7])"
        :show-overflow-tooltip="true"
        label="支付方式">
        <template slot-scope="scope">
          <span>{{pay_type[scope.row.pay_type]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="inArray(status,[2,3,7])"
        :show-overflow-tooltip="true"
        label="支付金额(元)">
        <template slot-scope="scope">
          <span>{{Number(scope.row.pay_money / 100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="买家留言">
        <template slot-scope="scope">
          <span>{{scope.row.message}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="status === 4"
        :show-overflow-tooltip="true"
        label="取消原因">
        <template slot-scope="scope">
          <span>{{scope.row.cancel_reason}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 2">
            <el-button
              size="little"
              type="primary"
              @click="showDeliverGoods = true; order_id = scope.row.id;order_no = scope.row.order_no">发货</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        @size-change="()=>{}"
        @current-change="currentPage"
        :current-page.sync="page"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <ui-deliver-goods
      :show.sync="showDeliverGoods"
      :order-id="order_id"
      :order-no="order_no"></ui-deliver-goods>
  </div>
</template>
<script>
import uiDeliverGoods from './deliver-goods'
export default {
  components: {
    uiDeliverGoods
  },
  props: {
    status: {
      type: Number,
      default: 99
    }
  },
  data () {
    return {
      order_no: '',
      order_id: 0,
      showDeliverGoods: false,
      page: 1,
      size: 40,
      total: 0,
      items: [],
      pay_type: {
        1: '微信',
        2: '支付宝'
      }
    }
  },
  watch: {
    $route () {
      this.page = 1
      this.getItems()
    }
  },
  methods: {
    currentPage (page) {
      this.jump({
        name: 'order.manager.items.' + this.status,
        params: {
          page: page
        }
      })
    },
    /**
     * @purpose 获取订单列表
     */
    getItems () {
      this.showLoading()
      this
        .$api
        .order
        .items(this.status, this.page, this.size)
        .then(r => {
          this.total = r.total
          this.items = r.list
        })
    }
  },
  created () {
    this.getItems()
  }
}
</script>
<style scoped lang="sass">
  .items
    width: 100%
    min-height: 100%
    .el-pagination
      padding: 2px 0 !important
</style>
