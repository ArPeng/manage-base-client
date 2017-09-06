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
      <div class="box">
        <div class="box-header"></div>
        <div class="box-body">
          <mu-text-field
            icon=" "
            iconClass="an-mall-font icon-username"
            label="手机号码/用户名"
            labelFloat
            fullWidth/>
          <mu-text-field
            icon=" "
            iconClass="an-mall-font icon-password"
            labelFocusClass="label-focus-class"
            label="密码"
            labelFloat
            fullWidth/>
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
        item: 0
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
