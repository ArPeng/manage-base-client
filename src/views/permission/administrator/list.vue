<template>
  <div class="main">
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        v-if="auth('permission.administrator.create')"
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
        <el-table-column
          label="是否授权">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.rules || scope.row.groups" size="small" type="success">已授权</el-tag>
            <el-tag v-else size="small" type="danger">未授权</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="little"
              @click="jump({
                  name: 'permission.administrator.update',
                  params: {uuid: scope.row.uuid}
                })"
              v-if="auth('permission.administrator.update')">编辑</el-button>
            <el-button
              size="little"
              type="primary"
              v-if="auth('permission.administrator.authorization')"
              @click="showAuthorization(scope.row.groups, scope.row.rules);actionUserId = scope.row.uid">授权</el-button>
            <el-button
              size="little"
              type="danger"
              v-if="auth('permission.administrator.delete')"
              @click="deleteUser(scope.row.uuid)">删除</el-button>
            <template
              v-if="auth('permission.administrator.disable_or_enable')">
              <el-button
                size="little"
                type="warning"
                v-if="scope.row.status === 1"
                @click="isDisable(scope.row.uuid,2)">禁用</el-button>
              <el-button
                size="little"
                type="success"
                v-if="scope.row.status === 2"
                @click="isDisable(scope.row.uuid, 1)">解禁</el-button>
            </template>
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
      :default-groups="defaultGroups"
      :default-rules="defaultRules"
      @submit="authorization"
      :show.sync="show"></authorization>
  </div>
</template>
<script>
  import authorization from './authorization.vue'
  export default {
    components: {
      authorization
    },
    data () {
      return {
        show: false,
        // loading
        loading: false,
        // 页码
        page: 1,
        // 每页显示数量
        pageSize: 20,
        // 数据总条数
        total: 0,
        // 列表数据
        tableData: [],
        // 当前操作管理员以及拥有的管理组
        defaultGroups: [],
        // 当前操作管理员以及拥有的额外权限
        defaultRules: [],
        // 当前操作的管理员UID
        actionUserId: 0
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
      // 给管理员授权
      authorization (groups, rules) {
        this.showLoading()
        this
          .$api
          .user
          .authorization(
            this.actionUserId,
            groups,
            rules
          ).then(r => {
            this.getData()
          })
      },
      /**
       * 授权弹窗弹出之前的一些处理
       */
      showAuthorization (groups, rules) {
        this.defaultGroups = []
        this.defaultRules = []
        if (groups) {
          this.defaultGroups = groups.split(',')
        }
        if (rules) {
          this.defaultRules = rules.split(',')
        }
        this.show = true
      },
      // 禁封或解禁管理员
      isDisable (uuid, type) {
        let auto = setTimeout(() => {
          this.showLoading()
        }, 500)
        this
          .$api
          .user
          .isDisable(uuid, type)
          .then(r => {
            this.closeLoading()
            clearTimeout(auto)
            this.getData()
          })
      },
      /**
       * 删除一个管理员
       */
      deleteUser (uuid) {
        this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLoading()
          this
            .$api
            .user
            .deleteUser(uuid)
            .then(r => {
              this.closeLoading()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getData()
            })
        })
      },
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
