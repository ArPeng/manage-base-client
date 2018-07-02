<template>
  <div class="main">
    <el-row>
      <el-col :span="12" :offset="3">
        <el-form label-position="left">
          <el-form-item>
            <el-input v-model.trim="customer.wechat" style="width: 250px">
              <template slot="prepend">微信号</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-button type="primary" @click="setCustomerWechat">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        customer: {
          wechat: ''
        }
      }
    },
    methods: {
      /**
       * @purpose 获取比例
       */
      getCustomerWechat () {
        this.showLoading()
        this
          .$api
          .configure
          .getCustomerWechat()
          .then(r => {
            if (r instanceof Object && typeof r.wechat !== 'undefined') {
              this.customer = r
            }
          })
      },
      /**
       * @purpose 设置比例
       */
      setCustomerWechat () {
        this.showLoading()
        this
          .$api
          .configure
          .setCustomerWechat(this.customer)
          .then(r => {
            this.toast('设置成功')
          })
      }
    },
    created () {
      this.getCustomerWechat()
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
