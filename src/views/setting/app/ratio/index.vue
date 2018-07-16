<template>
  <div class="main">
    <el-row>
      <el-col :span="12" :offset="3">
        <el-alert
          title="提示: 如果商品设置了单独的分成比例,则此处的比例失效"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="3">
        <el-form label-position="left" label-width="100px">
          <el-form-item  label="系统分销状态">
            <el-switch
            v-model="ratio.switch"
            :inactive-text="ratio.switch ? '开启' : '关闭'"
            :active-text="ratio.switch ? '开启' : '关闭'">
            </el-switch>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="3">
        <el-form label-position="left">
          <el-form-item>
            <el-input v-model.trim="ratio.member.first" style="width: 250px">
              <template slot="prepend">上级会员</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model.trim="ratio.member.second" style="width: 250px;">
              <template slot="prepend">上上级会员</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="3">
        <el-form label-position="left">
          <el-form-item>
            <el-input v-model.trim="ratio.agent.first" style="width: 250px">
              <template slot="prepend">上级代理商</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model.trim="ratio.agent.second" style="width: 250px;">
              <template slot="prepend">上上级代理商</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="3">
        <el-form label-position="left">
          <el-form-item>
            <el-input v-model.trim="ratio.purchase_agent_member.first" style="width: 400px">
              <template slot="prepend">购买代理商上级会员</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model.trim="ratio.purchase_agent_member.second" style="width: 400px;">
              <template slot="prepend">购买代理商上上级会员</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="3">
        <el-form label-position="left">
          <el-form-item>
            <el-input v-model.trim="ratio.purchase_agent_agent.first" style="width: 400px">
              <template slot="prepend">购买代理商上级代理商</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model.trim="ratio.purchase_agent_agent.second" style="width: 400px;">
              <template slot="prepend">购买代理商上上级代理商</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-button type="primary" @click="setDistributionRatio">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ratio: {
        switch: false,
        member: {
          first: 0,
          second: 0
        },
        agent: {
          first: 0,
          second: 0
        },
        purchase_agent_member: {
          first: 0,
          second: 0
        },
        purchase_agent_agent: {
          first: 0,
          second: 0
        }
      }
    }
  },
  methods: {
    /**
     * @purpose 获取比例
     */
    getDistributionRatio () {
      this.showLoading()
      this
        .$api
        .configure
        .getDistributionRatio()
        .then(r => {
          if (r instanceof Object && typeof r.switch !== 'undefined') {
            this.ratio = r
          }
        })
    },
    /**
     * @purpose 设置比例
     */
    setDistributionRatio () {
      if (Number(this.ratio.member.first) <= 0) {
        this.toast('请设置一级普通会员的提成比例, 范围0-100,不包括0', 'warning')
        return false
      }
      if (Number(this.ratio.member.second) <= 0) {
        this.toast('请设置二级级普通会员的提成比例, 范围0-100,不包括0', 'warning')
        return false
      }
      if (Number(this.ratio.agent.first) <= 0) {
        this.toast('请设置一级代理商的提成比例, 范围0-100,不包括0', 'warning')
        return false
      }
      if (Number(this.ratio.agent.second) <= 0) {
        this.toast('请设置二级代理商的提成比例, 范围0-100,不包括0', 'warning')
        return false
      }
      this.showLoading()
      this
        .$api
        .configure
        .setDistributionRatio(this.ratio)
        .then(r => {
          this.toast('设置成功')
        })
    }
  },
  created () {
    this.getDistributionRatio()
  }
}
</script>
<style scoped lang="sass">
  .el-col
    margin: 1rem 0 1rem 12.5%
    padding: 1rem
    background-color: #ffffff
    border-radius: 5px
    position: relative
</style>
