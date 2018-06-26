<template>
  <el-dialog
    :title="'请上传'+limitWidth+'×'+limitHeight+'的图片'"
    :visible.sync="selfShow"
    :close-on-click-modal="false"
    style="z-index: 100"
    :width="(limitWidth + 40) + 'px'">
      <el-upload
        :headers="{
          token: getToken(),
          'limit-width': limitWidth,
          'limit-height': limitHeight,
          'limit-size': limitSize
        }"
        class="uploader"
        :class="uploadStatus"
        :style="{
          width: limitWidth + 'px',
          height: limitHeight + 'px',
        }"
        action="/api/upload.thumb"
        :before-upload="beforeUpload"
        :on-change="onChange"
        :on-success="onSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :show-file-list="false">
        <div class="success">上传成功</div>
        <div class="error">{{errorMessage}}</div>
        <img class="img" v-if="imageUrl" :src="imageUrl" alt="">
        <i class="el-icon-plus uploader-icon" v-else></i>
        <div class="progress" v-if="percent > 0">
          <el-progress type="circle" :percentage="percent"></el-progress>
        </div>
      </el-upload>
    <span slot="footer" class="dialog-footer">
    <el-button @click="selfShow = false">取 消</el-button>
    <el-button type="primary" @click="submit" :disabled="disabledSubmit">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    limitWidth: {
      type: Number,
      default: 0
    },
    limitHeight: {
      type: Number,
      default: 0
    },
    limitSize: {
      type: Number,
      default: 2048 // 最大上传大小默认为 2040kb (2m)
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
        this.imageUrl = ''
        this.image = ''
        this.disabledSubmit = true
        this.percent = 0
        this.uploadStatus = ''
        this.$emit('update:show', val)
      }
    }
  },
  data () {
    return {
      selfShow: false,
      imageUrl: '',
      image: '',
      disabledSubmit: true,
      percent: 0,
      uploadStatus: '',
      errorMessage: '上传失败'
    }
  },
  methods: {
    submit () {
      this.$emit('image', this.image)
      this.selfShow = false
    },
    // 上传前的回调
    beforeUpload (file) {
      console.log(file)
    },
    // 服务器响应成功的回调
    onSuccess (response, file, fileList) {
      if (response.code !== 10000) {
        this.errorMessage = response.message
        this.imageUrl = ''
        this.image = ''
        this.disabledSubmit = true
        this.percent = 0
        this.uploadStatus = 'upload-error'
        this.toast(response.message, 'error')
        return false
      }
      this.percent = 0
      this.disabledSubmit = false
      this.image = response.data.url
      this.uploadStatus = 'upload-success'
    },
    // 选择文件完成时的回调
    onChange (file, fileList) {
      // this.disabledSubmit = true
      this.imageUrl = file.url
      // let ext = file.name.split('.')
      // ext = ext[1]
    },
    // 上传时的回调
    onProgress (e) {
      this.percent = Number(e.percent).toFixed(2)
    },
    // 上传失败的回调
    onError (error, file, fileList) {
      this.imageUrl = ''
      this.image = ''
      this.disabledSubmit = true
      this.percent = 0
      this.uploadStatus = ''
      this.toast('上传失败', 'error')
      console.log(error)
    }
  },
  mounted () {
  }
}
</script>
<style lang="sass">
  .uploader
    border: 1px dashed #d9d9d9
    border-radius: 5px
    position: relative
    .el-upload
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
      width: 100%
      height: 100%
      .img
        width: 100%
        height: 100%
        display: block
      .progress
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0
        background-color: rgba(255,255,255,.8)
        display: flex
        align-items: center
        justify-content: center
    .success,.error
      width: 100%
      padding: 10px
      background-color: #09bb07
      color: #ffffff
      text-align: center
      display: none
      position: absolute
      top: 0
      left: 0
      z-index: 99
    .error
      background-color: #ff4700
    &.upload-error
      .error
        display: block
    &.upload-success
      .success
        display: block
    &:hover
      border-color: #409EFF
  .uploader-icon
    font-size: 28px
    color: #8c939d
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
</style>
