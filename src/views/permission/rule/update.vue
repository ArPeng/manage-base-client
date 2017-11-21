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
      <el-col :span="3">
        <div class="field">
          父级
        </div>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model.trim="createData.pid"
          v-loading="parentLoading"
          class="mt"
          placeholder="请选择">
          <el-option
            :key="0"
            label="├ 无父级"
            :value="0"></el-option>
          <create-infinite :this-id="Number(createData.id)" :items="rules"></create-infinite>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          类型
        </div>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model.trim="createData.type"
          class="mt"
          placeholder="权限类型,必选"
          :change-on-select="true">
          <el-option :key="1" label="菜单" :value="1"></el-option>
          <el-option :key="2" label="路由类的功能性按钮" :value="2"></el-option>
          <el-option :key="3" label="非路由类的功能性按钮" :value="3"></el-option>
          <el-option :key="4" label="展示类权限" :value="4"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          权限名称
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model.trim="createData.name"
        >{{createData.name ?createData.name:'权限名称将用于显示,必填'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          权限标识
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model.trim="createData.identification"
        >{{createData.identification?createData.identification:'权限名称将用于显示,必填'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          路由地址
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model.trim.trim="createData.address"
        >{{createData.address?createData.address:'默认使用标识路由,外部路由时使用,选填'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          字体图标
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model.trim="createData.icon_class"
        >{{createData.icon_class?createData.icon_class:'图标的class类名,选填'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          图标Family
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model.trim="createData.icon_family"
        >{{createData.icon_family?createData.icon_family:'默认(an-mall-icon),选填'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="3">
        <div class="buttons">
          <el-button
            type="primary"
            @click="submit">确认修改</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import MaterialInput from '@components/material/materialInput'
  import createInfinite from './createInfinite.vue'
  export default {
    components: {
      MaterialInput,
      createInfinite
    },
    data () {
      return {
        parentLoading: true,
        createData: {
          id: '',
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
        this.showLoading()
        this
          .$api
          .rule
          .update(this.createData)
          .then(r => {
            this.closeLoading()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.jump({name: 'permission.rule.list'})
          })
      }
    },
    created () {
      this.createData.id = this.$route.params.id
      // 获取父级分类
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
      // 获取数据
      this.showLoading()
      this
        .$api
        .rule
        .getRuleInfoById(this.createData.id)
        .then(r => {
          this.createData = r
        })
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
