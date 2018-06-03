<template>
  <div class="main">
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-back"
        size="small"
        v-if="pid > 0"
        @click="jump(-1)">返回</el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        v-if="auth('basic.category.create')"
        @click="jump({name:'basic.category.create', params: {pid: pid}})">新增</el-button>
    </div>
    <template>

      <el-table
        :data="items"
        style="width: 100%">
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
          style="height: 32px;width: 32px"
          :src="imageUrl + scope.row.thumb"
          :onerror="`javascript:this.src='${require('@assets/not-picture.png')}'`" />
        </template>
        </el-table-column>
        <el-table-column
          label="分类名称">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.child_count > 0"
              @click="jump({
                name: 'basic.category.items',
                params: {pid: scope.row.id}
              })">{{scope.row.name}}</el-button>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="little"
              v-if="auth('basic.category.edit')"
              @click="jump({
                name: 'basic.category.edit',
                params: {id: scope.row.id}
              })">编辑</el-button>
            <el-button
              size="little"
              type="danger"
              v-if="auth('basic.category.delete')"
              @click="deleteCategory(scope.row.id)">删除</el-button>
            <el-button
              size="little"
              v-if="scope.row.child_count > 0"
              @click="jump({
                name: 'basic.category.items',
                params: {pid: scope.row.id}
              })">查看下级</el-button>
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
      items: [],
      imageUrl: config.imageUrl,
      pid: 0
    }
  },
  methods: {
    // 删除分类
    deleteCategory (id) {
      this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .category
          .deleteCategory(id)
          .then(r => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getData()
          })
      }).catch(r => {})
    },
    // 获取数据
    getData () {
      this.showLoading()
      this
        .$api
        .category
        .items(this.pid)
        .then(r => {
          this.items = r
        })
    }
  },
  watch: {
    $route (route) {
      if (route.params.pid) {
        this.pid = route.params.pid
      } else {
        this.pid = 0
      }
    },
    pid () {
      this.getData()
    }
  },
  created () {
    if (this.$route.params.pid) {
      this.pid = this.$route.params.pid
    }
    this.getData()
  }
}
</script>
<style scoped></style>
