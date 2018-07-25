<template>
  <div class="deliver-goods">
    <el-dialog
      title="发货"
      :close-on-click-modal="false"
      :visible.sync="selfShow"
      width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单编号">
          <el-input :value="orderNo" disabled style="max-width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-input v-model="form.express_company" disabled style="max-width: 300px">
            <el-button slot="append" @click="showSearchExpress = true">点击选择</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="form.express_no" placeholder="快递单号,必填" style="max-width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selfShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定发货</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="快递公司选择"
      :close-on-click-modal="false"
      :visible.sync="showSearchExpress"
      width="50%">
      <el-row>
        <el-col>
          <el-input
            placeholder="请输入快递公司名字进行搜索"
            v-model="express_name">
            <el-button slot="append" type="primary" @click="searchExpressCompany">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
      <div class="express-item">
        <el-table
          :data="expressItem">
          <el-table-column
            label="id">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编号">
            <template slot-scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="little"
                @click="getExpress(scope.row)"
                type="primary">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    orderNo: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      express_name: '',
      showSearchExpress: false,
      selfShow: false,
      form: {
        express_company: '',
        express_no: '',
        express_code: ''
      },
      expressItem: [],
      timeOut: null
    }
  },
  watch: {
    showSearchExpress (val) {
      if (!val) {
        this.expressItem = []
      }
    },
    show (val) {
      this.selfShow = val
      if (val) {
        this.getDefaultExpress()
      } else {
        this.form.express_no = ''
      }
    },
    selfShow (val) {
      this.$emit('update:show', val)
    },
    express_name (val) {
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
      this.timeOut = setTimeout(() => {
        this.searchExpressCompany()
      }, 500)
    }
  },
  methods: {
    getExpress (express) {
      this.form.express_company = express.name
      this.form.express_code = express.code
      this.showSearchExpress = false
    },
    /**
     *  搜索快递公司
     */
    searchExpressCompany () {
      let auto = setTimeout(() => {
        this.showLoading()
      }, 1000)
      this
        .$api
        .express
        .search(this.express_name)
        .then(r => {
          clearTimeout(auto)
          this.expressItem = r
        })
    },
    /**
     * @purpose 获取默认发货快递公司
     */
    getDefaultExpress () {
      this.showLoading()
      this
        .$api
        .express
        .getDefault()
        .then(r => {
          if (typeof r.name !== 'undefined') {
            this.form.express_company = r.name
            this.form.express_code = r.code
          }
        })
    },
    /**
     * @purpose 提交数据
     * @returns {boolean}
     */
    submit () {
      if (!this.form.express_no) {
        this.toast('请填写快递单号!')
        return false
      }
      this.showLoading()
      this.form.id = this.orderId
      this
        .$api
        .order
        .deliverGoods(this.form)
        .then(r => {
          this.toast('发货成功!')
          this.$emit('success', true)
          this.$emit('update:show', false)
        })
    }
  }
}
</script>
<style scoped lang="sass">
  .deliver-goods
    width: 100%
    height: 100%
  .express-item
    width: 100%
    min-height: 200px
</style>
