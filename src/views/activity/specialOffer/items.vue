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
          label="原价">
          <template slot-scope="scope">
            {{(Number(scope.row.old_price) / 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="特价">
          <template slot-scope="scope">
            {{(Number(scope.row.price) / 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="总数">
          <template slot-scope="scope">
            {{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column
          label="已售">
          <template slot-scope="scope">
            {{scope.row.sold_num}}
          </template>
        </el-table-column>
        <el-table-column
          label="上级代理提成">
          <template slot-scope="scope">
            {{(Number(scope.row.parent_agent) / 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="上级会员提成">
          <template slot-scope="scope">
            {{(Number(scope.row.parent_member) / 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="上上级代理提成">
          <template slot-scope="scope">
            {{(Number(scope.row.grand_pa_agent) / 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="上上级会员提成">
          <template slot-scope="scope">
            {{(Number(scope.row.grand_pa_member) / 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="little"
              @click="remove(scope.row.id)"
              type="danger">删除</el-button>
            <el-button
              size="little"
              @click="showEditDialog(scope.row)"
              type="warning">编辑</el-button>
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

    <template>
      <el-dialog
        :append-to-body="true"
        title="填写参数"
        :visible.sync="showEdit"
        width="60%">
        <el-form :model="edit">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input :value="edit.title" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品原价" :label-width="formLabelWidth">
            <el-input :value="edit.old_price" disabled>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品特价" :label-width="formLabelWidth">
            <el-input v-model.trim="edit.price" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="出售数量" :label-width="formLabelWidth">
            <el-input v-model.trim="edit.num">
              <template slot="append">件</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级代理商提成" :label-width="formLabelWidth">
            <el-input v-model.trim="edit.parent_agent" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级会员提成" :label-width="formLabelWidth">
            <el-input v-model.trim="edit.parent_member" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级的父级代理商提成" :label-width="formLabelWidth">
            <el-input v-model.trim="edit.grand_pa_agent" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级的父级会员提成" :label-width="formLabelWidth">
            <el-input v-model.trim="edit.grand_pa_member" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showEdit = false">取 消</el-button>
          <el-button type="primary" @click="editGoods">保存</el-button>
        </div>
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
      showEdit: false,
      formLabelWidth: '200px',
      imageUrl: config.imageUrl,
      showAdd: false,
      items: [],
      page: 1,
      size: 20,
      total: 0,
      edit: {
        id: '',
        goods_id: '',
        title: '',
        old_price: '',
        price: '',
        num: '',
        parent_agent: '',
        parent_member: '',
        grand_pa_agent: '',
        grand_pa_member: ''
      }
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
     * @purpose 显示编辑弹窗
     */
    showEditDialog (goods) {
      this.edit = {
        id: goods.id,
        goods_id: goods.goods_id,
        title: goods.title,
        old_price: (Number(goods.old_price) / 100).toFixed(2),
        price: (Number(goods.price) / 100).toFixed(2),
        num: goods.num,
        parent_agent: (Number(goods.parent_agent) / 100).toFixed(2),
        parent_member: (Number(goods.parent_member) / 100).toFixed(2),
        grand_pa_agent: (Number(goods.grand_pa_agent) / 100).toFixed(2),
        grand_pa_member: (Number(goods.grand_pa_member) / 100).toFixed(2)
      }
      this.showEdit = true
    },
    /**
     *  编辑商品提交数据
     */
    editGoods () {
      if (!this.edit.price || Number(this.edit.price) <= 0) {
        this.toast('请填写商品特价价格!', 'warning')
        return false
      }
      if (!this.edit.num || Number(this.edit.num) <= 0) {
        this.toast('请填写商品特价数量!', 'warning')
        return false
      }
      if (!this.edit.parent_agent || Number(this.edit.parent_agent) <= 0) {
        this.toast('请填写父级代理商的提成!', 'warning')
        return false
      }
      if (!this.edit.parent_member || Number(this.edit.parent_member) <= 0) {
        this.toast('请填写父级会员的提成!', 'warning')
        return false
      }
      if (!this.edit.grand_pa_agent || Number(this.edit.grand_pa_agent) <= 0) {
        this.toast('请填写父级的父级代理商的提成!', 'warning')
        return false
      }
      if (!this.edit.grand_pa_member || Number(this.edit.grand_pa_member) <= 0) {
        this.toast('请填写父级的父级会员的提成!', 'warning')
        return false
      }
      this.showLoading()
      this
        .$api
        .activity
        .specialOfferGoodsEdit(this.edit)
        .then(r => {
          this.showEdit = false
          this.toast('编辑成功!')
          this.getData()
          this.edit = {
            id: '',
            goods_id: '',
            title: '',
            old_price: '',
            price: '',
            num: '',
            parent_agent: '',
            parent_member: '',
            grand_pa_agent: '',
            grand_pa_member: ''
          }
        })
    },
    /**
     *  @purpose 翻页
     */
    currentPage (page) {
      this.jump({
        name: 'activity.special.offer.items',
        params: {
          page: page
        }
      })
    },
    /***
     *  @purpose 从新品中移出一个商品
     */
    remove (id) {
      this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .activity
          .specialOfferGoodsRemove(id)
          .then(r => {
            this.toast('移出成功!')
            this.getData()
          })
      }).catch(r => {})
    },
    /**
     * @purpose 获取新品列表
     */
    getData () {
      this.showLoading()
      this
        .$api
        .activity
        .specialOfferGoodsItems(this.page, this.size)
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
    this.getData()
  }
}
</script>
<style scoped lang="sass">
  .main
    width: 100%
    height: 100%
</style>
