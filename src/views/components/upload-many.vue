<template>
  <el-dialog
    title="图片上传"
    :visible.sync="selfShow"
    :close-on-click-modal="false"
    width="80%"
    top="1rem"
    style="z-index: 100">
    <el-tabs v-model="tabActive" type="card">
      <el-tab-pane label="上传" name="upload">
        <div class="content">
          <div class="upload-box">
            <el-upload
              :headers="{
          token: getToken()
          }"
              class="uploader"
              :action="api"
              :before-upload="beforeUpload"
              :on-change="onChange"
              :on-success="onSuccess"
              :close-on-click-modal="false"
              :on-error="onError"
              :auto-upload="false"
              :show-file-list="false"
              ref="upload"
              drag
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击添加</em></div>
            </el-upload>
          </div>
          <div class="images">
            <template v-for="(image, idx) in images">
              <div
                class="img"
                @click="selected(image, idx)"
                :class="{success: image.status === 'success'}"
                :key="'image-' + idx">
                <div
                  class="v-font selected"
                  v-if="image.selected">&#xe650;</div>
                <div class="v-font delete" @click="deleteImg(idx)">&#xe621;</div>
                <img v-if="image.status !== 'success'" :src="image.url" >
                <img v-else :src="cutImg(image.response.data.data.info.url)" >
                <div class="ready" v-if="image.status === 'ready'">待上传</div>
                <div class="success" v-if="image.status === 'success'">
                  <img :src="require('@assets/success.png')">
                </div>
                <div
                  v-if="image.percentage === 100 && image.status === 'uploading'"
                  class="action">
                  <img :src="require('@assets/loading.gif')" style="width: 15px;height: 15px">
                  <span style="margin-left: 1rem; color: #ffffff">上传成功,处理中...</span>
                </div>
                <div
                  class="process"
                  v-if="image.percentage > 0 && image.percentage < 100 && image.status === 'uploading'">
                  <div class="process-bar" :style="{
                width: image.percentage + '%'
              }"></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图库" name="album">
        <div class="album-box">
          <ui-album
            @images="images => {selectImages = images}"
            :show="tabActive === 'album'"></ui-album>
        </div>
      </el-tab-pane>
    </el-tabs>
    <template v-if="tabActive === 'upload'">
      <span slot="footer" class="dialog-footer">
        <el-button @click="selfShow = false">关 闭</el-button>
        <el-button
          type="success"
          @click="startUpload" :disabled="disabledUpload">开始上传</el-button>
        <el-button @click="selectedAll">全 选</el-button>
        <el-button type="primary" @click="submit" :disabled="disabledSubmit">确 定</el-button>
      </span>
    </template>
    <template v-if="tabActive === 'album'">
      <span slot="footer" class="dialog-footer">
        <el-button @click="selfShow = false">关 闭</el-button>
        <el-button type="primary" @click="selectedSubmit" :disabled="selectImages.length <= 0">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import _ from 'lodash'
import config from '@config'

