<template>
  <div class="body">
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
      <mu-row class="sign-box">
        <mu-col
          class="sign-content"
          width="100"
          tablet="50"
          desktop="33">
          <mu-appbar
            :title="$lang('登录-AnMall')"></mu-appbar>
          <div class="sign-input">
            <mu-text-field
              :label="$lang('用户名')"
              :hintText="$lang('请输入用户名')"
              type="text"
              labelFloat
              fullWidth/>
          </div>
          <div class="sign-input">
            <mu-text-field
              :label="$lang('密码')"
              :hintText="$lang('请输入密码')"
              type="password"
              labelFloat
              fullWidth/>
          </div>
          <div class="sign-buttons">
            <mu-raised-button
              class="demo-raised-button"
              :label="loading ?'':$lang('登录')"
              :disabled="loading"
              @click="submit"
              primary>
              <mu-circular-progress v-if="loading" :size="25"/>
            </mu-raised-button>
          </div>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        images: [
          '/static/images/signIn/sign_in_1.jpg',
          '/static/images/signIn/sign_in_2.jpg',
          '/static/images/signIn/sign_in_3.jpg',
          '/static/images/signIn/sign_in_4.jpg',
          '/static/images/signIn/sign_in_5.jpg',
          '/static/images/signIn/sign_in_6.jpg',
          '/static/images/signIn/sign_in_7.jpg'
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
        }, 4000)
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
      let inputs = document.getElementsByTagName('input')
      for (let i in inputs) {
        console.log(inputs[i], inputs.hasOwnProperty(inputs[i]))
      }
    }
  }
</script>
<style lang="stylus" scoped src="@styl/modules/sign/sign_in.styl"> </style>
