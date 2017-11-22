<template>
  <div class="errPage-container">
    <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>若执意要去,请联系授权管理员...!</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <a href="javascript:void(0)" @click="jump({name: 'dashboard'})">控制台</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import errGif from '@assets/401_images/401.gif'
  export default {
    data () {
      return {
        errGif: errGif + '?' + +new Date()
      }
    },
    methods: {
      back () {
        if (this.$route.query.noGoBack) {
          this.jump({ path: 'dashboard' })
        } else {
          this.jump(-1)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .errPage-container
    width: 800px
    margin: 100px auto
    .pan-back-btn
      background: #008489
      color: #fff
    .pan-gif
      margin: 0 auto
      display: block
    .pan-img
      display: block
      margin: 0 auto
    .text-jumbo
      font-size: 60px
      font-weight: 700
      color: #484848
    .list-unstyled
      font-size: 14px
      li
        padding-bottom: 5px
      a
        color: #008489
        text-decoration: none
        &:hover
          text-decoration: underline
</style>
