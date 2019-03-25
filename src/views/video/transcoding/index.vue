<template>
  <div class="main">
    <div class="transcoding">
      <div
        v-for="(item,idx) in itemsAtTranscoding"
        :key="'transcoding-' + idx"
        class="item">
        <div class="v-font item-font">&#xe612;</div>
        <div class="size">{{fileSize(item.size)}}</div>
        <div class="times">{{formatSeconds(item.transcoding_times)}}/{{formatSeconds(item.duration)}}</div>
        <div class="percent">{{(item.transcoding_times / item.duration * 100).toFixed(2) + '%'}}</div>
        <div class="name">{{item.name}}</div>
        <div class="progress"
             :style="{
                width: (item.transcoding_times / item.duration * 100).toFixed(2) + '%'
             }"></div>
      </div>
    </div>
    <template>
      <el-table
        :data="itemsAtWait"
        style="width: 100%">
        <el-table-column
          label="视频ID"
          width="100">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column
          label="时长"
          width="100">
          <template slot-scope="scope">
            {{formatSeconds(scope.row.duration)}}
          </template>
        </el-table-column>
        <el-table-column
          label="视频大小"
          width="100">
          <template slot-scope="scope">
            {{fileSize(scope.row.size)}}
          </template>
        </el-table-column>
        <el-table-column
          label="视频名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column
          label="MD5">
          <template slot-scope="scope">
            {{scope.row.md5}}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      page: 1,
      size: 1000,
      itemsAtWait: [],
      itemsAtTranscoding: [],
      total: 0,
      auto: null
    }
  },
  methods: {
    /**
     *  格式化数据大小size
     */
    fileSize (size, pointLength = 2, units = [ 'B', 'K', 'M', 'G', 'TB' ]) {
      let unit
      while ((unit = units.shift()) && size > 1024) {
        size = size / 1024
      }
      return (unit === 'B' ? size : size.toFixed(pointLength)) + unit
    },
    /**
     * @purpose 获取带转码视频列表
     */
    transcodingItems () {
      this
        .$api
        .video
        .transcoding({
          page: this.page,
          size: this.size
        })
        .then(r => {
          this.itemsAtWait = []
          let itemsAtTranscoding = []
          r.list.map(item => {
            if (Number(item.transcoding) === 1) {
              this.itemsAtWait.push(item)
            } else if (Number(item.transcoding) === 2) {
              itemsAtTranscoding.push(item)
            }
          })
          this.itemsAtTranscoding = itemsAtTranscoding
        })
    },
    loop () {
      this.auto = setInterval(() => {
        this.transcodingItems()
      }, 1000)
    }
  },
  created () {
    this.loop()
  },
  beforeDestroy () {
    clearInterval(this.auto)
  }
}
</script>
<style scoped lang="sass">
  .main
    width: 100%
    height: auto
    .transcoding
      width: 100%
      height: auto
      margin-bottom: 50px
      .item
        width: 100%
        height: 50px
        display: flex
        border-bottom: 1px solid #f4f4f4
        position: relative
        .progress
          width: 0
          height: 100%
          background-color: rgba(64,158,255, .3)
          top: 0
          left: 0
          z-index: 1
          position: absolute
        &:last-child
          border-bottom: none
        .item-font
          width: 50px
          height: 50px
          display: flex
          align-items: center
          justify-content: center
          font-size: 1.5rem
        .size
          width: 80px
          display: flex
          align-items: center
          justify-content: center
          font-size: 1rem
        .times
          width: 150px
          display: flex
          align-items: center
          justify-content: center
          font-size: 1rem
        .percent
          width: 200px
          display: flex
          align-items: center
          justify-content: center
          font-size: 1rem
        .name
          flex: 1
          display: flex
          align-items: center
          justify-content: center
          font-size: 1rem
</style>
