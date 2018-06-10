<template>
  <div class="main">
    <el-row style="margin-bottom: 3rem">
      <el-col :span="8" :offset="3">
        <el-alert
          title="注意: 品牌LOGO必须是200x200的大小,且不能超过500kb,且只能是jpg格式,否则会上传失败!"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          品牌LOGO
        </div>
      </el-col>
      <el-col :span="8">
        <div class="thumb" @click="showUpload = true">
          <img :src="img">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          品牌中文名
        </div>
      </el-col>
      <el-col :span="8">
        <el-input v-model.trim="brand.name"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          品牌英文名
        </div>
      </el-col>
      <el-col :span="8">
        <el-input v-model.trim="brand.english"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="3">
        <div class="buttons">
          <el-button type="primary" @click="submit">确认创建</el-button>
        </div>
      </el-col>
    </el-row>
    <ui-upload
      :limit-width="200"
      :limit-height="200"
      :limit-size="500"
      @image="image => {brand.thumb = image; img = imageUrl + brand.thumb}"
      :show.sync="showUpload"></ui-upload>
  </div>
</template>
<script>
  import config from '@config'
  import uiUpload from '@components/upload'
  import MaterialInput from '@components/material/materialInput'
  export default {
    components: {
      MaterialInput,
      uiUpload
    },
    data () {
      return {
        imageUrl: config.imageUrl,
        img: require('@assets/upload.png'),
        thumb: '',
        showUpload: false,
        brand: {
          thumb: '',
          title: '',
          english: '',
          id: ''
        }
      }
    },
    watch: {
      'brand.thumb' (thumb) {
        this.img = this.imageUrl + thumb
      }
    },
    methods: {
      /**
       * 提交数据
       * @returns {boolean}
       */
      submit () {
        if (!this.brand.name) {
          this.toast('请输入品牌LOGO!', 'warning')
          return false
        }
        if (!this.brand.thumb) {
          this.toast('请上传品牌缩略图!', 'warning')
          return false
        }
        if (!this.brand.english) {
          this.toast('请输入品牌英文名称!', 'warning')
          return false
        }
        this.showLoading()
        this
          .$api
          .brand
          .edit(this.brand)
          .then(r => {
            this.closeLoading()
            this.toast('添加成功', () => {
              this.jump(-1)
            })
          })
      }
    },
    created () {
      this.brand.id = this.$route.params.id
      this
        .$api
        .brand
        .infoById(this.brand.id)
        .then(r => {
          this.brand = r
        })
    }
  }
</script>
<style scoped lang="sass">
  .el-row
    display: flex
    align-items: center
    padding: 1rem 0
  .thumb
    width: 100px
    height: 100px
    background-color: #ebebeb
    cursor: pointer
    border-radius: 5px
    &:hover
      background-color: #f4f4f4
    > img
      width: 100%
      height: 100%
      border-radius: 5px
  .field
    text-align: right
    margin-right: 2rem
    color: #888888
  .buttons
    width: 100%
    margin-top: 3rem
    display: flex
    flex-direction: row-reverse
</style>
