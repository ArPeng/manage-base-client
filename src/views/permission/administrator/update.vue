<template>
  <div class="main" @keyup.enter="submit">
    <el-row>
      <el-col :span="8" :offset="3">
        <el-alert
          title="注意: 手机号码和邮箱请至少填写一个,密码有8位以上的数组和字母组成(可包含'_'且不区分大小写)。邮箱或密码可用作登录使用。"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          姓名
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model="name"
          :value="name"
          >{{name?name:'请输入管理员姓名'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          邮箱
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model="email"
          :value="email"
          >{{email?email:'请输入管理员邮箱'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          手机号码
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model="mobile"
          :value="mobile"
          >{{mobile?mobile:'请输入管理员手机号码'}}</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          登录密码
        </div>
      </el-col>
      <el-col :span="8">
        <material-input
          v-model="password">请输入管理员登录密码</material-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="3">
        <div class="buttons">
          <el-button type="primary" @click="submit">确认创建</el-button>
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
        name: '',
        mobile: '',
        email: '',
        password: '',
        uuid: ''
      }
    },
    methods: {
      submit () {
        let data = {
          name: this.name,
          mobile: this.mobile,
          email: this.email
        }
        if (this.password) {
          data.password = this.password
        }
        this
          .$api
          .user
          .update(this.uuid, data).then(r => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.jump(-1)
          })
      }
    },
    created () {
      if (this.$route.params.uuid) {
        this.uuid = this.$route.params.uuid
      } else {
        this.$message.error('参数错误')
        this.jump(-1)
        return false
      }
      this
        .$api
        .user
        .info(this.uuid)
        .then(r => {
          this.name = r.name
          this.mobile = r.mobile
          this.email = r.email
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
</style>
