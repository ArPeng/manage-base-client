<template>
  <div class="main" @keyup.enter="submit">
    <!--<el-row>-->
      <!--<el-col :span="8" :offset="3">-->
        <!--<el-alert-->
          <!--title="注意: 手机号码和邮箱请至少填写一个,密码有8位以上的数组和字母组成(可包含'_'且不区分大小写)。邮箱或手机号可用作登录使用。"-->
          <!--type="info"-->
          <!--show-icon></el-alert>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="父级" label-width="120px">
            <el-select
              v-model.trim="createData.pid"
              v-loading="parentLoading"
              placeholder="请选择">
              <el-option
                :key="0"
                label="├ 无父级"
                :value="0"></el-option>
              <create-infinite :items="rules"></create-infinite>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" label-width="120px">
            <el-select
              v-model.trim="createData.type"
              placeholder="权限类型,必选"
              :change-on-select="true">
              <el-option :key="1" label="菜单" :value="1"></el-option>
              <el-option :key="2" label="路由类的功能性按钮" :value="2"></el-option>
              <el-option :key="3" label="非路由类的功能性按钮" :value="3"></el-option>
              <el-option :key="4" label="展示类权限" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限名称" label-width="120px">
            <el-input v-model.trim="createData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" label-width="120px">
            <el-input v-model.trim="createData.identification" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="路由地址" label-width="120px">
            <el-input v-model.trim="createData.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字体图标" label-width="120px">
            <el-input v-model.trim="createData.icon_class" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标Family" label-width="120px">
            <el-input v-model.trim="createData.icon_family" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="120px">
            <el-button
              type="primary"
              @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import MaterialInput from '@components/material/materialInput'
  import createInfinite from '@components/createInfinite.vue'
  export default {
    components: {
      MaterialInput,
      createInfinite
    },
    data () {
      return {
        parentLoading: true,
        createData: {
          pid: '',
          type: '',
          name: '',
          address: '',
          identification: '',
          icon_family: '',
          icon_class: ''
        },
        rules: []
      }
    },
    methods: {
      submit () {
        this
          .$api
          .rule
          .create(this.createData)
          .then(r => {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.jump(-1)
          })
      }
    },
    created () {
      this
        .$api
        .rule
        .infinite()
        .then(r => {
          this.parentLoading = false
          this.rules = r
          console.log(this.rules)
        }).catch(r => {
          this.parentLoading = false
        })
      if (this.$route.params.pid) {
        this.createData.pid = this.$route.params.pid
      }
    }
  }
</script>
<style scoped lang="sass">
  .field
    width: 100%
    text-align: right
    padding: 36px 1rem 0 0
    color: #666
  .buttons
    width: 100%
    margin-top: 3rem
    display: flex
    flex-direction: row-reverse
  .el-row
    height: 65px
  .mt
    margin-top: 25px
</style>
