<template>
  <div class="main">
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="showAdd = true"
        size="small">添加</el-button>
    </div>
    <template>
      <el-table
        :data="items"
        style="width: 100%;margin-top: 1rem">
        <el-table-column
          width="70px"
          label="缩略图">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="500"
              trigger="hover">
              <img :src="imageUrl + scope.row.thumb" style="width: 100%;height: 100%">
              <img slot="reference" :src="imageUrl + scope.row.thumb" style="width: 100%;height: 100%">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column
          label="分类">
          <template slot-scope="scope">
            {{scope.row.category_name}}
          </template>
        </el-table-column>
        <el-table-column
          label="品牌">
          <template slot-scope="scope">
            {{scope.row.brand_name}}
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="newProductRemove(scope.row.id)"
              type="danger">删除</el-button>
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
    </template>
    <template>
      <el-dialog
        title="添加商品"
        :visible.sync="showAdd"
        width="60%">
        <ui-add></ui-add>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import uiAdd from './add'
import config from '@config'
export default {
  components: {
    uiAdd
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      showAdd: false,
      items: [],
      page: 1,
      size: 20,
      total: 0
    }
  },
  watch: {
    $route (route) {
      if (route.params.page) {
        this.page = Number(route.params.page)
      }
      this.newProductItems()
    }
  },
  methods: {
    currentPage (page) {
      this.jump({
        name: 'activity.new.product.items',
        params: {
          page: page
        }
      })
    },
    /***
     *  @purpose 从新品中移出一个商品
     */
    newProductRemove (id) {
      this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .activity
          .newProductRemove(id)
          .then(r => {
            this.toast('移出成功!')
            this.newProductItems()
          })
      }).catch(r => {})
    },
    /**
     * @purpose 获取新品列表
     */
    newProductItems () {
      this.showLoading()
      this
        .$api
        .activity
        .newProductItems(this.page, this.size)
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
    this.newProductItems()
  }
}
</script>
<style scoped lang="sass">
  .main
    width: 100%
    height: 100%
</style>
