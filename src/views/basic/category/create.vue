<template>
  <div class="main" @keyup.enter="submit">
    <el-row style="margin-bottom: 3rem">
      <el-col :span="8" :offset="3">
      <el-alert
      title="注意: 分类缩略图必须是200x200的大小,且不能超过500kb,且只能是jpg格式,否则会上传失败!"
      type="info"
      show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          缩略图
        </div>
      </el-col>
      <el-col :span="8">
        <div class="thumb" @click="showUpload = true">
          <img :src="img">
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px">
      <el-col :span="3">
        <div class="field">
          父级
        </div>
      </el-col>
      <el-col :span="4">
        <el-select
          style="margin-top: 25px"
          v-model.trim="pid"
          v-loading="parentLoading"
          class="mt"
          placeholder="请选择">
          <el-option
            :key="0"
            label="├ 无父级"
            :value="0"></el-option>
          <create-infinite :items="categorys"></create-infinite>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          名称
        </div>
      </el-col>
      <el-col :span="8">
        <material-input v-model.trim="name">分类名称</material-input>
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
      @image="image => {thumb = image; img = imageUrl + thumb}"
      :show.sync="showUpload"></ui-upload>
  </div>
</template>
<script>
  import config from '@config'
  import uiUpload from '@components/upload'
  import MaterialInput from '@components/material/materialInput'
  import createInfinite from '@components/createInfinite.vue'
  export default {
    components: {
      MaterialInput,
      uiUpload,
      createInfinite
    },
    data () {
      return {
        parentLoading: true,
        categorys: [],
        imageUrl: config.imageUrl,
        name: '',
        img: require('@assets/upload.png'),
        thumb: '',
        showUpload: false,
        pid: 0
      }
    },
    methods: {
      /**
       * 提交数据
       * @returns {boolean}
       */
      submit () {
        if (!this.name) {
          this.toast('请输入分类名称!', 'warning')
          return false
        }
        if (!this.thumb) {
          this.toast('请上传分类缩略图!', 'warning')
          return false
        }
        this.showLoading()
        this
          .$api
          .category
          .create(this.name, this.thumb, this.pid)
          .then(r => {
            this.closeLoading()
            if (r.code === 10000) {
              this.toast('添加成功', () => {
                this.jump({name: 'basic.category.items'})
              })
              return false
            }
            this.toast(r.message, 'error')
          })
      }
    },
    created () {
      this
        .$api
        .category
        .infinite()
        .then(r => {
          this.parentLoading = false
          this.categorys = r
        }).catch(r => {
          this.parentLoading = false
        })
      if (this.$route.params.pid) {
        this.pid = this.$route.params.pid
      }
    }
  }
</script>
<style scoped lang="sass">
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
