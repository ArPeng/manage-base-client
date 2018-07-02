<template>
  <div class="main">
    <el-row>
      <el-col :span="12" :offset="3">
        <el-alert
          title="提示: 代理商邀请升级的数量为邀请的一级会员数量,不包括邀请的二级会员,且有效期为1年"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="3">
        <el-form label-position="left">
          <el-form-item>
            <el-input v-model.trim="agent.invitation" type="number" style="width: 250px">
              <template slot="prepend">邀请升级</template>
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model.trim="agent.pay" type="number" style="width: 250px;">
              <template slot="prepend">付费升级</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-button type="primary" @click="setAgentUpgrade">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        agent: {
          invitation: 0,
          pay: 0
        }
      }
    },
    methods: {
      /**
       * @purpose 获取代理商升级配置
       */
      getAgentUpgrade () {
        this.showLoading()
        this
          .$api
          .configure
          .getAgentUpgrade()
          .then(r => {
            if (r instanceof Object && typeof r.invitation !== 'undefined') {
              this.agent = r
            }
          })
      },
      /**
       * @purpose 设置代理商审计配置
       */
      setAgentUpgrade () {
        if (Number(this.agent.invitation) <= 0) {
          this.toast('代理商邀请升级的一级会员数量为正整数', 'warning')
          return false
        }
        if (Number(this.agent.pay) <= 0) {
          this.toast('代理商支付升级金额应该大于0且保留两位小数', 'warning')
          return false
        }
        this.showLoading()
        this
          .$api
          .configure
          .setAgentUpgrade(this.agent)
          .then(r => {
            this.toast('设置成功')
          })
      }
    },
    created () {
      this.getAgentUpgrade()
    }
  }
</script>
<style scoped lang="sass">
  .el-col
    margin: 1rem 0 1rem 12.5%
    padding: 1rem
    background-color: #f4f4f4
    border-radius: 5px
    position: relative
</style>
