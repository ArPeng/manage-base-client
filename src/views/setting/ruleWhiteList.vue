<template>
  <div class="main">
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="
        dialogName = '新增白名单';
        action = 2;
        showDialog = true;
        name = '';
        identification = '';"
      v-if="auth('setting.rules.white_list.create')"
      size="small">添加</el-button>
    <template>
      <el-table
        style="width: 100%"
        v-loading="loading"
        :data="tableData">
        <el-table-column
          label="权限名称">
            <template  slot-scope="scope">
              <span>{{scope.row.name}}</span>
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
          <template  slot-scope="scope">
            <el-button
              size="little"
              @click="edit(scope);"
              v-if="auth('setting.rules.white_list.update')">编辑</el-button>
            <el-button
              type="danger"
              @click="deleteItem(scope)"
              v-if="auth('setting.rules.white_list.delete')"
              size="little">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog :title="dialogName" :visible.sync="showDialog">
        <div @keyup.enter="submit">
          <el-form>
            <el-form-item label="权限名称" label-width="120px">
              <el-input v-model="name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限唯一标识" label-width="120px">
              <el-input v-model="identification" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogName: '',
        action: 1, // 1:修改, 2: 添加
        showDialog: false,
        name: '',
        identification: '',
        loading: false,
        tableData: [],
        updateRowData: {}
      }
    },
    methods: {
      // 提交数据
      submit () {
        if (!this.name) {
          this.$message.error('请填写权限名字')
          return false
        }
        if (!this.identification) {
          this.$message.error('请填写权限标识')
          return false
        }
        switch (this.action) {
          case 1:
            console.log(this.updateRowData.$index)
            this.tableData.splice(
              this.updateRowData.$index,
              1,
              {
                name: this.name,
                identification: this.identification
              }
            )
            break
          case 2:
            this.tableData.push({
              name: this.name,
              identification: this.identification
            })
            break
        }
        this.showLoading()
        this
          .$api
          .configure
          .setRuleWhiteList(this.tableData)
          .then(r => {
            this.showDialog = false
            this.closeLoading()
          }).catch(e => {
            this.closeLoading()
            this.showDialog = false
            this.getData()
          })
      },
      /**
       *  编辑
       */
      edit (data) {
        this.updateRowData = data
        this.action = 1
        this.dialogName = '修改白名单'
        this.showDialog = true
        this.name = data.row.name
        this.identification = data.row.identification
      },
      // 删除一条
      deleteItem (data) {
        this.$confirm('确定删除吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLoading()
          this.showDialog = false
          this.tableData.splice(data.$index, 1)
          this
            .$api
            .configure
            .setRuleWhiteList(this.tableData)
            .then(r => {
              this.closeLoading()
            }).catch(e => {
              this.closeLoading()
              this.getData()
            })
        })
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
      getData () {
        this.loading = true
        this
          .$api
          .configure
          .ruleWhiteList()
          .then(r => {
            this.loading = false
            this.tableData = r
          }).catch(e => {
            this.loading = false
          })
      }
    },
    created () {
      this.getData()
    }
  }
</script>
