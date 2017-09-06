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
            iconClass="an-mall-font icon-username"
            :label="$lang('手机号码/用户名')"
            labelFloat
            fullWidth/>
          <mu-text-field
            icon=" "
            iconClass="an-mall-font icon-password"
            labelFocusClass="label-focus-class"
            :label="$lang('密码')"
            labelFloat
            fullWidth/>
          <div class="buttons">
            <mu-raised-button
              @click="submit"
              class="mall-btn-success"
              :label="$lang('登录')"
              :disabled="loading"
              labelPosition="before"
            >
              <mu-circular-progress
                v-show="loading"
                color="#888888"
                :size="26"/>
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
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    },
    created () {
      this.slider()
    },
    mounted () {
    }
  }
</script>
<style lang="stylus" scoped src="@styl/sign/signIn.styl"> </style>
