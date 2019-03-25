<template>
    <div class="management">
      <div class="items">
        <template v-for="(item, idx) in items">
          <div class="item" :key="'item-' + idx">
            <div class="thumb">
              <img :src="cdn + item.thumb">
              <div class="v-font play" @click="actionItem = item; showPlay = true">&#xe623;</div>
            </div>
          </div>
        </template>
      </div>
      <el-dialog
        :title="actionItem.name"
        :close-on-click-modal="false"
        :visible.sync="showPlay"
        :show-close="false"
        width="80%">
        <ui-play
          :show.sync="showPlay"
          :item="actionItem"
          @change-thumb="changeThumb"></ui-play>
      </el-dialog>
    </div>
</template>

<script>
  import UiPlay from './play'
  import config from '@config'
  export default {
    components: {
      UiPlay
    },
    props: ['status'],
    name: 'items',
    data () {
      return {
        cdn: config.cdn,
        page: 1,
        size: 20,
        total: 0,
        items: [],
        actionItem: {},
        showPlay: false
      }
    },
    watch: {
      status () {
        this.page = 1
        this.size = 20
        this.total = 0
        this.getItems()
      }
    },
    methods: {
      /**
       * @purpose 更换视频封面
       */
      changeThumb (data) {
        this.items = this.items.map(item => {
          if (item.id === data.id) {
            item.thumb = data.thumb
          }
          return item
        })
      },
      /**
       * @purpose 获取视频列表
       */
      getItems () {
        this
          .$api
          .video
          .items({
            page: this.page,
            size: this.size,
            status: this.status
          })
          .then(r => {
            this.items = r.list
            this.total = r.total
          })
      }
    },
    created () {
      this.getItems()
    }
  }
</script>
<style lang="sass">
  .el-dialog__body
    padding: 10px 0 0 0
</style>
<style scoped lang="sass">
  .management
    width: 100%
    height: auto
  .items
    width: 100%
    height: auto
    .item
      width: 250px
      height: 400px
      margin: 0 10px 10px 0
      float: left
      background-color: #f4f4f4
      box-shadow: 0 0 5px #f1f1f1
      .thumb
        width: 100%
        height: 140px
        display: flex
        align-items: center
        justify-content: center
        background-color: #000000
        overflow: hidden
        position: relative
        .play
          width: 100%
          height: 100%
          background-color: rgba(0, 0, 0, 0.5)
          position: absolute
          top: 0
          left: 0
          display: flex
          align-items: center
          justify-content: center
          font-size: 3rem
          color: #ffffff
          cursor: pointer
          &:hover
            color: #f1f1f1
        img
          max-height: 100%
</style>
