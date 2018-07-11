<template>
  <div class="main">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      v-if="auth('goods.manager.create')"
      @click="jump({name:'goods.manager.create'})">新增</el-button>

    <template>

      <el-table
        :data="items"
        style="width: 100%;margin-top: 2rem">
        <el-table-column
          width="50px"
          label="ID">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="70px"
          label="缩略图">
          <template slot-scope="scope">
          <img
          style="height: 50px;width: 50px"
          :src="imageUrl + scope.row.thumb"
          :onerror="`javascript:this.src='${require('@assets/defaultAvatar.jpg')}'`" />
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          label="商品标题">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
              <span>{{stringCut(scope.row.title, 14)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="浏览量">
          <template slot-scope="scope">
            <p>
              {{scope.row.views}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="分享次数">
          <template slot-scope="scope">
            <p>
              {{scope.row.shares}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="分类">
          <template slot-scope="scope">
            <p>
              {{scope.row.category_name}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="品牌">
          <template slot-scope="scope">
            <p>
              {{scope.row.brand_name}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status !== 99 && scope.row.status !== 3"
              size="little"
              @click="setStatus(scope.row.id, 99)"
              type="primary">上架</el-button>
            <el-button
              v-if="scope.row.status === 99"
              size="little"
              @click="setStatus(scope.row.id, 2)"
              type="primary">下架</el-button>
            <el-button
              v-if="scope.row.status === 3"
              size="little"
              @click="setStatus(scope.row.id, 2)"
              type="primary">恢复</el-button>
            <el-button
              size="little"
              type="danger"
              @click="setStatus(scope.row.id, 3)"
              v-if="auth('goods.manager.delete') &&
              (scope.row.status !== 3
              && scope.row.status !== 4
              && scope.row.status !== 99)">删除</el-button>
            <el-button
              size="little"
              v-if="auth('goods.manager.edit') && scope.row.status !== 99 && scope.row.status !== 3"
              @click="jump({
                name: 'goods.manager.edit',
                params: {id: scope.row.id}
              })">编辑</el-button>
            <el-button
              size="little"
              @click="showDetail = true; detailId = scope.row.id"
              type="default">详情</el-button>
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
    </template>
    <el-dialog
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="showDetail"
      width="80%">
      <ui-detail :show="showDetail" :id="detailId"></ui-detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetail = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import config from '@config'
import uiDetail from './detail'
export default {
  components: {
    uiDetail
  },
  props: ['status'],
  data () {
    return {
      showDetail: false, // 是否显示商品详情
      detailId: 0, // 要显示详情的商品ID
      imageUrl: config.imageUrl,
      items: [],
      page: 1,
      size: 20,
      total: 1
    }
  },
  watch: {
    $route (route) {
      if (this.$route.params.page) {
        this.page = Number(this.$route.params.page)
      }
      this.getData()
    }
  },
  methods: {
    // 更新商品状态
    setStatus (id, status) {
      let message = status === 3 ? '确定要删除该商品吗?' : '确定要操作该商品吗?'
      this.$confirm(message, status === 3 ? '警告' : '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: status === 3 ? 'warning' : 'notice'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .goods
          .status(id, status)
          .then(r => {
            this.toast('操作成功!')
            this.getData()
          })
      })
    },
    /**
     *  翻页回调
     */
    currentPage (page) {
      this.jump({
        name: 'goods.manager.items.' + this.status,
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
        .goods
        .items({
          page: this.page,
          size: this.size,
          status: this.status
        }).then(r => {
          this.total = r.total
          this.items = r.list
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
<style scoped></style>
