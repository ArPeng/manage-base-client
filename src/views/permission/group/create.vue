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
          <el-form-item label="名称" label-width="120px">
            <el-input v-model.trim="name" placeholder="请输入管理组名称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" label-width="120px">
            <el-input v-model.trim="descriptions" placeholder="请输入描述" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限" label-width="120px">
            <rules-tree ref="rulesTree"></rules-tree>
          </el-form-item>
          <el-form-item label-width="120px">
            <el-button type="primary" @click="submit">确认创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import rulesTree from '@components/rulesTree.vue'
  import MaterialInput from '@components/material/materialInput'
  export default {
    components: {
      MaterialInput,
      rulesTree
    },
    data () {
      return {
        showAuthorization: false,
        name: '',
        descriptions: ''
      }
    },
    methods: {
      /**
       *  删除权限
       */
      deleteRule (rule, idx) {
        this.ruleKeys =
          this.ruleKeys.filter((id) => {
            if (id === rule.id) {
              return false
            }
            return true
          })
        this.ruleNodes = this.ruleNodes.splice(idx, 1)
      },
      // 获取权限
      getRules (keys, nodes) {
        this.ruleKeys = keys
        this.ruleNodes = nodes
      },
      /**
       * 提交数据
       * @returns {boolean}
       */
      submit () {
        if (!this.name) {
          this.$message.error(this.$lang('请输入名称!'))
          return false
        }
        let rules = this.$refs.rulesTree.$refs.authorizationTree.getCheckedKeys()
        if (rules.length > 0) {
          rules = rules.join(',')
        } else {
          rules = ''
        }
        this
          .$api
          .group
          .create({
            rules: rules,
            name: this.name,
            descriptions: this.descriptions
          }).then(r => {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.jump(-1)
          })
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
</style>
