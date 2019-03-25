<template>
  <div class="upload">
  </div>
</template>

<script>
  // import BMF from 'browser-md5-file'
  // const bmf = new BMF()
  export default {
    name: 'vue-upload',
    props: {
      auto: {
        type: Boolean,
        default: true
      },
      dnd: {
        type: String,
        default: '#dndArea'
      },
      accept: {
        type: String,
        default: 'mp4,flv,mkv,avi,rmvb'
      },
      // 上传地址
      url: {
        type: String,
        default: ''
      },
      // 上传最大数量 默认为100
      fileNumLimit: {
        type: Number,
        default: 100
      },
      chunkSize: {
        type: Number,
        default: 5
      },
      // 上传时传给后端的参数，一般为token，key等
      formData: {
        type: Object,
        default: null
      },
      // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
      keyGenerator: {
        type: Function,
        default (file) {
          const currentTime = new Date().getTime()
          const key = `${currentTime}.${file.name}`
          return key
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      // 上传按钮ID
      uploadButton: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        uploader: null
      }
    },
    mounted () {
      this.initWebUpload()
    },
    methods: {
    }
  }
</script>

<style lang="sass" scoped>
  .webuploader-container
    position: relative
  .webuploader-element-invisible
    position: absolute !important
    clip: rect(1px 1px 1px 1px) /* IE6, IE7 */
    clip: rect(1px,1px,1px,1px)
  .webuploader-pick
    position: relative
    display: inline-block
    cursor: pointer
    background: #00b7ee
    padding: 10px 15px
    color: #fff
    text-align: center
    border-radius: 3px
    overflow: hidden
  .webuploader-pick-hover
    background: #00a2d4
  .webuploader-pick-disable
    opacity: 0.6
    pointer-events: none
</style>
