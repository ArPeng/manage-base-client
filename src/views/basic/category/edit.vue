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
          <img :src="imageUrl + item.thumb" :onerror="'this.src=\''+require('@assets/upload.png')+'\''">
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
          v-model.trim="item.pid"
          v-loading="parentLoading"
          class="mt"
          placeholder="请选择">
          <el-option
            :key="0"
            label="├ 无父级"
            :value="0"></el-option>
          <create-infinite :this-id="item.id" :items="categorys"></create-infinite>
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
        <material-input v-model.trim="item.name">{{item.name}}</material-input>
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
      @image="image => {item.thumb = image;}"
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
        showUpload: false,
        item: {},
        id: 0
      }
    },
    methods: {
      /**
       * 提交数据
       * @returns {boolean}
       */
      submit () {
        if (!this.item.name) {
          this.toast('请输入分类名称!', 'warning')
          return false
        }
        if (!this.item.thumb) {
          this.toast('请上传分类缩略图!', 'warning')
          return false
        }
        this.showLoading()
        this
          .$api
          .category
          .updateById(this.item)
          .then(r => {
            this.closeLoading()
            if (r.code === 10000) {
              this.toast('修改成功', () => {
                this.jump(-1)
              })
              return false
            }
            this.toast(r.message, 'error')
          })
      }
    },
    created () {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      }
      this.showLoading()
      this
        .$api
        .category
        .infoById(this.id)
        .then(r => {
          this.item = r
        })
      this
        .$api
        .category
        .infinite(this.id)
        .then(r => {
          this.parentLoading = false
          this.categorys = r
        }).catch(r => {
          this.parentLoading = false
        })
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
