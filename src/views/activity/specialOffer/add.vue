<template>
  <div class="add" ref="add">
    <div class="search">
      <el-input v-model="kw" placeholder="请输入商品名称进行搜索" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="goods">
      <el-table
        :data="items">
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
          label="原价">
          <template slot-scope="scope">{{(Number(scope.row.price) / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column
          width="100px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="
              showData = true;
              form.goods_id = scope.row.id;
              form.title = scope.row.title;
              form.old_price = scope.row.price"
              type="primary">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template>
      <el-dialog
        :append-to-body="true"
        title="填写参数"
        :visible.sync="showData"
        width="60%">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input :value="form.title" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品原价" :label-width="formLabelWidth">
            <el-input :value="(Number(form.old_price) / 100).toFixed(2)" disabled>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品特价" :label-width="formLabelWidth">
            <el-input v-model.trim="form.price" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="出售数量" :label-width="formLabelWidth">
            <el-input v-model.trim="form.num">
              <template slot="append">件</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级代理商提成" :label-width="formLabelWidth">
            <el-input v-model.trim="form.parent_agent" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级会员提成" :label-width="formLabelWidth">
            <el-input v-model.trim="form.parent_member" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级的父级代理商提成" :label-width="formLabelWidth">
            <el-input v-model.trim="form.grand_pa_agent" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="父级的父级会员提成" :label-width="formLabelWidth">
            <el-input v-model.trim="form.grand_pa_member" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showData = false">取 消</el-button>
          <el-button type="primary" @click="addSpecialOfferGoods">确定添加</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import config from '@config'
export default {
  data () {
    return {
      showData: false,
      imageUrl: config.imageUrl,
      kw: '',
      items: [],
      formLabelWidth: '200px',
      form: {
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
    showData (val) {
      if (!val) {
        this.form = {
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
    }
  },
  methods: {
    /**
     * 添加商品到特价
     */
    addSpecialOfferGoods () {
      if (!this.form.price || Number(this.form.price) <= 0) {
        this.toast('请填写商品特价价格!', 'warning')
        return false
      }
      if (!this.form.num || Number(this.form.num) <= 0) {
        this.toast('请填写商品特价数量!', 'warning')
        return false
      }
      if (!this.form.parent_agent || Number(this.form.parent_agent) <= 0) {
        this.toast('请填写父级代理商的提成!', 'warning')
        return false
      }
      if (!this.form.parent_member || Number(this.form.parent_member) <= 0) {
        this.toast('请填写父级会员的提成!', 'warning')
        return false
      }
      if (!this.form.grand_pa_agent || Number(this.form.grand_pa_agent) <= 0) {
        this.toast('请填写父级的父级代理商的提成!', 'warning')
        return false
      }
      if (!this.form.grand_pa_member || Number(this.form.grand_pa_member) <= 0) {
        this.toast('请填写父级的父级会员的提成!', 'warning')
        return false
      }
      this.showLoading()
      this
        .$api
        .activity
        .addSpecialOfferGoods(this.form)
        .then(r => {
          this.items = this.items.filter(item => {
            return Number(this.form.goods_id) !== Number(item.id)
          })
          this.toast('添加成功')
          this.showData = false
          this.$parent.getData()
        })
    },
    /**
     * @purpose 搜索商品
     * @returns {boolean}
     */
    search () {
      if (!this.kw) {
        this.toast('请输入关键词', 'warning')
        return false
      }
      this.showLoading()
      this
        .$api
        .activity
        .searchGoodsForSpecial(this.kw)
        .then(r => {
          this.items = r
        })
    }
  }
}
</script>
<style scoped lang="sass">
  .add
    width: 100%
    height: 500px
    .search
      width: 100%
      height: 60px
    .goods
      width: 100%
      height: 440px
      overflow-x: hidden
      overflow-y: auto
</style>
