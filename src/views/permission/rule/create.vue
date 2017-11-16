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
        <el-cascader
          class="mt"
          :options="options2"
          @active-item-change="handleItemChange"
          :props="props"
        ></el-cascader>
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
          <el-option :key="3" label="路由类的功能性按钮" :value="3"></el-option>
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
        >权限名称将用于显示,必填</material-input>
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
        >权限名称将用于显示,必填</material-input>
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
        >默认使用标识路由,外部路由时使用,选填</material-input>
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
        >图标的class类名,选填</material-input>
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
        >默认(an-mall-icon),选填</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="3">
        <div class="buttons">
          <el-button
            type="primary"
            @click="submit">提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import MaterialInput from '@components/material/materialInput'
  export default {
    components: {
      MaterialInput
    },
    data () {
      return {
        createData: {
          pid: 0,
          type: '',
          name: '',
          address: '',
          identification: '',
          icon_family: '',
          icon_class: ''
        },
        options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props: {
          value: 'label',
          children: 'cities'
        }
      }
    },
    methods: {
      submit () {
        this.showLoading()
        this
          .$api
          .rule
          .create(this.createData)
          .then(r => {
            this.closeLoading()
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.jump({name: 'permission.rule.list'})
          })
      },
      handleItemChange (val) {
        console.log('active item:', val)
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }]
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }]
          }
        }, 300)
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
