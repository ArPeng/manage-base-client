<template>
  <div class="main" @keyup.enter="submit">
    <el-row>
      <el-col :span="8" :offset="3">
        <el-alert
          title="注意: 手机号码和邮箱请至少填写一个,密码有8位以上的数组和字母组成(可包含'_'且不区分大小写)。邮箱或手机号可用作登录使用。不修改密码可不填写。"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8" :offset="3">
        <el-form>
          <el-form-item label="姓名">
            <el-input v-model.trim="name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model.trim="username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model.trim="email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model.trim="mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model.trim="password" placeholder="密码不修改可不填写" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确定修改</el-button>
          </el-form-item>
        </el-form>
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
        uuid: '',
        username: ''
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
          this.username = r.username
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