import uiAlbum from '@components/album'
export default {
  components: {
    uiAlbum
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: '/api/upload.thumb'
    }
  },
  data () {
    return {
      selfShow: false,
      disabledSubmit: true,
      disabledUpload: true,
      tabActive: 'upload',
      selectImages: [],
      images: []
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.selfShow = val
      }
    },
    selfShow (val) {
      if (!val) {
        this.images = []
        this.selectImages = []
        this.$refs.upload.uploadFiles = []
        this.$emit('update:show', false)
      }
    },
    images () {
      this.disabledUpload = !this.images.some(item => {
        return item.status === 'ready'
      })
      this.disabledSubmit = this.images.every(item => {
        return !item.selected
      })
    },
    '$refs.upload.uploadFiles' (files) {
    }
  },
  methods: {
    selectedSubmit () {
      this.$emit('images', this.selectImages)
      this.selfShow = false
    },
    /**
     * 提交
     */
    submit () {
      if (this.disabledSubmit) {
        return false
      }
      let images = []
      this.images.map(item => {
        if (item.status === 'success' && item.selected) {
          images.push(_.replace(item.response.data.data.info.url, config.imageUrl, '/'))
        }
      })
      if (images.length < 1) {
        this.toast('请至少选择一个上传成功的图片...!', 'warning')
        return false
      }
      this.$emit('images', images)
      this.selfShow = false
    },
    /**
     *  全选
     */
    selectedAll () {
      this.images = this.images.map(item => {
        if (item.status === 'success') {
          item.selected = true
        }
        return item
      })
    },
    /**
     * 选中已经上传成功的图片
     */
    selected (image, idx) {
      console.log(idx)
      if (image.status === 'success') {
        this.images = this.images.map((item, _idx) => {
          if (idx === _idx) {
            item.selected = !item.selected
          }
          return item
        })
      }
    },
    /**
     *  删除
     */
    deleteImg (idx) {
      this.images = this.images.filter((item, _idx) => {
        return idx !== _idx
      })
      this.$refs.upload.uploadFiles = this
        .$refs.upload.uploadFiles.filter((item, _idx) => {
          return idx !== _idx
        })
    },
    /**
     *  开始上传
     */
    startUpload () {
      this.$refs.upload.submit()
    },
    /**
     * @purpose 检测文件是否已经在上传队列中,如果在则不进行上传
     * @param file
     * @returns {boolean}
     */
    beforeUpload (file) {
      return true
    },
    // 服务器响应成功的回调
    onSuccess (response, file, fileList) {
    },
    // 选择文件完成时的回调
    onChange (file, fileList) {
      this.$refs.upload.uploadFiles = _.unionBy(this.$refs.upload.uploadFiles, 'name')
      this.$refs.upload.uploadFiles =
        this.$refs.upload.uploadFiles.map(item => {
          item.selected = false
          return item
        })
      this.images = this.$refs.upload.uploadFiles
    },
    // 上传失败的回调
    onError (error, file, fileList) {
      console.log(error)
    }
  },
  mounted () {
  }
}
</script>
<style lang="sass">
  .content,.album-box
    width: 100%
    height: 600px
    display: flex
    .images
      flex: 1
      height: 100%
      overflow-x: hidden
      overflow-y: auto
      .img
        width: 180px
        height: 180px
        margin: 0 0 10px 10px
        float: left
        position: relative
        box-shadow: 0 0 5px #cccccc
        &.success
          cursor: pointer
        .selected
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          display: flex
          align-items: center
          justify-content: center
          font-size: 2rem
          background-color: rgba(0,0,0,0.3)
          color: #09bb07
        .delete
          width: 30px
          height: 30px
          position: absolute
          top: 0
          right: 0
          display: none
          align-items: center
          justify-content: center
          font-size: 1rem
          cursor: pointer
          color: #ffffff
          background-color: red
        &:hover
          .delete
            display: flex
        .success
          width: 50px
          height: 50px
          position: absolute
          bottom: 0
          right: 0
          img
            width: 100%
            height: 100%
        .ready
          width: 50px
          height: 30px
          background-color: orange
          display: flex
          align-items: center
          justify-content: center
          color: #ffffff
          font-size: .8rem
          position: absolute
          bottom: 0
          right: 0
        .action
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          background-color: rgba(0,0,0,0.7)
          display: flex
          align-items: center
          justify-content: center
        .process
          width: 100%
          height: 1rem
          background-color: rgba(255,255,255, .8)
          position: absolute
          left: 0
          bottom: 0
          .process-bar
            height: 100%
            width: 50%
            position: absolute
            left: 0
            top: 0
            background-color: #409EFF
        img
          width: 100%
          height: 100%
    .upload-box
      width: 250px
      height: 250px
      .uploader
        width: 100%
        height: 100%
        border: none !important
        .el-upload-dragger
          width: 100%
          height: 100%
          border-radius: 0
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          .el-icon-upload
            margin: 0
          .el-upload__text
            margin-top: 1rem
        .el-upload
          border-radius: 6px
          cursor: pointer
          position: relative
          overflow: hidden
          width: 100%
          height: 100%
</style>
