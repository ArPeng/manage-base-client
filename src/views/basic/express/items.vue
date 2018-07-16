<template>
  <div class="items">
    <el-row>
      <el-col :span="8">
        <el-input placeholder="搜索" v-model="kw">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="items"
      style="width: 100%;margin-top: 1rem">
      <el-table-column
        :show-overflow-tooltip="true"
        label="ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="快递公司名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="快递编号">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="是否默认">
        <template slot-scope="scope">
          <span v-if="scope.row.is_default === 1">否</span>
          <span v-if="scope.row.is_default === 2">是</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="little"
            v-if="scope.row.is_default !== 2"
            @click="setDefault(scope.row.id)">设置默认</el-button>
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
  data () {
    return {
      items: [],
      page: 1,
      size: 50,
      total: 0,
      kw: ''
    }
  },
  watch: {
    $route (route) {
      if (route.params.page) {
        this.page = Number(route.params.page)
      }
      this.getData()
    }
  },
  methods: {
    /**
     *  设置默认
     */
    setDefault (id) {
      this.showLoading()
      this
        .$api
        .express
        .setDefault(id)
        .then(r => {
          this.toast('设置成功')
          this.getData()
        })
    },
    /**
     *  搜索
     */
    search () {
      this.page = 1
      this.getData()
    },
    /**
     * 分页跳转
     */
    currentPage (page) {
      this.jump({
        name: 'basic.express.items',
        params: {
          page: page
        }
      })
    },
    /**
     * @purpose 获取数据
     */
    getData () {
      this.showLoading()
      this
        .$api
        .express
        .items(this.page, this.size, this.kw)
        .then(r => {
          this.items = r.list
          this.total = r.total
        })
    }
  },
  created () {
    if (this.$route.params.page) {
      this.page = Number(this.$route.params.page)
    }
    this.getData()
  }
}
</script>
<style scoped lang="sass">
  .item
    width: 100%
    min-height: 100%
  .el-pagination
    padding: 2px 0
</style>
