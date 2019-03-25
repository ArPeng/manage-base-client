<template>
  <div class="page">
    <div id="uploader">
      <div id="dndArea" class="placeholder">
        <div id="filePicker"></div>
        <p>或将视频拖到这里，单次最多可选{{fileNumLimit}}个视频</p>
      </div>
    </div>
    <div class="file-list">
      <template v-for="(file, idx) in fileList">
        <div
          class="file-item"
          :key="'file-item-' + idx"
          :class="`file-item-` + file.id">
          <div class="info">
            <div class="file-name">{{file.name}}</div>
            <div class="action">
              <div class="v-font upload-data file-icon">&#xe612;</div>
              <div class="upload-data file-size">{{fileSize(file.size)}}</div>
              <div class="upload-data percent">0%</div>
              <!--<div class="upload-data speed">5.5m/s</div>-->
              <div class="upload-data speed" style="color: green" v-show="file.actionStatus === 'success'">上传完成</div>
              <!--<div class="v-font upload-data action-btn" v-if="file.actionStatus === 'stop'" @click="start(file)">&#xe623;</div>-->
              <!--<div class="v-font upload-data action-btn" v-if="file.actionStatus === 'uploading'" @click="stop(file)">&#xe62e;</div>-->
              <div class="v-font upload-data action-btn" @click="removeFile(file)">&#xe602;</div>
            </div>
          </div>
          <div class="preparation">
            <div class="preparation-progress"></div>
          </div>
          <div class="progress"></div>
        </div>
      </template>
      <div class="no-file" v-if="!fileList.length">
        <i class="v-font icon-kwjj" style="font-size: 1.5rem"></i>&nbsp;&nbsp;暂无待上传文件
      </div>
    </div>

    <!--<ui-upload-->
      <!--uploadButton="#filePicker"-->
      <!--multiple-->
      <!--ref="uploader"-->
      <!--url=""-->
      <!--accept="mp4,flv,mkv,avi,rmvb"-->
      <!--:chunkSize="2"-->
      <!--:fileNumLimit="fileNumLimit"-->
      <!--@fileChange="fileChange"-->
      <!--@progress="onProgress"-->
      <!--@success="onSuccess"-->
    <!--&gt;</ui-upload>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileList: [],
        uploader: null,
        fileNumLimit: 100
      }
    },
    mounted () {
      this.initWebUpload()
    },
    methods: {
      initWebUpload () {
        window.WebUploader.Uploader.register({
          'before-send-file': 'beforeSendFile',
          'before-send': 'beforeSend',
          'after-send-file': 'afterSendFile'
        }, {
          beforeSendFile: (file) => {
            /* eslint-disable*/
            let deferred = new window.$.Deferred()
            let  uploader = (new window.WebUploader.Uploader())
            uploader.md5File(file, 0, file.size)
            // 及时显示进度
              .progress(percentage => {
                window.$(`.file-item-${file.id} .preparation .preparation-progress`)
                  .css('width', percentage * 100 + '%')
                if (percentage >= 0.2) {
                  window.$(`.file-item-${file.id} .preparation .preparation-progress`)
                    .text('准备中...' + '(' + (percentage * 100).toFixed(2) + '%)')
                }
                if (percentage >= 1) {
                  window.$(`.file-item-${file.id} .preparation`).remove()
                }
              })
              // 完成
              .then(val => {
                file.md5 = val
                // 检查当前文件是否已经存在服务器,如果存在则直接编辑上传成功
                this
                  .$api
                  .upload
                  .checkVideoMd5(val)
                  .then(r => {
                    if (r.status === 'success') {
                      // 服务器上面存在该文件，则跳过上传并在队列中标记文件已存在
                      uploader.skipFile(file)
                      window.$(`.file-item-${file.id} .percent`).text('100%')
                      window.$(`.file-item-${file.id} .speed`)
                        .text('视频已存在')
                        .css('color', 'red')
                      this.fileList = this.fileList.map(item => {
                        if (file.id === item.id) {
                          item.actionStatus = 'success'
                        }
                        return item
                      })
                      deferred.resolve()
                    } else {
                      deferred.resolve()
                    }
                  })
              })
            return deferred.promise();
            /* eslint-enable*/
          }
        })
        this.uploader = window.WebUploader.create({
          dnd: '#dndArea',
          auto: true, // 选完文件后，是否自动上传
          swf: '/static/Uploader.swf',  // swf文件路径
          server: '/api/upload.video',  // 文件接收服务端
          pick: {
            id: '#filePicker',     // 选择文件的按钮
            multiple: true,   // 是否多文件上传 默认false
            label: '点击选择视频'
          },
          accept: {
            title: 'videos',
            exteensions: 'mp4,flv,mkv,avi,rmvb',
            mimeTypes: '.mp4,.mkv,.flv,.avi,.rmvb'
          },  // 允许选择文件格式。
          threads: 1,
          fileNumLimit: 100, // 限制上传个数
          formData: {},  // 上传所需参数
          chunked: true,          // 分片上传
          chunkSize: 1024 * 1024,    // 分片大小
          duplicate: false,  // 重复上传
          sendAsBinary: true, // 是否已二进制的流的方式发送文件，这样整个上传内
          prepareNextFile: true // 是否允许在文件传输时提前把下一个文件准备好。 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
        })
        this.uploader.on('uploadBeforeSend', (obj, data, headers) => {
          headers.Token = this.getToken()
          data.md5 = obj.file.md5
          // console.log(obj.file.md5, data, headers)
        })
        // this.uploader.on('startUpload', () => {
        //   this.uploader.sort((a, b) => {
        //     console.log(a, b)
        //   })
        // })
        // 当有文件被添加进队列的时候，添加到页面预览
        this.uploader.on('fileQueued', (file) => {
          file.actionStatus = ''
          this.fileList.push(file)
          if (!file.size) {
            return false
          }
        })
        /**
         * @purpose 监听文件上传返回值
         */
        // this.uploader.on('uploadAccept', (object, res) => {
        //   console.log(object.file)
        //   if (res.code === 10000) {
        //     this.uploader.skipFile(object.file)
        //     this.fileList = this.fileList.map(item => {
        //       if (object.file.id === item.id) {
        //         item.actionStatus = 'success'
        //       }
        //       return item
        //     })
        //   }
        // })
        // 当文件开始上传
        this.uploader.on('uploadStart', (file) => {
          this.fileList = this.fileList.map(item => {
            if (file.id === item.id) {
              item.actionStatus = 'uploading'
            }
            return item
          })
          this.uploader.options.formData.md5 = file.md5
          this.uploader.options.formData.ext = file.ext
        })
        // 文件上传过程中创建进度条实时显示。
        this.uploader.on('uploadProgress', (file, percentage) => {
          window.$(`.file-item-${file.id} .progress`).css('width', percentage * 100 + '%')
          window.$(`.file-item-${file.id} .percent`).text((percentage * 100).toFixed(2) + '%')
        })
        // 文件上传成功
        this.uploader.on('uploadSuccess', (file, response) => {
          this.fileList = this.fileList.map(item => {
            if (file.id === item.id) {
              item.actionStatus = 'success'
            }
            return item
          })
        })
        // 文件上传错误
        this.uploader.on('uploadError', (file, reason) => {
          console.error(reason)
        })
        this.uploader.on('error', (type) => {
          let errorMessage = ''
          if (type === 'F_EXCEED_SIZE') {
          } else if (type === 'Q_EXCEED_NUM_LIMIT') {
            errorMessage = '文件上传已达到最大上限数'
          } else {
            errorMessage = `上传出错！请检查后重新上传！错误代码${type}`
          }
          console.error(errorMessage)
          // this.$emit('error', errorMessage)
        })
        // 文件上传完成
        this.uploader.on('uploadComplete', (file, response) => {
          // this.$emit('complete', file, response)
        })
      },
      fileSize (size) {
        return window.WebUploader.Base.formatSize(size)
      },
      start (file) {
        this.fileList = this.fileList.map(item => {
          if (file.id === item.id) {
            item.actionStatus = 'uploading'
          }
          return item
        })
        this.uploader.upload(file)
      },
      stop (file) {
        this.fileList = this.fileList.map(item => {
          if (file.id === item.id) {
            item.actionStatus = 'stop'
          }
          return item
        })
        this.uploader.stop(file)
      },
      // 取消并中断文件上传
      // cancelFile (file) {
      //   console.log('cancel-file:', file)
      //   this.uploader.cancelFile(file)
      // },
      // 在队列中移除文件
      removeFile (file) {
        // console.log('remove-file:', file)
        this.uploader.cancelFile(file)
        this.uploader.removeFile(file, true)
        this.fileList = this.fileList.filter(item => {
          return item.id !== file.id
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  .page
    width: 100%
    height: 100%
    .file-list
      width: calc(60% - 20px)
      height: 100%
      float: left
      margin-left: 20px
      background-color: #f4f4f4
      overflow-x: hidden
      overflow-y: auto
      .no-file
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        font-size: 1.5rem
      .file-item
        width: calc(100% - 20px)
        margin: 5px
        height: 140px
        position: relative
        background-color: #ffffff
        .preparation
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 100%
          background-color: rgba(255,255,255,0.5)
          z-index: 10
          .preparation-progress
            width: 0
            position: absolute
            height: 100%
            background-color: rgba(64,158,255, 0.8)
            top: 0
            left: 0
            display: flex
            align-items: center
            justify-content: center
            color: #ffffff
            font-size: 1rem
        .progress
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 0
          z-index: 1
          background-color: rgba(64,158,255, 0.2)
        .info
          width: 100%
          height: 100%
          position: absolute
          z-index: 2
          top: 0
          left: 0
          .file-name
            width: 100%
            height: 40px
            word-wrap: break-word
            display: flex
            align-items: center
            font-size: 1rem
            line-height: 1rem
            text-indent: 10px
          .action
            width: 100%
            height: 100px
            display: flex
            align-items: center
            position: relative
            .upload-data
              display: flex
              align-items: center
              justify-content: center
              font-size: 1.5rem
            .file-icon
              width: 100px
              height: 100px
              font-size: 3rem
            .file-size,.speed,.percent
              flex: 1
              font-size: 1.5rem
            .action-btn
              width: 100px
              font-size: 2rem
              cursor: pointer
              &:hover
                color: rgb(64,158,255)
    #uploader
      width: 40%
      height: 400px
      float: left
      .placeholder
        width: 100%
        height: 100%
        text-align: center
        padding-top: 220px
        border: 3px dashed #e6e6e6
        background: url('../../../../static/upload-video.png') center 93px no-repeat
        color: #cccccc
        font-size: 18px
        position: relative
        .webuploader-pick
          font-size: 18px
          background: #00b7ee
          border-radius: 3px
          line-height: 44px
          padding: 0 30px
          color: #fff
          display: inline-block
          margin: 20px auto
          cursor: pointer
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1)
        .webuploader-pick-hover
          background: #00a2d4
        .flashTip
          color: #666666
          font-size: 12px
          position: absolute
          width: 100%
          text-align: center
          bottom: 20px
          a
            color: #0785d1
            text-decoration: none
            &:hover
              text-decoration: underline
        &.webuploader-dnd-over
          border-color: #999999
          &.webuploader-dnd-denied
            border-color: red
</style>
