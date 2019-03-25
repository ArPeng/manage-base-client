<template>
  <div>
    <div ref="toolbar" class="toolbar">
      <div
        @click="showUpload = true"
        class="w-e-menu"
        style="z-index:91;">
        <i class="w-e-icon-image"></i>
      </div>
    </div>
    <div
      ref="editor"
      v-html="initContent"
      class="editor"
      :style="{height: height + 'px'}"></div>
    <ui-upload-many
      @images="getImages"
      :show.sync="showUpload"></ui-upload-many>
  </div>
</template>
<script>
import Editor from 'wangeditor'
import config from '@config'
import uiUploadMany from '@components/upload-many'
export default {
  components: {
    uiUploadMany
  },
  name: 'wangEditor',
  props: {
    content: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 500
    },
    initContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showUpload: false,
      editorContent: '',
      imageUrl: config.imageUrl,
      editor: null
    }
  },
  methods: {
    getImages (images) {
      images.map(img => {
        this.editor.txt.append(`<p style="text-align: center;"><img src="${this.imageUrl + img}" style="max-width:100%;"><br></p>`)
      })
    }
  },
  mounted () {
    let editor = new Editor(this.$refs.toolbar, this.$refs.editor)
    this.editor = editor
    this.$emit('update:editor', editor)
    editor.customConfig.onchange = (html) => {
      this.$emit('update:content', html)
    }
    editor.customConfig.uploadImgServer = '/api/upload.image.article'
    editor.customConfig.uploadImgHeaders = {
      'token': this.getToken()
    }
    editor.customConfig.zIndex = 90
    // 将图片大小限制为 .5M
    editor.customConfig.uploadImgMaxSize = 0.5 * 1024 * 1024
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1
    editor.customConfig.uploadFileName = 'file'
    // 自定义菜单配置
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      // 'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      // 'backColor',  // 背景颜色
      // 'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      // 'emoticon',  // 表情
      // 'image',  // 插入图片
      // 'table',  // 表格
      // 'video',  // 插入视频
      // 'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ]
    editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result) => {
        if (result.code !== 10000) {
          this.toast(result.message)
          return false
        }
        insertImg(this.imageUrl + result.data.url)
      }
    }
    editor.create()
  }
}
</script>
<style scoped lang="sass">
  .toolbar, .editor
    border: 1px solid #ccc
  .editor
    border-top: none
    background-color: #ffffff
    p
      text-align: center !important
</style>
