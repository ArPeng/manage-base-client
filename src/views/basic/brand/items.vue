<template>
  <div class="main">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      v-if="auth('basic.brand.create')"
      @click="jump({name:'basic.brand.create'})">新增</el-button>
    <el-button
      type="primary"
      icon="el-icon-sort"
      size="small"
      @click="sort"
      v-if="auth('basic.brand.sort')">排序</el-button>
    <template>
      <el-table
        :data="brands"
        style="width: 100%;margin-top: 2rem">
        <el-table-column
          v-if="auth('basic.brand.sort')"
          width="100"
          label="排序">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="50"
          label="ID">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="缩略图">
          <template slot-scope="scope">
            <img
              style="height: 40px;width: 40px"
              :src="imageUrl + scope.row.thumb"
              :onerror="`javascript:this.src='${require('@assets/not-picture.png')}'`" />
          </template>
        </el-table-column>
        <el-table-column
          label="品牌中文名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="品牌英文名">
          <template slot-scope="scope">
            <span>{{scope.row.english}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="little"
              v-if="auth('basic.brand.edit')"
              @click="jump({
                name: 'basic.brand.edit',
                params: {id: scope.row.id}
              })">编辑</el-button>
            <el-button
              size="little"
              type="danger"
              v-if="auth('basic.brand.delete')"
              @click="deleteBrand(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import config from '@config'
  export default {
    data () {
      return {
        imageUrl: config.imageUrl,
        brands: [],
        page: 1,
        size: 50,
        total: 0
      }
    },
    watch: {
      $route (route) {
        if (route.params.page) {
          this.page = route.params.page
        }
      }
    },
    methods: {
      /**
       * 删除品牌
       */
      deleteBrand (id) {
        this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLoading()
          this
            .$api
            .brand
            .del(id)
            .then(r => {
              this.toast('删除成功', () => {
                this.getData()
              })
            })
        }).catch(r => {})
      },
      /**
       *  排序
       */
      sort () {
        let data = []
        this.brands.map(brand => {
          data.push({id: brand.id, sort: brand.sort})
        })
        this.showLoading()
        this
          .$api
          .brand
          .sort(data)
          .then(r => {
            this.toast('排序成功')
            this.getData()
          })
      },
      /**
       * @purpose 获取数据
       */
      getData () {
        this.showLoading()
        this
          .$api
          .brand
          .items(this.page, this.size)
          .then(r => {
            this.total = r.total
            this.brands = r.list
          })
      }
    },
    created () {
      if (this.$route.params.page) {
        this.page = this.$route.params.page
      }
      this.getData()
    }
  }
</script>

<style scoped>

</style>
