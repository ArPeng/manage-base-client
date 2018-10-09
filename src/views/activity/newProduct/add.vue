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
          width="100px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="newProductAdd(scope.row.id)"
              type="primary">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import config from '@config'
export default {
  data () {
    return {
      imageUrl: config.imageUrl,
      kw: '',
      items: []
    }
  },
  methods: {
    /**
     *  添加商品到新品
     */
    newProductAdd (goodsId) {
      this.showLoading(this.$refs.add)
      this
        .$api
        .activity
        .newProductAdd(goodsId)
        .then(r => {
          this.items = this.items.filter(item => {
            return Number(goodsId) !== Number(item.id)
          })
          this.toast('添加成功')
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
      this.showLoading(this.$refs.add)
      this
        .$api
        .activity
        .searchGoods(this.kw)
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
