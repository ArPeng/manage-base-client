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
        @click="jump({name:'permission.rule.create'})">添加</el-button>
    </div>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="名称">
          <template slot-scope="scope">

            <el-button
              type="text"
              v-if="scope.row.child_count > 0"
              @click="jump({
                name: 'permission.rule.list',
                params: {pid: scope.row.id}
              })">{{scope.row.name}}</el-button>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            <el-tag size="mini" type="success">{{typeDesc[scope.row.type]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="图标">
          <template slot-scope="scope">
            <span v-if="scope.row.icon_class" :class="scope.row.icon_family">
              <i :class="scope.row.icon_class"></i>
            </span>
            <template v-else>无图标</template>
          </template>
        </el-table-column>
        <el-table-column
          label="唯一标识">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
              <el-tag
                style="cursor: pointer"
                size="mini"
                type="info"
                v-clipboard:copy="scope.row.identification"
                v-clipboard:success="onCopySuccess"
                v-clipboard:error="onCopyError"
              >{{scope.row.identification}}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="jump({
                name: 'permission.rule.update',
                params: {id: scope.row.id}
              })">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRule(scope.row.id)">删除</el-button>
            <el-button
              size="mini"
              v-if="scope.row.child_count > 0"
              @click="jump({
                name: 'permission.rule.list',
                params: {pid: scope.row.id}
              })">查看下级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // loading
        loading: false,
        // 列表数据
        tableData: [],
        pid: 0,
        typeDesc: {
          1: '菜单',
          2: '路由类的功能性按钮',
          3: '非路由类的功能性按钮',
          4: '展示类权限'
        }
      }
    },
    watch: {
      $route (route) {
        this.pid = 0
        if (this.$route.params.pid) {
          this.pid = Number(this.$route.params.pid)
        }
        this.getData()
      }
    },
    methods: {
      /**
       * 删除权限
       */
      deleteRule (id) {
        this.$confirm('您正在进行危险操作！请确认是否继续删除?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLoading()
          this
            .$api
            .rule
            .deleteRules(id)
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
       * 复制成功回调
       */
      onCopySuccess () {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      },
      /**
       *  复制失败回调
       */
      onCopyError (e) {
        this.$alert(e.text, '复制失败！请您手动复制下面的文本。', {
          confirmButtonText: '关闭',
          callback: action => {}
        })
      },
      /**
       * 获取列表数据
       */
      getData () {
        this.loading = true
        this
          .$api
          .rule
          .getListByPid(this.pid)
          .then(r => {
            this.loading = false
            this.tableData = r
            if (this.pid > 0 && this.tableData.length < 1) {
              this.jump(-1)
            }
          })
          .catch(e => {
            this.loading = false
          })
      }
    },
    created () {
      if (this.$route.params.pid) {
        this.pid = Number(this.$route.params.pid)
      }
      this.getData()
    }
  }
</script>
<style scoped lang="sass">
  .pages
    margin-top: 1rem
</style>
