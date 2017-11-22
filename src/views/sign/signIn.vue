<template>
  <div class="body" @keyup.enter="submit">
    <div class="slider">
      <div class="slider-item">
        <template v-for="(img,i) in images">
          <transition name="fade">
            <img :src="img" v-show="i === imgIndex">
            <!--<img :src="img">-->
          </transition>
        </template>
      </div>
    </div>
    <div class="content">
      <div class="box" ref="box">
        <div class="box-header">
          <span class="title">管理系统-登录</span>
        </div>
        <div class="box-body">
          <el-input
            v-model.trim="sign"
            placeholder="手机号码/邮箱">
            <i slot="prefix"  class="el-input__icon an-mall-icon icon-username"></i>
          </el-input>
          <el-input
            v-model.trim="password"
            type="password"
            placeholder="请输入密码">
            <i slot="prefix"  class="el-input__icon an-mall-icon icon-password"></i>
          </el-input>
          <div class="buttons">
            <el-button
              type="primary"
              @click="submit">
              登录 <i class="an-mall-icon icon-enter"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        sign: '',
        password: '',
        token: this.getToken(),
        images: [
          require('@assets/signIn/sign_in_1.jpg'),
          require('@assets/signIn/sign_in_2.jpg'),
          require('@assets/signIn/sign_in_3.jpg'),
          require('@assets/signIn/sign_in_4.jpg'),
          require('@assets/signIn/sign_in_5.jpg'),
          require('@assets/signIn/sign_in_6.jpg'),
          require('@assets/signIn/sign_in_7.jpg')
        ],
        imgIndex: 0
      }
    },
    methods: {
      submit () {
        if (!this.sign) {
          this.$message({
            message: '手机号码或邮箱不能为空',
            type: 'error'
          })
          return false
        }
        /*eslint-disable */
        if (!(/^1[3|4|5|6|7|8]\d{9}$/).test(this.sign) &&
          !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
            .test(this.sign)) {
          this.$message({
            message: '手机号码或邮箱格式错误',
            type: 'error'
          })
          return false
        }
        /*eslint-enable */
        if (!this.password) {
          this.$message({
            message: '密码不能为空!',
            type: 'error'
          })
          return false
        }
        this.showLoading(this.$refs.box)
        this
          .$api
          .sign
          .signByPassword(this.sign, this.password)
          .then(r => {
            this.closeLoading()
            this.$store.dispatch('setUserInfo', r.info)
            this.setToken(r.token)
            this.jump({
              name: 'dashboard'
            })
            this.$message({
              message: '登录成功!',
              type: 'success'
            })
          }).catch(() => {
            this.closeLoading()
          })
      },
      /**
       * 背景轮播
       */
      slider () {
        setInterval(() => {
          if (this.imgIndex < (this.images.length - 1)) {
            this.imgIndex++
          } else {
            this.imgIndex = 0
          }
        }, 10000)
      }
    },
    created () {
      if (this.token) {
        this
          .$api
          .sign
          .clearToken(() => {
            this.clearToken()
          })
      }
      this.slider()
    }
  }
</script>
<style scoped lang="sass" src="@sass/sign/signIn.sass"></style>
