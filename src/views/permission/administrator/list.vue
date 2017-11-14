<template>
  <div class="main">
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="jump({name:'permission.administrator.create'})">添加</el-button>
    </div>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <!--<el-table-column-->
          <!--label="头像">-->
          <!--<template slot-scope="scope">-->
              <!--<img-->
                <!--style="height: 32px;width: 32px;"-->
                <!--:src="scope.row.avatar"-->
                <!--:onerror="`javascript:this.src='${require('@assets/defaultAvatar.jpg')}'`" />-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="姓名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱">
          <template slot-scope="scope">
            <span>{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" size="small" type="success">正常</el-tag>
            <el-tag v-if="scope.row.status === 2" size="small" type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="jump({
                name: 'permission.administrator.update',
                params: {uuid: scope.row.uuid}
              })">编辑</el-button>
            <el-button
              size="mini"
              type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          @size-change="()=>{}"
          @current-change="currentPage"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // loading
        loading: false,
        // 页码
        page: 1,
        // 每页显示数量
        pageSize: 20,
        // 数据总条数
        total: 0,
        // 列表数据
        tableData: []
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
      /**
       * 页码改变事件
       */
      currentPage (page) {
        this.jump({
          name: 'permission.administrator.list',
          params: {
            page: page
          }
        })
      },
      /**
       * 获取列表数据
       */
      getData () {
        this.loading = true
        this
          .$api
          .user
          .items(this.page, this.pageSize)
          .then(r => {
            this.loading = false
            this.tableData = r.list
            this.total = r.total
          })
          .catch(e => {
            this.loading = false
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
  .pages
    margin-top: 1rem
</style>
