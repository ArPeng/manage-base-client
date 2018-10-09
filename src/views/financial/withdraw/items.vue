<template>
  <div class="items">
    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column
        width="50px"
        label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 30px;height: 30px;border-radius: 50%" />
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        label="昵称">
        <template slot-scope="scope">
          {{scope.row.nickname}}
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="手机号码">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        label="申请编号">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="'点击复制: ' + scope.row.odd_numbers" placement="top">
            <el-tag
              style="cursor: pointer"
              size="mini"
              type="warning"
              v-clipboard:copy="scope.row.odd_numbers"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
            >{{scope.row.odd_numbers}}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="提现金额(元)">
        <template slot-scope="scope">
          {{(Number(scope.row.quota) / 100).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="账户余额(元)">
        <template slot-scope="scope">
          {{(Number(scope.row.balance) / 100).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="冻结额度(元)">
        <template slot-scope="scope">
          {{(Number(scope.row.frozen) / 100).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column
        width="130px"
        label="微信号">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
            <el-tag
              style="cursor: pointer"
              size="mini"
              type="success"
              v-clipboard:copy="scope.row.wechat"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
            >{{scope.row.wechat}}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间">
        <template slot-scope="scope">
          {{scope.row.create_date}}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间">
        <template slot-scope="scope">
          {{scope.row.create_date}}
        </template>
      </el-table-column>
      <template v-if="inArray(status, [2,3])">
        <el-table-column
          label="处理人">
          <template slot-scope="scope">
            {{scope.row.administrator_name}}
          </template>
        </el-table-column>
        <el-table-column
          label="处理时间">
          <template slot-scope="scope">
            {{scope.row.deal_date}}
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="失败原因">
        <template slot-scope="scope">
          {{scope.row.message}}
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="status === 1">
        <template slot-scope="scope">
          <el-button
            size="little"
            @click="confirm(scope.row.id)"
            v-if="auth('financial.withdraw.confirm')"
            type="success">确认转账</el-button>
          <el-button
            size="little"
            @click="refused(scope.row.id)"
            v-if="auth('financial.withdraw.refused')"
            type="warning">拒绝提现</el-button>
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
      items: [],
      page: 1,
      size: 50,
      total: 0
    }
  },
  watch: {
    $route () {
      this.page = 1
      this.getItems()
    }
  },
  methods: {
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
     * @purpose 分页
     */
    currentPage (page) {
      this.jump({
        name: 'financial.withdraw.items_' + this.status,
        params: {
          page: page
        }
      })
    },
    refused (id) {
      this.$prompt('请输入拒绝理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this
          .$api
          .withdraw
          .refused(id, value)
          .then(r => {
            this.toast('操作成功')
            this.getItems()
          })
      }).catch(() => {})
    },
    /**
     * @purpose 确认已打款
     * @param id
     */
    confirm (id) {
      /**
       * 删除权限
       */
      this.$confirm('确认已打款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .withdraw
          .confirm(id)
          .then(r => {
            this.toast('操作成功')
            this.getItems()
          })
      }).catch(r => {})
    },
    /**
     * @purpose 获取数据
     */
    getItems () {
      this.showLoading()
      this.items = []
      this
        .$api
        .withdraw
        .items(this.page, this.size, this.status)
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
<style scoped></style>
