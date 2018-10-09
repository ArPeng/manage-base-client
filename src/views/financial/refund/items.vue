<template>
  <div class="items">
    <el-table
    :data="items">
      <el-table-column label="订单编号">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
            <el-tag
              v-clipboard:copy="scope.row.order_no"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError">{{scope.row.order_no}}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="退款单号">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
            <el-tag
              v-clipboard:copy="scope.row.refund_no"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError">{{scope.row.refund_no}}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="退款原因">
        <template slot-scope="scope">{{scope.row.order.refund_reason}}</template>
      </el-table-column>
      <el-table-column label="会员昵称">
        <template slot-scope="scope">{{scope.row.member.nickname}}</template>
      </el-table-column>
      <el-table-column label="订单联系人">
        <template slot-scope="scope">{{scope.row.order.contacts}}[{{scope.row.order.contacts_mobile}}]</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{status_text[scope.row.status]}}</template>
      </el-table-column>
      <el-table-column label="拒绝理由" v-if="status === 4">
        <template slot-scope="scope">{{scope.row.refusal_refund_reason}}</template>
      </el-table-column>
      <el-table-column label="操作" v-if="status === 1">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="agree(scope.row.order_no)"
            size="little">同意退款</el-button>
          <el-button
            type="warning"
            @click="refuse(scope.row.order_no)"
            size="little">拒绝退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        background
        @size-change="()=>{}"
        @current-change="currentPage"
        :current-page.sync="page"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      page: 1,
      size: 20,
      total: 0,
      items: [],
      status_text: {
        1: '待处理',
        2: '微信退款处理中',
        3: '退款成功',
        4: '退款被拒绝'
      }
    }
  },
  watch: {
    $route (route) {
      if (route.params.page) {
        this.page = route.params.page
      }
      this.getItems()
    }
  },
  methods: {
    /**
     *  拒绝申请
     */
    refuse (orderNo) {
      this.$prompt('请输入拒绝理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (!value) {
          this.toast('请输入拒绝理由')
          return false
        }
        this.showLoading()
        this
          .$api
          .refund
          .refuse(orderNo, value)
          .then(r => {
            this.toast('操作成功')
            this.getItems()
          })
      }).catch(() => {})
    },
    /**
     * @purpose 同意退款
     */
    agree (orderNo) {
      this.$confirm('确定同意退款吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'notice'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .refund
          .agree(orderNo)
          .then(r => {
            this.toast('操作成功!')
            this.getItems()
          })
      }).catch(r => {})
    },
    /**
     *  @purpose 翻页
     */
    currentPage (page) {
      this.jump({
        name: 'financial.refund.items.' + this.status,
        params: {
          page: page
        }
      })
    },
    /**
     * 复制成功回调
     */
    onCopySuccess () {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    /**
     *  复制失败回调
     */
    onCopyError (e) {
      this.$alert(e.text, '复制失败！请您手动复制下面的文本。', {
        confirmButtonText: '关闭',
        callback: action => {}
      })
    },
    /**
     * @purpose 获取列表
     */
    getItems () {
      this.items = []
      this.showLoading()
      this
        .$api
        .refund
        .items(this.status, this.page, this.size)
        .then(r => {
          this.total = r.total
          this.items = r.list
        })
    }
  },
  created () {
    if (this.$route.params.page) {
      this.page = Number(this.$route.params.page)
    }
    this.getItems()
  }
}
</script>
<style scoped lang="sass">
  .items
    width: 100%
    height: 100%
</style>
