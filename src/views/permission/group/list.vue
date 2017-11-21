<template>
  <div class="main">
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="jump({name:'permission.group.create'})">添加</el-button>
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
        <!--style="height: 32pxwidth: 32px"-->
        <!--:src="scope.row.avatar"-->
        <!--:onerror="`javascript:this.src='${require('@assets/defaultAvatar.jpg')}'`" />-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="ID">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="组名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="描述">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.descriptions"
              placement="top">
              <span>{{stringCut(scope.row.descriptions, 10)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="little"
              @click="jump({
                name: 'permission.group.update',
                params: {id: scope.row.id}
              })">编辑</el-button>
            <el-button
              size="little"
              type="warning"
              @click="authorization(scope.row.rules);selectId = scope.row.id">权限分配</el-button>
            <el-button
              size="little"
              type="danger"
              @click="deleteGroup(scope.row.id)">删除</el-button>
            <!--<el-button-->
              <!--size="little"-->
              <!--type="success">详情</el-button>-->
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
    <authorization
      :checkedKeys="checkedKeys"
      @get-rules="getRules"
      :show.sync="show">
    </authorization>
  </div>
</template>
<script>
  import authorization from '@components/authorization.vue'
  export default {
    components: {
      authorization
    },
    data () {
      return {
        // 授权时选中的ID
        selectId: 0,
        // 用户组已经拥有的权限
        checkedKeys: [],
        // 列表数据
        tableData: [],
        // 页码
        page: 1,
        // 每页显示数量
        pageSize: 20,
        // 数据总条数
        total: 0,
        // login
        loading: false,
        show: false
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
      deleteGroup (id) {
        this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLoading()
          this
            .$api
            .group
            .deleteById(id)
            .then(r => {
              this.closeLoading()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getData()
            })
        }).catch(r => {})
      },
      /**
       * 获取用户选中的权限,并给用户组授权
       */
      getRules (rules) {
        let _rules = rules.join(',')
        this.showLoading()
        this
          .$api
          .group
          .authorization(this.selectId, _rules)
          .then(r => {
            this.$message({
              message: '授权成功!',
              type: 'success'
            })
            this.getData()
          })
      },
      /**
       * 显示选择权限弹窗之前的一些处理
       */
      authorization (rules) {
        if (rules) {
          this.checkedKeys = rules.split(',')
        } else {
          this.checkedKeys = []
        }
        this.show = true
      },
      // 获取数据
      getData () {
        this.loading = true
        this
          .$api
          .group
          .getList(this.page, this.pageSize)
          .then(r => {
            this.loading = false
            this.tableData = r.list
            this.total = r.total
          }).catch(e => {
            this.loading = false
          })
      },
      /**
       * 页码改变事件
       */
      currentPage (page) {
        this.jump({
          name: 'permission.group.list',
          params: {
            page: page
          }
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
