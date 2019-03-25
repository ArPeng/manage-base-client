<template>
  <div class="album">
    <div class="toolbar">
      <el-button
        type="primary"
        v-if="prefix !== 'thumb/'"
        @click="back"
        size="small">返回</el-button>
    </div>
    <div class="files" v-scroll="loadMore">
      <template v-for="(dir, idx) in directory">
        <div
          @click="prefix = dir"
          class="v-font item folder" :key="'directory-' + idx">
          &#xe9b1;
          <div class="name">{{directoryName(dir)}}</div>
        </div>
      </template>
      <template v-for="(img, idx) in files">
        <div
          class="item"
          @click="selected(img)"
          :key="'img-' + idx">
          <div
            class="v-font selected"
            v-if="inArray(img, images)">&#xe650;</div>
          <img :src="cutImg(imageUrl + img, 150, 150)">
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import config from '@config'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      directory: [],
      files: [],
      prefix: 'thumb/',
      mark: '',
      images: []
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.directory = []
        this.files = []
        this.prefix = 'thumb/'
        this.mark = ''
        this.getItems()
      } else {
        this.images = []
      }
    },
    prefix () {
      this.mark = ''
      this.directory = []
      this.files = []
      this.getItems()
    }
  },
  methods: {
    selected (img) {
      if (this.images.indexOf(img) < 0) {
        this.images.push(img)
      } else {
        this.images = this.images.filter(image => {
          return img !== image
        })
      }
      this.$emit('images', this.images)
    },
    loadMore () {
      if (!this.mark) {
        return false
      }
      this.getItems()
    },
    directoryName (directory) {
      directory = directory.split('/').filter(item => {
        return Boolean(item)
      })
      return directory.pop()
    },
    /**
     *  返回
     */
    back () {
      let prefix = this.prefix.split('/').filter(item => {
        return Boolean(item)
      })
      prefix.pop()
      this.prefix = prefix.join('/')
      if (this.prefix) {
        this.prefix += '/'
      }
    },
    /**
     * @purpose 获取列表数据
     */
    getItems () {
      this
        .$api
        .album
        .items(this.prefix, this.mark)
        .then(r => {
          this.directory = this.directory.concat(r.directory)
          this.files = this.files.concat(r.files)
          this.mark = r.mark
        })
    }
  },
  created () {
    this.getItems()
  }
}
</script>
<style scoped lang="sass">
.album
  width: 100%
  height: 100%
  .toolbar
    width: 100%
    height: 2.5rem
    display: flex
    align-items: center
  .files
    width: 100%
    height: calc(100% - 2.5rem)
    overflow-x: hidden
    overflow-y: auto
    .item
      width: 150px
      height: 150px
      margin: 5px
      float: left
      cursor: pointer
      border: 1px solid #efefef
      position: relative
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
      img
        width: 100%
        height: 100%
      &.folder
        display: flex
        align-items: center
        justify-content: center
        font-size: 3rem
        color: darkorange
        flex-direction: column
        transition: all .3s
        &:hover
          box-shadow: 0 0 5px #cccccc
        .name
          width: 100%
          height: 2rem
          display: flex
          align-items: center
          justify-content: center
          font-size: 1rem
          color: #000000
          margin-top: 1rem
</style>
