<template>
  <div class="body"
       @keyup.enter="submit">
    <div class="slider">
      <div class="slider-item">
        <template v-for="(img,i) in images">
          <transition name="fade">
            <img :src="img" v-show="i === item">
            <!--<img :src="img">-->
          </transition>
        </template>
      </div>
    </div>
    <div class="content">
      <div class="box">
        <div class="box-header">
          <span class="title">{{$lang('管理系统-登录')}}</span>
        </div>
        <div class="box-body">
          <mu-text-field
            icon=" "
            iconClass="an-mall-icon icon-username"
            :label="$lang('手机号码/邮箱')"
            labelFloat
            v-model="sign"
            fullWidth/>
          <mu-text-field
            icon=" "
            iconClass="an-mall-icon icon-password"
            labelFocusClass="label-focus-class"
            :label="$lang('密码')"
            labelFloat
            type="password"
            v-model="password"
            fullWidth/>
          <div class="buttons">
            <mu-raised-button
              @click="submit"
              class="mall-btn-success"
              :label="$lang('登录')"
              :disabled="loading"
              labelPosition="before">
              <mu-circular-progress
                v-show="loading"
                color="#888888"
                :size="22"/>
              <mu-icon
                v-show="!loading"
                value="keyboard_return"></mu-icon>
            </mu-raised-button>
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
        token: this.getToken(),
        sign: '',
        password: '',
        images: [
          require('@assets/signIn/sign_in_1.jpg'),
          require('@assets/signIn/sign_in_2.jpg'),
          require('@assets/signIn/sign_in_3.jpg'),
          require('@assets/signIn/sign_in_4.jpg'),
          require('@assets/signIn/sign_in_5.jpg'),
          require('@assets/signIn/sign_in_6.jpg'),
          require('@assets/signIn/sign_in_7.jpg')
        ],
        item: 0,
        loading: false
      }
    },
    methods: {
      slider () {
        setInterval(() => {
          if (this.item < (this.images.length - 1)) {
            this.item++
          } else {
            this.item = 0
          }
        }, 10000)
      },
      submit () {
        if (!this.sign) {
          this.$utils.toast(
            this.$lang('手机号码或邮箱不能为空!'))
          return false
        }
        /*eslint-disable */
        if (!(/^1[3|4|5|6|7|8]\d{9}$/).test(this.sign) &&
        !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
          .test(this.sign)) {
          this.$utils.toast(
            this.$lang('手机号码或邮箱格式错误!'))
          return false
        }
        /*eslint-enable */
        if (!this.password) {
          this.$utils.toast(
            this.$lang('密码不能为空!'))
          return false
        }
        this.loading = true
        this
          .$api
          .sign
          .signByPassword(this.sign, this.password)
          .then(r => {
            this.loading = true
            this.setToken(r.token)
            this.$utils.toast(
              this.$lang('登录成功, 马上跳转...!'),
              2,
              () => {
                this.$router.push('/dashboard')
              })
          }).catch(() => {
            this.loading = false
          })
      }
    },
    created () {
      this.slider()

      // 进入该页面自动清除token
      if (this.token) {
        // 如果cookie存在,则通知服务端清除cookie
        this
          .$api
          .sign
          .clearToken()
          .then(() => {
            this.clearToken()
          })
      }

//      if (this.token) {
//        this.$utils.loading()
//        this
//          .$api
//          .sign
//          .verificationToken()
//          .then(r => {
//            if (r.status === 10000) {
//              this.jump({name: 'dashboard'})
//            }
//          })
//      }
    }
  }
</script>
<style lang="stylus" scoped src="@styl/sign/signIn.styl"> </style>
